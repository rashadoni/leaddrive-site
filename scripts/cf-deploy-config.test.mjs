import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const script = join(dirname(fileURLToPath(import.meta.url)), 'cf-deploy-config.mjs')

test('turns vinext output into a fail-closed asset-only deploy config', async () => {
  const root = await mkdtemp(join(tmpdir(), 'leaddrive-cf-config-'))
  try {
    const server = join(root, 'dist', 'server')
    const client = join(root, 'dist', 'client')
    await mkdir(join(client, 'solutions'), { recursive: true })
    await mkdir(server, { recursive: true })

    await writeFile(
      join(server, 'wrangler.json'),
      JSON.stringify({
        name: 'sites-project',
        topLevelName: 'sites-project',
        main: './index.js',
        compatibility_date: '2026-09-26',
        compatibility_flags: ['nodejs_compat'],
        assets: {
          directory: '../client',
          binding: 'ASSETS',
          not_found_handling: 'none',
        },
      }),
    )
    await writeFile(
      join(server, 'vinext-prerender.json'),
      JSON.stringify({
        trailingSlash: false,
        routes: [
          { route: '/', status: 'rendered', router: 'app' },
          { route: '/solutions/[slug]', path: '/solutions/sales-crm', status: 'rendered', router: 'app' },
        ],
      }),
    )

    const files = [
      'index.html',
      '404.html',
      '_redirects',
      'build-stamp.json',
      'ru.html',
      'en.html',
      'privacy.html',
      'terms-of-use.html',
      'solutions/sales-crm.html',
    ]
    await Promise.all(files.map((file) => writeFile(join(client, file), 'fixture')))

    const result = spawnSync(process.execPath, [script], { cwd: root, encoding: 'utf8' })
    assert.equal(result.status, 0, result.stderr)

    const output = JSON.parse(await readFile(join(server, 'wrangler.deploy.json'), 'utf8'))
    assert.equal(output.name, 'leaddrive-site')
    assert.equal(output.topLevelName, 'leaddrive-site')
    assert.equal(output.main, undefined)
    assert.equal(output.assets.binding, undefined)
    assert.equal(output.assets.not_found_handling, '404-page')
    assert.equal(output.assets.html_handling, 'auto-trailing-slash')
    assert.deepEqual(output.routes, [
      { pattern: 'leaddrivecrm.org/*', zone_name: 'leaddrivecrm.org' },
      { pattern: 'www.leaddrivecrm.org/*', zone_name: 'leaddrivecrm.org' },
      { pattern: 'new.leaddrivecrm.org', custom_domain: true },
    ])
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('refuses an asset-only deploy when vinext skipped a route', async () => {
  const root = await mkdtemp(join(tmpdir(), 'leaddrive-cf-config-skipped-'))
  try {
    const server = join(root, 'dist', 'server')
    const client = join(root, 'dist', 'client')
    await mkdir(join(client, 'solutions'), { recursive: true })
    await mkdir(server, { recursive: true })

    await writeFile(
      join(server, 'wrangler.json'),
      JSON.stringify({ main: './index.js', assets: { directory: '../client', binding: 'ASSETS' } }),
    )
    await writeFile(
      join(server, 'vinext-prerender.json'),
      JSON.stringify({
        trailingSlash: false,
        routes: [
          { route: '/', status: 'rendered', router: 'app' },
          { route: '/account', status: 'skipped', reason: 'dynamic' },
        ],
      }),
    )

    const files = [
      'index.html',
      '404.html',
      '_redirects',
      'build-stamp.json',
      'ru.html',
      'en.html',
      'privacy.html',
      'terms-of-use.html',
      'solutions/sales-crm.html',
    ]
    await Promise.all(files.map((file) => writeFile(join(client, file), 'fixture')))

    const result = spawnSync(process.execPath, [script], { cwd: root, encoding: 'utf8' })
    assert.equal(result.status, 1)
    assert.match(result.stderr, /prerender did not render every route: \/account: skipped \(dynamic\)/)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

// Turn the build's generated wrangler config into one that deploys THIS worker.
//
// `vinext build` emits dist/server/wrangler.json naming the worker "sites-project"
// with no routes at all. Deploying that publishes a stray worker and leaves
// leaddrivecrm.org on the old code — while exiting 0. This script is the fix, and
// it lives here rather than inline in CI so the PR build runs it too: if a vinext
// upgrade changes the output, a pull request goes red instead of a production
// deploy going quietly wrong.
//
// The assertions fail closed on purpose. wrangler's account-level route call
// deletes routes not present in the config, so an empty or partial routes array
// would take the site off the air with no error anywhere.
import { readFileSync, writeFileSync } from 'node:fs'

const SRC = 'dist/server/wrangler.json'
const OUT = 'dist/server/wrangler.deploy.json'
const WORKER = 'leaddrive-site'
const ZONE = 'leaddrivecrm.org'

const ROUTES = [
  { pattern: `${ZONE}/*`, zone_name: ZONE },
  { pattern: `www.${ZONE}/*`, zone_name: ZONE },
  // Only this one is a custom domain. On the apex or www Cloudflare answers
  // 100117 "Hostname already has externally managed DNS records".
  { pattern: `new.${ZONE}`, custom_domain: true },
]

const config = JSON.parse(readFileSync(SRC, 'utf8'))
config.name = WORKER
config.topLevelName = WORKER
config.workers_dev = false
config.routes = ROUTES

const problems = []
if (config.name !== WORKER) problems.push(`name is ${config.name}`)
if (config.workers_dev !== false) problems.push('workers_dev is not false')
if (!Array.isArray(config.routes) || config.routes.length !== 3) {
  problems.push(`expected 3 routes, got ${config.routes?.length}`)
}
if (!config.main) problems.push('main is missing — the worker would have no entry point')
if (!config.assets?.directory) problems.push('assets.directory is missing — every static file would be dropped')
if (problems.length) {
  console.error(`cf-deploy-config: refusing to write ${OUT}\n  ${problems.join('\n  ')}`)
  process.exit(1)
}

writeFileSync(OUT, JSON.stringify(config, null, 2))
console.log(`cf-deploy-config: ${OUT} -> ${config.name}, ${config.routes.length} triggers`)

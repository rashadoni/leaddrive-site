// Пишет public/build-stamp.json с коммитом, из которого собран сайт.
//
// Зачем. Выкатывает Cloudflare Workers Builds, и об успехе он сообщает сам:
// «wrangler deploy прошёл». Это подтверждает доставку ИМЕНИ воркера, а не
// байтов на трёх адресах. На подмене обоев мы на этом уже обожглись: файл
// лежал в артефакте, curl находил его локально, а edge полгода отдавал 404.
// Штамп — единственная вещь, по которой снаружи видно, ЧТО именно выкачено.
//
// Источник sha, по убыванию доверия: переменная сборщика Cloudflare, потом
// GitHub Actions, потом локальный git. Если не нашли ничего — пишем "unknown"
// и НЕ роняем сборку: сайт важнее штампа.
import { execSync } from "node:child_process"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

function sha() {
  const fromCi = process.env.WORKERS_CI_COMMIT_SHA || process.env.GITHUB_SHA
  if (fromCi) return fromCi
  try {
    return execSync("git rev-parse HEAD", { encoding: "utf8" }).trim()
  } catch {
    return "unknown"
  }
}

const out = join(process.cwd(), "public", "build-stamp.json")
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, JSON.stringify({ sha: sha(), branch: process.env.WORKERS_CI_BRANCH || "" }) + "\n")
console.log("build stamp:", sha())

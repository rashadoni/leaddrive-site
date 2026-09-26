# Cloudflare Worker production errors — session log

Append-only continuity journal for the investigation started on 2026-09-26 (Europe/Berlin).

## 2026-09-26 — task intake and repository routing

- User requested an evidence-led investigation and minimal fix for mass production errors on Cloudflare Worker `leaddrive-site`, followed by verification and release only within the project's active permissions.
- Historical dashboard snapshot supplied by the user: roughly 33.15k invocations and 10.77k errors in the preceding 24 hours; errors shown on Worker version `ff076a34`; Cloudflare email reported at least 1,000 free-tier CPU-limit events at account scope. These are historical observations, not yet revalidated or causally attributed.
- The initially recorded cwd was `/home/codex-alt/projects/leaddrive-v2`, which is the wrong repository and contains unrelated user changes. It was left untouched.
- Correct repository confirmed as `https://github.com/rashadoni/leaddrive-site.git` at `/home/codex-alt/projects/leaddrive-site`.
- The canonical checkout was clean but on an unrelated branch `codex/meta-app-review-legal-routes`, one local commit ahead of its upstream. It was preserved unchanged.
- Fetched `origin`; current `origin/main` is `2b940ce` (merge of PR #30), with feature commit `51f166b`.
- Created isolated worktree `/mnt/HC_Volume_106454338/codex-alt-data/worktrees/leaddrive-site-cloudflare-errors` on branch `codex/fix-cloudflare-worker-errors`, based on `origin/main`.
- `codex-project-context` reports no verified production alias/path or release route for this repository. Production mutation remains gated on discovering and verifying the actual Cloudflare/GitHub deployment path.
- Next step: obtain current Cloudflare metrics/logs with exact timestamps and correlate the deployed Worker version with repository/deployment history before changing code.

## 2026-09-26 — production routing and first evidence

- Repository workflow confirms production is deployed by Cloudflare Workers Builds from GitHub `main`; GitHub Actions performs the independent build gate and then polls all three public hostnames for the commit build stamp.
- GitHub Actions run `35914363906` for merge commit `2b940cee97208d6e517515a329534c08e86977e0` completed successfully from 2026-09-23 20:12:16Z to 20:13:41Z. Its `verify-live` job completed successfully.
- On 2026-09-26 at 14:52:35Z (16:52:35 Europe/Berlin), `https://leaddrivecrm.org/build-stamp.json` identified the live source as the same merge commit on branch `main`. This maps the live Git source independently of the Cloudflare Worker version ID `ff076a34`; the two identifiers must not be conflated.
- The `.openai/hosting.json` project is not the live production channel: it has zero saved versions, no custom domains, and the Sites log API reports that production logs are unavailable. It must not be used as evidence for `leaddrive-site`.
- The available managed Chrome profile redirects the exact Cloudflare metrics URL to `/login`. No `CLOUDFLARE_*`/`CF_*` environment variable, Wrangler OAuth config, or local Wrangler executable was present. Current account metrics and Workers Logs therefore remain externally blocked pending Dashboard authentication or a read-only Cloudflare API token.
- Public low-volume probes at 14:52:35Z showed dynamic HTML responses with no `cf-cache-status`: `/` 200 / 125,539 bytes / 0.452 s, `/ru` 200 / 133,469 bytes / 0.284 s, `/en` 200 / 122,794 bytes / 0.284 s, `/solutions/sales-crm` 200 / 52,410 bytes / 0.091 s, and an unknown URL 404 / 5,657 bytes / 0.179 s. A browser-style unknown navigation also reached the dynamic 404 path (5,669 bytes / 0.283 s). `build-stamp.json`, by contrast, was a static asset with `cf-cache-status: HIT` and 67 bytes.
- PR #30 changes only client-side demo form fields/copy and the external CRM endpoint. It adds no Worker request handler or server-side per-request work, so source inspection does not support treating it as the cause merely because the currently deployed version contains it.
- Confirmed architectural issue: `vite.config.ts` uses `vinext()` without prerendering and `next.config.ts` does not select static export. vinext 1.0.0-beta.5 documents that it server-renders all pages on each request by default. The site has no same-origin server/API routes; its demo submission is a browser fetch to `https://app.leaddrivecrm.org/api/v1/public/demo-requests`, and all dynamic content routes provide `generateStaticParams()`.
- Working hypothesis, not yet log-confirmed: runtime SSR of every HTML and 404 request consumes enough CPU to exceed the Workers Free 10 ms/request limit, while asset requests succeed without Worker execution. This topology is consistent with the historical error rate and CPU-limit email but does not yet classify the historical 10.77k errors.
- Next step: design and CI-verify a static-export/asset-first deployment that preserves language routes, `_redirects`, legal pages, demo behavior, SEO and custom 404 handling; obtain Cloudflare logs before claiming causality or production resolution.

## 2026-09-26 — version correlation and candidate fix

- GitHub check metadata provides an exact deployment mapping. Commit `2b940cee97208d6e517515a329534c08e86977e0` produced Cloudflare Build `48b90172-4a61-4e9e-9991-21b372e9f8b8` and Worker Version `ff076a34-32cb-4911-be39-ef5c556ed68a` at 2026-09-23 20:13:12Z. The previous main commit `8bb17a45a222eb59c7e2df6aa40689382cd41fb3` produced Build `1ef00241-7655-4a91-990d-04df2cbb7edc` and Version `cfd99d33-ca4e-45fc-a983-bc8d904bfc5b` at 2026-09-20 14:30:27Z.
- This proves what Git source produced `ff076a34`; it does not prove PR #30 caused the errors. GitHub build logs for both current and previous versions show the same runtime rendering topology. The current build classified 27 routes as unknown and 9 dynamic, with no prerender phase.
- Cloudflare's current documentation confirms Workers Free allows 10 ms CPU per HTTP invocation; runtime SSR commonly exceeds that budget. Cloudflare also documents asset-only static-site generation with `not_found_handling: "404-page"`, where unmatched requests receive the nearest `404.html` without a Worker script.
- Implemented candidate fix:
  - `next.config.ts`: set `output: 'export'` so vinext emits page HTML and the generated 404 into `dist/client`.
  - `scripts/cf-deploy-config.mjs`: convert generated configuration into an asset-only deployment by removing `main` and the unused `ASSETS` binding, setting `404-page` and `auto-trailing-slash`, and failing closed unless home, languages, legal routes, a representative dynamic route, redirects, 404 and build stamp exist.
  - `scripts/cf-deploy-config.test.mjs` and `package.json`: add a dependency-free regression test for the production config transformation.
  - `.github/workflows/ci.yml`: run the regression test before the production build gate.
- Targeted local checks passed: `git diff --check`, syntax checks for both `.mjs` files, and `npm run test:cf-config` (1/1 passing). Full build, lint and generated-output assertions are intentionally delegated to GitHub CI under host resource policy and remain NOT RUN until the branch is pushed.
- Next step: checkpoint the task-owned files, push the feature branch, inspect CI and Cloudflare preview/build evidence, then release through reviewed `main` only if those gates are green.

## 2026-09-26 — pull request CI and independent review

- Checkpoint `958e37e70092ce1f8f0fe086a3045f3fbae58428` was pushed on `codex/fix-cloudflare-worker-errors`; PR #31 is open at `https://github.com/rashadoni/leaddrive-site/pull/31` and GitHub reports it mergeable with a clean merge state.
- GitHub Actions run `36250295959` completed successfully. Its production build used Node 22, passed the deploy-config regression test, prerendered 112 routes with 0 skipped, discovered 111 CDN warmup paths, and generated the asset-only config with all 3 production triggers. `verify-live` was skipped as designed for a pull request; it runs only after a push to `main`.
- The route report still uses `ƒ` for dynamic route *patterns*, but each concrete path produced by `generateStaticParams()` is present in the 112 rendered outputs. The prerender summary and generated files, not that pattern glyph alone, determine deployability as Static Assets.
- A separate read-only review checked the implementation against the pinned Wrangler 4.92.0 schema/code and vinext 1.0.0-beta.5 output. It found no blocking issue: Wrangler supports an asset-only config without `main` and rejects leaving `assets.binding` when no script exists; `404-page` plus `auto-trailing-slash` is the intended static-site topology.
- The review identified a non-blocking fail-closed gap: checking only representative HTML paths would allow a future vinext change to silently skip a newly dynamic route. The config transformer now reads `dist/server/vinext-prerender.json`, requires `trailingSlash: false`, and refuses deployment if any route is skipped or errored. A negative regression test covers that refusal. `npm start` now also uses the transformed deploy config so local production-topology smoke no longer exercises the discarded SSR config.
- Next step: run the targeted checks again, push the hardened guard, wait for the replacement PR CI, then merge and monitor both GitHub content verification and Cloudflare Workers Builds.

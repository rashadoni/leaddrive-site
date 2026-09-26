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

## 2026-09-26 — production release and post-deploy verification

- Hardened checkpoint `fa0629ec2921fc3d07bda6e473a46bc15cdd0582` passed replacement PR CI run `36250606817`: 2/2 deploy-config tests, 112 routes rendered, 0 skipped, 111 CDN warmup paths, and an asset-only deploy config with all 3 production triggers. The advisory lint step continued to report the repository's existing UI backlog; the blocking build and config gates passed.
- PR #31 was merged at 2026-09-26 15:04:45Z. The production source is merge commit `534f2fb10082562324fc0aeb780fe16b2ced9aac`.
- Cloudflare Workers Build `d635c286-6ec8-42aa-aad4-fb14944663c0` completed successfully at 15:05:39Z and created Worker Version `bb261b0b-d36f-4032-9c25-8fe895ecbeab`.
- GitHub Actions production run `36250680562` passed both jobs. Its `verify-live` job independently confirmed that `leaddrivecrm.org`, `www.leaddrivecrm.org`, and `new.leaddrivecrm.org` all served build stamp `534f2fb10082562324fc0aeb780fe16b2ced9aac`.
- Low-volume post-deploy smoke at 2026-09-26 15:13:07Z–15:13:07Z returned: `/` 200 / 125,514 bytes / 0.092 s; `/ru` 200 / 133,444 bytes / 0.093 s; `/en` 200 / 122,769 bytes / 0.205 s; `/solutions/sales-crm` 200 / 52,385 bytes / 0.090 s; an unknown URL 404 / 5,636 bytes / 0.081 s; and `build-stamp.json` 200 / 67 bytes / 0.071 s. A preceding header probe showed `cf-cache-status: HIT` on every tested HTML page and the custom 404, whereas the 14:52:35Z pre-deploy HTML/404 probes had no `cf-cache-status` and were dynamically rendered. This is topology evidence, not a statistically meaningful latency benchmark.
- Redirect smoke preserved the intended results: `/demo` and `/plans` returned 301; both slashed and unslashed legal targets returned their intended 302 to the CRM; legal fallback returned 302; legacy `/landing/*` and `/marketing/*` returned 301. Trailing-slash normalization now returns Cloudflare's 307 to the canonical non-slash URL, instead of the former framework 308; the canonical URL itself and SEO metadata are unchanged.
- Static HTML retained language-specific title, canonical and H1 metadata for `/`, `/ru`, `/en`, and `/solutions/sales-crm`. The live JavaScript bundle still contains the demo form copy and the external endpoint `https://app.leaddrivecrm.org/api/v1/public/demo-requests`; no real form was submitted during smoke.
- Current Cloudflare account analytics and Workers Logs are still unavailable: the managed Dashboard tab is unauthenticated and the host has no Cloudflare API token or Wrangler OAuth session. Therefore the historical 10.77k errors cannot be classified by outcome/path, and no honest post-release Worker error-rate or CPU-time delta can yet be reported. Public and deployment evidence proves the asset-only release is live; it does not substitute for account analytics.
- Rollback, if new evidence requires it: revert merge commit `534f2fb10082562324fc0aeb780fe16b2ced9aac` through a reviewed PR to `main`; Cloudflare Workers Builds will publish the resulting SHA and the existing `verify-live` gate will verify all three hosts. No rollback is indicated by the completed smoke.

## 2026-09-26 — MTM GPS causal hypothesis

- The latest published mobile prerelease checked was `v3.3.0-build358`, commit `d0e9e97a5ede8fea014e18700b5253bfc4e7cd51`, published 2026-09-24 19:58:00Z.
- Android may emit native location readings every 5–10 seconds, but the app admits at most one fresh upload every 30 seconds. Tracking runs only for a signed-in `AGENT` with a confirmed, active, unpaused workday. After connectivity returns, one successful live point can flush up to 8 queued points, so a recovery tick can temporarily make up to 9 POSTs.
- The upload target is `POST https://<selected-tenant-host>/api/v1/mtm/mobile/location`. Normal server selection is `app.leaddrivecrm.org` or a tenant subdomain. `leaddrive-site` has only exact apex, `www`, and `new` triggers; it has no `*.leaddrivecrm.org` or `app.leaddrivecrm.org` trigger. Cloudflare route matching requires an explicit leading hostname wildcard to include subdomains.
- A safe live routing check at approximately 15:13Z returned `200 application/json` for `app.leaddrivecrm.org/api/v1/mtm/mobile/ping`, while the same path on apex and `new` returned the marketing site's static `404 text/html`. The current app also validates that ping before saving a server, so normal setup will not persist the apex marketing host.
- Volume alone looks deceptively similar: one continuously working agent produces about 120 uploads/hour or 960 in an 8-hour day; 35 agent-days produce about 33,600 uploads, near the historical 33.15k Worker invocations. That numerical coincidence does not overcome the hostname mismatch. MTM is therefore not supported as the cause of `leaddrive-site` errors under normal configuration. It could contribute only if an old/corrupt device stored the apex or `new` hostname, or if the live account routes differ from the deployed config; Workers Logs grouped by host/path would close that residual uncertainty.
- Next step: once read-only Cloudflare analytics access exists, query the exact pre/post intervals by outcome, version, hostname and path. Confirm the historical error class and check specifically for `/api/v1/mtm/mobile/location`; do not make another production change without that evidence.

## 2026-09-26 — autonomous completion attempt and access boundary

- The user explicitly asked to continue autonomously to the end. Work resumed from the saved stopping point: the asset-only release was live and publicly verified, while exact Cloudflare Analytics/Logs remained unavailable.
- Reconfirmed task routing before further work: worktree `/mnt/HC_Volume_106454338/codex-alt-data/worktrees/leaddrive-site-cloudflare-errors`, branch `codex/fix-cloudflare-worker-errors`, origin `https://github.com/rashadoni/leaddrive-site.git`; production remains Cloudflare Worker `leaddrive-site`, released only from GitHub `main` by Cloudflare Workers Builds. No new production mutation was made.
- Exhaustive read-only access audit found no usable Cloudflare credential:
  - no `CLOUDFLARE_*`, `CF_*`, or `WRANGLER_*` variable is present in the task environment;
  - the standard Wrangler configuration contains logs/cache only, with no OAuth config;
  - repository GitHub Actions secrets are empty; the only Cloudflare-related repository variable is the non-secret account ID;
  - the Cloudflare Workers Builds credential is held by Cloudflare and is not exposed to GitHub Actions;
  - GitHub checks expose build/version metadata but no request analytics or invocation logs;
  - an unauthenticated GraphQL request returned Cloudflare code `9106` for missing authentication headers.
- The existing managed Chrome target was inspected without reading cookies or credentials. Its Cloudflare tab is still redirected to the login page, neither login field is autofilled, and the same browser profile is not authenticated to GitHub. Thus the prior Dashboard session cannot be resumed autonomously, and initiating a new identity-provider authorization or resetting credentials would exceed the available authority.
- The connected mailbox contains one matching Cloudflare alert, `[Action required] Workers CPU limit exceeded`, timestamped `2026-09-26T14:09:11Z`, before the asset-only deployment at `15:05:39Z`. No later matching alert was present as of approximately `15:27Z`. This is useful chronology but not a replacement for metrics: alert delivery is thresholded and may be delayed or deduplicated.
- A second low-volume public verification ran from `2026-09-26T15:28:20.335Z` to `15:28:20.982Z`:
  - `/` 200 / 125,514 bytes / `cf-cache-status: HIT`;
  - `/ru` 200 / 133,444 bytes / `HIT`;
  - `/en` 200 / 122,769 bytes / `HIT`;
  - `/solutions/sales-crm` 200 / 52,385 bytes / `HIT`;
  - a fresh unknown path 404 / 5,636 bytes / `HIT`;
  - `build-stamp.json` returned 200 / 67 bytes / `HIT` on apex, `www`, and `new`, and all three still identified merge SHA `534f2fb10082562324fc0aeb780fe16b2ced9aac` on `main`;
  - `app.leaddrivecrm.org/api/v1/mtm/mobile/ping` returned 200 JSON with `cf-cache-status: DYNAMIC`, independently confirming that the MTM API and the marketing site's asset-only delivery are different host-level paths.
- Exact matched comparison windows are now fixed for when access is supplied:
  - 24-hour pre-deploy: `2026-09-25T15:05:39Z` through `2026-09-26T15:05:39Z`;
  - 24-hour post-deploy: `2026-09-26T15:05:39Z` through `2026-09-27T15:05:39Z`;
  - a shorter early comparison may use equal-duration windows ending/starting at `15:05:39Z`, but must be labelled preliminary and normalized by requests.
- GraphQL `workersInvocationsAdaptive`, filtered to `scriptName: leaddrive-site`, is the appropriate source for requests, errors, outcomes/statuses, CPU and wall-time quantiles. Host, path, response status and the residual MTM hypothesis require Workers Observability logs/querying, including an explicit check for `/api/v1/mtm/mobile/location` and version IDs `ff076a34-32cb-4911-be39-ef5c556ed68a` versus `bb261b0b-d36f-4032-9c25-8fe895ecbeab`.
- Concrete external blocker: Cloudflare requires either a renewed authenticated Dashboard session or an account-owned read-only API token. The least-privilege token needs Account Analytics Read plus Workers `Metadata Read-Only`/Observability Read scoped to `leaddrive-site`; it must be supplied only through the process environment and never committed or written to this journal. On Workers Free, stored Workers Logs have a 3-day retention window, so historical path-level classification is time-sensitive; aggregate GraphQL Worker metrics remain available longer.
- Current evidence supports the deployed architectural fix and rejects normal MTM routing as the cause of `leaddrive-site`, but it still does not honestly classify the historical 10.77k errors or establish a numerical post-release error-rate/CPU delta. That final classification is blocked solely on account authentication, not on code, CI, deployment, or public availability.
- Next step after the external access boundary is resolved: query the two fixed 24-hour windows (or equal elapsed preliminary windows), report requests/errors/error rate, `exceededResources` versus exceptions, CPU/wall-time quantiles by version, and host/path groups; then close the incident or revert merge commit `534f2fb10082562324fc0aeb780fe16b2ced9aac` only if those measurements contradict the current evidence.

## 2026-09-26 — resumed analytics attempt at 19:29Z

- The user asked to start the remaining verification. At `2026-09-26T19:29:07Z`, the environment still contained no Cloudflare/Wrangler credential and the managed Chrome Cloudflare target still resolved to the account login page rather than the Worker metrics view.
- Opened the exact `leaddrive-site` errors URL in the Codex in-app browser for account-owner authentication. No password reset, identity-provider authorization, token creation, or other account mutation was attempted. The metrics query remains ready to run immediately after the owner completes sign-in.
- Precise stopping point remains authentication: no additional code or production change is needed or justified while the account telemetry is unavailable.

## 2026-09-26 — official Observability OAuth initiated

- The user opened the exact Cloudflare metrics URL in the Codex in-app browser and asked to start again. The browser UI and the task's server-side tools do not share cookies, so an authenticated dashboard tab alone cannot authorize API calls from the task.
- Plugin discovery confirmed there is no separate Cloudflare app connector in the public plugin directory. Inspection of the already installed official Cloudflare plugin then confirmed that it bundles Cloudflare's official remote MCP service.
- Added the least-purpose official endpoint `https://observability.mcp.cloudflare.com/mcp` to Codex as `cloudflare-observability` and started its OAuth flow. This avoids copying dashboard cookies, passwords, or API tokens and is narrower than enabling the general Cloudflare API MCP.
- The OAuth listener is currently active and waiting for the account owner to approve access in the browser. No Cloudflare data has been returned yet and no production/account mutation has been performed. If the browser's localhost callback cannot reach the remote listener, retain the callback tab and resume the task so its one-time authorization response can be forwarded to the waiting listener without exposing credentials.
- Next step: complete the pending OAuth callback, verify the connection, then immediately query historical Workers Logs before Free-plan retention expires and collect matched Worker metrics around `2026-09-26T15:05:39Z`.

## 2026-09-26 — OAuth client compatibility workaround

- The account owner approved the first Observability OAuth request and the one-time callback was safely forwarded to the waiting remote listener without logging the code. Cloudflare returned HTTP 200, but `codex-cli 0.145.0` rejected the callback before token exchange with `Authorization server response missing required issuer`.
- This is a confirmed Codex OAuth regression rather than an account or Cloudflare permission failure: current OpenAI Codex issues document that the affected client parses the callback but discards the valid RFC 9207 `iss` parameter before issuer validation; a separate report reproduces the same failure specifically with Cloudflare MCP.
- Downloaded the official `codex-cli 0.142.0` Linux musl release to a task-specific temporary directory and verified its SHA-256 (`2e3acb39a277ff11c314d832cfdd246faebeea26bf01aff8e9e10641e6dea801`) against the digest published on the OpenAI GitHub release. The installed/system Codex binary was not replaced or modified.
- The older binary cannot parse the current global `[agents]` configuration, so it is running with an isolated minimal temporary `CODEX_HOME` containing only the official Cloudflare Observability MCP endpoint. A fresh OAuth listener is active and waiting for the owner's second consent/callback. No secret, authorization code, or OAuth state is stored in this journal.
- Next step: forward the fresh localhost callback to the compatible listener, verify OAuth token storage, connect to the Observability MCP, and query the incident metrics/logs.

## 2026-09-26 — authenticated production classification and incident closure

- The second official Cloudflare Observability OAuth flow completed successfully through the verified, isolated `codex-cli 0.142.0` compatibility binary. The installed Codex binary was not replaced. The resulting credential was installed in the normal Codex credential store with owner-only permissions, and the official `https://observability.mcp.cloudflare.com/mcp` endpoint remains registered as `cloudflare-observability`. No token, authorization code, cookie, or credential value was printed or added to the repository.
- Authenticated read-only access enumerated Worker `leaddrive-site` (tag `8203df61e3ae44a09c9a1a3d12a79a7e`) with `modified_on` `2026-09-26T15:05:35.272944Z`, consistent with the asset-only release. The Observability MCP server identified itself as `workers-observability` version `0.5.5`.
- The exact 24-hour pre-deploy window `2026-09-25T15:05:39Z` through `2026-09-26T15:05:39Z` contains 33,463 invocation rows, all on old Worker Version `ff076a34-32cb-4911-be39-ef5c556ed68a`:
  - `ok`: 22,384 (66.8918%);
  - `exceededCpu`: 11,019 (32.9289%);
  - `canceled`: 60 (0.1793%).
- Response outcomes independently corroborate the classification: 11,003 `exceededCpu` invocations returned 503 and 16 ended with status 0; the 60 canceled invocations also ended with status 0. Successful responses were 20,901 status 200, 1,455 status 404, 22 status 308, and 6 status 405.
- The error-event dataset contains 11,287 `cf-worker` error records, and every one groups under the same platform error: `Worker exceeded CPU time limit.` The error-event count is not an invocation denominator because failed invocations may emit an additional platform error record. Canonical invocation outcome counts above are taken from `cf-worker-event`/`$workers.outcome`.
- CPU telemetry matches the platform classification. For `exceededCpu`, CPU time was median 10 ms, p95 10 ms, p99 10 ms, average 10.166 ms, and max 73 ms; wall time was median 12 ms, p95 16 ms, p99 28 ms, average 12.905 ms, and max 207 ms. Distribution calculations are retained as supporting telemetry; canonical invocation counts come from count-only queries because combined multi-calculation responses occasionally omitted a small number of successful rows.
- Request-path aggregation identifies the load source and rules out the user's MTM hypothesis for this Worker:
  - 31,566 of 33,463 invocations (94.3311%) were `GET /`;
  - 11,010 of 11,019 CPU failures (99.9183%) were `GET /`;
  - the remaining nine CPU failures were isolated public scanner/unknown paths;
  - an exact `$metadata.trigger` search for `/api/v1/mtm/mobile/location` returned zero, and an independent exact `$workers.event.request.path` query also returned zero. Both fields contained data elsewhere in the window, so the zero is not caused by an absent field.
- Host aggregation for `GET /` found 31,535 requests to the apex, 26 to `www`, 3 to `new`, and 2 unusual explicit-port probes. None were routed to `app.leaddrivecrm.org`, where the MTM API actually lives.
- User-agent aggregation shows that the root load was overwhelmingly automated: `axios/1.8.3` generated 25,868 root invocations, `axios/1.7.9` 5,419, and `axios/1.16.1` 155. Together that is 31,442 (99.6072%) of root invocations. The traffic was spread across many residential/mobile networks and countries. Treating it as distributed automated/proxied traffic is an evidence-based inference, not an attribution to a specific actor; the user-agent strings can be spoofed. It is nevertheless incompatible with normal phone GPS uploads, which use `POST /api/v1/mtm/mobile/location` on the app/tenant host.
- A matched early before/after comparison uses equal 4 h 42 m 43 s windows around the release:
  - pre, `2026-09-26T10:22:56Z`–`15:05:39Z`: 7,114 invocations, including 3,470 `exceededCpu` failures;
  - post, `2026-09-26T15:05:39Z`–`19:48:22Z`: zero Worker invocations and zero Worker errors.
  This is the intended result of asset-only delivery: public requests continue to be served by Static Assets without invoking the Worker runtime.
- A narrow boundary check strengthens the deployment correlation: the 15 minutes immediately before release contained 550 invocations (379 `ok`, 171 `exceededCpu`); the 15 minutes immediately after contained zero Worker invocations.
- Final public smoke after the authenticated queries returned 200 with `cf-cache-status: HIT` on `/` for apex, `www`, and `new`; the custom unknown route returned 404 with `HIT`. All three `build-stamp.json` files still identify `main` SHA `534f2fb10082562324fc0aeb780fe16b2ced9aac`. The independent MTM ping on `app.leaddrivecrm.org` returned 200 JSON with `cf-cache-status: DYNAMIC`.
- Final causal conclusion: the incident was real CPU-limit exhaustion in the old vinext runtime-SSR Worker, amplified by heavy automated `GET /` traffic. It was not caused by normal MTM GPS uploads. The asset-only release removed runtime rendering from the marketing routes and eliminated Worker execution/errors in every observed post-release interval while preserving live delivery. No rollback or additional production mutation is indicated.
- The full 24-hour post-deploy window will not complete until `2026-09-27T15:05:39Z`. That future duration is not required to classify or close the incident: exact platform errors, version/path correlation, matched before/after intervals, deployment evidence, and live smoke all agree. A later full-day query is optional longitudinal confirmation only.
- Current stopping point: implementation, release, authenticated root-cause classification, MTM exclusion, matched post-release verification, and public smoke are complete. Next action: no immediate production change; retain the static topology and optionally re-query the completed 24-hour post window after `2026-09-27T15:05:39Z`.

## 2026-09-26 — ordered static-site hardening plan

- The user asked to continue immediately and to preserve the complete task order so no hardening step is forgotten. Work continues in the existing dedicated worktree on new branch `codex/static-site-hardening`, which contains the append-only incident history and has been merged with current `origin/main` (`534f2fb10082562324fc0aeb780fe16b2ced9aac`). Production remains GitHub `main` -> Cloudflare Workers Builds; no direct/manual deployment is permitted.
- The execution order is fixed as follows:
  1. Audit current external resources, canonical metadata, redirects, Cloudflare rules and CI so headers or redirects cannot break the public site.
  2. Add static `_headers` rules for safe security headers and immutable browser caching of fingerprinted assets; do not add a runtime Worker.
  3. Establish the apex as the canonical host and implement host redirects at the Cloudflare edge without Worker execution, but only after confirming that `www` and `new` are not required as independent public hosts and updating smoke/build-stamp checks accordingly.
  4. Strengthen deployment guards so production configuration fails if `main`, `assets.binding`, `run_worker_first`, skipped prerenders, missing headers, missing redirects, or incomplete routes can reintroduce runtime processing.
  5. Add an operational check/alert whose invariant is zero `leaddrive-site` Worker invocations and zero Worker errors; HTTP requests served by Static Assets are tracked separately from Worker compute.
  6. Read existing Cloudflare zone rules before mutation, then create one narrow WAF rule for the confirmed automated signature: marketing hosts + `GET /` + user agent beginning with `axios/`. Avoid country/IP-wide rules and preserve browsers, verified crawlers, application/API hosts and MTM. Prefer a reversible challenge/observation stage before permanent blocking when the plan/tooling supports it.
  7. Run targeted local checks, checkpoint only task-owned paths, push the feature branch, open a new PR, wait for GitHub CI, and merge only if all blocking gates pass.
  8. Verify the Cloudflare build/version, apex page, canonical host redirects, custom 404, security/cache headers, build stamp, demo integration and independent MTM ping after release.
  9. At or after `2026-09-27T15:05:39Z`, query the complete 24-hour post-release Observability window and record invocation/error totals. This time-gated confirmation must not be invented or marked complete early.
- Safety constraints: keep the marketing deployment asset-only; never add request-time logging, middleware, SSR, authentication, bot filtering or redirects to a Worker; audit CSP against real external resources before enforcement; do not overwrite existing Cloudflare rulesets; and keep rollback changes path-scoped and reversible.
- Current step: repository/external-resource audit is in progress. No production setting has been changed in this hardening phase yet.

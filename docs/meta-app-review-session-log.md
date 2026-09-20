# Meta App Review legal-route session log

Append-only continuity log for the public marketing host portion of LeadDrive
CRM Meta App Review preparation.

## 2026-09-20 — public CRM legal routes

- Canonical repository: 'https://github.com/rashadoni/leaddrive-site.git'.
- Created branch 'codex/meta-app-review-legal-routes' from clean
  'origin/main' at 'e9a6e6148'.
- The Cloudflare site redirected every '/legal/*' path to the marketing home,
  while '/privacy' and '/terms-of-use' are explicitly limited to the marketing
  website.
- Added exact, temporary redirects for '/legal/privacy', '/legal/terms' and
  '/legal/data-deletion' to the public English CRM documents served by
  'app.leaddrivecrm.org'. The exact rules precede the legacy '/legal/*'
  fallback, so unrelated old URLs continue to return home.
- Redirects use HTTP 302 intentionally until the CRM revision is deployed and
  the final canonical URL strategy is confirmed. No deploy or Cloudflare
  mutation was performed.

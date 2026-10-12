# Coordinated design-system publication

Use the existing `groverkunal/bots-fired-design-system` branch `design-system-presentation`. Parent coordinates the pinned artifact in `botsfired-platform` and the existing Firebase site `botsfired-design` under project `microblogger-agent-prod`. Do not deploy concurrently, replace unrelated site output, create a new site or change DNS.

Build with Node >=22.12: `npm ci && npm run build`. The `dist/` directory is fully static Astro documentation. The platform worker must replace only `apps/web/dist/design` with the pinned distribution and preserve the existing security headers and public audience.

Integration changes required for this static release:

- Remove the design target's blanket SPA rewrite, while preserving every other site's routing and configuration. Existing real chapter directories serve their own index HTML. Missing assets must return 404; `dist/404.html` provides the fallback page.
- Preserve `/assets/` download paths and `_astro/` hashed modules/styles/fonts. Hashed `_astro/**` files can use immutable caching; stable named downloads should retain conservative caching.
- Keep HTML and HTTP noindex directives, robots disallow and empty/absent design sitemap. The design hub remains unlinked from main-site navigation.
- Retain the existing self-only script policy. The build extracts executable inline Astro bootstraps into local hashed scripts, without changing CSP. Retain existing inline-style permission because historical specimens still use inline styles.
- Recheck all routes, download MIME types, missing-file status, mode preferences and island exports after deployment. No automatic publishing is performed by this repository's CI.

The intended URL remains https://design.botsfired.com. The existing Firebase origin is https://botsfired-design.web.app. Parent owns DNS approval and live checks; a hidden URL is not authentication. No confidential material belongs in this public reference.

The earlier platform integration published the prior design distribution and verified its checksums. This static upgrade must be pinned as a new artifact; do not claim it is live until the parent verifies the deployment. Keep the prior artifact available for rollback.

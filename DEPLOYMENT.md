# BotsFired design-system publication

This is the existing groverkunal/bots-fired-design-system repository. The production target already exists in the platform project: Firebase project `microblogger-agent-prod`, Hosting site `botsfired-design`. Do not deploy this build to the root BotsFired site.

Build with `npm ci && npm run build`. With an existing authorized Firebase identity, deploy only this site:

```
firebase deploy --project microblogger-agent-prod --config firebase.design.json --only hosting
```

The hub opens at `/` on design.botsfired.com and botsfired-design.web.app. Locally, use `/design-system`. All seven chapters have hash URLs. No sitemap is generated; robots and HTML/HTTP noindex directives are supplied. This is unlisted public content, not authenticated content.

The platform's existing continuous deployment currently generates its own design placeholder. Before using that workflow to publish this build, copy the immutable design distribution into a tracked platform artifact directory, then have apps/web/scripts/build.mjs replace only dist/design after its normal build. Preserve every other site's output. Alternatively deploy this repository's scoped config, and update the platform workflow to avoid overwriting that release. No platform production source was changed in this session.

The platform's October 11 deployment record proposes a DNS CNAME `design.botsfired.com` → `botsfired-design.web.app`. Re-read Firebase's live domain requirements and obtain approval before changing DNS. DNS and TLS have not been verified from this executor.

Verification in this session: Vite production build passes. Runtime and responsive results are recorded separately. Live deployment requires authorized Firebase access or integration into the existing platform workflow. No credentials were created and no DNS/access changes were made.

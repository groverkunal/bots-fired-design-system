# BotsFired design-system publication

This is the existing groverkunal/bots-fired-design-system repository. The production target already exists in the platform project: Firebase project `microblogger-agent-prod`, Hosting site `botsfired-design`. Do not deploy this build to the root BotsFired site.

Build with `npm ci && npm run build`. With an existing authorized Firebase identity, deploy only this site:

```
firebase deploy --project microblogger-agent-prod --config firebase.design.json --only hosting
```

The hub opens at `/` on design.botsfired.com and botsfired-design.web.app. Locally, use `/design-system`. All seven chapters have hash URLs. No sitemap is generated; robots and HTML/HTTP noindex directives are supplied. This is unlisted public content, not authenticated content.

The parent task reports that platform commit `c9f7ed12640e24aeaf75e1c5283dcb1e6da52c0e` durably integrated design commit `b7282a041cf91b7dad78319be1f173e77d28e4bb` and published it at https://botsfired-design.web.app, verifying all 53 prior file checksums. For subsequent releases, coordinate with the parent to update that pinned design artifact through the existing platform workflow. Do not deploy concurrently or replace other site outputs. This follow-up changes only the design repository; the parent owns publication and DNS coordination.

The platform's October 11 deployment record proposes a DNS CNAME `design.botsfired.com` → `botsfired-design.web.app`. Re-read Firebase's live domain requirements and obtain approval before changing DNS. DNS and TLS have not been verified from this executor.

Verification in this session: Vite production build passes. Runtime and responsive results are recorded separately. Live deployment requires authorized Firebase access or integration into the existing platform workflow. No credentials were created and no DNS/access changes were made.

# BotsFired design system

Static, unlisted brand documentation with focused interactive examples. Original BotsFired raster masters, navy/fire palette and self-hosted Barlow Condensed, Inter, Caveat and JetBrains Mono remain preserved.

## Run and validate

Requires Node 22.12 or newer.

```sh
npm ci
npm run dev
npm run test:tokens
npm run build
npx playwright install chromium
npm run test:browser
```

`npm run preview` serves the exact static distribution. `BF_CHROMIUM_PATH` may select an existing Chromium executable for browser tests. Astro telemetry is disabled in the project scripts.

## Documentation coverage

Overview; logos; typography; colour and token explorer; 13 component specifications; editorial templates; platform illustrations; application starters; asset library; governance; motion/iconography; interactive spec tools.

Core documents render as HTML without JavaScript. Existing React galleries hydrate only where used. Historical concept illustrations and all fictional personas, metrics, testimonials, affiliations, dates and events are labelled as placeholders. They are not evidence about BotsFired or a production UI contract. New deck, merchandise and call-background files are starters requiring production review.

## Tokens and contrast

`packages/tokens/source.json` is the authored DTCG source. It contains primitive, semantic and component tiers, plus dark-mode overrides. `scripts/build-tokens.mjs` generates CSS variables, legacy CSS aliases, the DTCG download, resolved JSON, TypeScript token names and a calculated normal-text contrast matrix. The deterministic generator validates the types and aliases used here; it is not a general-purpose DTCG schema validator.

Fire 500 remains `#E8541A`. Fire 600 remains the existing CSS value `#D03010`; the previous Heat 600 documentation value is retired. Normal-size action labels and kickers use contrast-verified semantic tokens. All ten listed light/dark semantic text pairs meet 4.5:1. Brand specimen colours and original files retain their original values. These pair checks do not certify every pixel of a legacy illustration.

Typed JSON consumers must migrate from the earlier CSS-key export to tiered paths or use `botsfired-tokens-resolved.json`. Other sites can adopt the pinned token artifact through their own reviewed changes; they were not changed here.

## Assets and provenance

The original primary and alternate PNGs are opaque and unchanged. An existing true-alpha primary cutout was recovered from the platform asset archive; its original SHA-256 matches the design repository's primary original. It is a raster derivative, not an official vector master. Existing SVG gallery illustrations use paths and live text but are not exact vector replacements for the raster masters. Call/merchandise SVGs contain an embedded raster mark. No new brand redraw, tracing or certified print-colour conversion was performed.

Canonical assets live under `/assets/`. The build avoids duplicate Gemini-named output. Executable Astro bootstraps are emitted as hashed local scripts for compatibility with the existing self-only script policy. Security headers, access settings and DNS remain unchanged.

## Verification and limits

CI runs typed-token/contrast checks, a static build and Playwright/axe checks. Browser tests cover responsive chapters, no-JavaScript reading, theme persistence, keyboard/dialog/form behavior, downloads, missing-file 404s, reduced motion and island hydration under the existing script policy. Axe assertions cover normative reference pages and explicitly exclude labelled legacy illustrations. Manual VoiceOver/TalkBack review remains a release requirement; automated checks are not accessibility certification.

See `docs/upgrade-checklist.md`, `CHANGELOG.md`, `VERIFICATION.md` and `DEPLOYMENT.md` for findings, migration, evidence and platform integration. This is an unpublished local preview version; no npm package, release tag, analytics or scheduled QA job is created.

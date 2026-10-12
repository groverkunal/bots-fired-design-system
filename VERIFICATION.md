# First upgrade release verification — 2026-10-12

The full 215-line attached plan was read and checked against source commit e157058cafb74480d54efefce795ae9cf2d38871. Findings, stale claims, alternatives and remaining work are tracked in docs/upgrade-checklist.md.

## Passed

- Static Astro production build: 14 HTML outputs; original PNG masters unchanged.
- Four meaningful token tests: typed values/alias resolution, preserved brand primitives, contrast calculation endpoints and no token/group property collision.
- 133 generated tokens and ten light/dark semantic normal-text pairs above 4.5:1.
- Twelve browser tests, including 108 chapter/viewport/mode checks (12 routes × three widths × three modes), no-JavaScript reading, preference persistence, navigation search, form validation, modal closing/focus restoration, toast behavior, reduced motion and downloads.
- Core reference-page axe checks found zero serious/critical violations in light, dark and high-contrast modes. Labelled legacy specimens are explicitly excluded; this is not a full-site WCAG certification.
- Local missing assets return 404. Library downloads have actual file content, not SPA fallback HTML. The editable standalone deck saves edits.
- Existing self-only script-policy simulation permits island hydration and dark-logo SVG export. Export controls remain disabled until hydration, preventing lost initial clicks.
- Original/high-contrast logo presentation remains preserved. Existing transparent raster derivative provenance verified by matching original SHA-256; no new brand geometry generated.
- Root documentation loads one 2,014-byte script (878 bytes gzip). No duplicate Gemini-named logo output. No Lighthouse or universal font-budget score is asserted.
- Dependency audit: zero vulnerabilities after replacing the plan's vulnerable Astro 5 with patched Astro 7.3.8 and React integration 7.0.1.

Screenshots were reviewed locally for the mobile overview and static documentation presentation. No screenshots were uploaded to Library.

## Publication gate and remaining work

Parent coordinates the pinned platform artifact, preserves existing headers/access, removes only the design site's blanket SPA rewrite, and verifies live routes/download MIME types/404s. Node >=22.12 is required for rebuilding. No deployment, DNS/account/security-policy change, analytics, package publishing or scheduled job was performed.

Approval-dependent vector-master redraw, perceptual palette changes and print certification remain deferred. Manual VoiceOver/TalkBack signoff and exhaustive legacy-illustration remediation are separate review work. Consumer sites must adopt the token export through their own reviewed changes.

# Bots Fired Design System

This repository contains the Bots Fired design system source code.

## Development

```bash
npm install
npm run build
```

Note: current build requires a valid Vite HTML entrypoint (`index.html`).

## GitHub Automation

GitHub Actions in this repo currently validate:
- dependency install integrity (`npm ci`)
- dependency security baseline (`npm audit --audit-level=high`)
- optional build execution when `index.html` exists

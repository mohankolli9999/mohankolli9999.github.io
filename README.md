# mohankolli.exe

Interactive terminal portfolio for Mohan Kolli — AI & Application Security Engineer.
A boot-up, a prompt, and commands you type (or tap) to explore the work: `whoami`,
`ls`, `open themis`, `resume`, `contact`.

Built with Next.js (App Router) + React, exported as a fully static site and deployed
to GitHub Pages at <https://mohankolli9999.github.io>. No server, no trackers.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build (static export)

```bash
npm run build      # outputs ./out
```

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the static export
and publishes it to GitHub Pages automatically.

## Content

All content lives in `lib/content.ts` (single source of truth). The resume PDF is in
`public/resume/`.

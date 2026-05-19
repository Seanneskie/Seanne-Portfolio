# Phase 0 Baseline — Next.js build

Captured on `refactor/astro-refactor` so we can compare the Astro build
against it in later phases. Numbers are from a clean `npm run build`
(`rm -rf out .next && npm run build`) on Windows / Node from `.nvmrc`.

## Build output sizes

| Metric | Value |
| --- | --- |
| Total `out/` | 105,745,689 B (~100.8 MiB) |
| `out/static/` (images, PDFs, etc.) | 13,997,021 B (~13.3 MiB) |
| `out/_next/` | 14,031,674 B (~13.4 MiB) |
| `out/_next/static/chunks/` | 2,538,379 B (~2.42 MiB) |
| HTML files in `out/` | 29 |
| JS chunks in `out/_next/static/chunks/` | 40 |

The bulk of `out/` is static assets under `out/static/` and the per-project
image folders (`out/<slug>/images/...`), not JS.

## Largest JS chunks (top 10)

```text
1,054,780  out/_next/static/chunks/949-d178101158c97d67.js
  189,786  out/_next/static/chunks/framework-1a308e28e19f1a97.js
  173,420  out/_next/static/chunks/493-86239ee748bdc2f6.js
  173,024  out/_next/static/chunks/4bd1b696-409494caf8c83275.js
  158,130  out/_next/static/chunks/b1644e8c-3b64b58b2fcfcf9b.js
  130,988  out/_next/static/chunks/main-4fcfc4b2c14431dd.js
  121,599  out/_next/static/chunks/924-a363623bd6325ba5.js
  112,594  out/_next/static/chunks/polyfills-42372ed130431b0a.js
   51,041  out/_next/static/chunks/993-9f2674b4f24c7982.js
   49,827  out/_next/static/chunks/460-ac411cde1e2c1b3a.js
```

The 1 MB `949-*.js` chunk dwarfs everything else and is a prime target for
removal/island-only loading after the Astro port.

## Per-route First Load JS (from `next build`)

| Route | Route JS | First Load JS |
| --- | --- | --- |
| `/` | 1.42 kB | **572 kB** |
| `/profile` | 701 B | 565 kB |
| `/profile/about-me` | 199 B | 565 kB |
| `/profile/my-story` | 199 B | 565 kB |
| `/certificates` | 5.82 kB | 193 kB |
| `/courses` | 6.12 kB | 188 kB |
| `/project-details/[slug]` | 8.11 kB | 175 kB |
| `/work-experiences` | 3.45 kB | 170 kB |
| `/projects` | 3.95 kB | 164 kB |
| `/awards` | 2.40 kB | 153 kB |
| `/contact` | 4.98 kB | 117 kB |
| `/_not-found` | 1.00 kB | 103 kB |
| `/robots.txt` | 128 B | 102 kB |
| `/sitemap.xml` | 128 B | 102 kB |
| **Shared** | — | 102 kB |

`/` and the `/profile/*` cluster are the heavy-JS routes (~565–572 kB First
Load). These are where the Astro migration should show the biggest win
because they're mostly presentational.

## Lighthouse

Not captured in this pass — no local Lighthouse run was performed. Plan: after
Phase 6 finishes, run Lighthouse against both `next start` output and
`astro preview` output, compare side-by-side.

## Toolchain status

| Check | Result |
| --- | --- |
| `npm run lint` | ✅ No ESLint warnings or errors |
| `npm test` (vitest run) | ✅ 28 files / 45 tests passing |
| `npm run build` | ✅ 33 static pages generated, exported to `out/` |

A `next lint is deprecated` notice appears — informational only, not a
failure. Multiple `package-lock.json` files exist in parent directories
producing a workspace-root warning; harmless for the baseline.

## GitHub Pages workflow

Single workflow file: [`.github/workflows/nextjs.yml`](../.github/workflows/nextjs.yml).
This is what we rewrite in Phase 7 to publish `dist/` instead of `out/`.

## How to reproduce

```powershell
Remove-Item -Recurse -Force out, .next -ErrorAction SilentlyContinue
npm run build
npx vitest run
npm run lint
```

Then re-run the size capture:

```powershell
# Total + key subtrees
(Get-ChildItem out -Recurse -File | Measure-Object -Property Length -Sum).Sum
(Get-ChildItem out/_next -Recurse -File | Measure-Object -Property Length -Sum).Sum
(Get-ChildItem out/_next/static/chunks -File | Measure-Object -Property Length -Sum).Sum

# HTML and JS chunk counts
(Get-ChildItem out -Recurse -File -Filter *.html).Count
(Get-ChildItem out/_next/static/chunks -File -Filter *.js).Count

# Largest chunks
Get-ChildItem out/_next/static/chunks -File -Filter *.js |
  Sort-Object Length -Descending | Select-Object -First 10 Length, Name
```

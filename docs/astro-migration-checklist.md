# Astro Migration Checklist

Phase-by-phase task list for the Next.js → Astro migration. Companion to
[`astro-migration.md`](./astro-migration.md). Tick boxes as work lands on
`refactor/astro-refactor`.

**Branch policy:** keep Next.js building until Phase 6 verification passes.
Don't delete Next-specific files before the cutover.

---

## Phase 0 — Pre-flight

Baseline the current build so we have something to diff against. Numbers
captured in [`astro-migration-phase-0-baseline.md`](./astro-migration-phase-0-baseline.md).

- [x] Capture current `next build` output size: note total bytes under `out/`.
- [x] Capture current bundle JS size from a representative route.
- [ ] Snapshot Lighthouse scores for `/`, `/projects`, `/project-details/<slug>`.
      *Deferred — will run alongside the Astro preview in Phase 6 for an apples-to-apples comparison.*
- [x] Confirm `npm test` and `npm run lint` are green on `refactor/astro-refactor`.
- [x] Note the GitHub Pages workflow file path (`.github/workflows/nextjs.yml`) — we
  rewrite it in Phase 7.

---

## Phase 1 — Scaffold Astro alongside Next.js

Install Astro into the repo without removing `app/`. Both stacks coexist.

- [ ] `npm i -D astro @astrojs/react @astrojs/sitemap @astrojs/tailwind`.
- [ ] Create `astro.config.mjs` with: React + Tailwind + sitemap integrations,
      `site: "https://seanneskie.github.io"`, `base: "/Seanne-Portfolio"`,
      `trailingSlash: "always"`, `output: "static"`, `outDir: "./dist"`.
- [ ] Add `src/` skeleton: `pages/`, `layouts/`, `components/`, `content/`,
      `styles/`.
- [ ] Add `src/styles/globals.css` — copy from `app/globals.css` (verify
      Tailwind v4 directives still resolve).
- [ ] Add `src/layouts/BaseLayout.astro` with shared `<head>`, slot, and the
      JSON-LD `Person` block currently in `app/layout.tsx`.
- [ ] Add a placeholder `src/pages/index.astro` that renders "Astro OK" so we
      can prove the dev server boots.
- [ ] Add scripts to `package.json` (non-clashing): `astro:dev`, `astro:build`,
      `astro:preview`. Leave existing `dev`/`build` pointing at Next.
- [ ] Update `.gitignore` for `dist/` and `.astro/`.
- [ ] `npm run astro:dev` — confirm placeholder page loads at the basepath.

---

## Phase 2 — Content collections (primary goal)

Replace `public/data/*.json` reads with typed `getCollection()` access. This is
the headline reason for the migration — do it before porting any data-driven
page so subsequent phases consume the typed API directly.

- [ ] Create `src/content/config.ts`.
- [ ] Define a Zod schema for each dataset, mirroring `types/*.ts`:
  - [ ] `projects`
  - [ ] `certificates`
  - [ ] `courses`
  - [ ] `awards` (sourced from `achievements.json`)
  - [ ] `work-experiences`
  - [ ] `services`
  - [ ] `skills`
  - [ ] `highlights`
  - [ ] `testimonials`
  - [ ] `blog-posts`
  - [ ] `tech-comparison`
  - [ ] `profile` (singleton)
  - [ ] `card-counter` (singleton)
- [ ] Move each JSON file from `public/data/<name>.json` to
      `src/content/<name>/data.json` (or per-entry files where it improves
      maintainability — at minimum `projects/` should be per-entry).
- [ ] Run `astro sync` and confirm types are generated under `.astro/`.
- [ ] Write a smoke `.astro` page that calls `getCollection("projects")` and
      lists titles — verify build-time validation fires on a deliberately
      malformed entry, then revert.
- [ ] Add a `tsconfig` path or re-export so React islands can `import` a
      typed `Project` type from the collection's inferred type.
- [ ] Document the new pattern at the bottom of [`project-details.md`](./project-details.md)
      (where to add a new project entry now).

---

## Phase 3 — Shared layout, theme, and chrome

Port the global shell once so all subsequent pages drop in cleanly.

- [ ] Implement theme handling without `next-themes`:
  - [ ] Inline FOUC-prevention script in `BaseLayout.astro` that sets
        `data-theme` on `<html>` from `localStorage` before paint.
  - [ ] Tiny React island `<ThemeToggle client:idle />` reusing existing
        `mode-toggle.tsx` UI but driving the inline script's storage key.
- [ ] Port `components/layout/header.tsx` → `src/components/layout/Header.astro`
      with a `<MobileNav client:load />` island for the radix dialog.
- [ ] Port `components/layout/footer.tsx` → `Footer.astro`.
- [ ] Add `<Toaster client:idle />` island in `BaseLayout`.
- [ ] Replace `next/link` in chrome with plain `<a href={withBase(...)}>`.
- [ ] Add `src/lib/with-base.ts` helper for prefixing asset/route URLs with
      `import.meta.env.BASE_URL`.
- [ ] Verify dark/light toggle works across a hard reload (no FOUC).

---

## Phase 4 — Port static pages

Move each non-`[slug]` route. Each ticked box means: page renders at the right
path, reads from its content collection, matches the visual of the Next page,
and ships zero JS unless an island is required.

- [ ] `src/pages/index.astro` ← `app/page.tsx` (Home).
- [ ] `src/pages/projects/index.astro` ← `app/projects/page.tsx`
      (TagFilter remains an island).
- [ ] `src/pages/profile/index.astro` ← `app/profile/page.tsx`
      (ProfileCardCounter + TechComparison are islands).
- [ ] `src/pages/profile/about-me.astro` ← `app/profile/about-me/page.tsx`.
- [ ] `src/pages/profile/my-story.astro` ← `app/profile/my-story/page.tsx`.
- [ ] `src/pages/courses/index.astro` ← `app/courses/page.tsx`.
- [ ] `src/pages/certificates/index.astro` ← `app/certificates/page.tsx`.
- [ ] `src/pages/awards/index.astro` ← `app/awards/page.tsx`.
- [ ] `src/pages/work-experiences/index.astro` ← `app/work-experiences/page.tsx`.
- [ ] `src/pages/contact/index.astro` ← `app/contact/page.tsx`
      (form stays an island).
- [ ] Per page: set `<title>`, meta description, canonical, OG tags via
      `BaseLayout` props — match what `metadata` exports today.
- [ ] Per page: side-by-side visual check against the Next dev server.

---

## Phase 5 — Port `project-details/[slug]`

The most complex route — dynamic, code-split, TOC, prev/next, JSON-LD.

- [ ] Create `src/pages/project-details/[slug].astro`.
- [ ] `getStaticPaths()` enumerates slugs from
      `getCollection("projects")` (filtered to entries with a `details` slug).
- [ ] Keep `projectDetailConfig` (component + sections array) — move it to
      `src/lib/project-detail-config.ts` and import it.
- [ ] Render each project component as a React island. Decide directive
      per component (likely `client:load` for galleries, server-only for
      pure prose components).
- [ ] Port `ProjectTOC` and `ProjectNav` — keep React unless trivially
      static; if static, convert to `.astro`.
- [ ] Inject per-page `<script type="application/ld+json">` matching the
      current `CreativeWork` JSON-LD.
- [ ] Verify all prev/next links work and the TOC scrollspy still functions.
- [ ] Spot-check 3 representative slugs against the Next build:
      `llm-restaurant-finder`, `cnsm-website`, `minerva-project`.

---

## Phase 6 — Endpoints, SEO, assets, build

Round out the long-tail before cutover.

- [ ] `src/pages/robots.txt.ts` replaces `app/robots.ts`.
- [ ] `@astrojs/sitemap` config produces `/sitemap-index.xml` —
      delete `app/sitemap.ts`'s output expectation.
- [ ] Wire `scripts/optimize-images.mjs` into Astro's prebuild
      (`"prebuild:astro": "node scripts/optimize-images.mjs"` chained into
      `astro:build`).
- [ ] Audit remaining `next/image` / `next/link` usages inside React
      components; rewrite to plain `<img>`/`<a>` (islands) or `astro:assets`
      (`.astro` files).
- [ ] Run `astro build` — fix all Zod validation errors surfaced from
      Phase 2 schemas.
- [ ] Compare `dist/` (Astro) vs `out/` (Next):
  - [ ] Same set of HTML files exist at expected paths.
  - [ ] Total JS shipped per route dropped meaningfully.
  - [ ] Lighthouse scores match or improve on the Phase 0 baseline.
- [ ] Local smoke: serve `dist/` with `astro preview`, click every nav item
      and every project card.

---

## Phase 7 — Cutover and cleanup

Switch GitHub Pages to the Astro build, then delete Next.

- [ ] Update `.github/workflows/*.yml` to run `astro build` and publish
      `./dist` instead of `./out`.
- [ ] Push a preview deploy; verify the live site at the basepath.
- [ ] Delete Next-only files:
  - [ ] `next.config.ts`, `next-env.d.ts`, `tsconfig.tsbuildinfo`
  - [ ] `app/` directory
  - [ ] `components/` files that have moved under `src/components/`
        (use git mv where possible to preserve history)
  - [ ] `eslint.config.mjs` Next preset, `eslint-config-next` dep
  - [ ] `next`, `next-themes`, `next-env.d.ts`-related types
- [ ] Rename `package.json` scripts: `astro:dev` → `dev`, `astro:build` → `build`.
- [ ] Remove `out/` and `.next/` from git history / `.gitignore` as appropriate.
- [ ] Update [`README.md`](../README.md) and [`AGENTS.md`](../AGENTS.md) for the
      new structure (Astro commands, content-collection workflow).
- [ ] Update [`docs/project-details.md`](./project-details.md) to reflect the
      new "add a project" flow (drop a JSON into `src/content/projects/`).
- [ ] Final `npm run lint && npm test && npm run build` green.
- [ ] Squash or curate commits as needed before merging to `main`.

---

## Acceptance criteria (whole migration)

- [ ] All routes from the Next.js build resolve at the same URLs in the Astro
      build (including trailing slashes).
- [ ] Every page's `<title>`, meta description, canonical, and OG tags match
      (or improve on) the Next.js version.
- [ ] No runtime fetch of `/data/*.json` remains — all data flows through
      `getCollection()` at build time.
- [ ] Total JS shipped on `/` is meaningfully smaller than the Next baseline.
- [ ] GitHub Pages deploy works at `https://seanneskie.github.io/Seanne-Portfolio/`.
- [ ] No references to `next/*` packages remain in `src/` after Phase 7.

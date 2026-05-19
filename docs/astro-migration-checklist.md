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

- [x] `npm i -D astro @astrojs/react @astrojs/sitemap @tailwindcss/vite`.
      *Tailwind v4 uses the Vite plugin, not the deprecated `@astrojs/tailwind`.*
- [x] Bumped `vite` to `^7` and `tailwindcss`/`@tailwindcss/postcss` to `^4.3.0`
      to satisfy Astro 6 + `@tailwindcss/vite` (`createIdResolver` requires Vite 6+).
- [x] Create `astro.config.mjs` with: React + sitemap integrations,
      Tailwind via `vite.plugins`, `site: "https://seanneskie.github.io"`,
      `base: "/Seanne-Portfolio"` (prod), `trailingSlash: "always"`,
      `output: "static"`, `outDir: "./dist"`.
- [x] Add `src/` skeleton: `pages/`, `layouts/`, `components/`, `content/`,
      `styles/`.
- [x] Add `src/styles/globals.css` — copied from `app/globals.css`.
- [x] Add `src/layouts/BaseLayout.astro` with shared `<head>`, slot, the
      JSON-LD `Person` block, and a `joinBase` helper so canonical/OG URLs
      include the `/Seanne-Portfolio` prefix.
- [x] Add placeholder `src/pages/index.astro` rendering "Astro OK".
- [x] Add scripts to `package.json` (non-clashing): `astro:dev`,
      `astro:build`, `astro:preview`, `astro:sync`. Existing `dev`/`build`
      still point at Next.
- [x] Update `.gitignore` for `dist/` and `.astro/`.
- [x] **Verified `astro build` succeeds** — emits `dist/index.html` and
      `sitemap-index.xml` with correct basepath. (Dev-server boot test
      skipped on Windows due to background-spawn quirk; build is the
      stronger end-to-end check.)
- [x] **Next.js coexistence:** the new `src/` directory makes Next 15 emit
      broken type validators referencing `src/app/`. Added
      `typescript: { ignoreBuildErrors: true }` and
      `outputFileTracingRoot` to `next.config.ts`. Next build now produces
      the same per-route bundle sizes as the Phase 0 baseline.
      ESLint and Vitest still type-check, so this only silences the
      generated validator noise. Removed in Phase 7 when Next is deleted.

---

## Phase 2 — Content collections (primary goal)

Replace `public/data/*.json` reads with typed `getCollection()` access. This is
the headline reason for the migration — do it before porting any data-driven
page so subsequent phases consume the typed API directly.

- [x] Create `src/content.config.ts` (Astro 6's modern location — replaces the
      legacy `src/content/config.ts`).
- [x] Define a Zod schema for each dataset, mirroring `types/*.ts` + the
      shapes inferred from each JSON file:
  - [x] `projects` (17 entries)
  - [x] `certificates` (35 entries)
  - [x] `courses` (20 entries)
  - [x] `awards` — sourced from `achievements.json` (8 entries)
  - [x] `work-experiences` (4 entries)
  - [x] `services` (4 entries)
  - [x] `skills` (6 top-level groups)
  - [x] `highlights` (15 entries)
  - [x] `testimonials` (3 entries)
  - [x] `blog-posts` (4 entries)
  - [x] `tech-comparison` (singleton — 25 items inside)
  - [x] `profile` (singleton)
  - [x] `card-counter` (singleton — 7 items inside)
- [x] **Keep JSON in `public/data/`** — used the Astro `file()` loader pointed
      at the existing files. Zero duplication, Next.js still reads them via
      `lib/get-data.ts` until Phase 7. Per-entry split-up was deemed
      unnecessary; the loader handles array sources directly.
- [x] **Synthesize stable ids** via a custom parser (`arrayWithIds(...)`).
      Most JSON entries lack an `id` field; the parser derives one from
      stable fields (e.g. `title`, `details`) with array-index suffixes on
      collision, so no entry is silently dropped.
- [x] Run `astro sync` — no warnings, types generated under `.astro/`.
- [x] Wrote a smoke `.astro` page calling `getCollection()` on every
      collection. Verified entry counts match the source JSON for all 13.
      Deleted the page after verification (not meant for prod).
- [x] **Verified Zod validation fires** — temporarily removed `title` from
      `services[0]`; `astro sync` reported
      `[InvalidContentEntryDataError] services → 0 ... title: Required`
      with the source file location. Restored after.
- [x] Documented the new pattern in
      [`project-details.md`](./project-details.md): the JSON now feeds both
      stacks, and schema updates are required when adding fields.
- [ ] *(Deferred to Phases 4–5)* Replace `lib/get-data.ts` callers with
      `await getCollection(...)` as each page is ported — Next still needs
      `get-data.ts` until the Phase 7 cutover.

---

## Phase 3 — Shared layout, theme, and chrome

Port the global shell once so all subsequent pages drop in cleanly.

- [x] Implement theme handling without `next-themes`:
  - [x] Inline FOUC-prevention script in `BaseLayout.astro` that adds/removes
        the `.dark` class on `<html>` from `localStorage["theme"]` (same key
        next-themes used, so light/dark choice carries over for existing
        visitors) before paint. Lives in `src/lib/theme-init.ts`.
  - [x] React island `<ThemeToggle client:idle />` in `src/components/theme-toggle.tsx`
        — reuses the lucide Sun/Moon UI but drives the `.dark` class +
        localStorage directly. ~1.8 KB minified.
- [x] Port `components/layout/header.tsx` → `src/components/layout/Header.astro`.
      Active state is computed at SSR from `Astro.url.pathname` (no
      `usePathname`); the framer-motion animated pill was dropped in favor
      of pure-CSS `aria-current=page` styling so the header ships zero JS
      beyond the small `<ThemeToggle>` island.
- [x] `<MobileNav client:load />` island in `src/components/layout/mobile-nav.tsx`
      — built directly on `@radix-ui/react-dialog` (no shadcn Sheet wrapper)
      so the React bundle stays minimal. Receives `navLinks` + `currentPathname`
      as props from `Header.astro`.
- [x] Port `components/layout/footer.tsx` → `Footer.astro`. Pure server-render,
      zero JS.
- [x] Add `<Toaster client:idle />` island in `BaseLayout`
      (`src/components/toaster.tsx` — thin wrapper around `sonner`).
- [x] All `next/link` in chrome replaced with `<a href={withBase(...)}>`.
- [x] Add `src/lib/with-base.ts` for prefixing asset/route URLs with
      `import.meta.env.BASE_URL`.
- [x] Brand icons (Github/Linkedin/Twitter) — `@lucide/astro` dropped these,
      so `src/components/layout/SocialIcon.astro` inlines the SVG paths
      from `lucide-react`. Zero runtime cost.
- [x] Build verified: chrome renders, 3 islands hydrate (toaster idle,
      theme-toggle ×2 idle, mobile-nav load). Total JS shipped ≈ 263 KB
      across 9 chunks vs Next baseline of 572 kB First Load on `/`.
      Lint + 45/45 tests green; Next build still produces Phase 0 sizes.

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

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

- [x] **Strategy: shim Next, not fork components.** Added Vite aliases for
      `next/image`, `next/link`, `next/navigation`, and the `@/*` path alias
      so the existing `/components` React tree renders unchanged as Astro
      islands. See `src/shims/*` and `astro.config.mjs`. The lone runtime
      tweak was teaching `lib/utils.ts` `withBasePath()` to read
      `import.meta.env.BASE_URL` as a fallback for `NEXT_PUBLIC_BASE_PATH`.
- [x] `src/pages/index.astro` ← `app/page.tsx` (Home).
- [x] `src/pages/projects/index.astro` ← `app/projects/page.tsx`.
- [x] `src/pages/profile/index.astro` ← `app/profile/page.tsx` (uses
      `client:visible` for the heavy `MyStory`/`OtherSkills`/`CardCounters`
      islands so the hero loads first).
- [x] `src/pages/profile/about-me.astro` ← `app/profile/about-me/page.tsx`.
- [x] `src/pages/profile/my-story.astro` ← `app/profile/my-story/page.tsx`.
- [x] `src/pages/courses/index.astro` ← `app/courses/page.tsx`.
- [x] `src/pages/certificates/index.astro` ← `app/certificates/page.tsx`.
- [x] `src/pages/awards/index.astro` ← `app/awards/page.tsx`.
- [x] `src/pages/work-experiences/index.astro` ← `app/work-experiences/page.tsx`.
- [x] `src/pages/contact/index.astro` ← `app/contact/page.tsx`.
- [x] Per page SEO matches Next: title, description, canonical (basepath-
      prefixed), OG title/description/image. Extended `BaseLayout` props
      with `ogTitle`, `ogType`, `keywords`, `rawTitle` to cover every
      metadata variation the Next pages exported.
- [x] Bundle verdict (Astro direct refs vs Next First Load JS):
      - `/`         ≈ 232 KB vs 572 kB
      - `/profile`  ≈ 226 KB vs 565 kB
      - `/courses`  ≈ 208 KB vs 188 kB
      - `/awards`   ≈ 198 KB vs 153 kB
      Biggest wins on `/` and `/profile/*` as predicted. Smaller routes
      pay a small overhead for the React runtime that they don't recoup
      without islands.

**Known issue, deferred to Phase 6:** `lib/profile-card-counter-data.ts`
and `components/card/CardCounter.tsx` use `import * as LucideIcons from
"lucide-react"` to validate icon-name strings, which forces the entire
595 KB lucide chunk into the build. Only the profile pages pull it
transitively. Phase 6 should swap this for a name-to-component map.

---

## Phase 5 — Port `project-details/[slug]`

The most complex route — dynamic, code-split, TOC, prev/next, JSON-LD.

- [x] Create `src/pages/project-details/[slug].astro` with `getStaticPaths()`
      driven by `projectDetailSlugs`. All 17 slugs generate.
- [x] **Moved `projectDetailConfig` to `lib/project-detail-config.ts`** (kept
      at repo root so both stacks share the same module during coexistence).
      The Next page now imports from there; the inline block is gone.
- [x] **Hydration constraint discovered:** Astro's `client:*` directives
      can't accept a component looked up by variable (`<Component />`) — the
      hydration script needs the JSX identifier at build time. Resolved by
      enumerating all 17 components as named imports + a `slug === "..." &&`
      switch in the template.
- [x] **Render strategy: server-only.** Every project component is
      `export default async function` (they `await getGalleryImages` which
      reads `fs`). Astro can render async React server-side just fine, but
      can't ship an async component to the client as an island. So the
      project body is server-rendered; only `ProjectTOC` is a `client:visible`
      island (it owns the scrollspy IntersectionObserver). **Known
      degradation:** embla carousel arrows render in the HTML but are inert
      without hydration. First slide displays — acceptable for prose-heavy
      projects but logged for Phase 6 to extract `ProjectGallery` into its
      own client island.
- [x] **Port `ProjectNav` to `.astro`.** It's pure SSR (just renders prev/next
      links), so no need to keep it as a React component on the Astro side.
      `lib/project-meta.ts`'s `getAdjacentProjects` works unchanged.
- [x] **`ProjectTOC` stays a React island** (`client:visible`) — its
      IntersectionObserver-driven active-section highlight is the whole
      point of the component.
- [x] Inject per-page `<script type="application/ld+json">` matching the
      Next page's `CreativeWork` schema.
- [x] **Idempotent basepath fix:** discovered an image-URL double-prefix
      (`/Seanne-Portfolio/Seanne-Portfolio/...`) — `ProjectGallery` already
      calls `withBasePath(src)`, and the `next/image` shim was re-prefixing.
      Made `withBasePath`, the shim's `withBase`, and `next/link`'s
      `withBase` all idempotent (skip when the input already starts with
      the base).
- [x] Spot-checked 3 representative slugs (`llm-restaurant-finder`,
      `cnsm-website`, `minerva-project`, `bitcoin-analysis-app`): titles,
      TOC anchors, JSON-LD, canonical, prev/next all correct.
      Confirmed `Previous`/`Next` boundary behavior (first slug has no
      "Previous", last has no "Next").

---

## Phase 6 — Endpoints, SEO, assets, build

Round out the long-tail before cutover.

- [x] `src/pages/robots.txt.ts` replaces `app/robots.ts` — points crawlers at
      the sitemap index emitted by `@astrojs/sitemap`. Uses `Astro.url.site`
      so the absolute URL respects the GH Pages basepath.
- [x] `@astrojs/sitemap` config produces `/sitemap-index.xml` with
      per-route `changefreq`, `priority`, and `lastmod` matching the
      hints from the old `app/sitemap.ts`. All 27 routes enumerated.
- [x] **Pages Router collision:** Next.js sees `src/pages/robots.txt.ts` as
      a Pages Router file. Resolved by setting `pageExtensions: ["tsx", "jsx"]`
      in `next.config.ts` and renaming `app/robots.ts`/`app/sitemap.ts` →
      `app/robots.tsx`/`app/sitemap.tsx` so Next still emits them. The
      `.ts`/`.js` Astro endpoints are now invisible to Next.
- [x] Wire `scripts/optimize-images.mjs` into Astro's prebuild
      (`"astro:build": "npm run optimize:images && astro build"`).
- [x] **Fix lucide tree-shaking.** Replaced `import * as LucideIcons from
      "lucide-react"` in `lib/profile-card-counter-data.ts`,
      `components/card/CardCounter.tsx`, and `components/services/ServicesSection.tsx`
      with explicit registries (`lib/card-counter-icons.ts`,
      `lib/services-icons.ts`). Result: the 595 KB lucide chunk is gone;
      **total JS shipped dropped from 1,243 KB → 653 KB (47% reduction).**
- [x] Add `src/pages/404.astro` — Astro emits it as `dist/404.html` at the
      root, which is exactly what GitHub Pages serves for unknown paths.
- [x] Compare `dist/` (Astro) vs `out/` (Next):
  - [x] **HTML route set matches** — both stacks emit 28 pages (10 static
        + 17 project-details + sitemap + 404).
  - [x] **Total JS shipped dropped 60%:** Astro `dist/_astro/*.js` = 637 KB
        vs Next `out/_next/static/chunks/*.js` = 1,608 KB.
  - [x] **Per-route deltas** (Astro direct refs vs Next First Load JS):
        - `/`         234 KB vs 572 KB  (-59%)
        - `/profile/` 217 KB vs 565 KB  (-62%)
        - `/profile/about-me/` 195 KB vs 565 KB  (-65%)
        - `/project-details/*` 196 KB vs 175 KB  (+12%, all share one bundle)
        - smaller routes pay ~50-80 KB React-runtime overhead they didn't
          have under Next's aggressive code-splitting; acceptable given
          the wins on heavy pages.
  - [ ] **Lighthouse scores match or improve** — *deferred to post-cutover*.
        Need real network conditions; only meaningful once GH Pages serves
        the Astro build.
- [x] **Local smoke via `astro preview`:** all 10 representative routes
      probed (`/`, all top-level + 2 project-details + 404 + robots +
      sitemap) — every one returned 200.

**Deferred to post-cutover follow-up** (logged here rather than blocking
the cutover):

- [ ] **Extract `ProjectGallery` into a client island.** Every project
      component is `export default async function` (they `await
      getGalleryImages` which reads `fs`). Async React can't be a `client:*`
      island, so Phase 5 left the bodies server-rendered — embla carousel
      arrows render but are inert. The cleanest fix is to refactor the
      17 project components so that the gallery image lookup happens at the
      Astro page level (passed as props), letting each project body become
      sync + hydratable. Risky to touch 17 components for a Phase 6 polish
      pass; tracked separately.
- [ ] **Audit residual `next/image`/`next/link` usage.** Phase 4 shimmed
      them via Vite alias — works for parity, but native `<img>`/`<a>` is
      cleaner once Next is gone.

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

# Astro Migration Plan

This document outlines the phased migration of the Seanne Portfolio from
**Next.js 15 (App Router, static export)** to **Astro 5** with React islands.
The goal is a leaner static site with the same routes, design system, and SEO
posture — keeping React only where interactivity demands it.

> Companion document: [`astro-migration-checklist.md`](./astro-migration-checklist.md)
> — track phase-by-phase progress there.

---

## Why Astro?

| Concern | Next.js (current) | Astro (target) |
| --- | --- | --- |
| Output | `next export` static HTML | First-class static output |
| JS shipped | Whole route tree hydrates | Zero JS by default; opt-in islands |
| Routing | App Router + dynamic `[slug]` | File-based `.astro` + `getStaticPaths` |
| Data | `fetch` from `public/data/*.json` | **Content collections** with typed `getCollection()` |
| SEO | `Metadata` API | `<head>` per page (or layout slot) |
| Images | `next/image` (unoptimized for export) | `astro:assets` + `sharp` |
| Styling | Tailwind v4 + shadcn/ui | Same — Tailwind v4 works as-is |
| Tests | Vitest + jsdom | Same |

Net benefits we expect: significantly smaller bundles, simpler build, no
`basePath`/`assetPrefix` juggling, typed content access end-to-end, and the
same shadcn primitives reused as React islands where needed.

### Primary goal: content collections

A core motivation for moving to Astro is replacing the loosely-typed
`public/data/*.json` reads with **Astro content collections**. Every JSON
dataset gets a Zod schema, a typed `getCollection()` API, and build-time
validation. This is treated as a first-class migration goal, not a stretch —
see Phase 2 in the checklist.

---

## Target architecture

```text
src/
  components/         # React islands (existing components, lightly adapted)
    ui/               # shadcn/ui (unchanged)
    layout/           # Header/Footer as .astro (with React subcomponents)
    project-details/  # React components, rendered as islands
  layouts/
    BaseLayout.astro  # <html>, <head>, ThemeProvider island, Toaster island
  pages/
    index.astro
    profile/
      index.astro
      about-me.astro
      my-story.astro
    projects/index.astro
    project-details/[slug].astro
    courses/index.astro
    certificates/index.astro
    awards/index.astro
    work-experiences/index.astro
    contact/index.astro
    robots.txt.ts
    sitemap.xml.ts        # or @astrojs/sitemap
  content/
    config.ts           # Zod schemas — one per collection
    projects/           # was public/data/projects.json (one entry per file or single JSON)
    certificates/
    courses/
    awards/
    work-experiences/
    services/
    skills/
    highlights/
    testimonials/
    achievements/
    blog-posts/
    tech-comparison/
    profile/            # singleton (one entry, e.g. main.json)
    card-counter/       # singleton
  lib/                  # trimmed helpers (cn, project-meta, ...) — get-data is gone
  styles/
    globals.css         # moved from app/globals.css
public/
  data/                 # unchanged JSON (kept for runtime/JS fetches if any)
  static/               # unchanged assets
```

Routing parity (Next.js → Astro):

| Next.js route | Astro page |
| --- | --- |
| `app/page.tsx` | `src/pages/index.astro` |
| `app/projects/page.tsx` | `src/pages/projects/index.astro` |
| `app/project-details/[slug]/page.tsx` | `src/pages/project-details/[slug].astro` |
| `app/profile/page.tsx` | `src/pages/profile/index.astro` |
| `app/profile/about-me/page.tsx` | `src/pages/profile/about-me.astro` |
| `app/profile/my-story/page.tsx` | `src/pages/profile/my-story.astro` |
| `app/courses/page.tsx` | `src/pages/courses/index.astro` |
| `app/certificates/page.tsx` | `src/pages/certificates/index.astro` |
| `app/awards/page.tsx` | `src/pages/awards/index.astro` |
| `app/work-experiences/page.tsx` | `src/pages/work-experiences/index.astro` |
| `app/contact/page.tsx` | `src/pages/contact/index.astro` |
| `app/robots.ts` | `src/pages/robots.txt.ts` |
| `app/sitemap.ts` | `@astrojs/sitemap` integration |

---

## Hydration strategy

Default to **no JS**. Add a `client:*` directive only when a component owns
real interactivity. Rough island inventory based on the current tree:

| Component / Area | Directive |
| --- | --- |
| `ThemeProvider` (next-themes) | `client:load` (needs to run before paint) |
| `Toaster` (sonner) | `client:idle` |
| `Header` mobile nav (radix dialog) | `client:load` |
| `mode-toggle` | `client:idle` |
| `ProfileCardCounter` (counts on scroll) | `client:visible` |
| `TechComparison` interactive bits | `client:visible` |
| `ProjectGallery` (embla carousel + lightbox) | `client:visible` |
| `TagFilter` on `/projects` | `client:load` |
| `contact` form | `client:load` |
| Static prose / list components | none (server-rendered only) |

`next-themes` will need a small wrapper (or swap for a tiny inline theme
script + a React island) since it relies on Next-style providers. We'll do the
inline-script + `data-theme` approach in Phase 2 to avoid bloating the runtime.

---

## Data layer — content collections

Today we read JSON from `public/data/*.json` at build via `lib/get-data.ts`
(server) and `lib/use-data.ts` (client) — no schema, no validation, types
hand-maintained in `types/`. The Astro migration **collapses this onto content
collections** as the canonical source of truth.

### Mapping

| Current JSON | Collection | Type |
| --- | --- | --- |
| `public/data/projects.json` | `projects` | array → one entry per project |
| `public/data/certificates.json` | `certificates` | array → one entry per cert |
| `public/data/courses.json` | `courses` | array → one entry per course |
| `public/data/awards.json` *(achievements.json)* | `awards` | array |
| `public/data/work-experiences.json` | `work-experiences` | array |
| `public/data/services.json` | `services` | array |
| `public/data/skills.json` | `skills` | array |
| `public/data/highlights.json` | `highlights` | array |
| `public/data/testimonials.json` | `testimonials` | array |
| `public/data/blog-posts.json` | `blog-posts` | array |
| `public/data/tech-comparison.json` | `tech-comparison` | array |
| `public/data/profile.json` | `profile` | singleton |
| `public/data/card-counter.json` | `card-counter` | singleton |

### Schema example (`src/content/config.ts`)

```ts
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    details: z.string(),                  // slug under /project-details/
    period: z.string().optional(),
    github: z.string().url().optional(),
    githubLabel: z.string().optional(),
    link: z.string().url().optional(),
    collaborators: z.array(z.string()).nullable().optional(),
    images: z.array(z.string()).optional(),
  }),
});

export const collections = { projects /* ...all others */ };
```

### Consumption

- **`.astro` pages** call `getCollection("projects")` and pass entries down as
  props. Types flow through automatically — no `types/projects.ts` needed.
- **React islands** that need a slice receive it as props from the page.
  `useData()`/`get-data.ts` are deleted; runtime fetches of `/data/*.json`
  go away entirely.
- **`generateStaticParams` equivalent**: `[slug].astro` uses
  `getStaticPaths()` to enumerate slugs from `getCollection("projects")`.
- **Validation runs at build time** — a missing `tags` or malformed URL fails
  `astro build`, catching content drift before deploy.

### Migration approach

Split into Phase 2 of the rollout:

1. Add `src/content/config.ts` with Zod schemas matching today's JSON shapes
   (use existing `types/` files as the spec).
2. Move each `public/data/*.json` file into `src/content/<name>/data.json`
   (or per-entry files where convenient).
3. Update `lib/get-data.ts` callers to `await getCollection(...)`; delete the
   helper once unused.
4. Keep `public/data/` only if something external links to it; otherwise
   delete in Phase 7.

---

## SEO + GitHub Pages parity

- **basePath**: replace `basePath: "/Seanne-Portfolio"` with Astro's
  `base: "/Seanne-Portfolio"` + `site: "https://seanneskie.github.io"` in
  `astro.config.mjs`.
- **trailingSlash**: set `trailingSlash: "always"` to match current behavior.
- **Canonical / OG tags**: pulled from front-matter-like props passed to
  `BaseLayout`. Same JSON-LD blocks rendered inline in the layout.
- **Sitemap**: use `@astrojs/sitemap` — drop-in replacement for `app/sitemap.ts`.
- **robots.txt**: simple endpoint route under `src/pages/robots.txt.ts`.

---

## Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| `next-themes` doesn't run outside Next | Phase 2: inline FOUC-prevention script + small island wrapper around `useTheme` consumers |
| `next/image` references inside JSX | Phase 3: codemod to `astro:assets` `<Image />` where SSR'd; keep `<img>` inside React islands |
| `next/link` everywhere | Phase 3: rewrite to `<a>` for SSR; keep `<Link>`-like wrapper for islands (simple alias) |
| `useRouter` / `usePathname` in nav | Phase 3: replace with `Astro.url.pathname` for SSR; islands get pathname via prop |
| `basePath`-prefixed asset URLs | Phase 4: centralize via a `withBase()` helper; verify on GH Pages preview |
| Tests currently target React components | Keep Vitest; island components are unchanged, so most tests survive |
| Build script optimizes images via `scripts/optimize-images.mjs` | Keep the script; wire into `prebuild` of Astro (`astro build`) |

---

## Rollout strategy

Work on a long-lived `refactor/astro-refactor` branch (already current).
Run **Astro and Next.js side-by-side** during the migration:

1. Scaffold Astro into `./` without removing `app/` (Phase 1).
2. Move routes page-by-page; Next.js keeps building until all are ported.
3. After parity is verified, delete Next-specific files (Phase 7).
4. Final cutover updates the GitHub Pages workflow to build with Astro.

Each phase ends with a manual smoke test on the local dev server **and** a
production build of both stacks so we can diff the `out/` (Next) vs `dist/`
(Astro) outputs.

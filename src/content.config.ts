import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

/**
 * Content collections — typed mirror of the legacy `public/data/*.json` files.
 *
 * Each collection uses the `file()` loader so a single JSON file (array OR
 * singleton object) becomes one collection. Schemas are validated at build
 * time — malformed data fails `astro build` before deploy.
 *
 * Routes consume these via `await getCollection("<name>")`. Singletons
 * (`profile`, `card-counter`, `tech-comparison`) get a synthetic `id` so the
 * loader can index them.
 */

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const slugify = (input: string): string =>
  input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

// Synthesizes a unique `id` for each entry of an array-shaped JSON file.
// The file loader requires unique ids; deriving from a stable field keeps
// slugs deterministic, and we suffix the array index on collision so no
// entry is silently dropped if two share the same title/label.
const arrayWithIds =
  (...fields: string[]) =>
  (text: string): Record<string, unknown>[] => {
    const parsed = JSON.parse(text) as Record<string, unknown>[];
    const seen = new Map<string, number>();
    return parsed.map((entry, index) => {
      if (entry && typeof entry === "object" && "id" in entry) return entry;
      const base = fields
        .map((f) => entry?.[f])
        .find((v): v is string => typeof v === "string" && v.length > 0);
      const candidate = base ? slugify(base) : String(index);
      const dupes = seen.get(candidate) ?? 0;
      seen.set(candidate, dupes + 1);
      const id = dupes === 0 ? candidate : `${candidate}-${index}`;
      return { id, ...entry };
    });
  };

// Wraps a singleton JSON object into a single-entry array for the file loader.
const singleton =
  (id: string) =>
  (text: string): Record<string, unknown>[] => {
    const parsed = JSON.parse(text) as Record<string, unknown>;
    return [{ id, ...parsed }];
  };

// -----------------------------------------------------------------------------
// Schemas
// -----------------------------------------------------------------------------

const projects = defineCollection({
  loader: file("public/data/projects.json", { parser: arrayWithIds("details", "title") }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()),
    github: z.string().nullable().optional(),
    githubLabel: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
    details: z.string().nullable().optional(),
    period: z.string().optional(),
    collaborators: z.union([z.string(), z.array(z.string())]).nullable().optional(),
    images: z.array(z.string()).optional(),
  }),
});

const certificates = defineCollection({
  loader: file("public/data/certificates.json", { parser: arrayWithIds("title") }),
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    tags: z.array(z.string()),
    skills: z.array(z.string()),
    link: z.string().optional(),
    image: z.string().optional(),
  }),
});

const courses = defineCollection({
  loader: file("public/data/courses.json", { parser: arrayWithIds("code", "title") }),
  schema: z.object({
    code: z.string(),
    title: z.string(),
    institution: z.string(),
    description: z.string().optional(),
    credits: z.number().optional(),
    skills: z.array(z.string()).optional(),
  }),
});

// `awards` is sourced from achievements.json — the legacy file name predates
// the current route. The collection name matches the route (`/awards`).
const awards = defineCollection({
  loader: file("public/data/achievements.json", { parser: arrayWithIds("title") }),
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    skills: z.array(z.string()).optional(),
  }),
});

const workExperiences = defineCollection({
  loader: file("public/data/work-experiences.json", { parser: arrayWithIds("project", "company") }),
  schema: z.object({
    company: z.string(),
    project: z.string(),
    period: z.string(),
    images: z.array(z.object({ src: z.string(), alt: z.string() })),
    tech: z.array(z.string()),
    summary: z.string(),
    highlights: z.array(z.string()),
  }),
});

const services = defineCollection({
  loader: file("public/data/services.json", { parser: arrayWithIds("title") }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
});

const skills = defineCollection({
  loader: file("public/data/skills.json"),
  schema: z.object({
    label: z.string(),
    groups: z.array(
      z.object({
        title: z.string(),
        items: z.array(
          z.object({
            icon: z.string(),
            name: z.string(),
            description: z.string().optional(),
          }),
        ),
      }),
    ),
  }),
});

const highlights = defineCollection({
  loader: file("public/data/highlights.json", { parser: arrayWithIds("label") }),
  schema: z.object({
    src: z.string(),
    label: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: file("public/data/testimonials.json", { parser: arrayWithIds("author") }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
  }),
});

const blogPosts = defineCollection({
  loader: file("public/data/blog-posts.json", { parser: arrayWithIds("title") }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    url: z.string(),
  }),
});

// Markdown-backed long-form content. Each `.md` file under src/content/blogs
// becomes one entry; the slug is the filename. Bodies render via `<Content />`
// on the detail route. The legacy `blog-posts` JSON collection (external links)
// stays so the listing page can merge native posts + cross-posted links.
const blogs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/blogs" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Travels are blog-shaped but carry geo + gallery metadata so the listing
// page can render a synchronized map + timeline. `coords` is optional — a
// trip without coordinates appears in the timeline only. `trip` is the
// optional slug of an entry in the `trips` collection; when set, the
// listing groups this visit under the trip's header.
const travels = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/travels" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string(),
    city: z.string().optional(),
    country: z.string().optional(),
    coords: z.tuple([z.number(), z.number()]).optional(),
    cover: z.string().optional(),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string() }))
      .default([]),
    // Optional video clips, rendered as poster + play badge in the gallery and
    // played in the lightbox. `src` is either a local file path
    // (e.g. /static/travels/<slug>/clip.mp4) or a YouTube/Vimeo URL — the
    // gallery detects which and renders a <video> or an embed iframe.
    // `poster` is an optional thumbnail image; without it, local videos show
    // their first frame and embeds use the provider's own thumbnail.
    videos: z
      .array(
        z.object({
          src: z.string(),
          poster: z.string().optional(),
          alt: z.string(),
        }),
      )
      .default([]),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    trip: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Trips bundle multiple `travels` entries into a single named outing
// (e.g. "Davao — Aug 18–20, 2025"). The slug (filename) is what a
// `travels` entry's `trip` field references to opt into the group.
const trips = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/trips" }),
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string(),
    summary: z.string().optional(),
    // Ordered list of travel slugs that make up the trip's itinerary.
    // The map polyline follows this order; the feed and detail page
    // also use it to render stops in narrative sequence. Optional —
    // when absent, stops fall back to date-sorted order.
    stops: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// -----------------------------------------------------------------------------
// Singletons
// -----------------------------------------------------------------------------

const profile = defineCollection({
  loader: file("public/data/profile.json", { parser: singleton("profile") }),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    bio: z.string(),
    email: z.string().email(),
    socials: z.object({
      linkedin: z.string(),
      github: z.string(),
      twitter: z.string(),
    }),
  }),
});

const cardCounter = defineCollection({
  loader: file("public/data/card-counter.json", { parser: singleton("card-counter") }),
  schema: z.object({
    lastUpdated: z.string(),
    items: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        value: z.number(),
        description: z.string().optional(),
        theme: z.enum(["ocean", "teal", "cyan", "ice"]),
        order: z.number(),
        icon: z.string().optional(),
      }),
    ),
  }),
});

const techComparison = defineCollection({
  loader: file("public/data/tech-comparison.json", { parser: singleton("tech-comparison") }),
  schema: z.object({
    lastUpdated: z.string().optional(),
    rating_types: z.array(
      z.object({
        id: z.enum(["proficiency", "production_use", "recency", "depth", "preference"]),
        label: z.string(),
        description: z.string(),
        scale: z.record(z.string(), z.string()),
      }),
    ),
    categories: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        color: z.string().optional(),
      }),
    ),
    items: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.string(),
        category: z.string(),
        tags: z.array(z.string()).optional(),
        since: z.string().optional(),
        ratings: z.object({
          proficiency: z.number(),
          production_use: z.number(),
          recency: z.number(),
          depth: z.number(),
          preference: z.number(),
        }),
        notes: z.string().optional(),
      }),
    ),
  }),
});

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export const collections = {
  projects,
  certificates,
  courses,
  awards,
  "work-experiences": workExperiences,
  services,
  skills,
  highlights,
  testimonials,
  "blog-posts": blogPosts,
  blogs,
  travels,
  trips,
  profile,
  "card-counter": cardCounter,
  "tech-comparison": techComparison,
};

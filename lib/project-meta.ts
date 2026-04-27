import { getProjects } from "@/lib/get-data";

export interface ProjectMeta {
  title: string;
  image: string;
  alt: string;
  description?: string;
  collaborators?: string | null;
  tags: string[];
  github?: string | null;
  githubLabel?: string | null;
  link?: string | null;
  details?: string | null;
  period?: string;
  images?: string[];
  slug: string;
}

const SLUG_PREFIX = "project-details/";

function toSlug(details: string | null | undefined): string | null {
  if (!details) return null;
  return details.startsWith(SLUG_PREFIX) ? details.slice(SLUG_PREFIX.length) : details;
}

export function getAllProjectMeta(): ProjectMeta[] {
  return getProjects()
    .map((p) => {
      const slug = toSlug(p.details);
      if (!slug) return null;
      const raw = p as ProjectMeta & { period?: string; link?: string | null; images?: string[]; collaborators?: string | null };
      return { ...raw, slug } as ProjectMeta;
    })
    .filter((p): p is ProjectMeta => p !== null);
}

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return getAllProjectMeta().find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectMeta | null;
  next: ProjectMeta | null;
} {
  const all = getAllProjectMeta();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export function slugifySection(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

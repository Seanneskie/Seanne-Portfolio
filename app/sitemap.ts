import type { MetadataRoute } from "next";

import projects from "../public/data/projects.json";

export const dynamic = "force-static";

const getSiteUrl = (): string => {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
};

const getBasePath = (): string => {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
};

const toAbsoluteUrl = (path: string): string => {
  const basePath = getBasePath().replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${basePath}${normalized}`;
};

const withTrailingSlash = (path: string): string => {
  return path.endsWith("/") ? path : `${path}/`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-02-01";

  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
    { path: "/profile", changeFrequency: "monthly", priority: 0.8 },
    { path: "/work-experiences", changeFrequency: "monthly", priority: 0.7 },
    { path: "/certificates", changeFrequency: "monthly", priority: 0.6 },
    { path: "/courses", changeFrequency: "monthly", priority: 0.6 },
    { path: "/awards", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: toAbsoluteUrl(withTrailingSlash(route.path)),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects
    .map((project) => project.details)
    .filter(Boolean)
    .map((details) => ({
      url: toAbsoluteUrl(withTrailingSlash(`/${details}`)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...projectEntries];
}

import type { MetadataRoute } from "next";

import projects from "../public/data/projects.json";

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
  const staticRoutes = [
    "/",
    "/projects",
    "/profile",
    "/courses",
    "/certificates",
    "/awards",
    "/work-experiences",
    "/contact",
  ];

  const projectRoutes = projects
    .map((project) => project.details)
    .filter(Boolean)
    .map((details) => `/${details}`);

  const entries = [...staticRoutes, ...projectRoutes];

  return entries.map((route) => ({
    url: toAbsoluteUrl(withTrailingSlash(route)),
  }));
}

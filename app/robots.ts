import type { MetadataRoute } from "next";

const getSiteUrl = (): string => {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
};

const getBasePath = (): string => {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
};

export default function robots(): MetadataRoute.Robots {
  const basePath = getBasePath().replace(/\/$/, "");
  const sitemapPath = `${basePath}/sitemap.xml`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${getSiteUrl()}${sitemapPath}`,
  };
}

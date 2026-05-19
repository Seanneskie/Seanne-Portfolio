/**
 * /robots.txt endpoint — Astro's static-route equivalent of app/robots.ts.
 *
 * Points crawlers at the sitemap index emitted by @astrojs/sitemap.
 * Uses Astro's `site` + `base` config so the URL matches the GH Pages deploy.
 */
import type { APIRoute } from "astro";

const SITE_URL = "https://seanneskie.github.io";

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL(SITE_URL)).origin;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const sitemap = `${origin}${base}/sitemap-index.xml`;

  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

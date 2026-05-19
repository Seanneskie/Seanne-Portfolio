import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.NODE_ENV === "production";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Matches the priorities + changefreq emitted by the old app/sitemap.ts so
// search engines see the same crawl hints after the cutover.
const SITEMAP_HINTS = new Map([
  ["/", { changefreq: "weekly", priority: 1.0 }],
  ["/projects/", { changefreq: "weekly", priority: 0.9 }],
  ["/profile/", { changefreq: "monthly", priority: 0.8 }],
  ["/work-experiences/", { changefreq: "monthly", priority: 0.7 }],
  ["/certificates/", { changefreq: "monthly", priority: 0.6 }],
  ["/courses/", { changefreq: "monthly", priority: 0.6 }],
  ["/awards/", { changefreq: "monthly", priority: 0.6 }],
  ["/contact/", { changefreq: "yearly", priority: 0.5 }],
]);

const SITEMAP_LASTMOD = "2026-02-01";

// Mirrors next.config.ts so Astro deploys to the same GitHub Pages path.
export default defineConfig({
  site: "https://seanneskie.github.io",
  base: isProd ? "/Seanne-Portfolio" : "/",
  trailingSlash: "always",
  output: "static",
  outDir: "./dist",
  integrations: [
    react(),
    sitemap({
      serialize(entry) {
        const url = new URL(entry.url);
        const basePath = isProd ? "/Seanne-Portfolio" : "";
        const route = url.pathname.startsWith(basePath)
          ? url.pathname.slice(basePath.length) || "/"
          : url.pathname;
        const hint = SITEMAP_HINTS.get(route);
        return {
          ...entry,
          lastmod: SITEMAP_LASTMOD,
          // Project-detail pages get a default that mirrors the old Next sitemap.
          changefreq: hint?.changefreq ?? "monthly",
          priority: hint?.priority ?? 0.7,
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        // Shim Next.js framework imports so the existing /components React
        // tree can be rendered as Astro islands unchanged. See src/shims/*.
        { find: "next/image", replacement: resolve(__dirname, "src/shims/next-image.tsx") },
        { find: "next/link", replacement: resolve(__dirname, "src/shims/next-link.tsx") },
        { find: "next/navigation", replacement: resolve(__dirname, "src/shims/next-navigation.ts") },
        // Mirror Next's `@/*` path alias so imports like `@/components/...`
        // resolve from the repo root in the Astro build too.
        { find: /^@\/(.*)$/, replacement: resolve(__dirname, "$1") },
      ],
    },
  },
});

import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.NODE_ENV === "production";
const deployTarget = process.env.DEPLOY_TARGET;
const isGitHubPages = deployTarget === "github-pages";
const productionBase = isGitHubPages ? "/Seanne-Portfolio" : "/";
const productionSite = isGitHubPages
  ? "https://seanneskie.github.io"
  : "https://seanneskie.com";
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
  ["/blogs/", { changefreq: "weekly", priority: 0.7 }],
  ["/travels/", { changefreq: "monthly", priority: 0.7 }],
  ["/contact/", { changefreq: "yearly", priority: 0.5 }],
]);

const SITEMAP_LASTMOD = "2026-02-01";

// The custom domain is served from the root. GitHub Pages is an explicit
// fallback because its project site remains under `/Seanne-Portfolio/`.
export default defineConfig({
  site: productionSite,
  base: isProd ? productionBase : "/",
  trailingSlash: "always",
  output: "static",
  outDir: "./dist",
  integrations: [
    react(),
    sitemap({
      serialize(entry) {
        const url = new URL(entry.url);
        const basePath = isProd ? productionBase.replace(/\/$/, "") : "";
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
        // Components import the framework-agnostic shims under src/shims/*
        // directly now that Next has been removed; the old
        // next/image|link|navigation aliases were dropped in the cutover.
        // The `@/*` alias mirrors the tsconfig path so `@/components/...`
        // and `@/shims/...` resolve from the repo root.
        { find: /^@\/(.*)$/, replacement: resolve(__dirname, "$1") },
      ],
    },
  },
});

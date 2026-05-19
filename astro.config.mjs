import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.NODE_ENV === "production";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Mirrors next.config.ts so Astro deploys to the same GitHub Pages path.
export default defineConfig({
  site: "https://seanneskie.github.io",
  base: isProd ? "/Seanne-Portfolio" : "/",
  trailingSlash: "always",
  output: "static",
  outDir: "./dist",
  integrations: [react(), sitemap()],
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

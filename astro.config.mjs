import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.NODE_ENV === "production";

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
  },
});

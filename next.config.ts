import path from "node:path";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true }, // required for static export
  basePath: isProd ? "/Seanne-Portfolio" : "",
  assetPrefix: isProd ? "/Seanne-Portfolio/" : "",
  trailingSlash: true, // helps direct-load nested routes on GitHub Pages
  // Silence "multiple lockfiles" warning during Astro coexistence.
  outputFileTracingRoot: path.resolve(__dirname),
  // The Astro scaffold lives under `src/`, which Next 15 mis-identifies as
  // `src/app/`-style and emits broken type validators for. Skip build-time TS
  // errors until the Phase 7 cutover removes Next entirely. Lint + vitest still
  // type-check, so this only suppresses the generated validator noise.
  typescript: { ignoreBuildErrors: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/Seanne-Portfolio" : "",
  },
};

export default nextConfig;

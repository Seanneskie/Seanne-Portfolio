import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true }, // required for static export
  basePath: isProd ? "/Seanne-Portfolio" : "",
  assetPrefix: isProd ? "/Seanne-Portfolio/" : "",
  trailingSlash: true, // helps direct-load nested routes on GitHub Pages
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/Seanne-Portfolio" : "",
  },
};

export default nextConfig;

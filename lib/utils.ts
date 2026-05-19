// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefixes a relative path with the configured `basePath` (used for GitHub Pages).
 * If the path is already absolute (e.g., starts with http/https), it is returned as-is.
 *
 * Reads from Next.js's `NEXT_PUBLIC_BASE_PATH` when running under Next, and
 * falls back to Astro's Vite-inlined `import.meta.env.BASE_URL` when this
 * module is bundled into an Astro island. During the migration both stacks
 * share the same /components tree, so this helper has to work in both.
 */
export function withBasePath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  // `process` is only defined in the Next.js bundle; in Astro's Vite browser
  // build it's absent, so guard the lookup before reading the env var.
  const nextBase =
    typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_BASE_PATH : undefined;
  if (nextBase) {
    // Idempotent: avoid double-prefix when called twice (shimmed
    // next/image/Link also runs withBasePath in Astro builds).
    return path.startsWith(`${nextBase}/`) || path === nextBase
      ? path
      : `${nextBase}${path}`;
  }
  // Vite/Astro: BASE_URL is always trailing-slashed (e.g. "/Seanne-Portfolio/").
  const astroBase =
    (typeof import.meta !== "undefined" &&
      (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL) ||
    "";
  const trimmed = astroBase.replace(/\/$/, "");
  if (!trimmed || trimmed === "/") return path;
  if (path.startsWith(`${trimmed}/`) || path === trimmed) return path;
  return `${trimmed}${path}`;
}

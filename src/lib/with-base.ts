/**
 * Prefixes a relative path with Astro's configured `base` (used for GitHub
 * Pages deploy under `/Seanne-Portfolio/`). Absolute URLs pass through.
 *
 * Astro injects `import.meta.env.BASE_URL` as the base — always trailing-
 * slashed (e.g. "/Seanne-Portfolio/"). We strip the trailing slash before
 * concatenation so the result has exactly one slash between base and path.
 */
export function withBase(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

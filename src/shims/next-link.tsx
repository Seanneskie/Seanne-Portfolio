/**
 * Astro-only shim for `next/link`.
 *
 * Wired via Vite alias in astro.config.mjs. Renders a plain <a>, strips
 * Next-only props (prefetch, scroll, replace, etc.), and prefixes the href
 * with the configured base path so /Seanne-Portfolio/... routes work.
 */
import type { AnchorHTMLAttributes, ReactElement, ReactNode } from "react";

const ASTRO_BASE: string =
  (typeof import.meta !== "undefined" && (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL) ||
  "/";

function withBase(href: string): string {
  if (/^(https?:)?\/\//.test(href) || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  const base = ASTRO_BASE.replace(/\/$/, "");
  if (!base) return href;
  // Idempotent: callers may already have called withBasePath() — don't
  // double-prefix when the href already starts with the base.
  if (href.startsWith(`${base}/`) || href === base) return href;
  const normalized = href.startsWith("/") ? href : `/${href}`;
  return `${base}${normalized}`;
}

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string | { pathname: string; query?: Record<string, string> };
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
  locale?: string;
  children?: ReactNode;
}

export default function Link({
  href,
  // Next-only props we intentionally drop in the shim. The `_`-prefix marks
  // them unused for the lint config.
  prefetch: _prefetch,
  scroll: _scroll,
  replace: _replace,
  shallow: _shallow,
  passHref: _passHref,
  legacyBehavior: _legacyBehavior,
  locale: _locale,
  children,
  ...rest
}: LinkProps): ReactElement {
  const resolved = typeof href === "string" ? href : href.pathname;
  return (
    <a href={withBase(resolved)} {...rest}>
      {children}
    </a>
  );
}

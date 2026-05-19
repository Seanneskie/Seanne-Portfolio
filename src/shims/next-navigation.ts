/**
 * Astro-only shim for `next/navigation`.
 *
 * Provides usePathname/useRouter stubs so existing components that read the
 * current pathname keep working as React islands. Astro pages pass the real
 * pathname into islands as a prop where possible; this is the fallback for
 * components we don't touch.
 */
export function usePathname(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

export function useRouter() {
  return {
    push: (href: string) => {
      if (typeof window !== "undefined") window.location.href = href;
    },
    replace: (href: string) => {
      if (typeof window !== "undefined") window.location.replace(href);
    },
    back: () => {
      if (typeof window !== "undefined") window.history.back();
    },
    forward: () => {
      if (typeof window !== "undefined") window.history.forward();
    },
    refresh: () => {
      if (typeof window !== "undefined") window.location.reload();
    },
    prefetch: () => {},
  };
}

export function useSearchParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export function notFound(): never {
  throw new Error("notFound");
}

export function redirect(url: string): never {
  if (typeof window !== "undefined") window.location.href = url;
  throw new Error(`redirect: ${url}`);
}

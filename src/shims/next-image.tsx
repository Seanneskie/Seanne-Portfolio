/**
 * Astro-only shim for `next/image`.
 *
 * The shared React components under /components were authored for Next.js
 * and import `next/image`. When those components are rendered as Astro
 * islands the Next runtime isn't present, so this shim degrades them to a
 * plain <img>. The shim is wired up via a Vite alias in `astro.config.mjs`
 * and only applies to the Astro build — Next continues to use the real
 * next/image.
 *
 * Supported subset of next/image props:
 *   - src, alt, width, height
 *   - className, style, sizes, loading
 *   - priority (mapped to loading="eager" + fetchpriority="high")
 *   - fill (mapped to absolute-positioned object-cover behavior)
 *   - quality, placeholder, blurDataURL — ignored (no optimization here)
 *   - onLoad, onError
 *
 * The basePath prefix is applied to relative src values so existing
 * `/static/...` paths resolve under `/Seanne-Portfolio/...` on GH Pages.
 */
import type { CSSProperties, ImgHTMLAttributes, ReactElement } from "react";

const ASTRO_BASE: string =
  (typeof import.meta !== "undefined" && (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL) ||
  "/";

function withBase(src: string): string {
  if (/^https?:\/\//.test(src) || src.startsWith("data:")) return src;
  const base = ASTRO_BASE.replace(/\/$/, "");
  if (!base) return src;
  // Idempotent: callers may already have called withBasePath() — don't
  // double-prefix when the src already starts with the base.
  if (src.startsWith(`${base}/`)) return src;
  const normalized = src.startsWith("/") ? src : `/${src}`;
  return `${base}${normalized}`;
}

type StaticImageData = { src: string; width?: number; height?: number; blurDataURL?: string };

export interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "loading"> {
  src: string | StaticImageData;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  unoptimized?: boolean;
}

export default function Image(props: ImageProps): ReactElement {
  const {
    src,
    alt,
    width,
    height,
    fill,
    priority,
    // Next-only props we intentionally drop in the shim (no image optimization).
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    quality: _quality,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    placeholder: _placeholder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blurDataURL: _blurDataURL,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unoptimized: _unoptimized,
    style,
    className,
    loading,
    sizes,
    ...rest
  } = props;

  const resolvedSrc = typeof src === "string" ? withBase(src) : withBase(src.src);

  const fillStyle: CSSProperties | undefined = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }
    : style;

  const effectiveLoading: "eager" | "lazy" | undefined =
    loading ?? (priority ? "eager" : undefined);

  // fetchpriority is camelCase prop -> kebab attr in React 19; pass as string attr.
  const fetchPriorityAttr = priority ? { fetchpriority: "high" as const } : {};

  return (
    // The shim's whole purpose is to degrade next/image to a plain <img>.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      {...(fetchPriorityAttr as Record<string, string>)}
      src={resolvedSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      loading={effectiveLoading}
      decoding="async"
      className={className}
      style={fillStyle}
    />
  );
}

export type { StaticImageData };

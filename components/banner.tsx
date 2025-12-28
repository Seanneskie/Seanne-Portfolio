// components/common/Banner.tsx
"use client";

import { cn, withBasePath } from "@/lib/utils";
import Image from "next/image";
import { type ReactElement, type ReactNode } from "react";

type Align = "left" | "center" | "right";
type Height = "sm" | "md" | "lg" | "screen";

export interface BannerProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Absolute or public path (e.g., /static/hero.webp) */
  backgroundImage: string;
  /** Improves accessibility; describe the image context briefly */
  imageAlt?: string;
  /** Content alignment */
  align?: Align;
  /** Visual height preset */
  height?: Height;
  /** When true, applies md:bg-fixed for a light parallax effect (avoids iOS issues on small screens) */
  parallax?: boolean;
  /** Tailwind classes for the overlay gradient */
  overlayClassName?: string;
  /** Additional className for the root section */
  className?: string;
  /** Optional action buttons or extra content under subtitle */
  actions?: ReactNode;
  /** Control background object position (e.g., "50% 30%" or "center top") */
  objectPosition?: string;
  /** Prioritize image loading (good for above-the-fold heroes) */
  priority?: boolean;
}

const HEIGHTS: Record<Height, string> = {
  sm: "min-h-[40vh] h-[40vh]",
  md: "min-h-[60vh] h-[60vh]",
  lg: "min-h-[80vh] h-[80vh]",
  screen: "min-h-screen h-screen",
};

export default function Banner({
  title,
  subtitle,
  backgroundImage,
  imageAlt = "",
  align = "center",
  height = "md",
  parallax = false,
  overlayClassName,
  className,
  actions,
  objectPosition = "center",
  priority = false,
}: BannerProps): ReactElement {
  const alignWrap =
    align === "left"
      ? "ml-0 mr-auto text-left"
      : align === "right"
      ? "ml-auto mr-0 text-right"
      : "mx-auto text-center";

  return (
    <section
      className={cn(
        "relative isolate flex items-center overflow-hidden",
        HEIGHTS[height],
        className
      )}
      aria-label={typeof title === "string" ? title : "Hero banner"}
    >
      {/* Background image */}
      <div
        className={cn(
          "absolute inset-0 -z-10",
          parallax ? "md:bg-fixed" : ""
        )}
      >
        <Image
          src={withBasePath(backgroundImage)}
          alt="" // decorative; context provided via aria-label on section
          fill
          sizes="100vw"
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>

      {/* Overlay (tunable) */}
      <div
        className={cn(
          "absolute inset-0 -z-10 pointer-events-none",
          // Default overlay: strong at bottom-left, softer to top-right, with light blur support
          "bg-gradient-to-br from-black/70 via-black/50 to-black/20",
          "supports-[backdrop-filter]:backdrop-blur-[2px]",
          "dark:from-black/80 dark:via-black/60 dark:to-black/30",
          overlayClassName
        )}
      />

      {/* Content */}
      <div className={cn("relative z-10 w-full max-w-5xl px-6 md:px-8", alignWrap)}>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-md md:text-5xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-base md:text-xl text-white/90 drop-shadow-sm">
            {subtitle}
          </p>
        )}

        {actions && <div className={cn("mt-6 inline-flex gap-3", align !== "left" ? "justify-center" : "")}>{actions}</div>}

        {/* Screen-reader-only description of the background image (if provided) */}
        {imageAlt ? <span className="sr-only">{imageAlt}</span> : null}
      </div>
    </section>
  );
}

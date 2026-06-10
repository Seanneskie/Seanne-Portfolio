"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

/** Shared scroll-reveal easing — mirrors the --ease-out-soft token. */
const EASE_OUT_SOFT = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: ReactNode;
  /** Stagger helper: seconds of delay before this element reveals. */
  delay?: number;
  /** Element to render as. Defaults to a div. */
  as?: "div" | "section" | "li" | "article";
  className?: string;
};

/**
 * One scroll-reveal wrapper for the whole site: fades + lifts content into
 * view once, with a single shared easing/duration. Honors prefers-reduced-
 * motion via the global rule in globals.css (framer respects the media query
 * through the reduced transition-duration, and `once` keeps it cheap).
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT_SOFT }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;

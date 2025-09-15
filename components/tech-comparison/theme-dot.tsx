import React from "react";
import { cn } from "@/lib/cn";

const DOT_BASE = cn(
  "absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full",
  "bg-gradient-to-tr from-teal-600 to-cyan-500 shadow-lg",
  "ring-8 ring-white dark:ring-gray-900"
);

export interface ThemeDotProps {
  className?: string;
}

export function ThemeDot({ className }: ThemeDotProps): React.ReactElement {
  return <span aria-hidden className={cn(DOT_BASE, className)} />;
}

export default ThemeDot;

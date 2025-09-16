"use client";

import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function SocialIcon({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/70 backdrop-blur-sm shadow-sm ring-1 ring-inset ring-white/5 transition hover:scale-[1.05] hover:bg-teal-500/40 dark:hover:bg-teal-400/40 hover:text-white dark:hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          {children}
          <span className="sr-only">{label}</span>
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}

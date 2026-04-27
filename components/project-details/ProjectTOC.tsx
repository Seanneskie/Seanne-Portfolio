"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { slugifySection } from "@/lib/project-meta";

interface ProjectTOCProps {
  sections: string[];
  className?: string;
}

export default function ProjectTOC({ sections, className }: ProjectTOCProps): React.ReactElement | null {
  const [active, setActive] = React.useState<string | null>(null);
  const ids = React.useMemo(() => sections.map(slugifySection), [sections]);

  React.useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  if (!sections.length) return null;

  return (
    <nav
      aria-label="On this page"
      className={cn(
        "rounded-xl border border-teal-200/70 bg-white/80 p-4 text-sm backdrop-blur dark:border-teal-800/70 dark:bg-gray-950/60 lg:sticky lg:top-24",
        className
      )}
    >
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
        On this page
      </div>
      <ul className="space-y-1">
        {sections.map((title, i) => {
          const id = ids[i];
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block rounded-md border-l-2 px-2 py-1 transition",
                  isActive
                    ? "border-teal-500 bg-teal-50 font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-100"
                    : "border-transparent text-gray-600 hover:border-teal-300 hover:text-teal-700 dark:text-gray-300 dark:hover:text-teal-200"
                )}
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

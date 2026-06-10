import { type ReactElement } from "react";

export interface Highlight {
  label: string;
  value: string;
  hint?: string;
}

interface ProjectHighlightsProps {
  items: Highlight[];
}

export default function ProjectHighlights({ items }: ProjectHighlightsProps): ReactElement | null {
  if (!items.length) return null;
  return (
    <section
      aria-label="Project highlights"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((h) => (
        <div
          key={h.label}
          className="rounded-card border border-gray-200 bg-white p-4 transition-colors hover:border-teal-500/40 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-teal-400/40"
        >
          <div className="text-2xl font-bold tracking-tight text-teal-600 dark:text-teal-400">
            {h.value}
          </div>
          <div className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
            {h.label}
          </div>
          {h.hint && (
            <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">{h.hint}</div>
          )}
        </div>
      ))}
    </section>
  );
}

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
          className="rounded-xl border border-teal-200/70 bg-white/85 p-4 backdrop-blur dark:border-teal-800/70 dark:bg-gray-950/60"
        >
          <div className="text-2xl font-bold text-teal-700 dark:text-teal-300">
            {h.value}
          </div>
          <div className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-100">
            {h.label}
          </div>
          {h.hint && (
            <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{h.hint}</div>
          )}
        </div>
      ))}
    </section>
  );
}

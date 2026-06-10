"use client";

import { useState, type ReactElement } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const COLLAPSED_LIMIT = 12;

interface TagFilterProps {
  tags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
  className?: string;
  id?: string;
}

export default function TagFilter({
  tags,
  selected,
  onChange,
  className,
  id,
}: TagFilterProps): ReactElement {
  const [expanded, setExpanded] = useState(false);

  const toggleTag = (tag: string) => {
    onChange(
      selected.includes(tag)
        ? selected.filter((t) => t !== tag)
        : [...selected, tag]
    );
  };

  const overflow = tags.length - COLLAPSED_LIMIT;
  // Keep selected tags visible even when collapsed.
  const visible =
    expanded || overflow <= 0
      ? tags
      : [
          ...tags.slice(0, COLLAPSED_LIMIT),
          ...tags.slice(COLLAPSED_LIMIT).filter((t) => selected.includes(t)),
        ];

  return (
    <div id={id} className={cn("flex flex-wrap items-center gap-2", className)}>
      {visible.map((tag) => {
        const isSelected = selected.includes(tag);
        return (
          <Badge
            key={tag}
            onClick={() => toggleTag(tag)}
            aria-pressed={isSelected}
            className={cn(
              "cursor-pointer select-none rounded-full border font-normal transition-colors",
              isSelected
                ? "border-teal-600 bg-teal-600 text-white dark:border-teal-500 dark:bg-teal-500"
                : "border-gray-200 bg-transparent text-gray-600 hover:border-teal-500/40 hover:text-teal-600 dark:border-gray-800 dark:text-gray-400 dark:hover:text-teal-400"
            )}
          >
            {tag}
          </Badge>
        );
      })}
      {overflow > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-xs font-medium text-teal-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 dark:text-teal-400"
        >
          {expanded ? "Show fewer" : `+${overflow} more`}
        </button>
      )}
    </div>
  );
}

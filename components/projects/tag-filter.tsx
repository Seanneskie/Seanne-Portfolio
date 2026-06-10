"use client";

import { type ReactElement } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export default function TagFilter({
  tags,
  selected,
  onChange,
  className,
}: TagFilterProps): ReactElement {
  const toggleTag = (tag: string) => {
    onChange(
      selected.includes(tag)
        ? selected.filter((t) => t !== tag)
        : [...selected, tag]
    );
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => {
        const isSelected = selected.includes(tag);
        return (
          <Badge
            key={tag}
            onClick={() => toggleTag(tag)}
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
    </div>
  );
}

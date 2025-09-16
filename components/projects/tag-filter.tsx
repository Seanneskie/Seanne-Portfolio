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
              "cursor-pointer select-none",
              isSelected
                ? "bg-teal-600 text-white"
                : "bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800"
            )}
          >
            {tag}
          </Badge>
        );
      })}
    </div>
  );
}

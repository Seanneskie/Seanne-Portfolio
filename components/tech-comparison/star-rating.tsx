import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export interface StarRatingProps {
  value: number;
}

export function StarRating({ value }: StarRatingProps): React.ReactElement {
  const v = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${v} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < v
              ? "fill-teal-500 text-teal-500 dark:fill-cyan-400 dark:text-cyan-400"
              : "text-gray-300 dark:text-gray-600"
          )}
        />
      ))}
    </div>
  );
}

export default StarRating;

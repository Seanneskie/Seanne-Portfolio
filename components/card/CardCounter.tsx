// components/counter-card.tsx
import { type ReactElement } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { type CounterCardTheme } from "@/types/card-counter";
import {
  type CardCounterIconName,
  resolveCardCounterIcon,
} from "@/lib/card-counter-icons";

const THEME_STYLES: Record<
  CounterCardTheme,
  { dot: string; title?: string; count?: string }
> = {
  // Flat, monochrome+teal accent — one quiet teal dot for every theme.
  ocean: {
    dot: "bg-teal-600 dark:bg-teal-500 ring-4 ring-white dark:ring-gray-900",
  },
  teal: {
    dot: "bg-teal-600 dark:bg-teal-500 ring-4 ring-white dark:ring-gray-900",
  },
  cyan: {
    dot: "bg-teal-600 dark:bg-teal-500 ring-4 ring-white dark:ring-gray-900",
  },
  ice: {
    dot: "bg-teal-600 dark:bg-teal-500 ring-4 ring-white dark:ring-gray-900",
  },
};

/**
 * Props for rendering a counter card with an optional Lucide icon accent.
 */
export type CounterCardProps = {
  count: number | string;
  title: string;
  description?: string;
  className?: string;
  /** Theme centered around cyan/teal. Default is your current gradient. */
  theme?: CounterCardTheme;
  /** Optional override to tweak the accent dot per-instance. */
  dotClassName?: string;
  /** Optional icon rendered inside the accent dot. */
  icon?: CardCounterIconName;
};

export default function CounterCard({
  count,
  title,
  description,
  className,
  theme = "ocean",
  dotClassName,
  icon,
}: CounterCardProps): ReactElement {
  const formatted =
    typeof count === "number" ? count.toLocaleString() : String(count);

  const style = THEME_STYLES[theme];
  const IconComponent = resolveCardCounterIcon(icon);

  return (
    <Card className={cn("relative pt-6 pl-12", className)}>
      {/* gradient accent dot */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full",
          style.dot,
          dotClassName
        )}
      >
        {IconComponent ? (
          <IconComponent aria-hidden="true" className="h-4 w-4 text-white" />
        ) : null}
      </span>
      <CardHeader className="p-0">
        <CardTitle className={cn("text-sm font-medium text-gray-600 dark:text-gray-400", style.title)}>
          {title}
        </CardTitle>
        {description ? (
          <CardDescription className="mt-0.5 text-gray-600 dark:text-gray-400">{description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <div className={cn("text-4xl font-bold leading-none tracking-tight text-gray-900 dark:text-white", style.count)}>
          {formatted}
        </div>
      </CardContent>
    </Card>
  );
}

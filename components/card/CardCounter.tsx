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

const THEME_STYLES: Record<
  CounterCardTheme,
  { dot: string; title?: string; count?: string }
> = {
  // Base theme = your current gradient
  ocean: {
    dot: [
      "bg-gradient-to-tr",
      "from-teal-600",
      "to-cyan-500",
      "shadow-lg",
      "ring-8 ring-white dark:ring-gray-900",
    ].join(" "),
  },
  teal: {
    dot: [
      "bg-gradient-to-tr",
      "from-teal-700",
      "to-teal-400",
      "shadow-lg",
      "ring-8 ring-white dark:ring-gray-900",
    ].join(" "),
  },
  cyan: {
    dot: [
      "bg-gradient-to-tr",
      "from-cyan-700",
      "to-cyan-400",
      "shadow-lg",
      "ring-8 ring-white dark:ring-gray-900",
    ].join(" "),
  },
  ice: {
    dot: [
      "bg-gradient-to-tr",
      "from-cyan-600",
      "to-sky-400",
      "shadow-lg",
      "ring-8 ring-white dark:ring-gray-900",
    ].join(" "),
  },
};

export type CounterCardProps = {
  count: number | string;
  title: string;
  description?: string;
  className?: string;
  /** Theme centered around cyan/teal. Default is your current gradient. */
  theme?: CounterCardTheme;
  /** Optional override to tweak the accent dot per-instance. */
  dotClassName?: string;
};

export default function CounterCard({
  count,
  title,
  description,
  className,
  theme = "ocean",
  dotClassName,
}: CounterCardProps): ReactElement {
  const formatted =
    typeof count === "number" ? count.toLocaleString() : String(count);

  const style = THEME_STYLES[theme];

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
      />
      <CardHeader className="p-0">
        <CardTitle className={cn("text-sm font-medium text-muted-foreground", style.title)}>
          {title}
        </CardTitle>
        {description ? (
          <CardDescription className="mt-0.5">{description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <div className={cn("text-4xl font-semibold leading-none tracking-tight", style.count)}>
          {formatted}
        </div>
      </CardContent>
    </Card>
  );
}

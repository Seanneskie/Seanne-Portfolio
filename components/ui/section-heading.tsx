import type { JSX, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: string;
  /** Optional supporting line under the title. */
  description?: string;
  /** Optional right-aligned action (e.g. a "see all" link). */
  action?: ReactNode;
  className?: string;
};

/**
 * The single section header used across every page. Typography-led and
 * restrained: a quiet teal eyebrow, a tight display title, optional action.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: Props): JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-1.5">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export default SectionHeading;

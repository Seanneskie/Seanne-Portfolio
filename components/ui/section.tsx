import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Standard page section wrapper. Centralizes the container width and the
 * vertical rhythm between sections so every page shares one layout cadence.
 */
function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="section"
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export { Section };

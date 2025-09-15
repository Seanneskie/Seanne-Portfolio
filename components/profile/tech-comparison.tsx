import { type ReactElement } from "react";

import rawTechComparisonData from "@/public/data/tech-comparison.json" assert { type: "json" };
import { TechComparisonDashboard } from "@/components/tech-comparison";
import { normalizeTechComparisonData } from "@/lib/tech-comparison";

/**
 * Displays the {@link TechComparisonDashboard} using statically imported data.
 *
 * @example
 * ```tsx
 * import { TechComparison } from "@/components/profile";
 *
 * export default function Example() {
 *   return <TechComparison />;
 * }
 * ```
 */
export default function TechComparison(): ReactElement {
  const data = normalizeTechComparisonData(rawTechComparisonData);
  return <TechComparisonDashboard data={data} />;
}

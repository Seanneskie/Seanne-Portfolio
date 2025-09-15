import techComparisonData from "@/public/data/tech-comparison.json" assert { type: "json" };
import { TechComparisonDashboard, type TechComparisonData } from "@/components/tech-comparison";

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
export default function TechComparison(): JSX.Element {
  const data: TechComparisonData = techComparisonData;
  return <TechComparisonDashboard data={data} />;
}


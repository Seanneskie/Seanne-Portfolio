import { useMemo } from "react";

export type SkillCategoryStats = Record<string, Record<string, number>>;

export interface RadarDataPoint {
  skill: string;
  value: number;
}

/**
 * Convert aggregated skill statistics into a dataset compatible with Recharts.
 *
 * @param stats - Aggregated statistics keyed by category then skill name.
 * @param category - Active category to extract (e.g., "language").
 * @returns Dataset for the chart and list of available categories.
 */
export function useSkillRadarData(
  stats: SkillCategoryStats,
  category: string
): { data: RadarDataPoint[]; categories: string[] } {
  const categories = useMemo<string[]>(() => Object.keys(stats), [stats]);

  const data = useMemo<RadarDataPoint[]>(() => {
    const current = stats[category] ?? {};
    return Object.entries(current).map(([skill, value]) => ({
      skill,
      value,
    }));
  }, [stats, category]);

  return { data, categories };
}

export default useSkillRadarData;

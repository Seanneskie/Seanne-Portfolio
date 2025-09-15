"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSkillRadarData, {
  SkillCategoryStats,
} from "@/hooks/use-skill-radar-data";

export interface SkillsRadarChartProps {
  stats: SkillCategoryStats;
}

/**
 * Displays developer skills in a radar chart with category filtering.
 *
 * @example
 * ```tsx
 * const stats = {
 *   language: { TypeScript: 80, JavaScript: 60 },
 *   framework: { React: 70, Next: 50 },
 * };
 * <SkillsRadarChart stats={stats} />
 * ```
 */
export default function SkillsRadarChart({
  stats,
}: SkillsRadarChartProps): JSX.Element | null {
  const [category, setCategory] = useState<string>(Object.keys(stats)[0] ?? "");
  const { data, categories } = useSkillRadarData(stats, category);

  if (!category) return null;

  return (
    <div className="space-y-4" aria-label="Skill radar chart section">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger aria-label="Select skill category">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data} role="img" aria-label={`${category} proficiency radar chart`}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis />
          <Radar
            name={category}
            dataKey="value"
            stroke="#14b8a6"
            fill="#14b8a6"
            fillOpacity={0.4}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

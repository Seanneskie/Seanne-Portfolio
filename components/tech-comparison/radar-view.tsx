import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TechItem, RatingType } from "@/types/tech-comparison";

export interface RadarViewProps {
  item: TechItem;
  ratingTypes: RatingType[];
}

export function RadarView({ item, ratingTypes }: RadarViewProps): React.ReactElement {
  const data = ratingTypes.map((rt) => ({
    metric: rt.label,
    value: item.ratings[rt.id] ?? 0,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <RadarChart data={data} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
          <Radar name={item.name} dataKey="value" stroke="#0ea5e9" fill="#14b8a6" fillOpacity={0.4} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarView;

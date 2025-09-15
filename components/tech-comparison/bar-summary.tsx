import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
} from "recharts";
import { TechItem, RatingTypesId } from "@/types/tech-comparison";

export interface BarSummaryProps {
  items: TechItem[];
  rating: RatingTypesId;
  label: string;
}

export function BarSummary({ items, rating }: BarSummaryProps): React.ReactElement {
  const data = items
    .map((it) => ({ name: it.name, value: it.ratings[rating] ?? 0 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" height={60} />
          <YAxis domain={[0, 5]} tickCount={6} />
          <ReTooltip />
          <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarSummary;

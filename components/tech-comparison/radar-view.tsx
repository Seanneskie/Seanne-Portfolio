import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { TechItem, RatingType } from "@/types/tech-comparison";

const RADAR_COLORS = ["#0ea5e9", "#6366f1", "#10b981", "#f97316", "#a855f7", "#ef4444"] as const;

export interface RadarChartDataPoint {
  metric: string;
  [dataKey: string]: number | string;
}

export interface RadarViewProps {
  items: TechItem[];
  ratingTypes: RatingType[];
  maxSeries?: number;
}

const DEFAULT_MAX_SERIES = 5;

/**
 * Transforms the provided items and rating types into a Recharts-friendly dataset.
 */
export function buildRadarChartData(
  items: TechItem[],
  ratingTypes: RatingType[]
): RadarChartDataPoint[] {
  return ratingTypes.map((ratingType) => {
    const entry: RadarChartDataPoint = { metric: ratingType.label };

    items.forEach((techItem) => {
      entry[techItem.id] = techItem.ratings[ratingType.id] ?? 0;
    });

    return entry;
  });
}

interface RadarSeriesConfig {
  dataKey: string;
  name: string;
  stroke: string;
  fill: string;
}

function createSeriesConfig(items: TechItem[]): RadarSeriesConfig[] {
  return items.map((techItem, index) => {
    const color = RADAR_COLORS[index % RADAR_COLORS.length];

    return {
      dataKey: techItem.id,
      name: techItem.name,
      stroke: color,
      fill: color,
    };
  });
}

export function RadarView({
  items,
  ratingTypes,
  maxSeries = DEFAULT_MAX_SERIES,
}: RadarViewProps): React.ReactElement {
  const itemsToDisplay = React.useMemo<TechItem[]>(() => items.slice(0, maxSeries), [items, maxSeries]);
  const chartData = React.useMemo<RadarChartDataPoint[]>(
    () => buildRadarChartData(itemsToDisplay, ratingTypes),
    [itemsToDisplay, ratingTypes]
  );
  const seriesConfig = React.useMemo<RadarSeriesConfig[]>(
    () => createSeriesConfig(itemsToDisplay),
    [itemsToDisplay]
  );

  if (itemsToDisplay.length === 0) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20 text-sm text-muted-foreground">
        No comparison data available.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <RadarChart data={chartData} margin={{ top: 16, right: 24, bottom: 16, left: 24 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
          {seriesConfig.map((series) => (
            <Radar
              key={series.dataKey}
              name={series.name}
              dataKey={series.dataKey}
              stroke={series.stroke}
              strokeWidth={2}
              fill={series.fill}
              fillOpacity={0.25}
            />
          ))}
          <Tooltip formatter={(value: number | string) => `${value}/5`} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarView;
export { DEFAULT_MAX_SERIES as RADAR_DEFAULT_MAX_SERIES };

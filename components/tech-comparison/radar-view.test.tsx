import React from "react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { RadarView, buildRadarChartData } from "./radar-view";
import type { RatingType, TechItem } from "@/types/tech-comparison";

const radarProps: Array<{ dataKey?: string }> = [];

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive">{children}</div>
  ),
  RadarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="radar-chart">{children}</div>
  ),
  PolarGrid: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="polar-grid">{children}</div>
  ),
  PolarAngleAxis: () => <div data-testid="polar-angle-axis" />,
  PolarRadiusAxis: () => <div data-testid="polar-radius-axis" />,
  Legend: () => <div data-testid="legend" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Radar: ({ dataKey }: { dataKey?: string }) => {
    radarProps.push({ dataKey });
    return <div data-testid="radar-series" data-key={dataKey} />;
  },
}));

(globalThis as { React?: typeof React }).React = React;

const ratingTypes: RatingType[] = [
  { id: "proficiency", label: "Proficiency", description: "", scale: {} },
  { id: "recency", label: "Recency", description: "", scale: {} },
];

const items: TechItem[] = [
  {
    id: "alpha",
    name: "Alpha",
    type: "Library",
    category: "frontend",
    ratings: {
      proficiency: 5,
      recency: 3,
      production_use: 0,
      depth: 0,
      preference: 0,
    },
  },
  {
    id: "beta",
    name: "Beta",
    type: "Library",
    category: "frontend",
    ratings: {
      proficiency: 4,
      recency: 4,
      production_use: 0,
      depth: 0,
      preference: 0,
    },
  },
  {
    id: "gamma",
    name: "Gamma",
    type: "Library",
    category: "frontend",
    ratings: {
      proficiency: 2,
      recency: 5,
      production_use: 0,
      depth: 0,
      preference: 0,
    },
  },
];

describe("RadarView", () => {
  beforeEach(() => {
    radarProps.length = 0;
  });

  it("builds radar data points for every item", () => {
    const data = buildRadarChartData(items, ratingTypes);

    expect(data).toHaveLength(ratingTypes.length);
    data.forEach((point) => {
      expect(point.metric).toBeDefined();
      expect(point.alpha).toBeTypeOf("number");
      expect(point.beta).toBeTypeOf("number");
      expect(point.gamma).toBeTypeOf("number");
    });
  });

  it("limits the rendered radar series", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<RadarView items={items} ratingTypes={ratingTypes} maxSeries={2} />);
    });

    expect(radarProps).toHaveLength(2);
    expect(radarProps.map((props) => props.dataKey)).toEqual(["alpha", "beta"]);

    root.unmount();
    container.remove();
  });

  it("renders a fallback when no items are provided", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<RadarView items={[]} ratingTypes={ratingTypes} />);
    });

    expect(container.textContent).toContain("No comparison data available");

    root.unmount();
    container.remove();
  });
});

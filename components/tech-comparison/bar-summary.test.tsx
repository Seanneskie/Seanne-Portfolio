import React from "react";
import type { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import type { TechItem } from "@/types/tech-comparison";
import BarSummary, { CHART_BAR_FILL } from "./bar-summary";

type ChartContainerProps = PropsWithChildren<Record<string, unknown>>;
type BarStubProps = ChartContainerProps & { fill?: string };

vi.mock("recharts", async () => {
  const ReactModule = await import("react");

  const Container = ({ children }: ChartContainerProps) =>
    ReactModule.createElement("div", null, children);

  const Static = () => ReactModule.createElement("div");

  const BarStub = ({ fill }: BarStubProps) =>
    ReactModule.createElement("div", { "data-testid": "chart-bar", "data-fill": fill });

  return {
    __esModule: true,
    ResponsiveContainer: Container,
    BarChart: Container,
    CartesianGrid: Static,
    XAxis: Static,
    YAxis: Static,
    Tooltip: Static,
    Bar: BarStub,
  };
});

(globalThis as { React?: typeof React }).React = React;

describe("BarSummary", () => {
  it("renders bars using the chart theme color", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const items: TechItem[] = [
      {
        id: "react",
        name: "React",
        type: "library",
        category: "frontend",
        ratings: {
          proficiency: 4,
          production_use: 4,
          recency: 5,
          depth: 4,
          preference: 5,
        },
      },
    ];

    await act(async () => {
      root.render(<BarSummary items={items} rating="proficiency" label="Proficiency" />);
    });

    const bar = container.querySelector<HTMLElement>("[data-testid='chart-bar']");

    expect(bar).not.toBeNull();
    expect(CHART_BAR_FILL).toBe("hsl(var(--chart-bar))");
    expect(bar?.getAttribute("data-fill")).toBe(CHART_BAR_FILL);

    root.unmount();
    container.remove();
  });
});

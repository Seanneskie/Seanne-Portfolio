import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import TechComparisonDashboard from "./tech-comparison-dashboard";
import { TechComparisonData } from "@/types/tech-comparison";

vi.mock("./theme-dot", () => ({ __esModule: true, default: () => <div /> }));
vi.mock("./rating-type-picker", () => ({ __esModule: true, default: () => <div /> }));
vi.mock("./category-tabs", () => ({ __esModule: true, default: () => <div /> }));
vi.mock("./item-list", () => ({ __esModule: true, default: () => <div /> }));
vi.mock("./radar-view", () => ({
  __esModule: true,
  default: () => <div />,
  RADAR_DEFAULT_MAX_SERIES: 5,
}));
vi.mock("./bar-summary", () => ({ __esModule: true, default: () => <div /> }));
vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardDescription: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/components/ui/tooltip", () => ({ TooltipProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock("@/components/ui/separator", () => ({ Separator: () => <div /> }));

(globalThis as { React?: typeof React }).React = React;

describe("TechComparisonDashboard", () => {
  it("renders heading", async () => {
    const data: TechComparisonData = {
      lastUpdated: "2024-01-01",
      rating_types: [{ id: "proficiency", label: "Proficiency", description: "", scale: {} }],
      categories: [{ id: "web", label: "Web" }],
      items: [
        {
          id: "1",
          name: "React",
          type: "Library",
          category: "web",
          ratings: { proficiency: 5, production_use: 0, recency: 0, depth: 0, preference: 0 },
        },
      ],
    };

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<TechComparisonDashboard data={data} />);
    });

    expect(container.textContent).toContain("Tech Stack Comparison");

    root.unmount();
    container.remove();
  });
});

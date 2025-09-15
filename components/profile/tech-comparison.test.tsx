import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import TechComparison from "./tech-comparison";
import rawData from "@/public/data/tech-comparison.json" assert { type: "json" };
import { type TechComparisonData } from "@/types/tech-comparison";
import { normalizeTechComparisonData } from "@/lib/tech-comparison";

(globalThis as { React?: typeof React }).React = React;

vi.mock("@/components/tech-comparison", () => ({
  __esModule: true,
  TechComparisonDashboard: ({ data }: { data: TechComparisonData }) => (
    <div>{data.lastUpdated}</div>
  ),
}));

describe("TechComparison", () => {
  it("renders dashboard with data", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const techData = normalizeTechComparisonData(rawData);

    await act(async () => {
      root.render(<TechComparison />);
    });

    expect(container.textContent).toContain(techData.lastUpdated ?? "");

    root.unmount();
    container.remove();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, beforeAll } from "vitest";
import SkillsRadarChart from "@/components/profile/skills-radar-chart";
import { SkillCategoryStats } from "@/hooks/use-skill-radar-data";

const stats: SkillCategoryStats = {
  language: { TypeScript: 80, JavaScript: 60 },
  framework: { React: 70, Next: 50 },
};

beforeAll(() => {
  // Recharts relies on ResizeObserver which isn't available in jsdom
  class RO {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  (globalThis as unknown as { ResizeObserver: typeof RO }).ResizeObserver = RO;
});

describe("SkillsRadarChart", () => {
  it("renders and switches categories", () => {
    render(<SkillsRadarChart stats={stats} />);

    // Initial category should be language
    expect(screen.getByRole("combobox")).toHaveTextContent("language");
    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    // Switch to framework
    fireEvent.pointerDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "framework" }));

    expect(screen.getByText("React")).toBeInTheDocument();
  });
});

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useSkillRadarData, { SkillCategoryStats } from "@/hooks/use-skill-radar-data";

const stats: SkillCategoryStats = {
  language: { TypeScript: 80, JavaScript: 60 },
  framework: { React: 70 },
};

describe("useSkillRadarData", () => {
  it("returns categories and transforms data", () => {
    const { result, rerender } = renderHook(({ category }) => useSkillRadarData(stats, category), {
      initialProps: { category: "language" },
    });

    expect(result.current.categories).toEqual(["language", "framework"]);
    expect(result.current.data).toEqual([
      { skill: "TypeScript", value: 80 },
      { skill: "JavaScript", value: 60 },
    ]);

    rerender({ category: "framework" });
    expect(result.current.data).toEqual([{ skill: "React", value: 70 }]);
  });
});

import React, { useEffect } from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import useSkillStats from "./use-skill-stats";
import type { SkillStat } from "@/types/skill";

const projects = [
  { tags: ["React", "TypeScript"] },
  { tags: ["React"] },
];

const skills = [
  {
    id: "Programming",
    label: "Programming",
    groups: [
      {
        title: "Web",
        items: [
          { icon: "", name: "React" },
          { icon: "", name: "TypeScript" },
        ],
      },
    ],
  },
];

vi.mock("@/lib/use-data", () => ({
  useData: (file: string) => {
    if (file === "projects.json")
      return { data: projects, loading: false, error: null };
    return { data: skills, loading: false, error: null };
  },
}));

(globalThis as { React?: typeof React }).React = React;

describe("useSkillStats", () => {
  it("aggregates skill counts", () => {
    let result: SkillStat[] = [];

    const TestComponent = () => {
      const { stats } = useSkillStats();
      useEffect(() => {
        result = stats;
      }, [stats]);
      return null;
    };

    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<TestComponent />);
    });

    expect(result).toEqual([
      { name: "React", count: 2 },
      { name: "TypeScript", count: 1 },
    ]);

    root.unmount();
    container.remove();
  });
});

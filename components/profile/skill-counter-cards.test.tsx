import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import SkillCounterCards from "./skill-counter-cards";

vi.mock("@/hooks/use-skill-stats", () => ({
  __esModule: true,
  default: () => ({
    stats: [{ name: "React", count: 2 }],
    loading: false,
    error: null,
  }),
}));

vi.mock("./skill-counter-card", () => ({
  __esModule: true,
  default: ({ name, count }: { name: string; count: number }) => (
    <div data-name={name}>{count}</div>
  ),
}));

(globalThis as { React?: typeof React }).React = React;

describe("SkillCounterCards", () => {
  it("renders stats", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<SkillCounterCards />);
    });

    const card = container.querySelector("[data-name='React']");
    expect(card?.textContent).toBe("2");

    root.unmount();
    container.remove();
  });
});

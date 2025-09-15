import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import SkillCounterCard from "./skill-counter-card";

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: { children: React.ReactNode }) => (
    <div {...props}>{children}</div>
  ),
  CardContent: ({ children, ...props }: { children: React.ReactNode }) => (
    <div {...props}>{children}</div>
  ),
}));

(globalThis as { React?: typeof React }).React = React;

describe("SkillCounterCard", () => {
  it("renders name and count", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<SkillCounterCard name="React" count={3} />);
    });

    const heading = container.querySelector("h3");
    const count = container.querySelector("p");

    expect(heading?.textContent).toBe("React");
    expect(count?.textContent).toBe("3");

    root.unmount();
    container.remove();
  });
});

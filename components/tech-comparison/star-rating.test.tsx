import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import StarRating from "./star-rating";

vi.mock("lucide-react", () => ({
  Star: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

(globalThis as { React?: typeof React }).React = React;

describe("StarRating", () => {
  it("renders five stars", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<StarRating value={3} />);
    });

    const stars = container.querySelectorAll("svg");
    expect(stars.length).toBe(5);

    root.unmount();
    container.remove();
  });
});

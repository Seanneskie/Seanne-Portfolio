import React from "react";
import { describe, it, expect } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import RatingBar from "./rating-bar";

(globalThis as { React?: typeof React }).React = React;

describe("RatingBar", () => {
  it("sets width based on value", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<RatingBar value={3} />);
    });

    expect(container.innerHTML).toContain("width: 60%");

    root.unmount();
    container.remove();
  });
});

import React from "react";
import { describe, it, expect } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import ThemeDot from "./theme-dot";

(globalThis as { React?: typeof React }).React = React;

describe("ThemeDot", () => {
  it("renders a span element", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<ThemeDot />);
    });

    const span = container.querySelector("span");
    expect(span).not.toBeNull();

    root.unmount();
    container.remove();
  });
});

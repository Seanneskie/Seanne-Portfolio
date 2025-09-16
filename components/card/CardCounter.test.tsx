import React from "react";
import { describe, it, expect } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

import CounterCard from "./CardCounter";

(globalThis as { React?: typeof React }).React = React;

describe("CounterCard", () => {
  it("renders the provided icon within the accent dot", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <CounterCard count={10} title="Test Counter" icon="Sparkle" />
      );
    });

    const iconElement = container.querySelector(
      'span[aria-hidden="true"] svg.lucide-sparkle'
    );

    expect(iconElement).not.toBeNull();

    root.unmount();
    container.remove();
  });
});

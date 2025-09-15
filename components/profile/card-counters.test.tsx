import React from "react";
import { describe, it, expect } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import CardCounters from "./card-counters";
import { getCardCounterData } from "@/lib/profile-card-counter-data";
import { type CardCounterData } from "@/types/card-counter";

// Ensure React is available globally for components using the new JSX runtime
(globalThis as { React?: typeof React }).React = React;

describe("CardCounters", () => {
  it("renders counters from data", async () => {
    const data: CardCounterData = getCardCounterData();
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<CardCounters />);
    });

    data.items.forEach((item) => {
      expect(container.textContent).toContain(item.title);
      expect(container.textContent).toContain(item.value.toLocaleString());
    });

    root.unmount();
    container.remove();
  });
});

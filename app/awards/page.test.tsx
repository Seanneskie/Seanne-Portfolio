import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import AwardsPage from "./page";

(globalThis as { React?: typeof React }).React = React;

describe("AwardsPage", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders awards from data", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<AwardsPage />);
    });

    await act(async () => {});

    expect(container.textContent).toContain("Awards collected");
    expect(container.textContent).toContain("Hackathon");

    root.unmount();
    container.remove();
  });
});

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import AwardsPage from "./page";

describe("AwardsPage", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                icon: "fas fa-trophy",
                title: "Hackathon Champion",
                description: "Won first place at the 2024 City Hackathon.",
              },
            ]),
        })
      )
    );
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

  it("renders award from data", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<AwardsPage />);
    });

    // Allow effects to run
    await act(async () => {});

    expect(container.textContent).toContain("Hackathon Champion");

    root.unmount();
    container.remove();
  });
});

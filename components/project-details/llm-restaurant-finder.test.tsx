import React from "react";
import { describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
vi.mock("@/lib/project-images", () => ({
  getProjectImages: vi.fn(async () => []),
}));

vi.mock("./ProjectGallery", () => ({
  __esModule: true,
  default: () => <div data-testid="project-gallery" />,
}));

type LlmRestaurantFinderComponent = typeof import("./LlmRestaurantFinder")["default"];

const loadComponent = async (): Promise<LlmRestaurantFinderComponent> => {
  const module = await import("./LlmRestaurantFinder");
  return module.default;
};

(globalThis as { React?: typeof React }).React = React;

describe("LlmRestaurantFinder", () => {
  it("highlights the Gemini validation and Foursquare mapping steps", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const LlmRestaurantFinder = await loadComponent();

    await act(async () => {
      root.render(await LlmRestaurantFinder());
    });

    expect(container.textContent).toContain("Gemini");
    expect(container.textContent).toContain("Foursquare Places API");

    root.unmount();
    container.remove();
  });
});

import React, { type ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import LlmRestaurantFinder from "./LlmRestaurantFinder";

const mockedScreenshots = vi.hoisted(
  () =>
    [
      "/llm-restaurant-finder/images/dashboard-overview.png",
      "/llm-restaurant-finder/images/search-results.png",
    ] as const,
);

vi.mock("@/lib/project-images", () => ({
  getProjectImages: vi.fn(async () => [...mockedScreenshots]),
}));

vi.mock("./ProjectGallery", () => {
  interface MockGalleryImage {
    src: string;
    alt: string;
  }

  const ProjectGalleryMock = ({
    images,
  }: {
    images: MockGalleryImage[];
  }): ReactElement => (
    <div>
      {images.map((img) => (
        <span
          key={img.src}
          role="img"
          aria-label={img.alt}
          data-testid="project-gallery-image"
          data-src={img.src}
        />
      ))}
    </div>
  );

  return {
    __esModule: true,
    default: ProjectGalleryMock,
  };
});

(globalThis as { React?: typeof React }).React = React;

describe("LlmRestaurantFinder", () => {
  it("highlights the Gemini JSON validation, Foursquare mapping, and access code gate", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(await LlmRestaurantFinder());
    });

    const projectImagesModule = await import("@/lib/project-images");
    expect(vi.mocked(projectImagesModule.getProjectImages)).toHaveBeenCalledWith(
      "llm-restaurant-finder",
    );

    const textContent = container.textContent ?? "";
    expect(textContent).toContain("Gemini generates a JSON command");
    expect(textContent).toContain("Foursquare Places API parameters");
    expect(textContent).toContain("rotating access code");

    const galleryImages = container.querySelectorAll("[data-testid='project-gallery-image']");
    const galleryElements = Array.from(galleryImages);
    expect(galleryElements.length).toBeGreaterThanOrEqual(mockedScreenshots.length);
    const renderedSources = galleryElements.map((node) => node.getAttribute("data-src"));
    mockedScreenshots.forEach((src) => {
      expect(renderedSources).toContain(src);
    });
    expect(
      galleryElements.some(
        (node) => node.getAttribute("aria-label") === "LLM Restaurant Finder screenshot",
      ),
    ).toBe(true);

    root.unmount();
    container.remove();
  });
});

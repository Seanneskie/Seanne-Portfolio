import React, { type ReactElement } from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import NosqlProject from "./NosqlProject";

vi.mock("@/lib/project-images", () => ({
  getProjectImages: vi.fn(async () => [])
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

// Ensure React is globally available for components compiled with the new JSX runtime
(globalThis as { React?: typeof React }).React = React;

describe("NosqlProject", () => {
  it("renders overview and screenshot", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(await NosqlProject());
    });

    expect(container.textContent).toContain("CoffeeHub");
    const galleryImages = container.querySelectorAll(
      "[data-testid='project-gallery-image'][aria-label='NoSQL Project screenshot']"
    );
    expect(galleryImages.length).toBeGreaterThan(0);

    root.unmount();
    container.remove();
  });
});

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import NosqlProject from "./NosqlProject";

vi.mock("@/lib/project-images", () => ({
  getProjectImages: vi.fn(async () => [])
}));

vi.mock("./ProjectGallery", () => ({
  __esModule: true,
  default: ({ images }: { images: { src: string; alt: string }[] }) => (
    <div>
      {images.map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} />
      ))}
    </div>
  ),
}));

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
    const imgs = container.querySelectorAll("img[alt='NoSQL Project screenshot']");
    expect(imgs.length).toBeGreaterThan(0);

    root.unmount();
    container.remove();
  });
});

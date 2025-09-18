import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

const withBasePathMock = vi.fn((path: string) => `/base${path}`);

vi.mock("@/components/banner", () => ({
  __esModule: true,
  default: ({ title, actions }: { title: string; actions: React.ReactNode }) => (
    <section>
      <h1>{title}</h1>
      <div>{actions}</div>
    </section>
  ),
}));

vi.mock("@/components/profile", () => ({
  __esModule: true,
  default: () => <div>Profile</div>,
  MyStory: () => <div>Story</div>,
}));

vi.mock("@/components/highlights", () => ({
  __esModule: true,
  default: () => <div>Highlights</div>,
}));

vi.mock("@/components/work-experiences", () => ({
  WorkExperienceCarousel: () => <div>Carousel</div>,
}));

vi.mock("@/lib/utils", () => ({
  withBasePath: withBasePathMock,
}));

vi.mock("sonner", () => ({
  toast: {
    info: vi.fn(),
  },
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

(globalThis as { React?: typeof React }).React = React;

afterEach(() => {
  vi.clearAllMocks();
});

describe("HomePageContent", () => {
  it("renders primary call-to-action links", async () => {
    const { default: HomePageContent } = await import("./home-page-content");
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<HomePageContent />);
    });

    expect(container.querySelector("a[href='/projects']")).not.toBeNull();
    expect(container.querySelector("a[href='/contact']")).not.toBeNull();
    expect(withBasePathMock).toHaveBeenCalledWith("/static/pdfs/canete_resume.pdf");

    root.unmount();
    container.remove();
  });
});

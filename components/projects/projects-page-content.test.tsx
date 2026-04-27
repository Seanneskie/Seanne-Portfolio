import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  ),
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean }) =>
    asChild ? <>{children}</> : <button {...props}>{children}</button>,
}));

vi.mock("@/components/ui/input", () => ({
  Input: ({ children, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props}>{children}</input>
  ),
}));

vi.mock("@/components/projects/tag-filter", () => ({
  __esModule: true,
  default: ({ tags }: { tags: string[] }) => (
    <div data-testid="tag-filter" data-tags={JSON.stringify(tags)}>
      Tag filter
    </div>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

vi.mock("@/lib/utils", () => ({
  withBasePath: (value: string) => value,
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <span role="img" aria-label={alt} data-src={src} data-testid="next-image-mock" />
  ),
}));

(globalThis as { React?: typeof React }).React = React;

afterEach(() => {
  vi.clearAllMocks();
});

describe("ProjectsPageContent", () => {
  it("renders empty state when no projects match", async () => {
    const { default: ProjectsPageContent } = await import("./projects-page-content");
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<ProjectsPageContent data={[]} />);
    });

    expect(container.textContent).toContain("No projects found");

    root.unmount();
    container.remove();
  });

  it("lists project cards with detail links", async () => {
    const { default: ProjectsPageContent } = await import("./projects-page-content");
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <ProjectsPageContent
          data={[
            {
              title: "Example",
              image: "/image.png",
              alt: "Example",
              description: "Example description",
              tags: ["Tag"],
              github: "https://github.com/example",
              githubLabel: "GitHub",
              details: "project-details/example",
            },
          ]}
        />
      );
    });

    const detailsLink = container.querySelector("a[href='/project-details/example']");
    expect(detailsLink).not.toBeNull();
    expect(container.querySelector("[data-testid='tag-filter']")?.getAttribute("data-tags")).toBe(
      '["Tag"]'
    );

    root.unmount();
    container.remove();
  });

  it("shows summary stats reflecting the data", async () => {
    const { default: ProjectsPageContent } = await import("./projects-page-content");
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <ProjectsPageContent
          data={[
            {
              title: "Alpha",
              image: "/a.png",
              alt: "Alpha",
              tags: ["Next"],
              github: "https://github.com/example/alpha",
              details: "project-details/alpha",
            },
            {
              title: "Beta",
              image: "/b.png",
              alt: "Beta",
              tags: ["Next", "TS"],
              github: null,
              details: null,
            },
          ]}
        />
      );
    });

    expect(container.textContent).toContain("Showing 2 of 2");

    root.unmount();
    container.remove();
  });
});

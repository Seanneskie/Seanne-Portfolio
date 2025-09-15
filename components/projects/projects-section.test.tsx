import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

vi.mock("@/lib/use-data", () => ({
  useData: () => ({
    data: [
      {
        title: "Test",
        image: "",
        alt: "alt",
        tags: [],
        github: null,
        githubLabel: null,
        details: "project-details/test",
      },
    ],
    loading: false,
    error: null,
  }),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: { children: React.ReactNode }) => (
    <div {...props}>{children}</div>
  ),
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) =>
    asChild ? <>{children}</> : <button>{children}</button>,
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

vi.mock("@/lib/utils", () => ({
  withBasePath: (p: string) => p,
}));

import ProjectsSection from "./projects-section";

(globalThis as { React?: typeof React }).React = React;

describe("ProjectsSection", () => {
  it("links to provided project details path", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<ProjectsSection />);
    });

    const link = container.querySelector("a[href='/project-details/test']");
    expect(link).not.toBeNull();

    root.unmount();
    container.remove();
  });
});


import React, { type ReactElement } from "react";
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

vi.mock("next/image", () => {
  interface MockNextImageProps {
    alt: string;
    src: string;
    className?: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    placeholder?: "blur" | "empty";
    blurDataURL?: string;
    style?: React.CSSProperties;
  }

  const MockNextImage = ({
    alt,
    src,
    className,
    fill,
    sizes,
    priority,
    placeholder,
    blurDataURL,
    style,
  }: MockNextImageProps): ReactElement => (
    <span
      role="img"
      aria-label={alt}
      data-src={src}
      data-fill={fill ? "true" : undefined}
      data-sizes={sizes}
      data-priority={priority ? "true" : undefined}
      data-placeholder={placeholder}
      data-blur={blurDataURL}
      className={className}
      style={style}
      data-testid="next-image-mock"
    />
  );

  return {
    __esModule: true,
    default: MockNextImage,
  };
});

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


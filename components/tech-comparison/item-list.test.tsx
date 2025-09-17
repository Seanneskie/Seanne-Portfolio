import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import ItemList from "./item-list";
import { TechItem, Category } from "@/types/tech-comparison";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardDescription: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLSpanElement>) => (
    <span {...props}>{children}</span>
  ),
}));

vi.mock("./theme-dot", () => ({
  __esModule: true,
  default: () => <span />,
}));

vi.mock("./star-rating", () => ({
  __esModule: true,
  default: () => <div />,
}));

vi.mock("./rating-bar", () => ({
  __esModule: true,
  default: () => <div />,
}));

vi.mock("./category-icon", () => ({
  __esModule: true,
  CategoryIcon: ({ categoryId }: { categoryId: string }) => (
    <span data-testid={`category-icon-${categoryId}`} />
  ),
  default: ({ categoryId }: { categoryId: string }) => (
    <span data-testid={`category-icon-${categoryId}`} />
  ),
}));

(globalThis as { React?: typeof React }).React = React;

describe("ItemList", () => {
  it("renders item names", async () => {
    const items: TechItem[] = [
      {
        id: "1",
        name: "React",
        type: "Library",
        category: "web",
        ratings: { proficiency: 5, production_use: 0, recency: 0, depth: 0, preference: 0 },
      },
    ];

    const categoriesById: Record<string, Category> = {
      web: { id: "web", label: "Web" },
    };

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <ItemList items={items} selectedRating="proficiency" categoriesById={categoriesById} />
      );
    });

    expect(container.textContent).toContain("React");
    expect(container.querySelector("[data-testid='category-icon-web']")).not.toBeNull();

    root.unmount();
    container.remove();
  });
});

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import CategoryTabs from "./category-tabs";
import { Category } from "@/types/tech-comparison";

vi.mock("@/components/ui/tabs", () => ({
  Tabs: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-component="tabs" {...props}>
      {children}
    </div>
  ),
  TabsList: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
    <div data-component="tabs-list" {...props}>
      {children}
    </div>
  ),
  TabsTrigger: ({ children, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button data-component="tabs-trigger" {...props}>
      {children}
    </button>
  ),
}));

vi.mock("./category-icon", () => ({
  __esModule: true,
  CategoryIcon: ({ categoryId }: { categoryId: string }) => (
    <span data-testid={`icon-${categoryId}`} />
  ),
  default: ({ categoryId }: { categoryId: string }) => (
    <span data-testid={`icon-${categoryId}`} />
  ),
}));

(globalThis as { React?: typeof React }).React = React;

describe("CategoryTabs", () => {
  it("renders category labels", async () => {
    const categories: Category[] = [{ id: "web", label: "Web" }];

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <CategoryTabs categories={categories} value="all" onValueChange={() => {}} />
      );
    });

    expect(container.textContent).toContain("Web");

    root.unmount();
    container.remove();
  });

  it("applies overflow handling classes and renders icons", async () => {
    const categories: Category[] = [
      { id: "web", label: "Web" },
      { id: "mobile", label: "Mobile" },
    ];

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <CategoryTabs categories={categories} value="all" onValueChange={() => {}} />
      );
    });

    const list = container.querySelector<HTMLDivElement>("[data-component='tabs-list']");
    const triggers = container.querySelectorAll<HTMLButtonElement>("[data-component='tabs-trigger']");
    const firstCategoryIcon = container.querySelector("[data-testid='icon-web']");
    const allTrigger = container.querySelector<HTMLButtonElement>("button[value='all']");
    const gradientOverlays = container.querySelectorAll("span[aria-hidden='true']");

    expect(list?.className).toContain("overflow-x-auto");
    expect(list?.className).toContain("[&::-webkit-scrollbar]:hidden");
    expect(list?.getAttribute("aria-label")).toBe("Technology categories");
    triggers.forEach((trigger) => {
      expect(trigger.className).toContain("flex-none");
      expect(trigger.className).toContain("rounded-full");
    });
    expect(firstCategoryIcon).not.toBeNull();
    expect(allTrigger?.querySelector("svg")).not.toBeNull();
    expect(gradientOverlays.length).toBeGreaterThanOrEqual(2);

    root.unmount();
    container.remove();
  });
});

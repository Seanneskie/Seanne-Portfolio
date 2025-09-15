import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import CategoryTabs from "./category-tabs";
import { Category } from "@/types/tech-comparison";

vi.mock("@/components/ui/tabs", () => ({
  Tabs: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TabsList: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TabsTrigger: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
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
});

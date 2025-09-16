import React from "react";
import { describe, expect, it } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { useTechComparison, type UseTechComparisonResult } from "./use-tech-comparison";
import type { TechComparisonData } from "@/types/tech-comparison";

interface HookTestProps {
  data: TechComparisonData;
  onRender: (value: UseTechComparisonResult) => void;
}

function HookTestComponent({ data, onRender }: HookTestProps): React.ReactElement | null {
  const values = useTechComparison(data);

  React.useEffect(() => {
    onRender(values);
  }, [values, onRender]);

  return null;
}

(globalThis as { React?: typeof React }).React = React;

function createTestData(): TechComparisonData {
  return {
    lastUpdated: "2024-01-01",
    rating_types: [
      { id: "proficiency", label: "Proficiency", description: "", scale: {} },
      { id: "recency", label: "Recency", description: "", scale: {} },
    ],
    categories: [
      { id: "frontend", label: "Frontend" },
      { id: "backend", label: "Backend" },
      { id: "ops", label: "Operations" },
    ],
    items: [
      {
        id: "1",
        name: "React",
        type: "Library",
        category: "frontend",
        ratings: {
          proficiency: 5,
          production_use: 4,
          recency: 3,
          depth: 4,
          preference: 5,
        },
      },
      {
        id: "2",
        name: "Node.js",
        type: "Runtime",
        category: "backend",
        ratings: {
          proficiency: 4,
          production_use: 5,
          recency: 4,
          depth: 3,
          preference: 4,
        },
      },
      {
        id: "3",
        name: "Astro",
        type: "Framework",
        category: "frontend",
        ratings: {
          proficiency: 3,
          production_use: 2,
          recency: 5,
          depth: 2,
          preference: 3,
        },
      },
    ],
  };
}

describe("useTechComparison", () => {
  it("updates filtered items when rating changes", async () => {
    const data = createTestData();
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    let latest: UseTechComparisonResult | undefined;
    const handleRender = (value: UseTechComparisonResult): void => {
      latest = value;
    };

    await act(async () => {
      root.render(<HookTestComponent data={data} onRender={handleRender} />);
    });

    expect(latest?.selectedRating).toBe("proficiency");
    expect(latest?.filteredItems.map((item) => item.id)).toEqual(["1", "2", "3"]);
    expect(latest?.topItems.map((item) => item.id)).toEqual(["1", "2", "3"]);
    expect(latest?.selectedCategoryLabel).toBe("All categories");

    await act(async () => {
      latest?.setSelectedRating("recency");
    });

    expect(latest?.selectedRating).toBe("recency");
    expect(latest?.filteredItems.map((item) => item.id)).toEqual(["3", "2", "1"]);

    root.unmount();
    container.remove();
  });

  it("filters items by category and exposes a category map", async () => {
    const data = createTestData();
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    let latest: UseTechComparisonResult | undefined;
    const handleRender = (value: UseTechComparisonResult): void => {
      latest = value;
    };

    await act(async () => {
      root.render(<HookTestComponent data={data} onRender={handleRender} />);
    });

    await act(async () => {
      latest?.setSelectedCategory("backend");
    });

    expect(latest?.selectedCategory).toBe("backend");
    expect(latest?.filteredItems).toHaveLength(1);
    expect(latest?.filteredItems[0]?.id).toBe("2");
    expect(latest?.categoriesById.backend?.label).toBe("Backend");
    expect(latest?.topItems.map((item) => item.id)).toEqual(["2"]);
    expect(latest?.selectedCategoryLabel).toBe("Backend");

    root.unmount();
    container.remove();
  });

  it("falls back to the first item when a category has no matches", async () => {
    const data = createTestData();
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    let latest: UseTechComparisonResult | undefined;
    const handleRender = (value: UseTechComparisonResult): void => {
      latest = value;
    };

    await act(async () => {
      root.render(<HookTestComponent data={data} onRender={handleRender} />);
    });

    await act(async () => {
      latest?.setSelectedCategory("ops");
    });

    expect(latest?.filteredItems).toHaveLength(0);
    expect(latest?.topItem?.id).toBe("1");
    expect(latest?.topItems).toEqual([]);
    expect(latest?.selectedCategoryLabel).toBe("Operations");

    root.unmount();
    container.remove();
  });

  it("limits the number of top items returned", async () => {
    const data = createTestData();
    data.items.push(
      {
        id: "4",
        name: "Next.js",
        type: "Framework",
        category: "frontend",
        ratings: {
          proficiency: 5,
          production_use: 5,
          recency: 4,
          depth: 5,
          preference: 5,
        },
      },
      {
        id: "5",
        name: "Remix",
        type: "Framework",
        category: "frontend",
        ratings: {
          proficiency: 4,
          production_use: 3,
          recency: 3,
          depth: 3,
          preference: 4,
        },
      },
      {
        id: "6",
        name: "SolidStart",
        type: "Framework",
        category: "frontend",
        ratings: {
          proficiency: 4,
          production_use: 2,
          recency: 4,
          depth: 3,
          preference: 4,
        },
      }
    );

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    let latest: UseTechComparisonResult | undefined;
    const handleRender = (value: UseTechComparisonResult): void => {
      latest = value;
    };

    await act(async () => {
      root.render(<HookTestComponent data={data} onRender={handleRender} />);
    });

    expect(latest?.topItems).toHaveLength(5);

    root.unmount();
    container.remove();
  });
});

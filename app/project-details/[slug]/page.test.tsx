import React from "react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

// Ensure React is available globally
(globalThis as { React?: typeof React }).React = React;

describe("ProjectDetailPage", () => {
  it("invokes notFound for unknown slugs", async () => {
    const { default: ProjectDetailPage } = await import("./page");
    const { notFound } = await import("next/navigation");

    await ProjectDetailPage({ params: Promise.resolve({ slug: "missing" }) });

    expect(notFound).toHaveBeenCalled();
  });
});


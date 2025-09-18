import React from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

(globalThis as { React?: typeof React }).React = React;

describe("ProjectDetailPage", () => {
  it("invokes notFound for unknown slugs", async () => {
    const { default: ProjectDetailPage } = await import("./page");
    const { notFound } = await import("next/navigation");

    await ProjectDetailPage({ params: Promise.resolve({ slug: "missing" }) });

    expect(notFound).toHaveBeenCalled();
  });

  it("generates metadata for known project", async () => {
    const { generateMetadata } = await import("./page");

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "ai-coin-detector" }),
    });

    expect(metadata.title).toContain("AI Coin Detector");
    expect(metadata.description).toContain("Django");
  });
});

import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

import { buildSparklinePoints, formatStatusLabel } from "./design-wire-report-tabs";

(globalThis as { React?: typeof React }).React = React;

describe("DesignWireReportTabs", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders overview metrics and highlights by default", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const { default: DesignWireReportTabs } = await import("./design-wire-report-tabs");

    await act(async () => {
      root.render(<DesignWireReportTabs />);
    });

    const tabButtons = container.querySelectorAll("[role='tab']");
    expect(tabButtons.length).toBe(4);
    expect(container.textContent).toContain("Total Reports");
    expect(container.textContent).toContain("Automated ingestion");

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("switches to other tabs when triggers are activated", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const { default: DesignWireReportTabs } = await import("./design-wire-report-tabs");

    await act(async () => {
      root.render(<DesignWireReportTabs />);
    });

    const performanceTrigger = Array.from(
      container.querySelectorAll<HTMLButtonElement>("[role='tab']"),
    ).find((element) => element.textContent?.includes("Performance"));
    expect(performanceTrigger).toBeDefined();

    await act(async () => {
      performanceTrigger?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const activePerformanceTab = container.querySelector(
      "[data-slot='tabs-content'][data-state='active']",
    );
    expect(activePerformanceTab?.textContent).toContain("Submission volume trend");

    const exportsTrigger = Array.from(
      container.querySelectorAll<HTMLButtonElement>("[role='tab']"),
    ).find((element) => element.textContent?.includes("Exports"));
    expect(exportsTrigger).toBeDefined();

    await act(async () => {
      exportsTrigger?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const activeExportTab = container.querySelector(
      "[data-slot='tabs-content'][data-state='active']",
    );
    expect(activeExportTab?.textContent).toContain("Quarterly finance package");

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });
});

describe("design wire helpers", () => {
  it("normalizes sparkline points to a bounded polyline string", () => {
    const polyline = buildSparklinePoints([
      { month: "Jan", total: 10 },
      { month: "Feb", total: 20 },
      { month: "Mar", total: 30 },
    ]);

    const segments = polyline.split(" ");
    expect(segments).toHaveLength(3);
    expect(segments[0]).toBe("0.00,100.00");
    expect(segments[segments.length - 1]).toBe("100.00,0.00");
  });

  it("formats status labels for activity badges", () => {
    expect(formatStatusLabel("synced")).toBe("Sync");
    expect(formatStatusLabel("exported")).toBe("Export");
    expect(formatStatusLabel("generated")).toBe("Generated");
    expect(formatStatusLabel("warning")).toBe("Attention");
  });
});

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import OrderInventoryManagementApi from "./OrderInventoryManagementApi";

vi.mock("@/lib/project-images", () => ({
  getProjectImages: vi.fn(async () => [])
}));

// Ensure React is globally available for components compiled with the new JSX runtime
(globalThis as { React?: typeof React }).React = React;
describe("OrderInventoryManagementApi", () => {
  it("mentions local PostgreSQL connection", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(await OrderInventoryManagementApi());
    });

    expect(container.textContent).toContain("local PostgreSQL");

    root.unmount();
    container.remove();
  });
});

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

vi.mock("lucide-react", () => ({
  __esModule: true,
  Sparkles: ({ ...props }: React.SVGProps<SVGSVGElement>) => <svg data-icon="sparkles" {...props} />,
  Layers3: ({ ...props }: React.SVGProps<SVGSVGElement>) => <svg data-icon="layers-3" {...props} />,
  LayoutDashboard: ({ ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg data-icon="layout-dashboard" {...props} />
  ),
  Server: ({ ...props }: React.SVGProps<SVGSVGElement>) => <svg data-icon="server" {...props} />,
  Database: ({ ...props }: React.SVGProps<SVGSVGElement>) => <svg data-icon="database" {...props} />,
  BarChartBig: ({ ...props }: React.SVGProps<SVGSVGElement>) => <svg data-icon="bar-chart-big" {...props} />,
  Cog: ({ ...props }: React.SVGProps<SVGSVGElement>) => <svg data-icon="cog" {...props} />,
  Map: ({ ...props }: React.SVGProps<SVGSVGElement>) => <svg data-icon="map" {...props} />,
  GitGraph: ({ ...props }: React.SVGProps<SVGSVGElement>) => <svg data-icon="git-graph" {...props} />,
  Code2: ({ ...props }: React.SVGProps<SVGSVGElement>) => <svg data-icon="code-2" {...props} />,
}));

import { CategoryIcon } from "./category-icon";

(globalThis as { React?: typeof React }).React = React;

describe("CategoryIcon", () => {
  it("renders mapped icon for known categories", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<CategoryIcon categoryId="fullstack" />);
    });

    const icon = container.querySelector("svg[data-icon='layers-3']");
    expect(icon).not.toBeNull();

    root.unmount();
    container.remove();
  });

  it("falls back to a default icon when category is unknown", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<CategoryIcon categoryId="unknown" className="text-red-500" />);
    });

    const icon = container.querySelector("svg[data-icon='sparkles']");
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute("class") ?? "").toContain("text-red-500");

    root.unmount();
    container.remove();
  });
});

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import RatingTypePicker from "./rating-type-picker";
import { RatingType } from "@/types/tech-comparison";

vi.mock("@/components/ui/select", () => ({
  Select: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-value={value}>{children}</div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectValue: () => <span />,
}));

(globalThis as { React?: typeof React }).React = React;

describe("RatingTypePicker", () => {
  it("displays rating type labels", async () => {
    const ratingTypes: RatingType[] = [
      { id: "proficiency", label: "Proficiency", description: "", scale: {} },
    ];

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <RatingTypePicker ratingTypes={ratingTypes} value="proficiency" onChange={() => {}} />
      );
    });

    expect(container.textContent).toContain("Proficiency");

    root.unmount();
    container.remove();
  });
});

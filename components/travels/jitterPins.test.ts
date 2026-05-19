import { describe, expect, it } from "vitest";
import { jitterPins } from "./jitterPins";
import type { TravelEntry } from "./types";

function mk(slug: string, coords: [number, number]): TravelEntry & { coords: [number, number] } {
  return {
    slug,
    title: slug,
    date: "2025-08-19",
    location: slug,
    tags: [],
    coords,
  };
}

describe("jitterPins", () => {
  it("returns input coords unchanged when no collisions", () => {
    const out = jitterPins([mk("a", [7.1, 125.6]), mk("b", [7.2, 125.7])]);
    expect(out.get("a")).toEqual([7.1, 125.6]);
    expect(out.get("b")).toEqual([7.2, 125.7]);
  });

  it("fans out pins that share the same coords", () => {
    const out = jitterPins([
      mk("starbucks", [7.0988, 125.6311]),
      mk("altitude", [7.0988, 125.6311]),
    ]);
    const a = out.get("starbucks")!;
    const b = out.get("altitude")!;
    expect(a).not.toEqual(b);
    // Both stay within ~30m of the source point — same building footprint.
    expect(Math.abs(a[0] - 7.0988)).toBeLessThan(0.0003);
    expect(Math.abs(b[0] - 7.0988)).toBeLessThan(0.0003);
  });

  it("distinguishes coords that differ past the precision threshold", () => {
    const out = jitterPins([mk("a", [7.0988, 125.6311]), mk("b", [7.0989, 125.6311])]);
    expect(out.get("a")).toEqual([7.0988, 125.6311]);
    expect(out.get("b")).toEqual([7.0989, 125.6311]);
  });
});

import { describe, expect, it } from "vitest";

import rawData from "@/public/data/tech-comparison.json" assert { type: "json" };
import { normalizeTechComparisonData } from "./tech-comparison";

describe("normalizeTechComparisonData", () => {
  it("returns structured data for valid JSON", () => {
    const data = normalizeTechComparisonData(rawData);

    expect(data.rating_types).toHaveLength(rawData.rating_types.length);
    expect(data.rating_types[0]).toMatchObject({
      id: "proficiency",
      label: rawData.rating_types[0]?.label,
    });
    expect(Object.keys(data.items[0]?.ratings ?? {})).toEqual([
      "proficiency",
      "production_use",
      "recency",
      "depth",
      "preference",
    ]);
  });

  it("throws when rating identifiers are invalid", () => {
    const invalid = structuredClone(rawData);
    invalid.rating_types = [
      ...invalid.rating_types,
      {
        ...invalid.rating_types[0],
        id: "unknown",
      },
    ];

    expect(() => normalizeTechComparisonData(invalid)).toThrow(
      /rating_types\[5\]\.id is not a valid rating type identifier/,
    );
  });
});

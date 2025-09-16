import { describe, expect, it } from "vitest";

import { parseCardCounterData } from "./profile-card-counter-data";

describe("parseCardCounterData", () => {
  it("returns typed card counter data when the shape is valid", () => {
    const result = parseCardCounterData({
      lastUpdated: "2025-01-01",
      items: [
        {
          id: "example",
          title: "Example",
          value: 5,
          description: "Example description",
          theme: "ocean",
          order: 1,
          icon: "Sparkles",
        },
      ],
    });

    expect(result.lastUpdated).toBe("2025-01-01");
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      id: "example",
      title: "Example",
      value: 5,
      description: "Example description",
      theme: "ocean",
      order: 1,
      icon: "Sparkles",
    });
  });

  it("throws when a theme value is not supported", () => {
    expect(() =>
      parseCardCounterData({
        lastUpdated: "2025-01-01",
        items: [
          {
            id: "invalid-theme",
            title: "Invalid",
            value: 1,
            theme: "magenta",
            order: 1,
          },
        ],
      })
    ).toThrow(/theme/);
  });

  it("throws when an icon is not part of the lucide-react library", () => {
    expect(() =>
      parseCardCounterData({
        lastUpdated: "2025-01-01",
        items: [
          {
            id: "invalid-icon",
            title: "Invalid",
            value: 1,
            theme: "ocean",
            order: 1,
            icon: "FontAwesomeIcon",
          },
        ],
      })
    ).toThrow(/unsupported icon/);
  });
});

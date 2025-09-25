import React from "react";
import { describe, expect, it } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

import HobbyAchievements, {
  HOBBY_ACHIEVEMENTS,
  STEAM_PROFILE_URL,
} from "./hobby-achievements";

(globalThis as { React?: typeof React }).React = React;

describe("HobbyAchievements", () => {
  it("renders achievements and the Steam profile link", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<HobbyAchievements />);
    });

    expect(container.querySelector("#hobbies")).not.toBeNull();
    expect(container.textContent).toContain("Game Achievements");

    HOBBY_ACHIEVEMENTS.forEach((achievement) => {
      expect(container.textContent).toContain(achievement.title);
      expect(container.textContent).toContain(achievement.highlight);
    });

    const steamLink = container.querySelector(`a[href='${STEAM_PROFILE_URL}']`);

    expect(steamLink).not.toBeNull();
    expect(steamLink?.getAttribute("target")).toBe("_blank");

    root.unmount();
    container.remove();
  });
});

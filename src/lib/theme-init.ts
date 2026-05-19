/**
 * Inline FOUC-prevention script for theme.
 *
 * Runs synchronously in <head> before any paint. Reads the persisted
 * preference from localStorage["theme"] ("dark" | "light" | "system"), falls
 * back to `prefers-color-scheme`, and toggles the `.dark` class on <html>.
 *
 * Mirrors the contract of next-themes (same storage key, same class name)
 * so the existing Tailwind dark-mode selectors keep working unchanged.
 *
 * The matching React island (`ThemeToggle`) reads/writes the same key.
 */
export const THEME_STORAGE_KEY = "theme";

export const themeInitScript = /* js */ `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored === "dark" || stored === "light" ? stored : (prefersDark ? "dark" : "light");
    var root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;

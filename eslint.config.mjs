import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";

// Flat config for the Astro/React island codebase. Replaces the old
// `next/core-web-vitals` + `next/typescript` presets removed in the Next.js
// cutover. Keeps the rules that actually fired on this repo (TS recommended
// + react-hooks) without pulling the Next plugin back in.
//
// The Next presets used to register browser + node globals for us; the flat
// config has to declare them explicitly or `no-undef` flags every `window`,
// `document`, `process`, etc. React islands run in the browser, build/config
// scripts run in node, and tests touch both — so both global sets are applied
// across TS/JS, with node-only scripts getting `__dirname`/CommonJS on top.
export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // TypeScript resolves identifiers itself, including type-only DOM names
      // (RequestInit, RequestInfo, …) that have no runtime global. `no-undef`
      // only duplicates that and false-positives on those types, so it's off
      // for TS per typescript-eslint's own guidance.
      "no-undef": "off",
      // Underscore-prefixed args/vars are intentionally unused (e.g. dropped
      // shim props), matching the existing eslint-disable conventions.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  // Build/config scripts run in plain node (ESM): give them node globals.
  {
    files: ["**/*.mjs", "*.config.{js,mjs}"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];

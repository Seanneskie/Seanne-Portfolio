import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const TRAVELS_DIR = path.join(REPO_ROOT, "src", "content", "travels");
const TRIPS_DIR = path.join(REPO_ROOT, "src", "content", "trips");

function readFrontmatter(file: string): Record<string, string> {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const out: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!kv) continue;
    out[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, "$1");
  }
  return out;
}

const travelFiles = fs.readdirSync(TRAVELS_DIR).filter((f) => f.endsWith(".md"));
const knownTripSlugs = new Set(
  fs
    .readdirSync(TRIPS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, "")),
);

describe("travels collection — trip slug integrity", () => {
  it("finds at least one travel entry to validate", () => {
    expect(travelFiles.length).toBeGreaterThan(0);
  });

  it.each(
    travelFiles
      .map((file) => ({ file, fm: readFrontmatter(path.join(TRAVELS_DIR, file)) }))
      .filter((row) => row.fm.trip),
  )("$file → trip $fm.trip references an existing trip file", ({ fm }) => {
    expect(knownTripSlugs).toContain(fm.trip);
  });
});

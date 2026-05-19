#!/usr/bin/env node
// Scaffold a new travels entry: creates the markdown file under
// src/content/travels/<slug>.md and a matching photo folder under
// public/static/travels/<slug>/ with a README.
//
// Usage:
//   node scripts/new-travel.mjs --slug zarks-burgers-sm-ecoland \
//     --title "Zark's Burgers at SM City Davao" \
//     --date 2025-08-18 \
//     --location "SM City Davao, Ecoland, Davao City, PH" \
//     --country Philippines \
//     --coords 7.0617,125.6048 \
//     --tags food,burgers,davao,ph
//
// Required: --slug, --title, --date, --location.
// Optional: --endDate, --country, --coords, --tags, --excerpt, --draft, --force.

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src", "content", "travels");
const PHOTO_ROOT = path.join(ROOT, "public", "static", "travels");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i++;
    }
  }
  return args;
}

function fail(msg) {
  console.error(`new-travel: ${msg}`);
  process.exit(1);
}

function validateSlug(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(`slug "${slug}" must be lowercase kebab-case (a-z, 0-9, hyphens)`);
  }
}

function validateDate(label, value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    fail(`${label} "${value}" must be YYYY-MM-DD`);
  }
}

function parseCoords(raw) {
  const parts = raw.split(",").map((p) => p.trim());
  if (parts.length !== 2) fail(`--coords must be "lat,lng" (got "${raw}")`);
  const [lat, lng] = parts.map(Number);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    fail(`--coords values must be numbers (got "${raw}")`);
  }
  return [lat, lng];
}

function escapeYaml(value) {
  // Quote with double quotes and escape embedded double quotes / backslashes.
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function renderFrontmatter(fields) {
  const lines = ["---"];
  lines.push(`title: ${escapeYaml(fields.title)}`);
  lines.push(`date: ${fields.date}`);
  if (fields.endDate) lines.push(`endDate: ${fields.endDate}`);
  lines.push(`location: ${escapeYaml(fields.location)}`);
  if (fields.country) lines.push(`country: ${escapeYaml(fields.country)}`);
  if (fields.coords) lines.push(`coords: [${fields.coords[0]}, ${fields.coords[1]}]`);
  if (fields.tags?.length) {
    lines.push(`tags: [${fields.tags.map((t) => escapeYaml(t)).join(", ")}]`);
  }
  if (fields.excerpt) lines.push(`excerpt: ${escapeYaml(fields.excerpt)}`);
  // Cover + gallery stay commented out until photos exist.
  lines.push(`# cover: "/static/travels/${fields.slug}/cover.jpg"`);
  lines.push(`# gallery:`);
  lines.push(`#   - { src: "/static/travels/${fields.slug}/01.jpg", alt: "${fields.slug} — photo 1" }`);
  lines.push(`draft: ${fields.draft ? "true" : "false"}`);
  lines.push("---");
  return lines.join("\n");
}

function renderBody(title) {
  return [
    "",
    `## ${title}`,
    "",
    "Write up the trip here. A short paragraph or two with what you did,",
    "where you ate, what surprised you. Drop photos into the matching",
    "folder under `public/static/travels/<slug>/` and uncomment the",
    "`cover` and `gallery` fields above.",
    "",
  ].join("\n");
}

function renderPhotoReadme(slug, title) {
  return [
    `# ${title} — photos`,
    "",
    "Drop photos in this folder, then reference them from",
    `\`src/content/travels/${slug}.md\` using site-root paths:`,
    "",
    `- \`cover.jpg\`          → \`/static/travels/${slug}/cover.jpg\``,
    `- \`01.jpg\`, \`02.jpg\`…  → \`/static/travels/${slug}/01.jpg\``,
    "",
    "**Filename hygiene:** lowercase, no spaces, hyphens not underscores",
    "(`pool-view.jpg` not `Pool View.JPG`).",
    "",
    "**Recommended sizes:** cover ~1600px wide, gallery ~1200px wide.",
    "Re-export JPEGs at quality 80 for a good size/quality tradeoff.",
    "",
  ].join("\n");
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  for (const key of ["slug", "title", "date", "location"]) {
    if (!args[key] || args[key] === true) fail(`--${key} is required`);
  }

  const slug = String(args.slug);
  validateSlug(slug);
  validateDate("--date", args.date);
  if (args.endDate) validateDate("--endDate", args.endDate);

  const fields = {
    slug,
    title: args.title,
    date: args.date,
    endDate: args.endDate || null,
    location: args.location,
    country: args.country || null,
    coords: args.coords ? parseCoords(args.coords) : null,
    tags: args.tags
      ? String(args.tags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
    excerpt: args.excerpt || null,
    draft: args.draft === true || args.draft === "true",
  };

  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const photoDir = path.join(PHOTO_ROOT, slug);
  const photoReadme = path.join(photoDir, "README.md");

  if ((await exists(mdPath)) && !args.force) {
    fail(`${path.relative(ROOT, mdPath)} already exists (pass --force to overwrite)`);
  }

  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.mkdir(photoDir, { recursive: true });

  const md = `${renderFrontmatter(fields)}\n${renderBody(fields.title)}`;
  await fs.writeFile(mdPath, md, "utf8");

  // Only write the photo README if it doesn't already exist — don't clobber
  // notes the author may have added by hand.
  if (!(await exists(photoReadme))) {
    await fs.writeFile(photoReadme, renderPhotoReadme(slug, fields.title), "utf8");
  }

  console.log(`Created ${path.relative(ROOT, mdPath)}`);
  console.log(`Created ${path.relative(ROOT, photoDir)}/ (with README)`);
  console.log("");
  console.log("Next steps:");
  console.log(`  1. Drop photos into public/static/travels/${slug}/`);
  console.log("  2. Uncomment the `cover` and `gallery` fields in the markdown");
  console.log("  3. npm run optimize:images  (generates .webp siblings)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

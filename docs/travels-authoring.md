# Adding a Travel Entry

This guide walks through adding a new trip to the `/travels` page —
the markdown entry, the photo folder, and the optimization pass.

## Quick path: use the generator

The fastest way is the scaffolding script. It writes the markdown
file and creates a matching photo folder with a README in one shot.

```bash
npm run new:travel -- \
  --slug zarks-burgers-sm-ecoland \
  --title "Zark's Burgers at SM City Davao" \
  --date 2025-08-18 \
  --location "SM City Davao, Ecoland, Davao City, PH" \
  --country Philippines \
  --coords 7.0617,125.6048 \
  --tags food,burgers,davao,ph \
  --excerpt "A Zark's Burgers stop at SM City Davao in the Ecoland district."
```

The `--` after `new:travel` is npm's separator; everything after it is
forwarded to the script.

### Flags

| Flag | Required | Notes |
| ---- | -------- | ----- |
| `--slug` | yes | Lowercase kebab-case. Used for filenames and URLs (`/travels/<slug>/`). |
| `--title` | yes | Human-readable title shown on the card and detail page. |
| `--date` | yes | `YYYY-MM-DD`. Start date if it's a multi-day trip. |
| `--location` | yes | Free-form, shown on the card and pin popup. |
| `--endDate` | no | `YYYY-MM-DD` if multi-day. |
| `--city` | no | Powers the "N cities" stat. Use the normalized city name (e.g., `"Davao City"`) so duplicate trips in one city count as one. |
| `--country` | no | Used by the country filter chip. |
| `--coords` | no | `lat,lng` floats. Without coords, the trip won't get a map pin. |
| `--tags` | no | Comma-separated, lowercase. Powers the tag filter chips. |
| `--excerpt` | no | One-liner shown under the title on the feed card. |
| `--draft` | no | Pass `--draft true` to hide it from production builds. |
| `--force` | no | Overwrite an existing markdown file. |

### What the script creates

- `src/content/travels/<slug>.md` — frontmatter pre-filled, body stubbed,
  `cover` and `gallery` commented out (uncomment once photos exist).
- `public/static/travels/<slug>/README.md` — naming + sizing reminders
  for the photo folder.

The script never overwrites an existing photo-folder README, so it's safe
to re-run if you added notes to it.

## Adding photos

1. Drop JPEGs into `public/static/travels/<slug>/` named `01.jpg`,
   `02.jpg`, etc. Lowercase, no spaces, hyphens not underscores.
2. Pick a cover — usually `cover.jpg` (~1600px wide) or reuse `01.jpg`.
3. Uncomment the `cover` and `gallery` blocks in the markdown and list
   the gallery entries. Pattern:

   ```yaml
   cover: "/static/travels/<slug>/cover.jpg"
   gallery:
     - { src: "/static/travels/<slug>/01.jpg", alt: "<slug> — photo 1" }
     - { src: "/static/travels/<slug>/02.jpg", alt: "<slug> — photo 2" }
   ```

4. Run `npm run optimize:images` to generate the `.webp` siblings used
   in production. Skipped files (already optimized) are reported as
   such. `astro:build` runs this automatically.

## Manual path (no script)

If you'd rather hand-author, mirror the format used by entries already
in `src/content/travels/`. The schema is enforced at build time — see
`.astro/collections/travels.schema.json` for the canonical field list.

Required fields: `title`, `date`, `location`. Everything else is
optional, but a trip with no `coords` won't appear on the map.

## Sanity check

Before opening a PR:

- `npm run astro:dev` and load `/travels/` — the new card and pin
  should both appear.
- Hover the card; the matching pin should highlight (and vice versa).
- Click into the detail page (`/travels/<slug>/`) to confirm the
  cover, gallery, and body all render.

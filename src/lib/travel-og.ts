/**
 * Resolves the OpenGraph/social-card image for travel pages.
 *
 * Preference order:
 *   1. The entry's explicit `cover`.
 *   2. The latest (last) image in the entry's `gallery` — authored order, so
 *      the most recently appended photo wins.
 *   3. The site-wide default (`/static/bg_2.jpg`).
 *
 * Kept in one place so the entry page, trip-detail page, and travels index
 * all derive the same image instead of each rolling their own fallback.
 */

const DEFAULT_OG_IMAGE = "/static/bg_2.jpg";

interface TravelLike {
  cover?: string;
  gallery?: { src: string; alt: string }[];
}

/** Cover, else the last gallery image, else `undefined`. */
export function travelImage(entry: TravelLike | undefined | null): string | undefined {
  if (!entry) return undefined;
  if (entry.cover) return entry.cover;
  return entry.gallery?.at(-1)?.src;
}

/** Like {@link travelImage} but always returns an image (falls back to the site default). */
export function travelOgImage(entry: TravelLike | undefined | null): string {
  return travelImage(entry) ?? DEFAULT_OG_IMAGE;
}

/**
 * Picks an OG image for a collection of entries: the first one that yields an
 * image (cover or gallery), else the site default. Callers pass entries in the
 * order they want preferred — e.g. itinerary order, or newest-first.
 */
export function travelOgImageFrom(entries: TravelLike[]): string {
  for (const entry of entries) {
    const image = travelImage(entry);
    if (image) return image;
  }
  return DEFAULT_OG_IMAGE;
}

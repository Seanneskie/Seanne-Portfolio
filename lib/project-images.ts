import { promises as fs } from 'fs';
import path from 'path';

export async function getProjectImages(slug: string): Promise<string[]> {
  try {
    const jsonPath = path.join(process.cwd(), 'public', slug, 'images', 'images.json');
    const data = await fs.readFile(jsonPath, 'utf8');
    const names = JSON.parse(data) as string[];
    if (!Array.isArray(names) || names.length === 0) {
      return [];
    }
    return names.map((name) => `/${slug}/images/${name}`);
  } catch (error) {
    console.error(`Failed to load project images for slug "${slug}":`, error);
    throw new Error(`Failed to load project images for slug "${slug}"`);
  }
}

/**
 * Resolves image objects for a project page with a graceful fallback.
 * Logs but does not throw when the manifest is missing — keeps detail
 * pages renderable for projects that don't ship local screenshots.
 */
export async function getGalleryImages(
  slug: string,
  alt: string,
  fallback = '/static/placeholders/ai.webp'
): Promise<Array<{ src: string; alt: string }>> {
  let images: string[] = [];
  try {
    images = await getProjectImages(slug);
  } catch {
    // intentionally swallow — fallback below
  }
  return (images.length ? images : [fallback]).map((src) => ({ src, alt }));
}

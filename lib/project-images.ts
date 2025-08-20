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
  } catch {
    return [];
  }
}

import { promises as fs } from 'fs';
import path from 'path';

export async function getProjectPdfs(slug: string): Promise<string[]> {
  try {
    const jsonPath = path.join(process.cwd(), 'public', slug, 'pdfs', 'pdfs.json');
    const data = await fs.readFile(jsonPath, 'utf8');
    const names = JSON.parse(data) as string[];
    if (!Array.isArray(names) || names.length === 0) {
      return [];
    }
    return names.map((name) => `/${slug}/pdfs/${name}`);
  } catch {
    return [];
  }
}

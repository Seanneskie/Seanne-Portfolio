import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const resolved = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith(".")) return [];
        return walk(resolved);
      }
      return resolved;
    })
  );
  return files.flat();
}

function shouldProcess(filePath) {
  return EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

async function optimizeImage(filePath) {
  const outputPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp");
  const [sourceStat, outputStat] = await Promise.all([
    fs.stat(filePath),
    fs.stat(outputPath).catch(() => null),
  ]);

  if (outputStat && outputStat.mtimeMs >= sourceStat.mtimeMs) {
    return { skipped: true, outputPath };
  }

  const metadata = await sharp(filePath).metadata();
  let pipeline = sharp(filePath).rotate();

  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: QUALITY }).toFile(outputPath);
  return { skipped: false, outputPath };
}

async function main() {
  const files = await walk(PUBLIC_DIR);
  const images = files.filter(shouldProcess);

  if (images.length === 0) {
    console.log("No images found to optimize.");
    return;
  }

  let optimized = 0;
  let skipped = 0;

  for (const filePath of images) {
    const result = await optimizeImage(filePath);
    if (result.skipped) {
      skipped += 1;
    } else {
      optimized += 1;
      console.log(`Optimized: ${path.relative(PUBLIC_DIR, result.outputPath)}`);
    }
  }

  console.log(`Image optimization complete. Optimized: ${optimized}. Skipped: ${skipped}.`);
}

main().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exitCode = 1;
});

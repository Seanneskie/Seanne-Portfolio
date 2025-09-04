import { promises as fs } from "fs";
import path from "path";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

interface ProjectHtmlProps {
  slug: string;
}

export default async function ProjectHtml({ slug }: ProjectHtmlProps) {
  const alt = `${slug} screenshot`;
  const images = (await getProjectImages(slug)).map((src) => ({ src, alt }));
  const filePath = path.join(process.cwd(), "public", "project-details", `${slug}.html`);

  let html = "";
  try {
    html = await fs.readFile(filePath, "utf8");
  } catch {
    html = "<p>Project details not found.</p>";
  }

  return (
    <div className="space-y-6">
      {images.length > 0 && <ProjectGallery images={images} />}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

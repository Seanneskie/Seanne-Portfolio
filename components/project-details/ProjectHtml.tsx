import { promises as fs } from "fs";
import path from "path";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

interface ProjectHtmlProps {
  slug: string;
}

export default async function ProjectHtml({ slug }: ProjectHtmlProps) {
  const images = await getProjectImages(slug);
  const filePath = path.join(process.cwd(), "public", "project-details", `${slug}.html`);

  let html = "";
  try {
    html = await fs.readFile(filePath, "utf8");
  } catch {
    html = "<p>Project details not found.</p>";
  }

  return (
    <div className="space-y-6">
      {images.length > 0 && (
        <ProjectGallery images={images} alt={`${slug} screenshot`} />
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

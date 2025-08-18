import { promises as fs } from "fs";
import path from "path";

interface ProjectHtmlProps {
  slug: string;
}

export default async function ProjectHtml({ slug }: ProjectHtmlProps) {
  const filePath = path.join(process.cwd(), "public", "project-details", `${slug}.html`);

  let html = "";
  try {
    html = await fs.readFile(filePath, "utf8");
  } catch {
    html = "<p>Project details not found.</p>";
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

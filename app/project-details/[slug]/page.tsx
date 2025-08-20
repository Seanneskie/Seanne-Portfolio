import { promises as fs } from "fs";
import path from "path";
import type { ComponentType } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let Component: ComponentType | null = null;
  try {
    Component = (await import(`@/components/project-details/${slug}`)).default;
  } catch {
    Component = null;
  }

  if (Component) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <Component />
      </main>
    );
  }

  const filePath = path.join(process.cwd(), "public", "project-details", `${slug}.html`);

  try {
    const html = await fs.readFile(filePath, "utf8");
    return (
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    );
  } catch {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <p>Project details not found.</p>
      </main>
    );
  }
}

export async function generateStaticParams() {
  const htmlDir = path.join(process.cwd(), "public", "project-details");
  const componentDir = path.join(process.cwd(), "components", "project-details");

  const [htmlFiles, componentFiles] = await Promise.all([
    fs.readdir(htmlDir).catch(() => []),
    fs.readdir(componentDir).catch(() => []),
  ]);

  const htmlSlugs = htmlFiles
    .filter((file) => file.endsWith(".html"))
    .map((file) => file.replace(/\.html$/, ""));

  const componentSlugs = componentFiles
    .filter((file) => file.endsWith(".tsx") && !file.startsWith("Project"))
    .map((file) => file.replace(/\.tsx$/, ""));

  const slugs = Array.from(new Set([...htmlSlugs, ...componentSlugs]));

  return slugs.map((slug) => ({ slug }));
}

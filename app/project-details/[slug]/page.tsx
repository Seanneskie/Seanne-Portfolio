import type { ComponentType } from "react";
import type { JSX } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectTOC from "@/components/project-details/ProjectTOC";
import ProjectNav from "@/components/project-details/ProjectNav";
import { getProjectMeta } from "@/lib/project-meta";
import { projectDetailConfig } from "@/lib/project-detail-config";

type PageParams = { slug: string };

interface PageProps {
  params: Promise<PageParams>;
}

const resolveParams = async (params: PageProps["params"]): Promise<PageParams> => {
  return params;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const config = projectDetailConfig[slug];

  if (!config) {
    const fallbackTitle = "Project Not Found";
    const fallbackDescription = "The requested project page could not be located.";
    const fallbackOgTitle = `${fallbackTitle} | Seanne Cañete`;
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      openGraph: {
        title: fallbackOgTitle,
        description: fallbackDescription,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: fallbackOgTitle,
        description: fallbackDescription,
      },
    };
  }

  const pageTitle = `${config.title} | Project Details`;
  const pageOgTitle = `${pageTitle} | Seanne Cañete`;
  const meta = getProjectMeta(slug);

  return {
    title: pageTitle,
    description: config.description,
    keywords: meta?.tags,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: pageOgTitle,
      description: config.description,
      type: "article",
      images: meta?.image ? [meta.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: pageOgTitle,
      description: config.description,
      images: meta?.image ? [meta.image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await resolveParams(params);
  const config = projectDetailConfig[slug];

  if (!config) {
    notFound();
  }

  try {
    const Component: ComponentType = (await config.loader()).default;
    const meta = getProjectMeta(slug);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: config.title,
      description: config.description,
      keywords: meta?.tags?.join(", "),
      author: { "@type": "Person", name: "Seanne Cañete" },
      datePublished: meta?.period,
      image: meta?.image,
      url: meta?.github ?? undefined,
    };

    return (
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-8">
          <div className="space-y-12">
            <Component />
            <ProjectNav slug={slug} />
          </div>

          {config.sections && config.sections.length > 0 && (
            <aside className="mt-10 lg:mt-0">
              <ProjectTOC sections={config.sections} />
            </aside>
          )}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
    );
  } catch {
    notFound();
  }
}

export async function generateStaticParams(): Promise<PageParams[]> {
  return Object.keys(projectDetailConfig).map((slug) => ({ slug }));
}

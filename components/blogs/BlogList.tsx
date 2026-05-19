"use client";

import * as React from "react";
import { withBasePath } from "@/lib/utils";

interface BlogPostItem {
  kind: "native" | "external";
  slug: string;
  title: string;
  date: string;
  description?: string;
  url?: string;
  tags: string[];
}

interface BlogListProps {
  posts: BlogPostItem[];
}

const fmtDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export default function BlogList({ posts }: BlogListProps): React.ReactElement {
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    for (const post of posts) post.tags.forEach((t) => tags.add(t));
    return Array.from(tags).sort();
  }, [posts]);

  const [active, setActive] = React.useState<string | null>(null);

  const filtered = active
    ? posts.filter((p) => p.tags.includes(active))
    : posts;

  return (
    <div>
      {allTags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={[
              "rounded-full border px-3 py-1 text-xs font-medium transition",
              active === null
                ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:border-teal-400 dark:bg-teal-400/10 dark:text-teal-300"
                : "border-gray-200 text-gray-600 hover:border-teal-500/40 hover:text-teal-700 dark:border-gray-800 dark:text-gray-300 dark:hover:text-teal-300",
            ].join(" ")}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(active === tag ? null : tag)}
              aria-pressed={active === tag}
              className={[
                "rounded-full border px-3 py-1 text-xs font-medium transition",
                active === tag
                  ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:border-teal-400 dark:bg-teal-400/10 dark:text-teal-300"
                  : "border-gray-200 text-gray-600 hover:border-teal-500/40 hover:text-teal-700 dark:border-gray-800 dark:text-gray-300 dark:hover:text-teal-300",
              ].join(" ")}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">No posts match this tag.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((post) => {
            const external = post.kind === "external";
            const href = external ? post.url ?? "#" : withBasePath(`/blogs/${post.slug}/`);
            return (
              <li key={`${post.kind}-${post.slug}`}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group block rounded-lg border border-gray-200 bg-white p-5 transition hover:border-teal-500/50 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-teal-400/50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <time className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {fmtDate(post.date)}
                    </time>
                    {external && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        External
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1 text-lg font-semibold text-black group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{post.description}</p>
                  )}
                  {post.tags.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-medium text-teal-700 dark:bg-teal-400/10 dark:text-teal-300"
                        >
                          #{tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

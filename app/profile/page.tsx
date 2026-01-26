import type { Metadata } from "next";
import type { JSX } from "react";

import Profile, { CardCounters, MyStory } from "@/components/profile";
import OtherSkills from "@/components/profile/OtherSkills";

const PAGE_METADATA = {
  title: "Profile",
  ogTitle: "Profile | Seanne Cañete",
  description:
    "Learn more about Seanne Cañete, a full-stack engineer and IT graduate from Mindanao State University - General Santos City.",
  keywords: [
    "Seanne Cañete",
    "Seanne Canete",
    "full stack engineer",
    "software engineer",
    "Mindanao State University",
    "Mindanao State University - General Santos",
    "General Santos City",
    "information technology graduate",
  ],
};

export const metadata: Metadata = {
  title: PAGE_METADATA.title,
  description: PAGE_METADATA.description,
  keywords: PAGE_METADATA.keywords,
  openGraph: {
    title: PAGE_METADATA.ogTitle,
    description: PAGE_METADATA.description,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA.ogTitle,
    description: PAGE_METADATA.description,
  },
};

export default function ProfilePage(): JSX.Element {
  return (
    <main className="bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-gray-900 dark:via-gray-950/40 dark:to-gray-900">
      <div className="container mx-auto max-w-7xl space-y-16 px-4 py-14">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700/80 dark:text-teal-300/80">
            Profile
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            About Seanne and the work behind the projects.
          </h1>
          <p className="text-base text-gray-700 dark:text-gray-300">
            A deeper look at my background, story, and the technologies I enjoy
            building with.
          </p>
        </header>

        <section className="grid items-start gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <Profile imagePriority />
          <div className="space-y-6">
            <CardCounters />
            <div className="rounded-2xl border border-teal-600/10 bg-white/80 p-6 text-sm text-gray-700 shadow-sm backdrop-blur-sm dark:border-teal-400/10 dark:bg-gray-900/60 dark:text-gray-200">
              <p className="font-semibold text-teal-700 dark:text-teal-300">
                Focus right now
              </p>
              <p className="mt-2">
                Shipping reliable product features, polishing UI details, and
                keeping data dashboards fast and honest.
              </p>
            </div>
          </div>
        </section>

        <MyStory />

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">
              Other Skills
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Supporting tools and workflows that help teams ship with clarity.
            </p>
          </div>
          <OtherSkills />
        </section>
        {/* <TechComparison /> */}
      </div>
    </main>
  );
}

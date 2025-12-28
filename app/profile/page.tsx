import type { Metadata } from "next";
import type { JSX } from "react";

import Profile, { CardCounters, MyStory } from "@/components/profile";
import OtherSkills from "@/components/profile/OtherSkills";

const PAGE_METADATA = {
  title: "Profile | Seanne Canete",
  description:
    "Learn more about Seanne Canete's background, story, and skills across frontend, backend, and data technologies.",
};

export const metadata: Metadata = {
  title: PAGE_METADATA.title,
  description: PAGE_METADATA.description,
  openGraph: {
    title: PAGE_METADATA.title,
    description: PAGE_METADATA.description,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_METADATA.title,
    description: PAGE_METADATA.description,
  },
};

export default function ProfilePage(): JSX.Element {
  return (
    <main className="container mx-auto max-w-7xl space-y-16 px-4 py-12">
      <Profile imagePriority />
      <CardCounters />
      <MyStory />
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">Other Skills</h2>
        <OtherSkills />
      </section>
      {/* <TechComparison /> */}
    </main>
  );
}

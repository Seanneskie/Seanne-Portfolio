import type { JSX } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import Banner from "@/components/banner";
import BannerActions from "@/components/home/banner-actions";
import Highlights from "@/components/highlights";
import HobbyAchievements from "@/components/hobbies/hobby-achievements";
import Profile, { MyStory } from "@/components/profile";
import { WorkExperienceCarousel } from "@/components/work-experiences";
import {
  getHighlights,
  getSkills,
  getServices,
  getWorkExperiences,
} from "@/lib/get-data";

export default function HomePageContent(): JSX.Element {
  const highlights = getHighlights();
  const skills = getSkills();
  const services = getServices();
  const workExperiences = getWorkExperiences();

  return (
    <main>
      <Banner
        title="Build. Ship. Iterate."
        subtitle="Full-stack apps with Django & Next.js. Data visualization with Python, SQL, and Charting."
        backgroundImage="/static/bg_2.webp"
        imageAlt="Clean developer workspace with code and charts"
        align="left"
        height="lg"
        parallax
        priority
        actions={<BannerActions />}
      />
      <div className="bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-gray-900 dark:via-gray-950/40 dark:to-gray-900">
        <div className="container mx-auto max-w-7xl space-y-16 px-4 py-14">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 shadow-sm dark:border-teal-400/20 dark:bg-gray-900/60 dark:text-teal-300">
              <Sparkles className="h-3.5 w-3.5" />
              Featured
            </div>
            <Profile />
          </section>

          <MyStory skills={skills} services={services} />

          <div className="space-y-10">
            <HobbyAchievements />
            <Highlights data={highlights} />
          </div>

          <WorkExperienceCarousel data={workExperiences} />

          <div className="flex justify-center">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500 bg-size-200 animate-gradient-x px-8 py-3 text-white shadow-lg transition-transform hover:scale-105"
            >
              View more of me
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

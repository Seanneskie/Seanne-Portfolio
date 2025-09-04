"use client";

import Profile, { MyStory } from "@/components/profile";
import Banner from "@/components/banner";
import Link from "next/link";
import Highlights from "@/components/highlights";
import { WorkExperienceCarousel } from "@/components/work-experiences";
import { withBasePath } from "@/lib/utils";
import { toast } from "sonner";

export default function HomePage() {
  return (
    <main>
      <Banner
        title="Build. Ship. Iterate."
        subtitle="Full-stack apps with Django & Next.js. Data visualization with Python, SQL, and Charting."
        backgroundImage="/static/bg_2.jpg"
        imageAlt="Clean developer workspace with code and charts"
        align="left"
        height="lg"
        parallax
        actions={
          <>
            <a
              href="#projects"
              className="inline-flex items-center rounded-xl px-5 py-2.5 bg-white/90 text-gray-900 hover:bg-white transition shadow"
            >
              View Projects
            </a>
            <a
              href={withBasePath("/static/pdfs/canete_resume.pdf")}
              target="_blank"
              rel="noreferrer"
              onClick={() => toast.info("Opening resume…")}
              className="inline-flex items-center rounded-xl px-5 py-2.5 bg-white/90 text-gray-900 hover:bg-white transition shadow"
            >
              View Resume
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl px-5 py-2.5 bg-teal-500/90 text-white hover:bg-teal-500 transition shadow"
            >
              Contact Me
            </Link>
          </>
        }
      />
      <div className="container mx-auto max-w-7xl space-y-16 px-4 py-12">
        <Profile />
        <MyStory />
        <Highlights />
        <WorkExperienceCarousel />
        <div className="flex justify-center">
          <Link
            href="/profile"
            className="inline-block rounded-full bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 bg-size-200 animate-gradient-x px-8 py-3 text-white shadow-lg transition-transform hover:scale-105"
          >
            View more of me
          </Link>
        </div>
      </div>
    </main>
  );
}

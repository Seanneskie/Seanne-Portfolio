import type { JSX } from "react";
import Link from "@/src/shims/next-link";
import {
  ArrowUpRight,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Code2,
} from "lucide-react";

import Profile from "@/components/profile";
import ProjectsSection from "@/components/projects/projects-section";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Seanneskie", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/seanne-ca%C3%B1ete-8b09322a1/",
    icon: Linkedin,
  },
  { label: "Twitter/X", href: "https://x.com/Seanneskie", icon: Twitter },
  {
    label: "Facebook",
    href: "https://www.facebook.com/seanne.canete.7/",
    icon: Facebook,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/seanneskie32/",
    icon: Code2,
  },
] as const;

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}): JSX.Element {
  return (
    <div className="space-y-2">
      <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 shadow-sm dark:border-teal-400/20 dark:bg-gray-900/60 dark:text-teal-300">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

export default function HomePageContent(): JSX.Element {
  return (
    <main>
      <div className="bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-gray-900 dark:via-gray-950/40 dark:to-gray-900">
        <div className="container mx-auto max-w-7xl space-y-16 px-4 py-14">
          {/* Who am I — profile, interests, experience, tech stack */}
          <section className="space-y-6">
            <SectionHeading eyebrow="About" title="Who I Am" />
            <Profile />
          </section>

          {/* Projects — full list with infinite scroll */}
          <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow="Work" title="Projects" />
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:underline dark:text-teal-300"
              >
                Open projects page
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <ProjectsSection />
          </section>

          {/* Social links */}
          <section className="space-y-6">
            <SectionHeading eyebrow="Connect" title="Find Me Online" />
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-teal-200/70 bg-white/85 px-4 py-2 text-sm font-medium text-teal-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-teal-800/70 dark:bg-gray-950/60 dark:text-teal-200"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="space-y-6">
            <SectionHeading eyebrow="Contact" title="Let's Work Together" />
            <div className="flex flex-col gap-4 rounded-2xl border border-teal-200/70 bg-white/85 p-6 shadow-sm backdrop-blur dark:border-teal-800/70 dark:bg-gray-950/60 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm text-gray-700 dark:text-gray-200">
                Have a project, role, or idea in mind? I'm open to collaboration
                and serious inquiries — let's talk.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500 bg-size-200 animate-gradient-x px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
                >
                  <Mail className="h-4 w-4" />
                  Contact me
                </Link>
                <a
                  href="https://github.com/Seanneskie"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-teal-600/30 px-6 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-600/10 dark:text-teal-300"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

import type { JSX } from "react";
import Link from "@/src/shims/next-link";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Code2,
} from "lucide-react";

import Profile from "@/components/profile";
import ProjectsSection from "@/components/projects/projects-section";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

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

export default function HomePageContent(): JSX.Element {
  return (
    <main className="flex flex-col gap-[var(--section-gap)] py-16 sm:py-20">
      {/* Who am I — profile, interests, experience, tech stack */}
      <Section className="space-y-8">
        <Reveal>
          <SectionHeading eyebrow="About" title="Who I Am" />
        </Reveal>
        <Reveal delay={0.05}>
          <Profile />
        </Reveal>
      </Section>

      {/* NDA-safe AI engineering focus for prospective collaborators */}
      <Section className="space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="Engineering Focus"
            title="Production AI & Generative Media"
            description="Building dependable multimodal AI features, image and video generation workflows, and the backend systems that power them."
            action={
              <Link
                href="/work-experiences"
                className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:underline dark:text-teal-400"
              >
                Explore experience
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            }
          />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Google Cloud & Vertex AI",
                description: "Gemini-powered multimodal workflows and grounded model context using hosted media references.",
                skills: ["Google Cloud", "Vertex AI", "Gemini"],
              },
              {
                title: "Image & Video Generation",
                description: "Generative media integrations involving Veo, provider-specific inputs, model routing, and error handling.",
                skills: ["Google Veo", "Multimodal AI", "Provider APIs"],
              },
              {
                title: "AI Workflow Reliability",
                description: "Asynchronous task orchestration, provider fallback handling, prompt optimization, and model observability.",
                skills: ["TypeScript", "Trigger.dev", "Langfuse"],
              },
            ].map(({ title, description, skills }) => (
              <article
                key={title}
                className="rounded-card border border-gray-200 bg-slate-50 p-6 dark:border-gray-800 dark:bg-gray-900/40"
              >
                <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-teal-600/20 px-3 py-1 text-xs font-medium text-teal-700 dark:border-teal-400/30 dark:text-teal-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Selected commercial work is described without confidential client or product identifiers.
          </p>
        </Reveal>
      </Section>

      {/* Projects — full list with infinite scroll */}
      <Section className="space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="Work"
            title="Projects"
            action={
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:underline dark:text-teal-400"
              >
                Open projects page
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            }
          />
        </Reveal>
        <ProjectsSection />
      </Section>

      {/* Social links */}
      <Section className="space-y-8">
        <Reveal>
          <SectionHeading eyebrow="Connect" title="Find Me Online" />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-2">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-teal-500/40 hover:text-teal-600 dark:border-gray-800 dark:text-gray-300 dark:hover:border-teal-400/40 dark:hover:text-teal-400"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Contact CTA */}
      <Section>
        <Reveal>
          <div className="flex flex-col gap-6 rounded-card border border-gray-200 bg-slate-50 p-8 dark:border-gray-800 dark:bg-gray-900/40 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                Contact
              </p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Let's Work Together
              </h2>
              <p className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                Have a project, role, or idea in mind? I'm open to collaboration
                and serious inquiries — let's talk.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400"
              >
                <Mail className="h-4 w-4" />
                Contact me
              </Link>
              <a
                href="https://github.com/Seanneskie"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-teal-500/40 hover:text-teal-600 dark:border-gray-800 dark:text-gray-300 dark:hover:text-teal-400"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}

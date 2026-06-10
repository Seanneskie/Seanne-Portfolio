"use client";

import { type ReactElement } from "react";
import {
  Code2,
  Database,
  LineChart,
  Layout,
  Brain,
  MapPinned,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SkillsSection from "./SkillsSection";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Rocket } from "lucide-react";
import ServicesSection from "@/components/services";
import type { SkillCategory } from "./SkillsSection";
import type { Service } from "@/components/services/ServicesSection";

interface MyStoryProps {
  skills: SkillCategory[];
  services: Service[];
}

export default function MyStory({ skills, services }: MyStoryProps): ReactElement {
  const whatIDo = [
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Full-stack Apps",
      blurb:
        "Ship responsive, production-ready apps with Next.js/React, Django/Laravel, and Supabase.",
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Database Design",
      blurb:
        "Model normalized schemas and write efficient SQL on PostgreSQL/MySQL; work with MongoDB when needed.",
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "Data Analysis",
      blurb:
        "Clean and visualize data via Python (Pandas, Matplotlib) and Chart.js/Looker/Tableau.",
    },
    {
      icon: <Layout className="h-5 w-5" />,
      title: "UX-first UIs",
      blurb:
        "Craft accessible interfaces using Tailwind + shadcn/ui with clear, consistent patterns.",
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI Integration",
      blurb:
        "Prototype AI features using TensorFlow, LangChain, and Teachable Machine for smart workflows.",
    },
    {
      icon: <MapPinned className="h-5 w-5" />,
      title: "Maps & GIS",
      blurb:
        "Build location-aware features with Leaflet and basic GIS workflows.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Secure by Default",
      blurb:
        "Follow safe coding practices, reviews, and least-privilege patterns.",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Docs & Handover",
      blurb:
        "UML/DFD diagrams, clean READMEs, and setup guides teams can trust.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="space-y-8">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              My Story
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
              {/* Left: narrative */}
              <div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400">
                <p className="first:first-letter:float-left first:first-letter:mr-2 first:first-letter:text-5xl first:first-letter:font-bold first:first-letter:text-teal-600 dark:first:first-letter:text-teal-400">
                  I’m a BSIT (Major in Database) graduate—
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    cum laude
                  </span>
                  —who found my groove at the intersection of data and
                  full-stack engineering. Hackathons sharpened both my pace and
                  teamwork, while real projects turned those skills into systems
                  people rely on.
                </p>

                <p>
                  I’ve built for conservation, government, and operations:{" "}
                  <span className="font-medium text-teal-600 dark:text-teal-400">
                    COTSEYE
                  </span>{" "}
                  (a Django + JS crowd-mapping tool for Crown-of-Thorns
                  monitoring),{" "}
                  <span className="font-medium text-teal-600 dark:text-teal-400">
                    VIMS
                  </span>{" "}
                  (a Next.js + Supabase vessel inventory system), and an{" "}
                  <span className="font-medium text-teal-600 dark:text-teal-400">
                    LGU fund-utilization & cooperative-profiling platform
                  </span>{" "}
                  (Django). Along the way, I doubled down on clean schemas, fast
                  queries, and dashboards that tell the truth.
                </p>

                <p>
                  Today, I focus on shipping practical, well-designed systems—
                  normalized data models, reliable APIs, and interfaces that
                  stay out of the way. I move fast, measure impact, and document
                  everything clearly so teams can build with confidence.
                </p>

                {/* Tech badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Django",
                    "Laravel",
                    "Next.js",
                    "React",
                    "Supabase",
                    "PostgreSQL",
                    "MySQL",
                    "MongoDB",
                    "Tailwind",
                    "Chart.js",
                    "Leaflet",
                    "Remix",
                    "Cloudflare",
                    "Plausible Analytics",
                    "Fly.io",
                    "Redis",
                  ].map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-full border border-gray-200 bg-transparent font-normal text-gray-600 transition-colors hover:border-teal-500/40 hover:text-teal-600 dark:border-gray-800 dark:text-gray-400 dark:hover:border-teal-400/40 dark:hover:text-teal-400"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Right: Highlights panel */}
              <div className="rounded-card border border-gray-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-900/40">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" /> Highlights
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-3">
                    <MapPinned className="mt-0.5 h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <span>
                      <span className="font-medium text-gray-900 dark:text-white">COTSEYE:</span>{" "}
                      crowd-mapping for marine conservation (Django, JS).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Database className="mt-0.5 h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <span>
                      <span className="font-medium text-gray-900 dark:text-white">VIMS:</span> vessel
                      inventory system (Next.js, Supabase, Tailwind).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <span>
                      <span className="font-medium text-gray-900 dark:text-white">LGU Gensan:</span> fund
                      utilization & cooperative profiling (Django).
                    </span>
                  </li>
                </ul>

                <div className="mt-5 rounded-card border border-gray-200 bg-white p-4 text-xs leading-relaxed text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                  <p className="mb-1 flex items-center gap-1 font-medium text-gray-900 dark:text-white">
                    <Rocket className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" /> Achievements
                  </p>
                  <ul className="list-inside space-y-1">
                    <li>
                      Graduated as
                      <span className="font-semibold text-teal-600 dark:text-teal-400">
                        {" "}
                        Cum Laude
                      </span>{" "}
                      and
                      <span className="font-semibold text-teal-600 dark:text-teal-400">
                        {" "}
                        PSITE XII Most Outstanding IT Student
                      </span>
                    </li>
                    <li>
                      Hack4Gov3 National Finals –
                      <span className="font-semibold text-teal-600 dark:text-teal-400">
                        {" "}
                        4th Place
                      </span>{" "}
                      (Oct 2024)
                    </li>
                    <li>
                      Hack4Gov3 Region 12 –
                      <span className="font-semibold text-teal-600 dark:text-teal-400">
                        {" "}
                        Champion & Excellence Awardee
                      </span>{" "}
                      (Aug 2024)
                    </li>
                    <li>
                      JITS IT Week Hackathon –
                      <span className="font-semibold text-teal-600 dark:text-teal-400">
                        {" "}
                        Champion
                      </span>{" "}
                      (2024 & 2023)
                    </li>
                  </ul>
                </div>

                <div className="mt-4 rounded-card border border-gray-200 bg-white p-4 text-xs leading-relaxed text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Principles
                  </p>
                  <p>
                    Clarity over cleverness • Small PRs • Measure, don’t guess •
                    Docs your future-you will thank.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">What I Do</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-12 sm:grid-cols-1 justify-items-start">
              {whatIDo.map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="mt-0.5 text-teal-600 dark:text-teal-400">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.blurb}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <SkillsSection data={skills} mode="core" />
        </div>
      </section>
      <ServicesSection data={services} />
    </motion.div>
  );
}

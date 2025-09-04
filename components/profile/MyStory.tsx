"use client";

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
import StorySkills from "./StorySkills";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Rocket } from "lucide-react";
import ServicesSection from "@/components/services";

export default function MyStory() {
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
        <Card className="relative overflow-hidden rounded-2xl border border-teal-600/10 bg-white/70 shadow-lg backdrop-blur-md dark:border-teal-400/10 dark:bg-teal-900/10">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-300/15" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-600/10 blur-3xl dark:bg-teal-500/10" />

          <CardHeader className="relative z-10">
            <CardTitle className="text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:to-teal-200">
                My Story
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
              {/* Left: narrative */}
              <div className="space-y-5 text-black/90 leading-relaxed dark:text-white/90">
                <p className="first:first-letter:float-left first:first-letter:mr-2 first:first-letter:text-5xl first:first-letter:font-extrabold first:first-letter:text-teal-600 dark:first:first-letter:text-teal-300">
                  I’m a BSIT (Major in Database) graduate—
                  <span className="font-semibold text-teal-700 dark:text-teal-300">
                    cum laude
                  </span>
                  —who found my groove at the intersection of data and
                  full-stack engineering. Hackathons sharpened both my pace and
                  teamwork, while real projects turned those skills into systems
                  people rely on.
                </p>

                <p>
                  I’ve built for conservation, government, and operations:{" "}
                  <span className="rounded-md bg-teal-500/10 px-1 py-0.5 font-medium text-teal-700 dark:text-teal-300">
                    COTSEYE
                  </span>{" "}
                  (a Django + JS crowd-mapping tool for Crown-of-Thorns
                  monitoring),{" "}
                  <span className="rounded-md bg-teal-500/10 px-1 py-0.5 font-medium text-teal-700 dark:text-teal-300">
                    VIMS
                  </span>{" "}
                  (a Next.js + Supabase vessel inventory system), and an{" "}
                  <span className="rounded-md bg-teal-500/10 px-1 py-0.5 font-medium text-teal-700 dark:text-teal-300">
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
                  ].map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="border border-teal-600/20 bg-white/80 text-teal-800 backdrop-blur-sm hover:bg-white dark:border-teal-400/20 dark:bg-teal-900/30 dark:text-teal-200"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Right: Highlights panel */}
              <div className="rounded-xl border border-teal-600/10 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-teal-400/10 dark:bg-teal-900/20">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-teal-700 dark:text-teal-300">
                  <Sparkles className="h-5 w-5" /> Highlights
                </h3>
                <ul className="space-y-3 text-sm text-black/80 dark:text-white/80">
                  <li className="flex items-start gap-3">
                    <MapPinned className="mt-0.5 h-4 w-4 text-teal-600 dark:text-teal-300" />
                    <span>
                      <span className="font-medium">COTSEYE:</span>{" "}
                      crowd-mapping for marine conservation (Django, JS).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Database className="mt-0.5 h-4 w-4 text-teal-600 dark:text-teal-300" />
                    <span>
                      <span className="font-medium">VIMS:</span> vessel
                      inventory system (Next.js, Supabase, Tailwind).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 text-teal-600 dark:text-teal-300" />
                    <span>
                      <span className="font-medium">LGU Gensan:</span> fund
                      utilization & cooperative profiling (Django).
                    </span>
                  </li>
                </ul>

                <div className="mt-5 rounded-lg border border-teal-600/10 bg-teal-500/5 p-4 text-xs leading-relaxed text-black/75 dark:border-teal-400/10 dark:text-white/80">
                  <p className="mb-1 flex items-center gap-1 font-medium text-teal-700 dark:text-teal-300">
                    <Rocket className="h-3.5 w-3.5" /> Achievements
                  </p>
                  <ul className="list-inside space-y-1">
                    <li>
                      Graduated as
                      <span className="font-semibold text-teal-700 dark:text-teal-300">
                        {" "}
                        Cum Laude
                      </span>{" "}
                      and
                      <span className="font-semibold text-teal-700 dark:text-teal-300">
                        {" "}
                        PSITE XII Most Outstanding IT Student
                      </span>
                    </li>
                    <li>
                      Hack4Gov3 National Finals –
                      <span className="font-semibold text-teal-700 dark:text-teal-300">
                        {" "}
                        4th Place
                      </span>{" "}
                      (Oct 2024)
                    </li>
                    <li>
                      Hack4Gov3 Region 12 –
                      <span className="font-semibold text-teal-700 dark:text-teal-300">
                        {" "}
                        Champion & Excellence Awardee
                      </span>{" "}
                      (Aug 2024)
                    </li>
                    <li>
                      JITS IT Week Hackathon –
                      <span className="font-semibold text-teal-700 dark:text-teal-300">
                        {" "}
                        Champion
                      </span>{" "}
                      (2024 & 2023)
                    </li>
                  </ul>
                </div>

                <div className="mt-4 rounded-lg border border-teal-600/10 bg-teal-500/5 p-4 text-xs leading-relaxed text-black/75 dark:border-teal-400/10 dark:text-white/80">
                  <p className="font-medium text-teal-700 dark:text-teal-300">
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
          <Card className="border border-teal-600/10 dark:border-teal-400/10">
            <CardHeader>
              <CardTitle className="text-xl">What I Do</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-12 sm:grid-cols-1 justify-items-start">
              {whatIDo.map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="mt-0.5 text-teal-700 dark:text-teal-400">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.blurb}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <StorySkills />
        </div>
      </section>
      <ServicesSection />
    </motion.div>
  );
}

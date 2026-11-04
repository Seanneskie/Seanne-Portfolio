"use client";

import { type ReactElement } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProfileCardContent from "./ProfileCardContent";
import type { ProfileData } from "./types";
import { withBasePath } from "@/lib/utils";

const PROFILE: ProfileData = {
  name: "Seanne Cañete",
  email: "seannecanete32@gmail.com",
  address: "General Santos City, Philippines",
  image: withBasePath("/profile/static/image_1.webp"),
  background:
    "I'm a Full Stack Software Engineer working across production AI features, APIs, and web applications. My AI engineering experience includes Google Cloud Vertex AI and Gemini multimodal workflows, generative image/video capabilities involving Veo, provider orchestration, prompt optimization, and observability. I build reliable applications with TypeScript, React, Remix, PostgreSQL, Redis, and cloud infrastructure. Client and product details remain confidential.",
  interests: [
    "Full-stack Web Development",
    "Data Analytics & Visualization",
    "Database Design",
    "Generative AI & Multimodal Applications",
    "Google Cloud & Vertex AI",
    "Geospatial / GIS",
    "Competitive Gaming",
  ],
  experience: [
    { name: "Django / Python", level: "Advanced" },
    { name: "Next.js / React", level: "Advanced" },
    { name: "TypeScript / JavaScript", level: "Advanced" },
    { name: "PostgreSQL / MySQL", level: "Advanced" },
    { name: "Laravel / PHP", level: "Intermediate" },
    { name: ".NET Core", level: "Intermediate" },
    { name: "Data Viz (Chart.js, Tableau)", level: "Intermediate" },
    { name: "LLMs / AI Workflows", level: "Advanced" },
    { name: "Google Cloud / Vertex AI", level: "Intermediate" },
  ],
  techStack: [
    "Python",
    "JavaScript",
    "TypeScript",
    "SQL",
    "Django",
    "Laravel",
    ".NET Core",
    "React",
    "Next.js",
    "Tailwind CSS",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Supabase",
    "SQL Server",
    "Chart.js",
    "Tableau",
    "TensorFlow",
    "Google Cloud",
    "Vertex AI",
    "Gemini",
    "Veo",
    "Trigger.dev",
    "Langfuse",
    "LangChain",
  ],
  education: [
    { level: "Tertiary", institution: "Mindanao State University", year: "A.Y 2021 - 2025" },
    { level: "Senior High School", institution: "Mindanao State University", year: "A.Y 2019 - 2021" },
    { level: "Junior High School", institution: "GSC SPED Integrated School", year: "A.Y 2015 - 2019" },
    { level: "Elementary", institution: "The Heritage Academy of the Philippines", year: "A.Y 2009 - 2015" },
  ],
  links: {
    facebook: "https://www.facebook.com/seanne.canete.7/",
    twitter: "https://x.com/Seanneskie",
    linkedin: "https://www.linkedin.com/in/seanne-ca%C3%B1ete-8b09322a1/",
    github: "https://github.com/Seanneskie",
    leetcode: "https://leetcode.com/u/seanneskie32/",
    // Store resume as a plain relative path. Components consuming this
    // value are responsible for prefixing it with the deployment base path.
    resume: "/static/pdfs/canete_resume.pdf",
  },
};

export default function Profile({ imagePriority = false }: { imagePriority?: boolean }): ReactElement {
  return (
    <TooltipProvider delayDuration={100}>
      <section id="profile" className="space-y-6">
        <ProfileCardContent profile={PROFILE} imagePriority={imagePriority} />
      </section>
    </TooltipProvider>
  );
}

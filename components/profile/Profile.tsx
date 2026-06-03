"use client";

import { type ReactElement } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProfileCard from "./ProfileCard";
import BackgroundCard from "./BackgroundCard";
import type { ProfileData } from "./types";
import { withBasePath } from "@/lib/utils";

const PROFILE: ProfileData = {
  name: "Seanne Cañete",
  email: "seannecanete32@gmail.com",
  address: "General Santos City, Philippines",
  image: withBasePath("/profile/static/image_1.webp"),
  background:
    "Hello! I'm Seanne Cañete, a full-stack developer with around 2 years of experience specializing in Django/Python on the backend and Next.js/React on the frontend. I design solid data models in PostgreSQL/Supabase, build clean REST (and GraphQL when needed) APIs with Django and DRF, and ship responsive, accessible UIs with TypeScript, Tailwind, and shadcn/ui. I'm comfortable with authentication/RBAC, file uploads, background tasks, and analytics dashboards, and I prioritize readable code, testing, and CI/CD automation so teams ship reliable features fast.",
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
        <ProfileCard profile={PROFILE} imagePriority={imagePriority} />
        <BackgroundCard profile={PROFILE} />
      </section>
    </TooltipProvider>
  );
}

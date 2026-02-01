/**
 * Server-side data accessors for static JSON files.
 *
 * Because the project uses `output: "export"`, all data is resolved at build
 * time. Importing JSON directly avoids the client-side fetch waterfall that
 * `useData` introduces and lets Next.js tree-shake the data out of the client
 * bundle entirely.
 */

import highlights from "@/public/data/highlights.json";
import projects from "@/public/data/projects.json";
import skills from "@/public/data/skills.json";
import services from "@/public/data/services.json";
import workExperiences from "@/public/data/work-experiences.json";
import courses from "@/public/data/courses.json";
import certificates from "@/public/data/certificates.json";
import achievements from "@/public/data/achievements.json";
import profile from "@/public/data/profile.json";

export function getHighlights() {
  return highlights as { src: string; label: string }[];
}

export function getProjects() {
  return projects as {
    title: string;
    image: string;
    alt: string;
    description?: string;
    tags: string[];
    github?: string | null;
    githubLabel?: string | null;
    details?: string | null;
  }[];
}

export function getSkills() {
  return skills as {
    id: string;
    label: string;
    groups: {
      title: string;
      items: { icon: string; name: string; description?: string }[];
    }[];
  }[];
}

export function getServices() {
  return services as {
    title: string;
    description: string;
    icon: string;
  }[];
}

export function getWorkExperiences() {
  return workExperiences as {
    company: string;
    project: string;
    period: string;
    images: { src: string; alt: string }[];
    tech: string[];
    summary: string;
    highlights: string[];
  }[];
}

export function getCourses() {
  return courses as {
    code: string;
    title: string;
    institution: string;
    description?: string;
    credits?: number;
    skills?: string[];
  }[];
}

export function getCertificates() {
  return certificates as {
    tags: string[];
    title: string;
    desc: string;
    link?: string;
    image?: string;
    skills: string[];
  }[];
}

export function getAchievements() {
  return achievements as {
    icon: string;
    title: string;
    description: string;
    skills?: string[];
  }[];
}

export function getProfile() {
  return profile as {
    name: string;
    headline: string;
    bio: string;
    email: string;
    socials: { linkedin: string; github: string; twitter: string };
  };
}

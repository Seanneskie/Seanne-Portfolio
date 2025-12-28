"use client";

import { type ReactElement } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Mail,
  FileText,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Globe,
  Code2,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { openMailTo, copyEmail } from "@/lib/profile";
import type { ProfileData, Links } from "./types";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";

const keySkills = [
  "Web Development",
  "Frontend UI",
  "Data & Analytics",
  "AI/ML Tooling",
  "Databases",
  "Geospatial",
  "Software Design & Docs",
  "Tooling & Platforms",
  "Core Strengths",
];

const socialList: { key: keyof Links; label: string; icon: LucideIcon }[] = [
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "github", label: "GitHub", icon: Github },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "twitter", label: "Twitter/X", icon: Twitter },
  { key: "leetcode", label: "LeetCode", icon: Code2 },
  { key: "website", label: "Website", icon: Globe },
  { key: "resume", label: "Resume", icon: FileText },
];

export default function ProfileCardContent({
  profile,
  imagePriority = false,
}: {
  profile: ProfileData;
  imagePriority?: boolean;
}): ReactElement {
  const links = profile.links ?? {};

  const info = profile as Partial<{
    course: string;
    major: string;
    specialization: string;
    phone: string;
    contact: string;
    contactNo: string;
    contact_number: string;
  }>;

  const course = info.course ?? "BS Information Technology";
  const major = info.major ?? info.specialization ?? "Database Systems Major";
  const phone =
    info.phone ?? info.contact ?? info.contactNo ?? info.contact_number ?? null;

  return (
    <Card className="relative overflow-hidden">
      {/* Left 25% gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-teal-600/15 to-transparent dark:from-teal-400/15 dark:to-transparent"
      />

      <CardHeader className="relative z-10 p-0">
        <div className="flex items-center justify-between px-6 py-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">
            Profile
          </CardTitle>

          {links.resume && (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="gap-2"
              onClick={() => toast.info("Opening resume…")}
            >
              <a
                href={links.resume.startsWith("/") ? withBasePath(links.resume) : links.resume}
                target="_blank"
                rel="noreferrer"
              >
                <FileText size={16} />
                View Resume
              </a>
            </Button>
          )}
        </div>
        <div className="h-px w-full bg-gradient-to-r from-neutral-200 to-transparent dark:from-neutral-800 dark:to-transparent" />
      </CardHeader>

      <CardContent className="relative z-10 p-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-[25%_75%]"
        >
          {/* LEFT (25%): Full-height image */}
          <div className="relative h-full min-h-[240px] overflow-hidden rounded-xl ring-2 ring-teal-900/30 dark:ring-teal-400/30 shadow-sm">
            <Image
              src={withBasePath("/static/image_1.jpg")}
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              priority={imagePriority}
              className="object-cover"
            />
          </div>

          {/* RIGHT (75%): Details, Education, then Links row */}
          <div className="space-y-6">
            {/* Header block */}
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold leading-tight text-black dark:text-white">
                {profile.name}
              </h2>

              <p className="text-base text-black/80 dark:text-white/80">
                {course}, {major}
              </p>

              <div className="flex flex-col gap-1 text-sm">
                <div className="text-black/80 dark:text-white/80">
                  <span className="font-medium">Email:</span>{" "}
                  <span className="break-all">{profile.email}</span>
                </div>

                {phone && (
                  <div className="text-black/80 dark:text-white/80">
                    <span className="font-medium">Contact:</span>{" "}
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 opacity-80" />
                      {phone}
                    </span>
                  </div>
                )}

                <div className="text-black/80 dark:text-white/80">
                  <span className="font-medium">Address:</span>{" "}
                  <span>{profile.address}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-2 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={() => copyEmail(profile.email)}
                >
                  <Copy size={16} />
                  Copy Email
                </Button>
                <Button
                  size="sm"
                  onClick={() => openMailTo(profile.email)}
                  className={[
                    "group relative gap-2 text-white",
                    // animated gradient bg
                    "bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500",
                    "bg-[length:200%_200%] animate-gradient-x",
                    // polish
                    "shadow-md hover:shadow-lg transition-[transform,box-shadow] duration-200",
                    "hover:-translate-y-0.5",
                    "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
                    "rounded-md px-3",
                  ].join(" ")}
                >
                  <Mail className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  Hire Me
                </Button>
              </div>

              <div>
                <p className="text-sm font-medium text-black/80 dark:text-white/80">
                  Key Skills
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {keySkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="rounded-full bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Education */}
            <section className="px-6 ">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">
                Education
              </h3>
              <ul className="space-y-3 text-sm">
                {profile.education?.map((e, idx) => (
                  <li
                    key={`${e.institution}-${e.level}-${e.year}-${idx}`}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-black dark:text-white">
                        {e.level}
                      </p>
                      <p className="truncate text-black/80 dark:text-white/80">
                        {e.institution}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800"
                    >
                      {e.year}
                    </Badge>
                  </li>
                ))}
              </ul>
            </section>

            {/* Links row (icon-only) */}
            <TooltipProvider>
              <nav
                aria-label="Profile links"
                className="mt-4 flex w-full flex-wrap items-center justify-center gap-2"
              >
                {socialList.map(({ key, label, icon: Icon }) => {
                  const rawHref = links[key];
                  if (!rawHref) return null;
                  const href = rawHref.startsWith("/")
                    ? withBasePath(rawHref)
                    : rawHref;
                  return (
                    <Tooltip key={key}>
                      <TooltipTrigger asChild>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={label}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-black dark:text-white ring-1 ring-neutral-200 dark:ring-neutral-800 hover:ring-neutral-300 dark:hover:ring-neutral-700 transition"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="sr-only">{label}</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="text-xs border-0 text-white bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500 shadow-lg"
                      >
                        {label}
                        <TooltipArrow className="fill-teal-700 dark:fill-teal-500" />
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </nav>
            </TooltipProvider>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}


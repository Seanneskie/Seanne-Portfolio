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
import { withBasePath } from "@/lib/utils";

const levelStyles: Record<string, string> = {
  Expert:
    "bg-teal-600 text-white dark:bg-teal-500 dark:text-white",
  Advanced:
    "border border-teal-500/40 text-teal-700 dark:border-teal-400/40 dark:text-teal-400",
  Intermediate:
    "border border-gray-200 text-gray-600 dark:border-gray-800 dark:text-gray-400",
  Beginner:
    "border border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-500",
};

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
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="flex flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
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
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />
      </CardHeader>

      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid grid-cols-1 items-stretch gap-8"
        >
          {/* Details, Education, then Links row */}
          <div className="min-w-0 space-y-6">
            {/* Header block */}
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {profile.name}
              </h2>

              <p className="text-base text-gray-600 dark:text-gray-400">
                {course}, {major}
              </p>

              {profile.background && (
                <p className="max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {profile.background}
                </p>
              )}

              <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Email:</span>{" "}
                  <span className="break-all">{profile.email}</span>
                </div>

                {phone && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Contact:</span>{" "}
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 opacity-80" />
                      {phone}
                    </span>
                  </div>
                )}

                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Address:</span>{" "}
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
                  className="gap-2"
                  onClick={() => openMailTo(profile.email)}
                >
                  <Mail className="h-4 w-4" />
                  Hire Me
                </Button>
              </div>

              {/* Interests */}
              {profile.interests?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Interests
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="rounded-full border border-gray-200 bg-transparent px-3 py-1 font-normal text-gray-600 transition-colors hover:border-teal-500/40 hover:text-teal-600 dark:border-gray-800 dark:text-gray-400 dark:hover:border-teal-400/40 dark:hover:text-teal-400"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Experience levels */}
            {profile.experience?.length > 0 && (
              <section className="px-0 sm:px-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                  Experience
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.experience.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-transparent py-1 pl-3 pr-1 text-sm transition-colors hover:border-teal-500/40 dark:border-gray-800 dark:hover:border-teal-400/40"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {item.name}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          levelStyles[item.level] ?? levelStyles.Beginner
                        }`}
                      >
                        {item.level}
                      </span>
                    </span>
                  ))}
                </div>
              </section>
            )}

            <Separator />

            {/* Tech stack */}
            {profile.techStack?.length > 0 && (
              <section className="px-0 sm:px-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="rounded-full border border-gray-200 bg-transparent px-3 py-1 font-normal text-gray-600 transition-colors hover:border-teal-500/40 hover:text-teal-600 dark:border-gray-800 dark:text-gray-400 dark:hover:border-teal-400/40 dark:hover:text-teal-400"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            <Separator />

            {/* Education */}
            <section className="px-0 sm:px-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                Education
              </h3>
              <ul className="space-y-3 text-sm">
                {profile.education?.map((e, idx) => (
                  <li
                    key={`${e.institution}-${e.level}-${e.year}-${idx}`}
                    className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white sm:truncate">
                        {e.level}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 sm:truncate">
                        {e.institution}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="rounded-full border border-gray-200 bg-transparent font-normal text-gray-600 dark:border-gray-800 dark:text-gray-400"
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
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-teal-500/40 hover:text-teal-600 dark:border-gray-800 dark:text-gray-400 dark:hover:border-teal-400/40 dark:hover:text-teal-400"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="sr-only">{label}</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        {label}
                        <TooltipArrow />
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


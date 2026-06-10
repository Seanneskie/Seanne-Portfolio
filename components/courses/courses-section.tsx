"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export interface Course {
  code: string;
  title: string;
  institution: string;
  description?: string;
  credits?: number;
  skills?: string[];
}

interface CoursesSectionProps {
  data: Course[];
}

export default function CoursesSection({ data }: CoursesSectionProps): ReactElement {
  const [search, setSearch] = useState("");
  const [institution, setInstitution] = useState("");
  const [skill, setSkill] = useState("");

  const courses: Course[] = data;

  const institutions = useMemo<string[]>(
    () => Array.from(new Set(courses.map((c) => c.institution))).sort(),
    [courses]
  );
  const skills = useMemo<string[]>(
    () => Array.from(new Set(courses.flatMap((c) => c.skills ?? []))).sort(),
    [courses]
  );

  const totalCourses = courses.length;
  const totalInstitutions = institutions.length;
  const totalSkills = skills.length;

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const term = search.toLowerCase();
      const matchesSearch =
        !term ||
        c.code.toLowerCase().includes(term) ||
        c.title.toLowerCase().includes(term);
      const matchesInstitution =
        !institution || c.institution === institution;
      const matchesSkill = !skill || (c.skills ?? []).includes(skill);
      return matchesSearch && matchesInstitution && matchesSkill;
    });
  }, [courses, search, institution, skill]);

  const badgeCls =
    "rounded-full border border-gray-200 bg-transparent font-normal text-gray-600 dark:border-gray-800 dark:text-gray-400";

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <Input
            placeholder="Search by code or title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:max-w-md"
          />
          <Select value={institution} onValueChange={setInstitution}>
            <SelectTrigger className="lg:w-64">
              <SelectValue placeholder="All institutions" />
            </SelectTrigger>
            <SelectContent>
              {institutions.map((inst) => (
                <SelectItem key={inst} value={inst}>
                  {inst}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={skill ? skill : "__all"}
            onValueChange={(value) => setSkill(value === "__all" ? "" : value)}
          >
            <SelectTrigger className="lg:w-64">
              <SelectValue placeholder="All skills" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all">All skills</SelectItem>
              {skills.map((skillLabel) => (
                <SelectItem key={skillLabel} value={skillLabel}>
                  {skillLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>
              Showing {filtered.length} of {totalCourses}
            </span>
            <span className="hidden text-gray-400 dark:text-gray-500 sm:inline">|</span>
            <span>{totalInstitutions} institutions</span>
            <span className="hidden text-gray-400 dark:text-gray-500 sm:inline">|</span>
            <span>{totalSkills} skills</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearch("");
                setInstitution("");
                setSkill("");
              }}
              disabled={!search && !institution && !skill}
            >
              Clear filters
            </Button>
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="border-dashed p-10 text-center text-gray-600 dark:text-gray-400">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            No courses match your search
          </p>
          <p className="mt-2 text-sm">Try a different keyword or reset the filters.</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSearch("");
              setInstitution("");
              setSkill("");
            }}
            className="mt-4"
          >
            Reset filters
          </Button>
        </Card>
      ) : (
        <ul
          role="list"
          className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filtered.map((c: Course, i: number) => (
              <motion.li
                key={c.code}
                role="listitem"
                className="h-full"
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
              >
                <Card
                  className={[
                    "group relative h-full min-h-[220px] overflow-hidden p-4",
                    "transition-colors hover:border-teal-500/40 dark:hover:border-teal-400/40",
                    "focus-within:border-teal-500/40 dark:focus-within:border-teal-400/40",
                  ].join(" ")}
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details">
                      <AccordionTrigger
                        aria-label={`Toggle details for ${c.code}`}
                        className="p-0 text-left"
                      >
                        <div className="text-left">
                          <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                            {c.code}: {c.title}
                          </h3>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {c.institution}
                          </p>
                          {c.skills?.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {c.skills.map((label) => (
                                <Badge
                                  key={label}
                                  variant="secondary"
                                  className={badgeCls}
                                >
                                  {label}
                                </Badge>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {c.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {c.description}
                          </p>
                        )}
                        {typeof c.credits === "number" && (
                          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Credits: {c.credits}
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}


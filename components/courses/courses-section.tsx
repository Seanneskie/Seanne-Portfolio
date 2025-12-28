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
import { useData } from "@/lib/use-data";

interface Course {
  code: string;
  title: string;
  institution: string;
  description?: string;
  credits?: number;
  skills?: string[];
}

export default function CoursesSection(): ReactElement {
  const [search, setSearch] = useState("");
  const [institution, setInstitution] = useState("");
  const [skill, setSkill] = useState("");

  const { data, loading, error } = useData<Course[]>("courses.json");
  const courses = useMemo(() => data ?? [], [data]);

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
    "rounded-full bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800";

  if (loading) {
    return (
      <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card
            key={i}
            className="h-56 animate-pulse rounded-2xl border border-teal-200/60 bg-white/70 dark:border-teal-800/60 dark:bg-gray-950/50"
          />
        ))}
      </div>
    );
  }

  if (error || !data)
    return (
      <p className="text-red-600 dark:text-red-400">Failed to load courses.</p>
    );

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl border border-teal-200/70 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-teal-800/70 dark:bg-gray-950/60">
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
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
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
              className="border-teal-200 text-teal-700 hover:border-teal-300 hover:text-teal-800 dark:border-teal-800 dark:text-teal-200"
            >
              Clear filters
            </Button>
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-teal-200 bg-white/80 p-10 text-center text-gray-600 dark:border-teal-800 dark:bg-gray-950/60 dark:text-gray-300">
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
            className="mt-4 border-teal-200 text-teal-700 hover:border-teal-300 hover:text-teal-800 dark:border-teal-800 dark:text-teal-200"
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
                    "group relative h-full min-h-[220px] overflow-hidden rounded-2xl p-4",
                    "border border-teal-200/70 bg-white/85 backdrop-blur",
                    "dark:border-teal-800/70 dark:bg-gray-950/60",
                    "transition-shadow hover:shadow-lg hover:shadow-teal-300/30 dark:hover:shadow-teal-900/20",
                    "focus-within:ring-1 focus-within:ring-teal-500/60",
                  ].join(" ")}
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details">
                      <AccordionTrigger
                        aria-label={`Toggle details for ${c.code}`}
                        className="p-0 text-left"
                      >
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200">
                            {c.code}: {c.title}
                          </h3>
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
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
                          <p className="text-sm text-gray-700 dark:text-gray-200">
                            {c.description}
                          </p>
                        )}
                        {typeof c.credits === "number" && (
                          <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Credits: {c.credits}
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-teal-500/15"
                  />
                </Card>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}


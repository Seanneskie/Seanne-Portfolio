"use client";

import { type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillItem {
  icon: string;
  name: string;
  description?: string;
}

interface SkillGroup {
  title: string;
  items: SkillItem[];
}

export interface SkillCategory {
  id: string;
  label: string;
  groups: SkillGroup[];
}

type Mode =
  /** The single "Programming" category, shown inline in the story. */
  | "core"
  /** Every non-programming category, shown as a grid of cards. */
  | "other";

interface SkillsSectionProps {
  data: SkillCategory[];
  mode: Mode;
}

/** Shared chip row + tooltip used by both modes. */
function SkillGroups({ groups }: { groups: SkillGroup[] }): ReactElement {
  return (
    <>
      {groups.map((group) => (
        <div key={group.title} className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            {group.title}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => {
              const badge = (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 rounded-full border border-gray-200 bg-transparent font-normal text-gray-600 transition-colors hover:border-teal-500/40 hover:text-teal-600 dark:border-gray-800 dark:text-gray-400 dark:hover:border-teal-400/40 dark:hover:text-teal-400"
                >
                  <i className={item.icon} />
                  {item.name}
                </Badge>
              );

              if (!item.description) {
                return (
                  <span key={item.name} className="contents">
                    {badge}
                  </span>
                );
              }

              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{badge}</TooltipTrigger>
                  <TooltipContent side="top" sideOffset={6}>
                    {item.description}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * One skills renderer for the whole profile. Replaces the near-identical
 * StorySkills (core) and OtherSkills (other) components — they differed only
 * by which categories they filtered and the card title.
 */
export default function SkillsSection({
  data,
  mode,
}: SkillsSectionProps): ReactElement {
  if (mode === "core") {
    const programming = data.find((category) => category.id === "Programming");
    if (!programming) return <></>;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Core Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <SkillGroups groups={programming.groups} />
        </CardContent>
      </Card>
    );
  }

  const otherCategories = data.filter(
    (category) => category.id !== "Programming",
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {otherCategories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{category.label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <SkillGroups groups={category.groups} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

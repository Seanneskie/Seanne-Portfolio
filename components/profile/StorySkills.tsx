"use client";

import { type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useData } from "@/lib/use-data";

interface SkillItem {
  icon: string;
  name: string;
  description?: string;
}

interface SkillGroup {
  title: string;
  items: SkillItem[];
}

interface SkillCategory {
  id: string;
  label: string;
  groups: SkillGroup[];
}

export default function StorySkills(): ReactElement {
  const { data, error } = useData<SkillCategory[]>("skills.json");
  if (error || !data) return <></>;

  const programming = data.find((category) => category.id === "Programming");
  if (!programming) return <></>;

  return (
    <Card className="border border-teal-600/10 dark:border-teal-400/10">
      <CardHeader>
        <CardTitle className="text-xl">Core Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {programming.groups.map((group) => (
          <div key={group.title} className="space-y-2">
            <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">
              {group.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => {
                const badge = (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 rounded-full"
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
      </CardContent>
    </Card>
  );
}


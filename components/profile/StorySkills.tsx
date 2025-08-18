"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/lib/use-data";

interface SkillItem {
  icon: string;
  name: string;
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

export default function StorySkills() {
  const { data, error } = useData<SkillCategory[]>("skills.json");
  if (error || !data) return null;

  const programming = data.find((category) => category.id === "Programming");
  if (!programming) return null;

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
              {group.items.map((item) => (
                <Badge
                  key={item.name}
                  variant="secondary"
                  className="flex items-center gap-1 rounded-full"
                >
                  <i className={item.icon} />
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


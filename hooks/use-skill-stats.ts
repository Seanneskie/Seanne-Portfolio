import { useMemo } from "react";
import { useData } from "@/lib/use-data";
import type { SkillCategory, SkillStat } from "@/types/skill";

interface Project {
  tags: string[];
}

interface UseSkillStatsResult {
  stats: SkillStat[];
  loading: boolean;
  error: Error | null;
}

/**
 * Aggregates skill usage counts from project tags by matching them with known
 * skills defined in `skills.json`.
 */
export default function useSkillStats(): UseSkillStatsResult {
  const { data: projects, loading: projectsLoading, error: projectsError } =
    useData<Project[]>("projects.json");
  const { data: skills, loading: skillsLoading, error: skillsError } =
    useData<SkillCategory[]>("skills.json");

  const stats = useMemo<SkillStat[]>(() => {
    if (!projects || !skills) return [];

    const skillNames = new Map<string, string>();
    skills.forEach((category) =>
      category.groups.forEach((group) =>
        group.items.forEach((item) => {
          skillNames.set(item.name.toLowerCase(), item.name);
        })
      )
    );

    const counts: Record<string, number> = {};
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        const tagKey = tag.toLowerCase();
        const matched = Array.from(skillNames.keys()).find(
          (name) =>
            name === tagKey ||
            name.includes(tagKey) ||
            tagKey.includes(name)
        );
        if (matched) {
          const displayName = skillNames.get(matched) as string;
          counts[displayName] = (counts[displayName] || 0) + 1;
        }
      });
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [projects, skills]);

  return {
    stats,
    loading: projectsLoading || skillsLoading,
    error: projectsError || skillsError,
  };
}

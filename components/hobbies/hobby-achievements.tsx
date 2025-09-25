import type { JSX } from "react";
import Link from "next/link";
import { ArrowUpRight, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameAchievement {
  title: string;
  highlight: string;
}

export const HOBBY_ACHIEVEMENTS: readonly GameAchievement[] = [
  {
    title: "Mobile Legends",
    highlight: "Shot caller for weekly scrims, guiding the squad to Mythic-tier finishes.",
  },
  {
    title: "Capture The Flags",
    highlight: "Regular top placements in CTF tournaments by coordinating flag runs and defenses.",
  },
  {
    title: "Dota 2",
    highlight: "Captained community teams through bracket play with strategic drafting and laning.",
  },
  {
    title: "CS:GO",
    highlight: "Maintained clutch percentage above team average during ranked matches and scrimmages.",
  },
  {
    title: "Arknights",
    highlight: "Cleared high-difficulty Contingency Contract runs and limited-time event stages flawlessly.",
  },
];

export const STEAM_PROFILE_URL = "https://steamcommunity.com/profiles/76561198125700053/";

interface AchievementCardProps {
  achievement: GameAchievement;
}

/**
 * Displays hobby gaming achievements with quick access to the Steam profile.
 *
 * @example
 * ```tsx
 * <HobbyAchievements />
 * ```
 */
function AchievementCard({ achievement }: AchievementCardProps): JSX.Element {
  return (
    <Card className="h-full border-teal-500/20 bg-white/70 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900/60">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-300">
          <Trophy aria-hidden className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          {achievement.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{achievement.highlight}</p>
      </CardContent>
    </Card>
  );
}

export default function HobbyAchievements(): JSX.Element {
  return (
    <section id="hobbies" className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Game Achievements</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Competitive matches and cooperative clears keep my reflexes sharp and my teamwork sharper.
          </p>
        </div>
        <Badge asChild variant="outline">
          <Link
            href={STEAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold"
            aria-label="View Steam profile for additional achievements"
          >
            Steam profile
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {HOBBY_ACHIEVEMENTS.map((achievement) => (
          <AchievementCard key={achievement.title} achievement={achievement} />
        ))}
      </div>
    </section>
  );
}

import type * as LucideIcons from "lucide-react";

export type LucideIconName = keyof typeof LucideIcons;

export const COUNTER_CARD_THEMES = ["ocean", "teal", "cyan", "ice"] as const;

export type CounterCardTheme = (typeof COUNTER_CARD_THEMES)[number];

export interface CardCounterItem {
  id: string;
  title: string;
  value: number;
  description?: string;
  theme: CounterCardTheme;
  order: number;
  icon?: LucideIconName;
}

export interface CardCounterData {
  lastUpdated: string;
  items: CardCounterItem[];
}

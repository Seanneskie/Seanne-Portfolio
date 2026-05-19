import type { CardCounterIconName } from "@/lib/card-counter-icons";

/**
 * @deprecated kept as an alias so existing imports don't break. Use
 * `CardCounterIconName` from `lib/card-counter-icons` going forward — it's
 * narrowed to the icons actually referenced from card-counter.json, which
 * lets Vite/Rollup tree-shake unused lucide-react exports.
 */
export type LucideIconName = CardCounterIconName;

export const COUNTER_CARD_THEMES = ["ocean", "teal", "cyan", "ice"] as const;

export type CounterCardTheme = (typeof COUNTER_CARD_THEMES)[number];

export interface CardCounterItem {
  id: string;
  title: string;
  value: number;
  description?: string;
  theme: CounterCardTheme;
  order: number;
  icon?: CardCounterIconName;
}

export interface CardCounterData {
  lastUpdated: string;
  items: CardCounterItem[];
}

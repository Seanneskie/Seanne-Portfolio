export const COUNTER_CARD_THEMES = ["ocean", "teal", "cyan", "ice"] as const;

export type CounterCardTheme = (typeof COUNTER_CARD_THEMES)[number];

export interface CardCounterItem {
  id: string;
  title: string;
  value: number;
  description?: string;
  theme: CounterCardTheme;
  order: number;
  icon?: string;
}

export interface CardCounterData {
  lastUpdated: string;
  items: CardCounterItem[];
}

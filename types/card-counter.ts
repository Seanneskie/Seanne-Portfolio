import { CounterCardTheme } from "@/components/card/CardCounter";

export interface CardCounterItem {
  id: string;
  title: string;
  value: number;
  description?: string;
  theme: CounterCardTheme;
  order: number;
}

export interface CardCounterData {
  lastUpdated: string;
  items: CardCounterItem[];
}

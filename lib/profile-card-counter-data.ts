import rawData from "@/public/data/card-counter.json" assert { type: "json" };
import * as LucideIcons from "lucide-react";
import {
  COUNTER_CARD_THEMES,
  type CardCounterData,
  type CardCounterItem,
  type CounterCardTheme,
  type LucideIconName,
} from "@/types/card-counter";

const COUNTER_CARD_THEME_SET = new Set<string>(COUNTER_CARD_THEMES);
const LUCIDE_ICON_SET = new Set<LucideIconName>(
  Object.keys(LucideIcons) as LucideIconName[]
);

type RawCardCounterItem = {
  id?: unknown;
  title?: unknown;
  value?: unknown;
  description?: unknown;
  theme?: unknown;
  order?: unknown;
  icon?: unknown;
};

type RawCardCounterData = {
  lastUpdated?: unknown;
  items?: unknown;
};

const isCounterCardTheme = (value: unknown): value is CounterCardTheme =>
  typeof value === "string" && COUNTER_CARD_THEME_SET.has(value);

const isLucideIconName = (value: unknown): value is LucideIconName =>
  typeof value === "string" && LUCIDE_ICON_SET.has(value as LucideIconName);

const parseCardCounterItem = (item: unknown, index: number): CardCounterItem => {
  if (!item || typeof item !== "object") {
    throw new Error(`Item at index ${index} must be an object.`);
  }

  const { id, title, value, description, theme, order, icon } =
    item as RawCardCounterItem;

  if (typeof id !== "string" || id.trim().length === 0) {
    throw new Error(`Item at index ${index} is missing a valid \"id\".`);
  }

  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error(`Item at index ${index} is missing a valid \"title\".`);
  }

  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`Item at index ${index} is missing a valid \"value\".`);
  }

  if (typeof order !== "number" || !Number.isFinite(order)) {
    throw new Error(`Item at index ${index} is missing a valid \"order\".`);
  }

  if (!isCounterCardTheme(theme)) {
    throw new Error(
      `Item at index ${index} has an unsupported theme: ${String(theme)}`
    );
  }

  if (description != null && typeof description !== "string") {
    throw new Error(
      `Item at index ${index} has an invalid \"description\" field.`
    );
  }

  const parsedItem: CardCounterItem = {
    id,
    title,
    value,
    order,
    theme,
  };

  if (typeof description === "string") {
    parsedItem.description = description;
  }

  if (icon != null) {
    if (!isLucideIconName(icon)) {
      throw new Error(
        `Item at index ${index} references an unsupported icon: ${String(icon)}`
      );
    }

    parsedItem.icon = icon;
  }

  return parsedItem;
};

/**
 * Converts unknown JSON data into a strongly typed {@link CardCounterData} object.
 *
 * @throws Error when the input data structure is invalid.
 */
export const parseCardCounterData = (data: unknown): CardCounterData => {
  if (!data || typeof data !== "object") {
    throw new Error("Card counter data must be a JSON object.");
  }

  const { lastUpdated, items } = data as RawCardCounterData;

  if (typeof lastUpdated !== "string" || lastUpdated.trim().length === 0) {
    throw new Error("Card counter data requires a non-empty lastUpdated value.");
  }

  if (!Array.isArray(items)) {
    throw new Error("Card counter data requires an items array.");
  }

  return {
    lastUpdated,
    items: items.map((item, index) => parseCardCounterItem(item, index)),
  };
};

/**
 * Returns the parsed {@link CardCounterData} sourced from
 * `public/data/card-counter.json`.
 */
export const getCardCounterData = (): CardCounterData =>
  parseCardCounterData(rawData as unknown);

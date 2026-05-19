/**
 * Registry of Lucide icons referenced by name from public/data/card-counter.json.
 *
 * Replaces the previous `import * as LucideIcons from "lucide-react"` lookup,
 * which prevented tree-shaking and dragged the entire ~595 KB lucide bundle
 * into the build. Only the icons listed here ship.
 *
 * To add a new icon-name to the JSON: import it from `lucide-react` and add
 * it to both `CARD_COUNTER_ICONS` and the `CardCounterIconName` union.
 */
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BriefcaseBusiness,
  GitBranch,
  Handshake,
  LayoutDashboard,
  Rocket,
  Sparkle,
} from "lucide-react";

export const CARD_COUNTER_ICONS = {
  Award,
  BriefcaseBusiness,
  GitBranch,
  Handshake,
  LayoutDashboard,
  Rocket,
  Sparkle,
} as const satisfies Record<string, LucideIcon>;

export type CardCounterIconName = keyof typeof CARD_COUNTER_ICONS;

export const CARD_COUNTER_ICON_NAMES: readonly CardCounterIconName[] =
  Object.keys(CARD_COUNTER_ICONS) as CardCounterIconName[];

export const isCardCounterIconName = (value: unknown): value is CardCounterIconName =>
  typeof value === "string" && value in CARD_COUNTER_ICONS;

export const resolveCardCounterIcon = (
  name: CardCounterIconName | undefined,
): LucideIcon | null => {
  if (!name) return null;
  return CARD_COUNTER_ICONS[name] ?? null;
};

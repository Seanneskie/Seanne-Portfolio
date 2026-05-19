/**
 * Registry of Lucide icons referenced by name from public/data/services.json.
 * Mirrors lib/card-counter-icons.ts — explicit imports so Vite/Rollup can
 * tree-shake unused lucide exports out of the bundle.
 */
import type { LucideIcon } from "lucide-react";
import { BarChart3, Code2, Palette, Server } from "lucide-react";

export const SERVICE_ICONS = {
  BarChart3,
  Code2,
  Palette,
  Server,
} as const satisfies Record<string, LucideIcon>;

export type ServiceIconName = keyof typeof SERVICE_ICONS;

export const resolveServiceIcon = (name: string | undefined): LucideIcon =>
  (name && SERVICE_ICONS[name as ServiceIconName]) || Code2;

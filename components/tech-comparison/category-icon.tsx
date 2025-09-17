import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Layers3,
  LayoutDashboard,
  Server,
  Database,
  BarChartBig,
  Cog,
  Map,
  GitGraph,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Category } from "@/types/tech-comparison";

const CATEGORY_ICON_MAP: Partial<Record<Category["id"], LucideIcon>> = {
  fullstack: Layers3,
  frontend: LayoutDashboard,
  backend: Server,
  database: Database,
  data_analytics: BarChartBig,
  devops: Cog,
  mapping: Map,
  graphql: GitGraph,
  languages: Code2,
};

const FALLBACK_ICON = Sparkles;

export interface CategoryIconProps {
  categoryId: Category["id"];
  className?: string;
}

/**
 * Renders a Lucide icon that corresponds to a technology category, falling back to a sparkle icon when no mapping exists.
 */
export function CategoryIcon({ categoryId, className }: CategoryIconProps): React.ReactElement {
  const Icon = CATEGORY_ICON_MAP[categoryId] ?? FALLBACK_ICON;
  return <Icon aria-hidden className={cn("size-4 text-muted-foreground", className)} />;
}

export default CategoryIcon;

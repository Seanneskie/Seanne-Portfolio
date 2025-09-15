"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import { Star } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip as ReTooltip,
} from "recharts";

/**
 * Types matching data/tech-comparison.json
 */
export type RatingTypesId = "proficiency" | "production_use" | "recency" | "depth" | "preference";

export interface RatingType {
  id: RatingTypesId;
  label: string;
  description: string;
  scale: Record<string, string>; // "1".."5" => label
}

export interface Category {
  id: string;
  label: string;
  color?: string; // hex color accent
}

export interface TechItem {
  id: string;
  name: string;
  type: string;
  category: string; // category id
  tags?: string[];
  since?: string;
  ratings: Record<RatingTypesId, number>; // 1..5
  notes?: string;
}

export interface TechComparisonData {
  lastUpdated?: string;
  rating_types: RatingType[];
  categories: Category[];
  items: TechItem[];
}

/**
 * Theme helpers (teal/cyan centric)
 */
const DOT_BASE = cn(
  "absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full",
  "bg-gradient-to-tr from-teal-600 to-cyan-500 shadow-lg",
  "ring-8 ring-white dark:ring-gray-900"
);

function ThemeDot({ className }: { className?: string }) {
  return <span aria-hidden className={cn(DOT_BASE, className)} />;
}

/**
 * Tiny star rating visual (1-5)
 */
function StarRating({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${v} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < v
              ? "fill-teal-500 text-teal-500 dark:fill-cyan-400 dark:text-cyan-400"
              : "text-gray-300 dark:text-gray-600"
          )}
        />
      ))}
    </div>
  );
}

/**
 * Gradient progress bar for 1..5 scale
 */
function RatingBar({ value, max = 5 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-teal-600 to-cyan-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/**
 * Select control for choosing which rating dimension to compare
 */
function RatingTypePicker({
  ratingTypes,
  value,
  onChange,
}: {
  ratingTypes: RatingType[];
  value: RatingTypesId;
  onChange: (id: RatingTypesId) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Compare by</span>
      <Select value={value} onValueChange={(v) => onChange(v as RatingTypesId)}>
        <SelectTrigger className="w-[220px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ratingTypes.map((rt) => (
            <SelectItem key={rt.id} value={rt.id}>
              {rt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * Tabs for category filters (All + categories)
 */
function CategoryTabs({
  categories,
  value,
  onValueChange,
}: {
  categories: Category[];
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4 sm:grid-cols-6 lg:grid-cols-8">
        <TabsTrigger value="all">All</TabsTrigger>
        {categories.map((c) => (
          <TabsTrigger key={c.id} value={c.id}>
            {c.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {/* TabsContent are provided where needed by parent */}
    </Tabs>
  );
}

/**
 * List of items as compact cards showing selected rating + stars + tags.
 */
function ItemList({
  items,
  selectedRating,
  categoriesById,
}: {
  items: TechItem[];
  selectedRating: RatingTypesId;
  categoriesById: Record<string, Category>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => {
        const cat = categoriesById[it.category];
        const value = it.ratings[selectedRating] ?? 0;
        return (
          <motion.div key={it.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="relative pt-6 pl-12">
              <ThemeDot />
              <CardHeader className="p-0">
                <CardTitle className="text-base">{it.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge variant="secondary">{it.type}</Badge>
                  {cat?.label ? (
                    <Badge style={{ backgroundColor: cat.color ?? undefined }} className="text-white">
                      {cat.label}
                    </Badge>
                  ) : null}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{value}/5</span>
                  <StarRating value={value} />
                </div>
                <RatingBar value={value} />
                {it.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {it.tags.slice(0, 5).map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                    {it.tags.length > 5 ? <span className="text-xs text-muted-foreground">+{it.tags.length - 5} more</span> : null}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * Radar view compares ALL rating dimensions for a single selected item.
 */
function RadarView({ item, ratingTypes }: { item: TechItem; ratingTypes: RatingType[] }) {
  const data = ratingTypes.map((rt) => ({
    metric: rt.label,
    value: item.ratings[rt.id] ?? 0,
  }));
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <RadarChart data={data} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
          <Radar name={item.name} dataKey="value" stroke="#0ea5e9" fill="#14b8a6" fillOpacity={0.4} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Bar summary compares the SELECTED rating across items in the current category.
 */
function BarSummary({ items, rating, label }: { items: TechItem[]; rating: RatingTypesId; label: string }) {
  const data = items
    .map((it) => ({ name: it.name, value: it.ratings[rating] ?? 0 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // top 10 for readability

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" height={60} />
          <YAxis domain={[0, 5]} tickCount={6} />
          <ReTooltip />
          <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]}>
            {/* could add LabelList here if desired */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Main dashboard component
 */
export function TechComparisonDashboard({ data }: { data: TechComparisonData }) {
  const ratingTypes = data.rating_types;
  const categories = data.categories;
  const [selectedRating, setSelectedRating] = React.useState<RatingTypesId>(ratingTypes[0]?.id ?? "proficiency");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const categoriesById = React.useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c])), [categories]);

  const filtered = React.useMemo(() => {
    const pool = selectedCategory === "all" ? data.items : data.items.filter((i) => i.category === selectedCategory);
    // sort by selected rating desc
    return [...pool].sort((a, b) => (b.ratings[selectedRating] ?? 0) - (a.ratings[selectedRating] ?? 0));
  }, [data.items, selectedCategory, selectedRating]);

  const topItem = filtered[0] ?? data.items[0];
  const selectedRatingLabel = ratingTypes.find((r) => r.id === selectedRating)?.label ?? selectedRating;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative pl-12">
            <ThemeDot />
            <div>
              <h2 className="text-xl font-semibold">Tech Stack Comparison</h2>
              <p className="text-sm text-muted-foreground">Visualize your skill profile across stacks and dimensions.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <RatingTypePicker ratingTypes={ratingTypes} value={selectedRating} onChange={setSelectedRating} />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <CategoryTabs categories={categories} value={selectedCategory} onValueChange={setSelectedCategory} />

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top by {selectedRatingLabel}</CardTitle>
              <CardDescription>Best performers in the selected category</CardDescription>
            </CardHeader>
            <CardContent>
              <BarSummary items={filtered} rating={selectedRating} label={selectedRatingLabel} />
            </CardContent>
          </Card>

          {topItem ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{topItem.name}: Full Profile</CardTitle>
                <CardDescription>Compare all five dimensions</CardDescription>
              </CardHeader>
              <CardContent>
                <RadarView item={topItem} ratingTypes={ratingTypes} />
              </CardContent>
            </Card>
          ) : null}
        </div>

        {/* Items Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Stacks</h3>
            <span className="text-sm text-muted-foreground">Sorted by {selectedRatingLabel}</span>
          </div>
          <ItemList items={filtered} selectedRating={selectedRating} categoriesById={categoriesById} />
        </div>

        <Separator className="my-2" />
        <p className="text-xs text-muted-foreground">Last updated: {data.lastUpdated ?? "—"}</p>
      </div>
    </TooltipProvider>
  );
}

/**
 * Example usage (client component):
 *
 * import data from "@/data/tech-comparison.json" assert { type: "json" };
 *
 * export default function TechComparisonPage() {
 *   return (
 *     <div className="container mx-auto p-4">
 *       <TechComparisonDashboard data={data as unknown as TechComparisonData} />
 *     </div>
 *   );
 * }
 */

export default TechComparisonDashboard;

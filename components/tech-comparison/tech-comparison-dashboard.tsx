"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import ThemeDot from "./theme-dot";
import RatingTypePicker from "./rating-type-picker";
import CategoryTabs from "./category-tabs";
import ItemList from "./item-list";
import RadarView from "./radar-view";
import BarSummary from "./bar-summary";
import { TechComparisonData, RatingTypesId } from "@/types/tech-comparison";

export interface TechComparisonDashboardProps {
  data: TechComparisonData;
}

export function TechComparisonDashboard({ data }: TechComparisonDashboardProps): React.ReactElement {
  const ratingTypes = data.rating_types;
  const categories = data.categories;
  const [selectedRating, setSelectedRating] = React.useState<RatingTypesId>(
    ratingTypes[0]?.id ?? "proficiency"
  );
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const categoriesById = React.useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    [categories]
  );

  const filtered = React.useMemo(() => {
    const pool =
      selectedCategory === "all"
        ? data.items
        : data.items.filter((i) => i.category === selectedCategory);
    return [...pool].sort(
      (a, b) => (b.ratings[selectedRating] ?? 0) - (a.ratings[selectedRating] ?? 0)
    );
  }, [data.items, selectedCategory, selectedRating]);

  const topItem = filtered[0] ?? data.items[0];
  const selectedRatingLabel =
    ratingTypes.find((r) => r.id === selectedRating)?.label ?? selectedRating;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative pl-12">
            <ThemeDot />
            <div>
              <h2 className="text-xl font-semibold">Tech Stack Comparison</h2>
              <p className="text-sm text-muted-foreground">
                Visualize your skill profile across stacks and dimensions.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <RatingTypePicker
              ratingTypes={ratingTypes}
              value={selectedRating}
              onChange={setSelectedRating}
            />
          </div>
        </div>

        <CategoryTabs
          categories={categories}
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top by {selectedRatingLabel}</CardTitle>
              <CardDescription>
                Best performers in the selected category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarSummary
                items={filtered}
                rating={selectedRating}
                label={selectedRatingLabel}
              />
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

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Stacks</h3>
            <span className="text-sm text-muted-foreground">
              Sorted by {selectedRatingLabel}
            </span>
          </div>
          <ItemList
            items={filtered}
            selectedRating={selectedRating}
            categoriesById={categoriesById}
          />
        </div>

        <Separator className="my-2" />
        <p className="text-xs text-muted-foreground">
          Last updated: {data.lastUpdated ?? "—"}
        </p>
      </div>
    </TooltipProvider>
  );
}

export default TechComparisonDashboard;

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import ThemeDot from "./theme-dot";
import RatingTypePicker from "./rating-type-picker";
import CategoryTabs from "./category-tabs";
import ItemList from "./item-list";
import RadarView, { RADAR_DEFAULT_MAX_SERIES } from "./radar-view";
import BarSummary from "./bar-summary";
import { useTechComparison } from "@/hooks/use-tech-comparison";
import { TechComparisonData } from "@/types/tech-comparison";

export interface TechComparisonDashboardProps {
  data: TechComparisonData;
}

export function TechComparisonDashboard({ data }: TechComparisonDashboardProps): React.ReactElement {
  const ratingTypes = data.rating_types;
  const categories = data.categories;
  const {
    selectedRating,
    setSelectedRating,
    selectedCategory,
    setSelectedCategory,
    filteredItems,
    topItems,
    categoriesById,
    selectedCategoryLabel,
  } = useTechComparison(data);
  const selectedRatingLabel =
    ratingTypes.find((r) => r.id === selectedRating)?.label ?? selectedRating;
  const topCount = Math.min(topItems.length, RADAR_DEFAULT_MAX_SERIES);
  const stackLabel = topCount === 1 ? "stack" : "stacks";
  const radarDescription =
    topItems.length > 0
      ? `Top ${topCount} ${stackLabel} across all metrics`
      : "No stacks available in this category";

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
                items={filteredItems}
                rating={selectedRating}
                label={selectedRatingLabel}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{selectedCategoryLabel} comparison</CardTitle>
              <CardDescription>{radarDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadarView items={topItems} ratingTypes={ratingTypes} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Stacks</h3>
            <span className="text-sm text-muted-foreground">
              Sorted by {selectedRatingLabel}
            </span>
          </div>
          <ItemList
            items={filteredItems}
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

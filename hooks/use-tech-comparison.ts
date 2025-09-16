"use client";

import React from "react";
import type {
  Category,
  RatingTypesId,
  TechComparisonData,
  TechItem,
} from "@/types/tech-comparison";

export interface UseTechComparisonResult {
  selectedRating: RatingTypesId;
  setSelectedRating: React.Dispatch<React.SetStateAction<RatingTypesId>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  filteredItems: TechItem[];
  topItem: TechItem | undefined;
  categoriesById: Record<string, Category>;
}

/**
 * Provides memoized selection and filtering helpers for the tech comparison dashboard.
 *
 * @example
 * ```tsx
 * const { filteredItems } = useTechComparison(data);
 * ```
 */
export function useTechComparison(data: TechComparisonData): UseTechComparisonResult {
  const ratingTypes = data.rating_types;
  const categories = data.categories;

  const [selectedRating, setSelectedRating] = React.useState<RatingTypesId>(
    ratingTypes[0]?.id ?? "proficiency"
  );
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const categoriesById = React.useMemo<Record<string, Category>>(
    () => Object.fromEntries(categories.map((category) => [category.id, category])),
    [categories]
  );

  const filteredItems = React.useMemo<TechItem[]>(() => {
    const pool =
      selectedCategory === "all"
        ? data.items
        : data.items.filter((item) => item.category === selectedCategory);

    return [...pool].sort(
      (a, b) => (b.ratings[selectedRating] ?? 0) - (a.ratings[selectedRating] ?? 0)
    );
  }, [data.items, selectedCategory, selectedRating]);

  const topItem = filteredItems[0] ?? data.items[0];

  return {
    selectedRating,
    setSelectedRating,
    selectedCategory,
    setSelectedCategory,
    filteredItems,
    topItem,
    categoriesById,
  };
}

export default useTechComparison;

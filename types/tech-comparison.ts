export type RatingTypesId = "proficiency" | "production_use" | "recency" | "depth" | "preference";

export interface RatingType {
  id: RatingTypesId;
  label: string;
  description: string;
  scale: Record<string, string>;
}

export interface Category {
  id: string;
  label: string;
  color?: string;
}

export interface TechItem {
  id: string;
  name: string;
  type: string;
  category: string;
  tags?: string[];
  since?: string;
  ratings: Record<RatingTypesId, number>;
  notes?: string;
}

export interface TechComparisonData {
  lastUpdated?: string;
  rating_types: RatingType[];
  categories: Category[];
  items: TechItem[];
}

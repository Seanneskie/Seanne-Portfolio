export interface TravelEntry {
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  country?: string;
  coords?: [number, number];
  cover?: string;
  excerpt?: string;
  tags: string[];
}

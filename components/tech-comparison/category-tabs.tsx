import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/tech-comparison";

export interface CategoryTabsProps {
  categories: Category[];
  value: string;
  onValueChange: (v: string) => void;
}

export function CategoryTabs({ categories, value, onValueChange }: CategoryTabsProps): React.ReactElement {
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
    </Tabs>
  );
}

export default CategoryTabs;

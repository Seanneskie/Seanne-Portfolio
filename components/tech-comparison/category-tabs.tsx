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
      <TabsList
        aria-label="Technology categories"
        className="flex w-full flex-nowrap gap-2 overflow-x-auto pb-1"
      >
        <TabsTrigger value="all" className="flex-none whitespace-nowrap px-3">
          All
        </TabsTrigger>
        {categories.map((c) => (
          <TabsTrigger
            key={c.id}
            value={c.id}
            className="flex-none whitespace-nowrap px-3"
          >
            {c.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default CategoryTabs;

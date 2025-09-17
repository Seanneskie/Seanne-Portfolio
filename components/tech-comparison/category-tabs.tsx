import React from "react";
import { Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/tech-comparison";
import { CategoryIcon } from "./category-icon";

const LIST_SCROLL_CLASSES =
  "flex w-full min-w-full flex-nowrap gap-2 overflow-x-auto rounded-full border border-gray-200 bg-gray-50/80 p-1 pl-3 pr-3 text-sm shadow-inner shadow-gray-200/50 dark:border-gray-700 dark:bg-gray-800/60 dark:shadow-black/20 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

const TRIGGER_CLASSES =
  "group flex-none items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-teal-600 dark:data-[state=active]:border-gray-700 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-cyan-300";

const CATEGORY_ICON_CLASSES =
  "size-4 text-gray-500 transition-colors group-data-[state=active]:text-teal-600 dark:text-gray-400 dark:group-data-[state=active]:text-cyan-300";

const ALL_ICON_CLASSES =
  "size-4 text-teal-500 transition-colors group-data-[state=active]:text-teal-600 dark:text-cyan-400 dark:group-data-[state=active]:text-cyan-300";

export interface CategoryTabsProps {
  categories: Category[];
  value: string;
  onValueChange: (v: string) => void;
}

export function CategoryTabs({ categories, value, onValueChange }: CategoryTabsProps): React.ReactElement {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <div className="relative overflow-hidden">
        <TabsList aria-label="Technology categories" className={LIST_SCROLL_CLASSES}>
          <TabsTrigger
            value="all"
            className={TRIGGER_CLASSES}
          >
            <Sparkles aria-hidden className={ALL_ICON_CLASSES} />
            <span>All</span>
          </TabsTrigger>
          {categories.map((c) => (
            <TabsTrigger
              key={c.id}
              value={c.id}
              className={TRIGGER_CLASSES}
            >
              <CategoryIcon categoryId={c.id} className={CATEGORY_ICON_CLASSES} />
              <span>{c.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-1 left-0 w-8 rounded-l-full bg-gradient-to-r from-white to-transparent dark:from-gray-900 z-10"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-1 right-0 w-8 rounded-r-full bg-gradient-to-l from-white to-transparent dark:from-gray-900 z-10"
        />
      </div>
    </Tabs>
  );
}

export default CategoryTabs;

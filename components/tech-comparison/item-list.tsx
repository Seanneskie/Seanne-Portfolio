import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThemeDot from "./theme-dot";
import StarRating from "./star-rating";
import RatingBar from "./rating-bar";
import { CategoryIcon } from "./category-icon";
import { TechItem, RatingTypesId, Category } from "@/types/tech-comparison";

export interface ItemListProps {
  items: TechItem[];
  selectedRating: RatingTypesId;
  categoriesById: Record<string, Category>;
}

export function ItemList({ items, selectedRating, categoriesById }: ItemListProps): React.ReactElement {
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
                    <Badge
                      style={{ backgroundColor: cat.color ?? undefined }}
                      className="flex items-center gap-1 text-white"
                    >
                      <CategoryIcon
                        categoryId={cat.id}
                        className="size-3.5 text-white/90"
                      />
                      <span>{cat.label}</span>
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
                    {it.tags.length > 5 ? (
                      <span className="text-xs text-muted-foreground">+{it.tags.length - 5} more</span>
                    ) : null}
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

export default ItemList;

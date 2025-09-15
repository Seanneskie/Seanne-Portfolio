import { type ReactElement } from "react";

import CounterCard from "@/components/card/CardCounter";
import { getCardCounterData } from "@/lib/profile-card-counter-data";
import { type CardCounterData, type CardCounterItem } from "@/types/card-counter";

/**
 * Renders a grid of {@link CounterCard} components based on data in
 * `public/data/card-counter.json`.
 *
 * @example
 * ```tsx
 * import CardCounters from "@/components/profile/card-counters";
 *
 * export default function Example() {
 *   return <CardCounters />;
 * }
 * ```
 */
export default function CardCounters(): ReactElement {
  const counterData: CardCounterData = getCardCounterData();
  const items: CardCounterItem[] = [...counterData.items].sort(
    (a, b) => a.order - b.order
  );

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ id, title, value, description, theme }) => (
        <CounterCard
          key={id}
          count={value}
          title={title}
          description={description}
          theme={theme}
        />
      ))}
    </section>
  );
}

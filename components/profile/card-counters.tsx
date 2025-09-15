import counterData from "@/public/data/card-counter.json" assert { type: "json" };
import CounterCard, { type CounterCardTheme } from "@/components/card/CardCounter";

interface CardCounterItem {
  id: string;
  title: string;
  value: number;
  description?: string;
  theme?: CounterCardTheme;
  order: number;
}

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
export default function CardCounters(): JSX.Element {
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

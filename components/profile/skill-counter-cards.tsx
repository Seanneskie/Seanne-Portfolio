/**
 * Usage:
 * <SkillCounterCards limit={6} />
 */
import useSkillStats from "@/hooks/use-skill-stats";
import SkillCounterCard from "./skill-counter-card";

export interface SkillCounterCardsProps {
  limit?: number;
}

const SkillCounterCards: React.FC<SkillCounterCardsProps> = ({ limit = 6 }) => {
  const { stats, loading, error } = useSkillStats();

  if (loading || error) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {stats.slice(0, limit).map((stat) => (
        <SkillCounterCard key={stat.name} name={stat.name} count={stat.count} />
      ))}
    </div>
  );
};

export default SkillCounterCards;

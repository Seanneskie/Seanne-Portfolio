/**
 * Usage:
 * <SkillCounterCard name="React" count={3} />
 */
import { Card, CardContent } from "@/components/ui/card";

export interface SkillCounterCardProps {
  name: string;
  count: number;
}

const SkillCounterCard: React.FC<SkillCounterCardProps> = ({ name, count }) => (
  <Card className="border-teal-500">
    <CardContent className="text-center">
      <h3 className="text-lg font-semibold text-teal-700">{name}</h3>
      <p className="text-2xl font-bold text-teal-600" aria-label={`${name} count`}>
        {count}
      </p>
    </CardContent>
  </Card>
);

export default SkillCounterCard;

export interface SkillItem {
  icon: string;
  name: string;
}

export interface SkillGroup {
  title: string;
  items: SkillItem[];
}

export interface SkillCategory {
  id: string;
  label: string;
  groups: SkillGroup[];
}

export interface SkillStat {
  name: string;
  count: number;
}

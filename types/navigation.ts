import type { LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

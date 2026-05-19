import * as React from "react";
import {
  Beef,
  BedDouble,
  Binoculars,
  Car,
  Coffee,
  Landmark,
  MapPin,
  Mountain,
  Palmtree,
  Plane,
  ShoppingBag,
  Trees,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

// Tag → pin icon mapping. Order matters: the first tag on a trip that matches
// an entry here wins, so put more-specific tags (burgers, coffee) above their
// general parents (food). Region/country tags (davao, ph) intentionally have
// no entry — they're filter facets, not place categories.
const TAG_ICONS: { tags: readonly string[]; icon: LucideIcon }[] = [
  { tags: ["burgers"], icon: Beef },
  { tags: ["coffee", "cafe"], icon: Coffee },
  { tags: ["food", "restaurant", "dining"], icon: UtensilsCrossed },
  { tags: ["bnb", "hotel", "stay", "hostel", "airbnb"], icon: BedDouble },
  { tags: ["beach", "island"], icon: Palmtree },
  { tags: ["hike", "mountain", "trek"], icon: Mountain },
  { tags: ["nature", "park", "forest"], icon: Trees },
  { tags: ["museum", "culture", "history"], icon: Landmark },
  { tags: ["shopping", "mall", "market"], icon: ShoppingBag },
  { tags: ["viewpoint", "scenic"], icon: Binoculars },
  { tags: ["flight", "airport"], icon: Plane },
  { tags: ["road-trip", "drive"], icon: Car },
];

export function resolvePinIcon(tags: string[]): LucideIcon {
  for (const tag of tags) {
    const match = TAG_ICONS.find((entry) => entry.tags.includes(tag));
    if (match) return match.icon;
  }
  return MapPin;
}

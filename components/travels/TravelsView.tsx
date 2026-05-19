"use client";

import * as React from "react";
import TravelMap from "./TravelMap";
import TravelTimeline from "./TravelTimeline";
import type { TravelEntry } from "./types";

interface TravelsViewProps {
  trips: TravelEntry[];
}

export default function TravelsView({ trips }: TravelsViewProps): React.ReactElement {
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);

  if (trips.length === 0) {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-300">No trips logged yet.</p>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <TravelMap trips={trips} activeSlug={activeSlug} onSelect={setActiveSlug} />
      <TravelTimeline trips={trips} activeSlug={activeSlug} onSelect={setActiveSlug} />
    </div>
  );
}

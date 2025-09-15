import React from "react";

export interface RatingBarProps {
  value: number;
  max?: number;
}

export function RatingBar({ value, max = 5 }: RatingBarProps): React.ReactElement {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-teal-600 to-cyan-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default RatingBar;

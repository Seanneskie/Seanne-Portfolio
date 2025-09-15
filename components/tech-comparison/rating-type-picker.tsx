import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RatingTypesId, RatingType } from "@/types/tech-comparison";

export interface RatingTypePickerProps {
  ratingTypes: RatingType[];
  value: RatingTypesId;
  onChange: (id: RatingTypesId) => void;
}

export function RatingTypePicker({ ratingTypes, value, onChange }: RatingTypePickerProps): React.ReactElement {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Compare by</span>
      <Select value={value} onValueChange={(v) => onChange(v as RatingTypesId)}>
        <SelectTrigger className="w-[220px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ratingTypes.map((rt) => (
            <SelectItem key={rt.id} value={rt.id}>
              {rt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default RatingTypePicker;

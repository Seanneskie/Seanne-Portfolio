import { Category, RatingType, RatingTypesId, TechComparisonData, TechItem } from "@/types/tech-comparison";

const RATING_TYPE_IDS: readonly RatingTypesId[] = [
  "proficiency",
  "production_use",
  "recency",
  "depth",
  "preference",
] as const;

const ratingTypeIdSet: ReadonlySet<RatingTypesId> = new Set(RATING_TYPE_IDS);

type UnknownRecord = Record<string, unknown>;

const EXPECTED_SCALE_KEYS: ReadonlyArray<string> = ["1", "2", "3", "4", "5"] as const;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function ensureString(value: unknown, context: string): string {
  if (typeof value !== "string") {
    throw new Error(`${context} must be a string.`);
  }

  return value;
}

function ensureOptionalString(value: unknown, context: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return ensureString(value, context);
}

function ensureFiniteNumber(value: unknown, context: string): number {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
    throw new Error(`${context} must be a finite number.`);
  }

  return value;
}

function isRatingTypesId(value: unknown): value is RatingTypesId {
  return typeof value === "string" && ratingTypeIdSet.has(value as RatingTypesId);
}

function parseScale(value: unknown, context: string): Record<string, string> {
  if (!isRecord(value)) {
    throw new Error(`${context} must be an object.`);
  }

  const record = value as UnknownRecord;
  const entries = Object.entries(record);
  if (entries.length === 0) {
    throw new Error(`${context} must include entries.`);
  }

  const scale: Record<string, string> = {};

  for (const [key, label] of entries) {
    if (!EXPECTED_SCALE_KEYS.includes(key)) {
      throw new Error(`${context} contains unexpected key "${key}".`);
    }

    scale[key] = ensureString(label, `${context}[${key}]`);
  }

  const missingKeys = EXPECTED_SCALE_KEYS.filter((expectedKey) => !(expectedKey in record));
  if (missingKeys.length > 0) {
    throw new Error(`${context} is missing keys: ${missingKeys.join(", ")}.`);
  }

  return scale;
}

function parseRatingTypes(value: unknown): RatingType[] {
  if (!Array.isArray(value)) {
    throw new Error("rating_types must be an array.");
  }

  return value.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`rating_types[${index}] must be an object.`);
    }

    const idRaw = (entry as UnknownRecord).id;
    if (!isRatingTypesId(idRaw)) {
      throw new Error(`rating_types[${index}].id is not a valid rating type identifier.`);
    }

    return {
      id: idRaw,
      label: ensureString((entry as UnknownRecord).label, `rating_types[${index}].label`),
      description: ensureString(
        (entry as UnknownRecord).description,
        `rating_types[${index}].description`,
      ),
      scale: parseScale((entry as UnknownRecord).scale, `rating_types[${index}].scale`),
    } satisfies RatingType;
  });
}

function parseCategories(value: unknown): Category[] {
  if (!Array.isArray(value)) {
    throw new Error("categories must be an array.");
  }

  return value.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`categories[${index}] must be an object.`);
    }

    const record = entry as UnknownRecord;
    const parsed: Category = {
      id: ensureString(record.id, `categories[${index}].id`),
      label: ensureString(record.label, `categories[${index}].label`),
    };

    const color = ensureOptionalString(record.color, `categories[${index}].color`);
    if (color !== undefined) {
      parsed.color = color;
    }

    return parsed;
  });
}

function parseTags(value: unknown, context: string): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(`${context} must be an array when provided.`);
  }

  return value.map((tag, tagIndex) => ensureString(tag, `${context}[${tagIndex}]`));
}

function parseRatings(value: unknown, index: number): Record<RatingTypesId, number> {
  if (!isRecord(value)) {
    throw new Error(`items[${index}].ratings must be an object.`);
  }

  const record = value as UnknownRecord;
  const ratings: Record<RatingTypesId, number> = {
    proficiency: ensureFiniteNumber(record.proficiency, `items[${index}].ratings.proficiency`),
    production_use: ensureFiniteNumber(record.production_use, `items[${index}].ratings.production_use`),
    recency: ensureFiniteNumber(record.recency, `items[${index}].ratings.recency`),
    depth: ensureFiniteNumber(record.depth, `items[${index}].ratings.depth`),
    preference: ensureFiniteNumber(record.preference, `items[${index}].ratings.preference`),
  };

  const unexpectedKeys = Object.keys(record).filter(
    (key): key is string => !RATING_TYPE_IDS.includes(key as RatingTypesId),
  );

  if (unexpectedKeys.length > 0) {
    throw new Error(
      `items[${index}].ratings contains unexpected keys: ${unexpectedKeys.join(", ")}.`,
    );
  }

  return ratings;
}

function parseItems(value: unknown): TechItem[] {
  if (!Array.isArray(value)) {
    throw new Error("items must be an array.");
  }

  return value.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`items[${index}] must be an object.`);
    }

    const record = entry as UnknownRecord;

    const parsed: TechItem = {
      id: ensureString(record.id, `items[${index}].id`),
      name: ensureString(record.name, `items[${index}].name`),
      type: ensureString(record.type, `items[${index}].type`),
      category: ensureString(record.category, `items[${index}].category`),
      ratings: parseRatings(record.ratings, index),
    };

    const tags = parseTags(record.tags, `items[${index}].tags`);
    if (tags !== undefined) {
      parsed.tags = tags;
    }

    const since = ensureOptionalString(record.since, `items[${index}].since`);
    if (since !== undefined) {
      parsed.since = since;
    }

    const notes = ensureOptionalString(record.notes, `items[${index}].notes`);
    if (notes !== undefined) {
      parsed.notes = notes;
    }

    return parsed;
  });
}

function ensureAllRatingTypesPresent(ratingTypes: RatingType[]): void {
  for (const ratingId of RATING_TYPE_IDS) {
    if (!ratingTypes.some((ratingType) => ratingType.id === ratingId)) {
      throw new Error(`rating_types is missing required id "${ratingId}".`);
    }
  }
}

export function normalizeTechComparisonData(raw: unknown): TechComparisonData {
  if (!isRecord(raw)) {
    throw new Error("Tech comparison data must be an object.");
  }

  const record = raw as UnknownRecord;
  const ratingTypes = parseRatingTypes(record.rating_types);
  ensureAllRatingTypesPresent(ratingTypes);

  const categories = parseCategories(record.categories);
  const items = parseItems(record.items);

  const lastUpdatedValue = record.lastUpdated;
  const lastUpdated = typeof lastUpdatedValue === "string" ? lastUpdatedValue : undefined;

  return {
    lastUpdated,
    rating_types: ratingTypes,
    categories,
    items,
  } satisfies TechComparisonData;
}

export { RATING_TYPE_IDS };

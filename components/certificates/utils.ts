const KNOWN_ISSUERS = [
  "Google",
  "SoloLearn",
  "FreeCodeCamp",
  "Cisco",
  "Linux",
  "Intel",
  "DevCon",
  "BPI",
  "Workshop",
  "Conference",
  "Roadshow",
  "Government",
] as const;

const MONTHS: Record<string, number> = {
  january: 0, jan: 0,
  february: 1, feb: 1,
  march: 2, mar: 2,
  april: 3, apr: 3,
  may: 4,
  june: 5, jun: 5,
  july: 6, jul: 6,
  august: 7, aug: 7,
  september: 8, sep: 8, sept: 8,
  october: 9, oct: 9,
  november: 10, nov: 10,
  december: 11, dec: 11,
};

// Pulls "Date: Month [day,] YYYY" (or "Date:Month YYYY", flexible spacing) out of a desc.
export function parseCertDate(desc: string): { date: Date | null; dateLabel: string } {
  const m = desc.match(/Date\s*:\s*([A-Za-z]+)\s*(?:(\d{1,2})\s*,?\s*)?(\d{4})/);
  if (!m) return { date: null, dateLabel: "" };

  const monthName = m[1].toLowerCase();
  const month = MONTHS[monthName];
  const day = m[2] ? parseInt(m[2], 10) : 1;
  const year = parseInt(m[3], 10);

  if (month === undefined || Number.isNaN(year)) return { date: null, dateLabel: "" };

  const date = new Date(Date.UTC(year, month, day));
  const labelMonth = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  return { date, dateLabel: `${labelMonth} ${year}` };
}

// Strips the "Date: ..." suffix so the body text doesn't repeat the date pill.
export function stripDate(desc: string): string {
  return desc.replace(/\s*Date\s*:\s*[A-Za-z]+\s*(?:\d{1,2}\s*,?\s*)?\d{4}\.?\s*$/i, "").trim();
}

export function getIssuer(tags: string[]): string {
  const t = new Set(tags);
  for (const i of KNOWN_ISSUERS) {
    if (t.has(i)) return i;
  }
  return "Other";
}

export function enrichCertificate<T extends { tags: string[]; desc: string }>(c: T): T & {
  date: Date | null;
  dateLabel: string;
  year: number | null;
  issuer: string;
} {
  const { date, dateLabel } = parseCertDate(c.desc);
  return {
    ...c,
    date,
    dateLabel,
    year: date ? date.getUTCFullYear() : null,
    issuer: getIssuer(c.tags),
  };
}

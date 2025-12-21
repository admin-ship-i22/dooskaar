export function nowIso(): string {
  return new Date().toISOString();
}

export function newId(prefix: string): string {
  // Short unique-enough id for demo usage.
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function isIsoDate(value: string): boolean {
  // Expect YYYY-MM-DD
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function daysBetweenInclusive(start: string, end: string): number {
  // Both should be YYYY-MM-DD; interpret as UTC midnight.
  const s = Date.parse(`${start}T00:00:00Z`);
  const e = Date.parse(`${end}T00:00:00Z`);
  const diffDays = Math.floor((e - s) / (24 * 3600 * 1000));
  return diffDays + 1;
}


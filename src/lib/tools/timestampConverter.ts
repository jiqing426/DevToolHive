export type TimestampUnit = 's' | 'ms';

export interface TimestampResult {
  iso: string;
  local: string;
  valid: boolean;
}

/** Unix 时间戳 → 可读日期 */
export function timestampToDate(value: number, unit: TimestampUnit): TimestampResult {
  if (!Number.isFinite(value)) return { iso: '', local: '', valid: false };
  const ms = unit === 's' ? value * 1000 : value;
  const d = new Date(ms);
  if (isNaN(d.getTime())) return { iso: '', local: '', valid: false };
  return { iso: d.toISOString(), local: d.toLocaleString(), valid: true };
}

/** 可读日期 → Unix 时间戳（datetime-local 字符串输入） */
export function dateToTimestamp(input: string, unit: TimestampUnit): number | null {
  if (!input) return null;
  const d = new Date(input);
  if (isNaN(d.getTime())) return null;
  const t = d.getTime();
  return unit === 's' ? Math.floor(t / 1000) : t;
}

/** 当前时间戳 */
export function nowTimestamp(unit: TimestampUnit): number {
  const t = Date.now();
  return unit === 's' ? Math.floor(t / 1000) : t;
}

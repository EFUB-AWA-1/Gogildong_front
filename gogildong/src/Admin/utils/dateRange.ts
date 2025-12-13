// src/common/utils/dateRange.ts
export type YearMonth = { year: number; month: number }; // month: 1~12

export function toIndex(ym: YearMonth) {
  return ym.year * 12 + (ym.month - 1);
}

export function fromIndex(idx: number): YearMonth {
  const year = Math.floor(idx / 12);
  const month = (idx % 12) + 1;
  return { year, month };
}

export function compareYM(a: YearMonth, b: YearMonth) {
  return toIndex(a) - toIndex(b);
}

export function addMonths(ym: YearMonth, delta: number): YearMonth {
  return fromIndex(toIndex(ym) + delta);
}

export function diffMonthsInclusive(start: YearMonth, end: YearMonth) {
  // inclusive months count
  return Math.abs(toIndex(end) - toIndex(start)) + 1;
}

export function clampRangeToMaxMonths(
  start: YearMonth,
  end: YearMonth,
  maxInclusiveMonths: number
) {
  // start <= end 로 정렬 후, max 개월 넘으면 end를 start 기준으로 자름
  const s = compareYM(start, end) <= 0 ? start : end;
  const e = compareYM(start, end) <= 0 ? end : start;

  const maxDelta = maxInclusiveMonths - 1; // inclusive
  const delta = toIndex(e) - toIndex(s);

  if (delta <= maxDelta) return { start: s, end: e };

  return { start: s, end: addMonths(s, maxDelta) };
}

export function getMonthsBetweenInclusive(start: YearMonth, end: YearMonth) {
  const sIdx = toIndex(start);
  const eIdx = toIndex(end);
  const min = Math.min(sIdx, eIdx);
  const max = Math.max(sIdx, eIdx);

  const result: YearMonth[] = [];
  for (let i = min; i <= max; i += 1) result.push(fromIndex(i));
  return result;
}

export function formatYM(ym: YearMonth) {
  const mm = String(ym.month).padStart(2, '0');
  return `${ym.year}.${mm}`;
}

export function formatRange(start: YearMonth, end: YearMonth) {
  return `${formatYM(start)} - ${formatYM(end)}`;
}

export function isInRange(target: YearMonth, start: YearMonth, end: YearMonth) {
  const t = toIndex(target);
  const a = toIndex(start);
  const b = toIndex(end);
  return t >= Math.min(a, b) && t <= Math.max(a, b);
}

/**
 * 日付を "YYYY/MM/DD" 形式にフォーマットする
 */
export function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

/**
 * 日付文字列をパースする
 */
export function parseDate(dateStr: string): Date {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  return date;
}

/**
 * 日付を "YYYY.MM" 形式にフォーマットする
 */
export function formatYearMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}.${month}`;
}

/**
 * 期間を計算する（月数）
 * - end が undefined: 現在までの期間
 */
export function calcDuration(start: string, end?: string): number {
  const startDate = parseDate(start);
  const endDate = end ? parseDate(end) : new Date();

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1;

  return Math.max(months, 1);
}

/**
 * 期間を表示用文字列にフォーマットする（例: "1年3ヶ月"）
 */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths}ヶ月`;
  }
  if (remainingMonths === 0) {
    return `${years}年`;
  }
  return `${years}年${remainingMonths}ヶ月`;
}

/**
 * 期間を表示用文字列にフォーマットする（例: "2024.10 - 現在"）
 * start と end が同じ月の場合は単月表示（例: "2024.10"）
 */
export function formatPeriod(start: string, end?: string): string {
  const startDate = parseDate(start);
  const startStr = formatYearMonth(startDate);

  if (!end) {
    return `${startStr} - 現在`;
  }

  const endDate = parseDate(end);
  const endStr = formatYearMonth(endDate);

  if (startStr === endStr) {
    return startStr;
  }

  return `${startStr} - ${endStr}`;
}

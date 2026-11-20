import type { LeitnerItemState } from "../types";

export const LEITNER_INTERVAL_DAYS: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16
};

export function addDaysToISO(dateISO: string, days: number): string {
  const base = new Date(`${dateISO}T00:00:00.000Z`);
  base.setUTCDate(base.getUTCDate() + days);
  return base.toISOString().split("T")[0];
}

export function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * 5-box Leitner update:
 * - Correct answer: moves up 1 box (max box 5), interval 1, 2, 4, 8, 16 days.
 * - Wrong answer: resets back to box 1 (interval 1 day).
 */
export function updateLeitnerBox(
  current: LeitnerItemState | undefined,
  itemId: string,
  correct: boolean,
  todayISO: string = getTodayISO()
): LeitnerItemState {
  const prevBox = current?.box ?? 1;
  const nextBox = (correct ? Math.min(5, prevBox + 1) : 1) as 1 | 2 | 3 | 4 | 5;
  const intervalDays = LEITNER_INTERVAL_DAYS[nextBox];

  return {
    itemId,
    box: nextBox,
    nextReviewDate: addDaysToISO(todayISO, intervalDays),
    lastReviewedAt: todayISO
  };
}

/**
 * Returns true if the item is due today or overdue.
 */
export function isLeitnerItemDue(
  state: LeitnerItemState,
  todayISO: string = getTodayISO()
): boolean {
  return state.nextReviewDate <= todayISO;
}

/**
 * Returns all itemIds from `leitnerMap` that are due on `todayISO`, ordered by lowest box first.
 */
export function getDueLeitnerItems(
  leitnerMap: Record<string, LeitnerItemState>,
  todayISO: string = getTodayISO()
): LeitnerItemState[] {
  return Object.values(leitnerMap)
    .filter((entry) => isLeitnerItemDue(entry, todayISO))
    .sort((a, b) => a.box - b.box || a.nextReviewDate.localeCompare(b.nextReviewDate));
}

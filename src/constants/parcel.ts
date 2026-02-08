export interface Parcel {
  id: string;
  name: string;
  trackingUrl?: string;
  expectedDate: string; // ISO date string (YYYY-MM-DD)
  notes?: string;
  createdAt: string;
}

export const STORAGE_KEY = "parcels";

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export interface CountdownResult {
  delivered: boolean;
  days: number;
  hours: number;
  minutes: number;
  totalMs: number;
}

/**
 * Calculate countdown from now until the expected delivery date.
 * Treats expectedDate as end-of-day (23:59:59) in local time.
 */
export function getCountdown(expectedDate: string): CountdownResult {
  const target = new Date(expectedDate + "T23:59:59");
  const now = new Date();
  const totalMs = target.getTime() - now.getTime();

  if (totalMs <= 0) {
    return { delivered: true, days: 0, hours: 0, minutes: 0, totalMs: 0 };
  }

  const totalMinutes = Math.floor(totalMs / (1000 * 60));
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return { delivered: false, days, hours, minutes, totalMs };
}

/**
 * Format a countdown result as a human-readable string.
 */
export function formatCountdown(countdown: CountdownResult): string {
  if (countdown.delivered) return "Delivered!";

  const parts: string[] = [];
  if (countdown.days > 0) {
    parts.push(`${countdown.days} day${countdown.days !== 1 ? "s" : ""}`);
  }
  if (countdown.hours > 0) {
    parts.push(`${countdown.hours} hr${countdown.hours !== 1 ? "s" : ""}`);
  }
  if (countdown.days === 0) {
    parts.push(`${countdown.minutes} min${countdown.minutes !== 1 ? "s" : ""}`);
  }

  return parts.join(" ") || "< 1 min";
}

/**
 * Validate a YYYY-MM-DD date string.
 */
export function isValidDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const date = new Date(dateStr + "T00:00:00");
  return !isNaN(date.getTime());
}

/**
 * Sort parcels by nearest delivery date first, delivered ones last.
 */
export function sortParcels(parcels: Parcel[]): Parcel[] {
  return [...parcels].sort((a, b) => {
    const aCountdown = getCountdown(a.expectedDate);
    const bCountdown = getCountdown(b.expectedDate);

    // Delivered parcels go to the bottom
    if (aCountdown.delivered && !bCountdown.delivered) return 1;
    if (!aCountdown.delivered && bCountdown.delivered) return -1;

    // Both delivered: most recently delivered first
    if (aCountdown.delivered && bCountdown.delivered) {
      return new Date(b.expectedDate).getTime() - new Date(a.expectedDate).getTime();
    }

    // Both active: nearest first
    return aCountdown.totalMs - bCountdown.totalMs;
  });
}

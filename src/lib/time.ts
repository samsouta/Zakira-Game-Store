// lib/time.ts
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Convert time to "x minutes ago"
 * @param isoTime ISO date string like "2025-07-19T04:41:27.000000Z"
 * @returns relative time like "2 minutes ago"
 */
export function timeAgo(isoTime: string): string {
  return dayjs(isoTime).fromNow();
}

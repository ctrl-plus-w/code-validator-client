import { formatNumber } from './string.util';

/**
 * Format the date to the yyyy-mm-dd
 * @param date The date to format
 * @returns A string
 */
const formatDate = (date: Date, link = '-'): string => {
  const dates = [date.getFullYear(), date.getMonth(), date.getDate()];
  return dates.map(formatNumber).join(link);
};

/**
 * Format the date to the yyyy-mm-dd, HHhMM
 * @param date The date to format
 * @returns A string
 */
export const formatDatetime = (date: Date, link = '-'): string => {
  const dates = [date.getFullYear(), date.getMonth(), date.getDate()];
  const times = [date.getHours(), date.getMinutes()];

  return `${dates.map(formatNumber).join(link)}, ${times.map(formatNumber).join('h')}`;
};

export default formatDate;

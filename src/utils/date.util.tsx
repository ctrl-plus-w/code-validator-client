import { formatNumber } from '@util/any.utils';

import { DAYS, MONTHS } from '@constant/date';

/**
 * Return a date with the given seconds changed.
 * @param date The date to modify the seconds.
 * @param value The new seconds value.
 * @returns A date
 */
export const setSeconds = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setSeconds(value);
  return tempDate;
};

/**
 * Return a date with the given minutes changed.
 * @param date The date to modify the minutes.
 * @param value The new minutes value.
 * @returns A date
 */
export const setMinutes = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setMinutes(value);
  return tempDate;
};

/**
 * Return a date with the given hours changed.
 * @param date The date to modify the hours.
 * @param value The new hours value.
 * @returns A date
 */
export const setHours = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setHours(value);
  return tempDate;
};

/**
 * Return a date with the given day changed.
 * @param date The date to modify the day.
 * @param value The new date value.
 * @returns A date
 */
export const setDate = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setDate(value);
  return tempDate;
};

/**
 * Return a date with the given month changed.
 * @param date The date to modify the month.
 * @param value The new month value.
 * @returns A date
 */
export const setMonth = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setMonth(value);
  return tempDate;
};

/**
 * Return a date with the given year changed.
 * @param date The date to modify the year.
 * @param value The new year value.
 * @returns A date
 */
export const setYear = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setFullYear(value);
  return tempDate;
};

/**
 * Return a date with its seconds incremented by the amount.
 * @param date The date to increment the seconds.
 * @param amount The amount of seconds to increment the date.
 * @returns A date
 */
export const incrementSeconds = (date: Date, amount: number): Date => {
  return setSeconds(date, date.getSeconds() + amount);
};

/**
 * Return a date with its minutes incremented by the amount.
 * @param date The date to increment the minutes.
 * @param amount The amount of minutes to increment the date.
 * @returns A date
 */
export const incrementMinutes = (date: Date, amount: number): Date => {
  return setMinutes(date, date.getMinutes() + amount);
};

/**
 * Return a date with its hours incremented by the amount.
 * @param date The date to increment the hours.
 * @param amount The amount of hours to increment the date.
 * @returns A date
 */
export const incrementHours = (date: Date, amount: number): Date => {
  return setHours(date, date.getHours() + amount);
};

/**
 * Return a date with its hours and minutes incremented by the given amount.
 * @param date The date to increment the time from
 * @param hours The amount of hours to increment
 * @param minutes The amount of minutes to increment
 * @returns A date
 */
export const incrementTime = (date: Date, hours: number, minutes: number): Date => {
  return incrementHours(incrementMinutes(date, minutes), hours);
};

/**
 * Return a date with its date incremented by the amount.
 * @param date The date to increment the day.
 * @param amount The amount of days to increment the date.
 * @returns A date
 */
export const incrementDate = (date: Date, amount: number): Date => {
  return setDate(date, date.getDate() + amount);
};

/**
 * Return a date with its month incremented by the amount.
 * @param date The date to increment the months.
 * @param amount The amount of months to increment the date.
 * @returns A date
 */
export const incrementMonth = (date: Date, amount: number): Date => {
  return setMonth(date, date.getMonth() + amount);
};

/**
 * Return a date with its year incremented by the amount.
 * @param date The date to increment the years.
 * @param amount The amount of years to increment the date.
 * @returns A date
 */
export const incrementYear = (date: Date, amount: number): Date => {
  return setYear(date, date.getFullYear() + amount);
};

/**
 * Get the french month from the Date month index
 * @param month The Month index
 * @returns A string
 */
export const monthToString = (month: number): string => {
  return MONTHS[month];
};

/**
 * Get the date of the first day in the month which contains the date
 * @param date The date in the month
 * @returns A date
 */
export const getMonthFirstDate = (date: Date): Date => {
  return setDate(new Date(date), 1);
};

/**
 * Get the date of the last day in the month which contains the date
 * @param date The date in the month
 * @returns A date
 */
export const getMonthLastDate = (date: Date): Date => {
  return setDate(incrementMonth(new Date(date), 1), 0);
};

/**
 * Get the first day of the week which contains the date
 * @param date The date in the week
 * @returns A date
 */
export const getWeekFirstDate = (date: Date): Date => {
  const day = date.getDay();
  return setDate(date, date.getDate() - (day === 0 ? 6 : day + 1));
};

/**
 * Get the last day of the week which contains the date
 * @param date The date in the week
 * @returns A date
 */
export const getWeekLastDate = (date: Date): Date => {
  const day = date.getDay();
  return setDate(date, date.getDate() + (day === 0 ? 0 : 7 - day));
};

/**
 * Know if a given date is in a given month
 * @param date The reference date
 * @param dateToFind The date to find in the month
 * @returns A boolean
 */
export const isDateInMonth = (date: Date, dateToFind: Date): boolean => {
  return (
    dateToFind.valueOf() >= getMonthFirstDate(date).valueOf() &&
    dateToFind.valueOf() <= getMonthLastDate(date).valueOf()
  );
};

/**
 * Get a calendar array (6 rows of 7 days, all starting a monday and ending a sunday)
 * @param date The date which is in the calendar
 * @returns An array of array of dates
 */
export const getCalendarDates = (date: Date): Array<Date> => {
  const dates = [];

  // There is 42 days in a month calendar -> 7 days x 6 weeks
  for (let i = 0; i < 42; i += 1) {
    dates.push(incrementDate(getWeekFirstDate(getMonthFirstDate(date)), i));
  }

  return dates;
};

/**
 * Check if the date have the hours and minutes
 * @param date The first date to compare
 * @param date1 The second date to compare
 * @returns A boolean
 */
export const isSameTime = (date: Date, date1: Date): boolean => {
  return date.getHours() === date1.getHours() && date.getMinutes() === date1.getMinutes();
};

/**
 * Check if the date have the same date (not the week day)
 * @param date The first date to compare
 * @param date1 The second date to compare
 * @returns A boolean
 */
export const isSameDay = (date: Date, date1: Date): boolean => date.getDate() === date1.getDate();

/**
 * Check if the date have the same month
 * @param date The first date to compare
 * @param date1 The second date to compare
 * @returns A boolean
 */
export const isSameMonth = (date: Date, date1: Date): boolean => {
  return date.getMonth() === date1.getMonth();
};

/**
 * Check if the date have the same year
 * @param date The first date to compare
 * @param date1 The second date to compare
 * @returns A boolean
 */
export const isSameYear = (date: Date, date1: Date): boolean => {
  return date.getFullYear() === date1.getFullYear();
};

/**
 * Check if the date are the same
 * @param date The first date to compare
 * @param date1 The second date to compare
 * @returns A boolean
 */
export const isSameDate = (date: Date, date1: Date): boolean => {
  if (isSameDay(date, date1)) return false;
  if (isSameMonth(date, date1)) return false;
  if (isSameYear(date, date1)) return false;
  return true;
};

/**
 * Check if the date have the same date and time
 * @param date The first date to compare
 * @param date1 The second date to compare
 * @returns A boolean
 */
export const isSameDateTime = (date: Date, date1: Date): boolean => {
  return isSameDate(date, date1) && isSameTime(date, date1);
};

/**
 * Format the date to the yyyy-mm-dd (mm: 1-12, dd: 1-31)
 * @param date The date to format
 * @returns A string
 */
export const formatInputDate = (date: Date, link = '-'): string => {
  const dates = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  return dates.map(formatNumber).join(link);
};

/**
 * Format the date to the yyyy-mm-dd, HHhMM
 * @param date The date to format
 * @returns A string
 */
export const formatInputDatetime = (date: Date, link = '-'): string => {
  const dates = [date.getFullYear(), date.getMonth(), date.getDate()];
  const times = [date.getHours(), date.getMinutes()];

  return `${dates.map(formatNumber).join(link)}, ${times.map(formatNumber).join('h')}`;
};

/**
 * Format a date into a string
 * @param date The date to format
 * @returns A string
 */
export const formatDate = (_date: Date | string): string => {
  const date = typeof _date === 'string' ? new Date(_date) : _date;
  const today = new Date();

  if (isSameDate(date, today)) {
    return `Aujourd'hui, ${date.getDate()} ${monthToString(date.getMonth())}`;
  }
  if (isSameDate(date, incrementDate(today, 1))) {
    return `Demain, ${date.getDate()} ${monthToString(date.getMonth())}`;
  }

  const day = DAYS[date.getDay()];

  return date.getFullYear() === today.getFullYear()
    ? `${day} ${date.getDate()} ${monthToString(date.getMonth())}`
    : `${day} ${date.getDate()} ${monthToString(date.getMonth())} ${date.getFullYear()}`;
};

/**
 * Format a datetime into a string
 * @param date The datetime to format
 * @returns A string
 */
export const formatDateTime = (_date: Date | string): string => {
  const date = typeof _date === 'string' ? new Date(_date) : _date;
  return `${formatDate(_date)} à ${formatNumber(date.getHours())}h${formatNumber(
    date.getMinutes(),
  )}`;
};

/**
 * Modify the hours and minutes of a date
 * @param date The date to modify
 * @param hours The new hours to set
 * @param minutes The new minutes to set
 * @returns A date
 */
export const setTime = (date: Date, hours: number, minutes: number, seconds = 0, ms = 0): Date => {
  const tempDate = new Date(date);
  tempDate.setHours(hours);
  tempDate.setMinutes(minutes);
  tempDate.setSeconds(seconds);
  tempDate.setMilliseconds(ms);
  return tempDate;
};

/**
 * Get an array representing an hour
 * @param date The date to get the time array from
 * @returns An array representing an hour, e.g [15, 5] -> 15h05
 */
export const getTimeAsArray = (date: Date): [string, string] => {
  return [formatNumber(date.getHours().toString()), formatNumber(date.getMinutes().toString())];
};

/**
 * Get an array representing the difference between date as an hour
 * @param date The younger date
 * @param date1 The older date to compare
 * @returns An array representing an hour, e.g [15, 5] -> 15h05
 */
export const getTimeArrayFromDifference = (date: Date, date1: Date): [string, string] => {
  const msDiff = date1.valueOf() - date.valueOf();
  return [
    formatNumber(Math.floor((msDiff / (1000 * 60 * 60)) % 24).toString()),
    formatNumber(Math.floor((msDiff / (1000 * 60)) % 60).toString()),
  ];
};

/**
 * Check if the date is after today (at 23:59)
 * @param date The date to check
 * @returns A boolean
 */
export const isInFuture = (date: Date): boolean => {
  return date.valueOf() > setTime(new Date(), 24, 0, 0, 0).valueOf();
};

/**
 * Get the amount of days, hours, minutes and seconds contained in the amount of milliseconds
 * @param ms The amount of milliseconds
 * @returns An array reprensenting the amount of [days, hours, minutes, seconds]
 */
export const getTimeFromMs = (ms: number): [number, number, number, number] => {
  if (ms <= 0) return [0, 0, 0, 0];

  const DAY_AS_MS = 24 * 60 * 60 * 1000;
  const HOUR_AS_MS = 60 * 60 * 1000;
  const MIN_AS_MS = 60 * 1000;
  const SEC_AS_MS = 1000;

  const days = Math.floor(ms / DAY_AS_MS);
  const daysMs = days * DAY_AS_MS;

  const hours = Math.floor((ms - daysMs) / HOUR_AS_MS);
  const hoursMs = hours * HOUR_AS_MS;

  const mins = Math.floor((ms - daysMs - hoursMs) / MIN_AS_MS);
  const minsMs = mins * MIN_AS_MS;

  const secs = Math.floor((ms - daysMs - hoursMs - minsMs) / SEC_AS_MS);

  return [days, hours, mins, secs];
};

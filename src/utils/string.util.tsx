import { ReactNode } from 'react';

/**
 * Cut the string and add three dots to make it the right size
 * @param str The string to ellipse
 * @param maxLength The maximum length of the final string
 * @returns A string
 */
export const ellipsis = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3).trim()}...`;
};

/**
 * Make a javascript string into a html text
 * @param str The string to parse
 * @returns A react node
 */
export const parse = (str: string): ReactNode => {
  const lines = str.split(/(?:\r\n|\r|\n)/g);
  return lines.map((line) => (
    <>
      {line} <br />
    </>
  ));
};

/**
 * Format the string to have two digits minimum
 * @param num The number to format
 * @returns A string
 */
export const formatNumber = (num: string | number): string => {
  if (typeof num === 'string') return parseInt(num, 10) < 10 ? `0${num}` : `${num}`;
  return num < 10 ? `0${num}` : `${num}`;
};

/**
 * Format the gender to a french word
 * @param gender The gender to format
 * @returns A gender (french)
 */
export const genderMapper = (gender: 'male' | 'female'): 'Homme' | 'Femme' => {
  return gender === 'male' ? 'Homme' : 'Femme';
};

/**
 * Check if the string is empty or not
 * @param str The string to check
 * @returns A boolean
 */
export const isEmpty = (str: string): boolean => {
  return str.trim() === '';
};

/**
 * Transform a string into its slug
 * @param str The string to slugify
 * @returns The slugifyied string
 */
export const slugify = (_str: string): string => {
  let str = _str;

  str = str.replace(/^\s+|\s+$/g, ''); // Trim
  str = str.toLowerCase();

  // Remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i += 1) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Collapse whitespace and replace by -
    .replace(/-+/g, '-'); // Collapse dashes

  return str;
};

/**
 * Capitalize the string
 * @param str The string to capitalize
 * @returns A string
 */
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default capitalize;

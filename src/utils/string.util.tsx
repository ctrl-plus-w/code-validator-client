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
 * Capitalize the string
 * @param str The string to capitalize
 * @returns A string
 */
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default capitalize;

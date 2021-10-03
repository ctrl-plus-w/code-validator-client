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
 * Capitalize the string
 * @param str The string to capitalize
 * @returns A string
 */
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default capitalize;

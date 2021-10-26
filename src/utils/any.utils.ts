/**
 * Convert a string into a number of 2 characters min
 * @param _num The number to format
 * @returns A string representing a number
 */
export const formatNumber = (_num: string | number): string => {
  const num = typeof _num === 'string' ? parseInt(_num, 10) : _num;
  return num >= 10 ? `${num}` : `0${num}`;
};

export default formatNumber;

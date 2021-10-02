/**
 * Get an array of the intersected values of the two other arrays.
 * @param a The first array.
 * @param b The second array.
 * @returns An array.
 */
export const intersect = <T>(a: T[], b: T[]): T[] => {
  return Array.from(new Set([...a, ...b]));
};

/**
 * Check if the given element is on the both arrays.
 * @param a The first array.
 * @param b The second array.
 * @param element The elemen to check the presence.
 * @returns A boolean
 */
export const bothIncludes = <T>(a: T[], b: T[], element: T): boolean => {
  return a.includes(element) && b.includes(element);
};

/**
 * Generate an array of n size.
 * @param size The expected size of the array.
 * @param element The element to fill the array with.
 * @returns An array of elements.
 */
const generateArray = <T>(size: number, element?: T): Array<T> => {
  return new Array(size).fill(element);
};

export default generateArray;

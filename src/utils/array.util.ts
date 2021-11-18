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
 * Check if an evaluation with the given slug exists.
 * @param evaluations The evaluations to check.
 * @param slug The slug of the evaluation.
 * @returns A boolean
 */
export const evaluationsIncludesSlug = (
  evaluations: IEvaluation[] | { slug: string }[],
  slug: string,
): boolean => {
  return evaluations.some((evaluation) => evaluation.slug === slug);
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

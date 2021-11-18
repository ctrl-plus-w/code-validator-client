import { OperationVariables, QueryLazyOptions } from '@apollo/client';

/**
 * Return the query lazy options object with the auth token
 * @param token The authentication token
 * @returns A query lazy options object
 */
export const getAuthOptions = (token: string): QueryLazyOptions<OperationVariables> => {
  return { context: { headers: { authorization: `Bearer ${token}` } } };
};

const n = null;
export default n;

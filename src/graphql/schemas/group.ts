import { gql } from '@apollo/client';

export const getGroups = gql`
  query {
    groups {
      id
      name
      slug
    }
  }
`;

const n = null;
export default n;

import { gql } from '@apollo/client';

export interface GetAnswersInput {
  evaluationId: number;
}

export const getAnswers = gql`
  query Answers($evaluationId: Int!) {
    answers(evaluationId: $evaluationId) {
      id
      content
      user {
        firstName
        lastName
        group {
          name
        }
      }
    }
  }
`;

const n = null;
export default n;

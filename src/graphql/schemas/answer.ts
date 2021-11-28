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
      corrected
    }
  }
`;

export interface UpdateAnswerInput {
  input: {
    id: number;
    unitTests: number;
    cleanliness: number;
    elementUsage: number;
    note: string;
  };
}

export const updateAnswer = gql`
  mutation UpdateAnswers($input: UpdateAnswerInput!) {
    updateAnswer(input: $input) {
      id
    }
  }
`;

export interface AnswerEvaluationInput {
  input: {
    id: number;
    content: string;
  };
}

export const answerEvaluation = gql`
  mutation AnswerEvaluation($input: AnswerEvaluationInput!) {
    answer(input: $input) {
      id
    }
  }
`;

const n = null;
export default n;

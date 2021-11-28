import { gql } from '@apollo/client';

export const getEvaluationsSlug = gql`
  query {
    evaluations {
      slug
    }
  }
`;

export const getEvaluations = gql`
  query {
    evaluations {
      id
      title
      slug
      subject
      group {
        name
      }
      user {
        gender
        lastName
      }
      deadline
      answers {
        content
        corrected
        cleanliness
        elementUsage
        unitTests
      }
      totalUsers
      completedUsers
    }
  }
`;

export interface GetEvaluationInput {
  id: number;
}

export const getEvaluation = gql`
  query Evaluation($id: Int!) {
    evaluation(id: $id) {
      id
      title
      slug
      subject
      group {
        name
      }
      deadline
      answers {
        id
        user {
          firstName
          lastName
        }
        content
        corrected
        cleanliness
        elementUsage
        unitTests
        createdAt
        updatedAt
        note
      }
      totalUsers
      completedUsers
    }
  }
`;

export interface ICreateEvaluationInput {
  input: {
    title: string;
    subject: string;
    deadline: Date;
    groupId: number;
  };
}

export interface ICreateEvaluationData {
  id: number;
}

export const createEvaluation = gql`
  mutation CreateEvaluatoin($input: CreateEvaluationInput!) {
    createEvaluation(input: $input) {
      id
    }
  }
`;

export interface DeleteEvaluationInput {
  input: {
    id: number;
  };
}

export const deleteEvaluation = gql`
  mutation DeleteEvaluation($input: DeleteInput) {
    deleteEvaluation(input: $input) {
      deleted
    }
  }
`;

const n = null;
export default n;

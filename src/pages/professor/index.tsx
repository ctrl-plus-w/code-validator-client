import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

import type { NextPage } from 'next';

import Router from 'next/router';

import ProfessorLayout from '@layout/ProfessorLayout';

import Table from '@module/Table';

import Title from '@element/Title';

import useAuthentication from '@hook/useAuthentication';
import useLoading from '@hook/useLoading';

import {
  evaluationMapper,
  groupMapper,
  mapDeadline,
  professorDeadlineMapper,
} from '@helper/table.helper';

const EVALUATIONS = gql`
  query {
    evaluations {
      id
      title
      slug
      subject
      group {
        name
      }
      deadline
      answers {
        content
        corrected
      }
      totalUsers
      completedUsers
    }
  }
`;

const Home: NextPage = () => {
  const { loading: authLoading, loggedIn, token } = useAuthentication();

  const [queryEvaluations, { data: evaluationsData, loading: evaluationsLoading }] = useLazyQuery(
    EVALUATIONS,
    { context: { headers: { authorization: `Bearer ${token}` } } },
  );

  const [loading, endGlobalLoading] = useLoading(authLoading, evaluationsLoading);

  // Fetcht the evaluations when the authentication is done
  useEffect(() => {
    if (authLoading || !loggedIn) return;

    queryEvaluations();
  }, [queryEvaluations, authLoading, loggedIn]);

  // Set the global loading state to false when the data is loaded
  useEffect(() => {
    if (evaluationsData) endGlobalLoading();
  }, [evaluationsData, endGlobalLoading]);

  if (loading) {
    return <>Loading...</>;
  }

  if (!loggedIn) {
    Router.push('/');
    return <></>;
  }

  return (
    <ProfessorLayout className="flex flex-col">
      <Title>Bienvenue, John</Title>
      <Title className="mt-2" level={3}>
        Comment allez vous ?
      </Title>

      <Table<IProfessorEvaluation>
        className="mt-8"
        data={mapDeadline(evaluationsData.evaluations)}
        config={[
          { name: 'Évaluation', mapper: evaluationMapper },
          { name: 'Pour le', mapper: professorDeadlineMapper },
          { name: 'Groupe', mapper: groupMapper },
        ]}
      />
    </ProfessorLayout>
  );
};

export default Home;

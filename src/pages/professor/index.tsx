import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

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
  mapDeadlines,
  professorDeadlineMapper,
} from '@helper/table.helper';

import { getAuthOptions } from '@util/graphql.utils';

import { getEvaluations } from '@schema/evaluation';

const Home: NextPage = () => {
  const [queryEvaluations, { data: evaluationsData, loading: evaluationsLoading }] = useLazyQuery(
    getEvaluations,
    { fetchPolicy: 'network-only' },
  );

  const {
    loading: authLoading,
    loggedIn,
    firstName,
  } = useAuthentication(async (token) => {
    queryEvaluations(getAuthOptions(token));
  });

  const [loading] = useLoading([evaluationsData], authLoading, evaluationsLoading);

  const handleClick = useCallback((data: IProfessorEvaluation) => {
    Router.push(`/professor/evaluations/${data.id}`);
  }, []);

  if (!authLoading && !loggedIn) {
    Router.push('/');
    return <></>;
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <ProfessorLayout className="flex flex-col">
      <Title>Bienvenue, {firstName}</Title>
      <Title className="mt-2" level={3}>
        Comment allez vous ?
      </Title>

      <Table<IProfessorEvaluation>
        className="mt-8"
        data={mapDeadlines(evaluationsData.evaluations)}
        onClick={handleClick}
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

import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';
import { NextPage } from 'next';

import Router from 'next/router';

import StudentLayout from '@layout/StudentLayout';

import Title from '@element/Title';
import Table from '@module/Table';

import useAuthentication from '@hook/useAuthentication';
import useLoading from '@hook/useLoading';

import {
  evaluationMapper,
  mapDeadlines,
  professorMapper,
  studentDeadlineMapper,
} from '@helper/table.helper';

import { getAuthOptions } from '@util/graphql.utils';

import { getEvaluations } from '@schema/evaluation';

const Home: NextPage = () => {
  const [queryEvaluations, { data: evaluationsData, loading: evaluationsLoading }] =
    useLazyQuery<{ evaluations: IStudentEvaluation[] }>(getEvaluations);

  const {
    loading: authLoading,
    loggedIn,
    firstName,
  } = useAuthentication(async (token) => {
    queryEvaluations({
      ...getAuthOptions(token),
    });
  });

  const [loading] = useLoading([evaluationsData], authLoading, evaluationsLoading);

  const handleClick = useCallback((data: IStudentEvaluation) => {
    Router.push(`/student/evaluations/${data.id}`);
  }, []);

  if (!authLoading && !loggedIn) {
    Router.push('/');
    return <></>;
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <StudentLayout className="flex flex-col">
      <Title>Bienvenue, {firstName}</Title>
      <Title className="mt-2" level={3}>
        Comment allez vous ?
      </Title>

      <Table<IStudentEvaluation>
        className="mt-8"
        data={mapDeadlines(evaluationsData!.evaluations)}
        onClick={handleClick}
        config={[
          { name: 'Évaluation', mapper: evaluationMapper },
          { name: 'Pour le', mapper: studentDeadlineMapper },
          { name: 'Professeur', mapper: professorMapper },
        ]}
      />
    </StudentLayout>
  );
};

export default Home;

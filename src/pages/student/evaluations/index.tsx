import { NextPage } from 'next';

import Router from 'next/router';

import StudentLayout from '@layout/StudentLayout';

import Table from '@module/Table';

import TagsInput from '@element/TagsInput';
import Title from '@element/Title';

import useArray from '@hook/useArray';

import {
  evaluationMapper,
  mapDeadlines,
  professorMapper,
  studentDeadlineMapper,
} from '@helper/table.helper';
import { mapSearchField, validSearchField } from '@helper/form.helper';
import useAuthentication from '@hook/useAuthentication';
import useLoading from '@hook/useLoading';
import { useLazyQuery } from '@apollo/client';
import { getEvaluations } from '@graphql/schemas/evaluation';
import { getAuthOptions } from '@util/graphql.utils';
import { useCallback } from 'react';

const Evaluations: NextPage = () => {
  const [queryEvaluations, { data: evaluationsdata, loading: evaluationsLoading }] =
    useLazyQuery<{ evaluations: IStudentEvaluation[] }>(getEvaluations);

  const { loading: authLoading, loggedIn } = useAuthentication(async (token) => {
    queryEvaluations({
      ...getAuthOptions(token),
    });
  });

  const [loading] = useLoading([evaluationsdata], authLoading, evaluationsLoading);

  const {
    values: searchFields,
    addValue: addSearchField,
    removeValue: removeSearchField,
  } = useArray<string>([]);

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
    <StudentLayout className="flex flex-col items-start">
      <Title>Évaluations</Title>
      <Title className="mt-2" level={3}>
        Liste des évaluation
      </Title>

      <TagsInput
        name="search"
        validValue={validSearchField}
        values={searchFields}
        addValue={addSearchField}
        removeValue={removeSearchField}
        valueMapper={mapSearchField}
        placeholder="Chercher par @nom où par #status"
        className="mt-8 w-full"
      />

      <Table<IStudentEvaluation>
        className="mt-8 w-full"
        data={mapDeadlines(evaluationsdata!.evaluations)}
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

export default Evaluations;

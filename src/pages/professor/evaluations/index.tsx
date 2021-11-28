import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

import type { NextPage } from 'next';

import Router from 'next/router';

import ProfessorLayout from '@layout/ProfessorLayout';

import Table from '@module/Table';

import TagsInput from '@element/TagsInput';
import Title from '@element/Title';
import Link from '@element/Link';

import HeadingSkeleton from '@skeleton/HeadingSkeleton';
import TableSkeleton from '@skeleton/TableSkeleton';

import useAuthentication from '@hook/useAuthentication';
import useLoading from '@hook/useLoading';
import useArray from '@hook/useArray';

import {
  professorDeadlineMapper,
  evaluationMapper,
  groupMapper,
  mapDeadlines,
} from '@helper/table.helper';
import { mapSearchField, validSearchField } from '@helper/form.helper';

import { getAuthOptions } from '@util/graphql.utils';

import { getEvaluations } from '@schema/evaluation';

const Evaluations: NextPage = () => {
  const [queryEvaluations, { data: evaluationsData, loading: evaluationsLoading }] = useLazyQuery<{
    evaluations: IProfessorEvaluation[];
  }>(getEvaluations, { fetchPolicy: 'network-only' });

  const { loading: authLoading, loggedIn } = useAuthentication(async (token) => {
    queryEvaluations({
      ...getAuthOptions(token),
    });
  });

  const [loading] = useLoading([evaluationsData], authLoading, evaluationsLoading);

  const {
    values: searchFields,
    addValue: addSearchField,
    removeValue: removeSearchField,
  } = useArray<string>([]);

  const handleClick = useCallback((data: IProfessorEvaluation) => {
    Router.push(`/professor/evaluations/${data.id}`);
  }, []);

  if (!authLoading && !loggedIn) {
    Router.push('/');
    return <></>;
  }

  if (loading) {
    return (
      <ProfessorLayout skeleton className="flex flex-col items-start">
        <HeadingSkeleton />

        {/* TagsInput skeleton */}
        <div className="h-10 w-full mt-8" />

        <TableSkeleton className="mt-8 w-full" columns={3} />
      </ProfessorLayout>
    );
  }

  return (
    <ProfessorLayout className="flex flex-col items-start">
      <Title>Évaluations</Title>
      <Title className="mt-2" level={3}>
        <Link href="/professor/evaluations/create" styled={false}>
          Créer une&nbsp;<span className="link-keyword">évaluation</span>
        </Link>
      </Title>

      <TagsInput
        name="search"
        validValue={validSearchField}
        values={searchFields}
        addValue={addSearchField}
        removeValue={removeSearchField}
        valueMapper={mapSearchField}
        placeholder="Chercher par @groupe où par #utilisateur"
        className="mt-8 w-full"
      />

      <Table<IProfessorEvaluation>
        className="mt-8 w-full"
        data={mapDeadlines(evaluationsData!.evaluations)}
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

export default Evaluations;

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { NextPage } from 'next';

import type { ReactElement } from 'react';

import Router from 'next/router';
import clsx from 'clsx';

import ProfessorLayout from '@layout/ProfessorLayout';

import Container from '@module/Container';
import Markdown from '@module/Markdown';
import Table from '@module/Table';

import CalendarInput from '@element/CalendarInput';
import Button from '@element/Button';
import Loader from '@element/Loader';
import Title from '@element/Title';
import Link from '@element/Link';

import ButtonSkeleton from '@skeleton/ButtonSkeleton';
import TitleSkeleton from '@skeleton/TitleSkeleton';
import TextSkeleton from '@skeleton/TextSkeleton';

import useAuthentication from '@hook/useAuthentication';
import useLoading from '@hook/useLoading';

import { mapDates, mapDeadline, statusMapper, userMapper } from '@helper/table.helper';

import { formatInputDatetime } from '@util/date.util';
import { getAuthOptions } from '@util/graphql.utils';
import { formatNumber } from '@util/string.util';

import {
  getEvaluation,
  GetEvaluationInput,
  deleteEvaluation,
  DeleteEvaluationInput,
} from '@schema/evaluation';

// eslint-disable-next-line no-shadow
enum SUB_MENU {
  SUBJECT = "Sujet de l'évaluation",
  PARAMS = 'Paramètres',
  STUDENTS = 'Étudiants',
}

interface ISubMenuProps {
  evaluation: IProfessorEvaluation;
}

const Subject = ({ evaluation }: ISubMenuProps): ReactElement => {
  return (
    <Container>
      <Markdown content={evaluation.subject} />
    </Container>
  );
};

interface IParamsSubMenuProps extends ISubMenuProps {
  token: string;
}

const Parameters = ({ evaluation, token }: IParamsSubMenuProps): ReactElement => {
  const [deadLine, setDeadLine] = useState(evaluation.deadline);

  const [deleteEvaluationMutation, { data: deletedAnswerData }] = useMutation<
    { deleteEvaluation: { deleted: boolean } },
    DeleteEvaluationInput
  >(deleteEvaluation);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const variables: DeleteEvaluationInput = { input: { id: evaluation.id } };
      deleteEvaluationMutation({ ...getAuthOptions(token), variables });
    },
    [deleteEvaluationMutation, token, evaluation.id],
  );

  useEffect(() => {
    if (deletedAnswerData && deletedAnswerData.deleteEvaluation.deleted) {
      Router.push('/professor/evaluations');
    }
  }, [deletedAnswerData]);

  return (
    <Container>
      <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
        <CalendarInput
          name="deadline"
          label="Pour le"
          className="w-64"
          value={deadLine}
          setValue={setDeadLine}
          disabled
        />

        <div className="flex flex-col gap-2 items-start">
          <p className="text-base text-black font-medium">Supprimer</p>

          <Button htmlType="submit" type="OUTLINE_ERROR" className="w-64">
            Supprimer l&apos;évaluation
          </Button>
        </div>
      </form>
    </Container>
  );
};

const Students = ({ evaluation }: ISubMenuProps) => {
  const deadLineMapper = (answer: IAnswer): ReactElement | string => {
    let total = 0;

    const { cleanliness, elementUsage, unitTests, corrected } = answer;

    if (cleanliness) total += cleanliness;
    if (elementUsage) total += elementUsage;
    if (unitTests) total += unitTests;

    return (
      <>
        <p className="text-black">{formatInputDatetime(answer.createdAt, '/')}</p>
        <div className="flex items-center gap-2">
          <Loader value={total} max={15} />
          <p className="text-gray-600">{corrected ? `${formatNumber(total)}/15` : '- / 15'}</p>
        </div>
      </>
    );
  };

  return (
    <Container col>
      {!evaluation.answers || evaluation.answers.length === 0 ? (
        <>Aucune réponse trouvée...</>
      ) : (
        <Table<IAnswer>
          data={evaluation.answers.map(mapDates) || []}
          config={[
            { name: 'Nom', mapper: ({ user }: IAnswer) => userMapper(user) },
            { name: 'Rendu le', mapper: deadLineMapper },
            { name: 'Status', mapper: statusMapper },
          ]}
          hoverEffect={false}
        />
      )}
    </Container>
  );
};

const Evaluation: NextPage = () => {
  const router = useRouter();
  const { evaluationId } = router.query;

  const [queryEvaluation, { data: evaluationData, loading: evaluationLoading }] = useLazyQuery<
    { evaluation: IProfessorEvaluation },
    GetEvaluationInput
  >(getEvaluation, {
    fetchPolicy: 'network-only',
  });

  const { loggedIn, token, loading: authLoading } = useAuthentication();

  const [loading] = useLoading([evaluationData], authLoading, evaluationLoading);

  const [subMenu, setSubMenu] = useState(SUB_MENU.SUBJECT);

  useEffect(() => {
    if (typeof evaluationId !== 'string' || authLoading) return;

    queryEvaluation({
      ...getAuthOptions(token),
      variables: { id: parseInt(evaluationId, 10) },
    });
  }, [evaluationId, authLoading, token, queryEvaluation]);

  if (!authLoading && !loggedIn) {
    Router.push('/');
    return <></>;
  }

  if (!evaluationLoading && evaluationData?.evaluation === null) {
    return (
      <ProfessorLayout className="flex items-center justify-center">
        <p>Not found</p>
      </ProfessorLayout>
    );
  }

  if (loading) {
    return (
      <ProfessorLayout skeleton className="flex flex-col">
        <Container col>
          <Container className="items-center" row>
            <TitleSkeleton className="w-24 mr-6" />
            <ButtonSkeleton className="w-32" small success />
          </Container>

          <TextSkeleton className="w-64 mt-2" />

          <Container className="gap-16 mt-10 mb-6" row>
            {Object.values(SUB_MENU).map((name) => (
              <TextSkeleton className="w-48" primary={name === subMenu} key={uuidv4()} />
            ))}
          </Container>

          <Container className="gap-2" col>
            <TextSkeleton className="w-96" />
            <TextSkeleton className="w-64" />
            <TextSkeleton className="w-80" />
          </Container>
        </Container>
      </ProfessorLayout>
    );
  }

  return (
    <ProfessorLayout className="flex flex-col">
      <Container col>
        <Container row>
          <Title className="mr-6">{evaluationData!.evaluation.title}</Title>
          <Button type="SUCCESS" href={`/professor/evaluations/${evaluationId}/correction`} small>
            Mode correction
          </Button>
        </Container>

        <Link href="/professor/evaluations" className="mt-2">
          <Title level={3}>
            Retourner aux <span className="link-keyword">évaluations</span>
          </Title>
        </Link>

        <Container className="gap-16 mt-10 mb-6" row>
          {Object.values(SUB_MENU).map((name) => (
            <button
              className={clsx(['font-medium', name === subMenu ? 'text-primary' : 'text-gray-900'])}
              key={uuidv4()}
              onClick={() => setSubMenu(name)}
            >
              {name}
            </button>
          ))}
        </Container>

        {subMenu === SUB_MENU.SUBJECT && <Subject evaluation={evaluationData!.evaluation} />}

        {subMenu === SUB_MENU.PARAMS && (
          <Parameters evaluation={mapDeadline(evaluationData!.evaluation)} token={token} />
        )}

        {subMenu === SUB_MENU.STUDENTS && <Students evaluation={evaluationData!.evaluation} />}
      </Container>
    </ProfessorLayout>
  );
};

export default Evaluation;

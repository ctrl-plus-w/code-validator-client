import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { NextPage } from 'next';

import type { FormEvent, FC, SetStateAction, Dispatch, MouseEvent } from 'react';

import Router from 'next/router';
import clsx from 'clsx';

import ProfessorLayout from '@layout/ProfessorLayout';

import Container from '@module/Container';

import CalendarInput from '@element/CalendarInput';
import SearchInput from '@element/SearchInput';
import Button from '@element/Button';
import Input from '@element/Input';
import Title from '@element/Title';
import Link from '@element/Link';
import Text from '@element/Text';

import ButtonSkeleton from '@skeleton/ButtonSkeleton';
import TitleSkeleton from '@skeleton/TitleSkeleton';
import InputSkeleton from '@skeleton/InputSkeleton';

import { incrementDate, isInFuture } from '@util/date.util';
import { evaluationsIncludesSlug } from '@util/array.util';
import { isEmpty, slugify } from '@util/string.util';

import useAuthentication from '@hook/useAuthentication';
import useLoading from '@hook/useLoading';

import { getAuthOptions } from '@util/graphql.utils';

import {
  createEvaluation as createEvaluationSchema,
  getEvaluationsSlug,
  ICreateEvaluationData,
  ICreateEvaluationInput,
} from '@schema/evaluation';
import { getGroups } from '@schema/group';

const STEPS = [
  {
    name: 'Sujet',
    id: 1,
  },
  {
    name: 'Paramètres',
    id: 2,
  },
];

interface ISubjectStepProps {
  nextStep: VoidFunction;

  subject: string;
  setSubject: Dispatch<SetStateAction<string>>;

  title: string;
  setTitle: Dispatch<SetStateAction<string>>;

  evaluations: { slug: string }[];
}

const SubjectStep: FC<ISubjectStepProps> = ({
  nextStep,
  subject,
  setSubject,
  title,
  setTitle,
  evaluations,
}) => {
  const [error, setError] = useState(false);

  const onClick = () => {
    if (
      isEmpty(subject) ||
      isEmpty(title) ||
      evaluationsIncludesSlug(evaluations, slugify(title))
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };

  useEffect(() => {
    if ((!isEmpty(title) || !isEmpty(subject)) && error) {
      setError(false);
    }
  }, [title, subject, error]);

  return (
    <Container className="items-end justify-between gap-8" full col>
      <Input
        label="Titre"
        name="title"
        value={title}
        setValue={setTitle}
        className="w-full"
        valid={!error && !evaluationsIncludesSlug(evaluations, slugify(title))}
        maxLength={120}
      />

      <Input
        label="Sujet"
        name="subject"
        value={subject}
        setValue={setSubject}
        className="w-full"
        valid={!error}
        fullHeightTextarea
        textarea
      />

      <Button type="SUCCESS" onClick={onClick}>
        Étape suivante
      </Button>
    </Container>
  );
};

interface IParametersStepProps {
  deadline: Date;
  setDeadline: Dispatch<SetStateAction<Date>>;

  group: string;
  setGroup: Dispatch<SetStateAction<string>>;

  groups: IGroup[];
}

const ParametersStep: FC<IParametersStepProps> = ({
  deadline,
  setDeadline,
  group,
  setGroup,
  groups,
}) => {
  const onClick = (event: MouseEvent<Element>): void => {
    if (!isInFuture(deadline)) event.preventDefault();
  };

  return (
    <Container className="items-start gap-8" full col>
      <CalendarInput
        label="Date limite"
        name="deadline"
        value={deadline}
        setValue={setDeadline}
        className="w-64"
      />

      <SearchInput
        value={group}
        setValue={setGroup}
        name="group"
        label="Groupe"
        values={groups.map((g) => g.name)}
        className="w-64"
      />

      <Button type="SUCCESS" htmlType="submit" className="ml-auto mt-auto" onClick={onClick}>
        Créer l&apos;évaluation
      </Button>
    </Container>
  );
};

type Steps = 1 | 2;

const CreateEvaluation: NextPage = () => {
  const [step, setStep] = useState<Steps>(1);

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [groupName, setGroupName] = useState('');
  const [deadline, setDeadline] = useState(incrementDate(new Date(), 1));

  const [createEvaluation, { data: createEvaluationData, error: createEvaluationError }] =
    useMutation<ICreateEvaluationData, ICreateEvaluationInput>(createEvaluationSchema);

  const [queryGroups, { data: groupsData, loading: groupsLoading }] =
    useLazyQuery<{ groups: IGroup[] }>(getGroups);

  const [queryEvaluations, { data: evaluationsData, loading: evaluationsLoading }] =
    useLazyQuery<{ evaluations: { slug: string }[] }>(getEvaluationsSlug);

  const {
    loading: authLoading,
    loggedIn,
    token,
  } = useAuthentication(async (authToken) => {
    queryGroups(getAuthOptions(authToken));
    queryEvaluations(getAuthOptions(authToken));
  });

  const [loading] = useLoading(
    [groupsData, evaluationsData],
    groupsLoading,
    evaluationsLoading,
    authLoading,
  );

  const nextStep = (): void => {
    if (step === 1) setStep(2);
  };

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (title === '' || subject === '') return;

      if (evaluationsData!.evaluations.some((e) => e.slug === slugify(title))) return;

      const group = groupsData!.groups.find((g) => g.name === groupName);
      if (!group) return;

      const variables: ICreateEvaluationInput = {
        input: {
          title,
          subject,
          deadline,
          groupId: group.id,
        },
      };

      await createEvaluation({
        ...getAuthOptions(token),
        variables,
      });
    },
    [title, subject, deadline, token, groupName, evaluationsData, groupsData, createEvaluation],
  );

  if (createEvaluationData && !createEvaluationError) {
    Router.push('/professor/evaluations');
    return <></>;
  }

  if (!authLoading && !loggedIn) {
    Router.push('/');
    return <></>;
  }

  if (loading) {
    return (
      <ProfessorLayout skeleton>
        <Container className="pb-12" full col>
          <Container col>
            <TitleSkeleton className="w-64" level={3} />
            <TitleSkeleton className="w-32 mt-2" />
          </Container>

          <Container className="mr-6 mt-8 gap-16">
            <div className="w-64 h-9 from-green-700 bg-gradient-to-br to-green-200 rounded" />
            <div className="w-64 h-9 from-green-700 bg-gradient-to-br to-green-200 rounded" />
          </Container>

          <Container className="mt-8" col full>
            <Container className="items-end justify-between gap-8" full col>
              <InputSkeleton className="w-full" label maxLength />
              <InputSkeleton
                className="w-full h-full"
                label
                maxLength
                fullHeightTextarea
                textarea
              />

              <ButtonSkeleton success className="w-32" />
            </Container>
          </Container>
        </Container>
      </ProfessorLayout>
    );
  }

  return (
    <ProfessorLayout>
      <Container className="pb-12" full col>
        <Container className="gap-1" centerVertical row>
          <Link href="/professor/evaluations" className="font-semibold">
            Évaluations &gt;
          </Link>

          <Text>Créer une évaluation</Text>
        </Container>

        <Title className="mr-6 mt-2">Créer une évaluation</Title>

        <form className="flex flex-col w-full h-full mt-8" onSubmit={handleSubmit}>
          <Container className="mb-8 gap-16" row>
            {STEPS.map((STEP) => (
              <button
                className="flex flex-col w-64 gap-2 items-start"
                key={STEP.id}
                onClick={() => STEP.id < step && setStep(STEP.id as Steps)}
              >
                <Text
                  className="font-semibold"
                  type={step >= STEP.id ? 'SUCCESS' : 'SUCCESS_LIGHT'}
                >
                  {STEP.id}. {STEP.name}
                </Text>

                <span
                  className={clsx([
                    'w-full h-1 rounded-full',
                    step >= STEP.id ? 'bg-green-600' : 'bg-green-300',
                  ])}
                />
              </button>
            ))}
          </Container>

          {step === 1 && (
            <SubjectStep
              {...{
                nextStep,
                subject,
                setSubject,
                title,
                setTitle,
                evaluations: evaluationsData!.evaluations,
              }}
            />
          )}

          {step === 2 && (
            <ParametersStep
              {...{
                deadline,
                setDeadline,
                group: groupName,
                setGroup: setGroupName,
                groups: groupsData!.groups,
              }}
            />
          )}
        </form>
      </Container>
    </ProfessorLayout>
  );
};

export default CreateEvaluation;

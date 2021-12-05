import { useLazyQuery, useMutation } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import type { FormEvent, FC } from 'react';
import type { NextPage } from 'next';

import Router from 'next/router';
import clsx from 'clsx';

import { StarIcon } from '@heroicons/react/solid';

import StudentLayout from '@layout/StudentLayout';

import Container from '@module/Container';
import Markdown from '@module/Markdown';
import Heading from '@module/Heading';
import Code from '@module/Code';

import FileInput from '@element/FileInput';
import Button from '@element/Button';
import Text from '@element/Text';

import HeadingSkeleton from '@skeleton/HeadingSkeleton';
import ButtonSkeleton from '@skeleton/ButtonSkeleton';
import InputSkeleton from '@skeleton/InputSkeleton';
import TextSkeleton from '@skeleton/TextSkeleton';

import useAuthentication from '@hook/useAuthentication';
import useLoading from '@hook/useLoading';
import useFile from '@hook/useFile';

import generateArray from '@util/array.util';
import { getAuthOptions } from '@util/graphql.utils';

import { answerEvaluation, AnswerEvaluationInput } from '@schema/answer';
import { getEvaluation } from '@schema/evaluation';

interface IAnswerProps {
  evaluation: IStudentEvaluation;
}

const Answer: FC<IAnswerProps> = ({ evaluation }) => {
  return (
    <Container className="mt-16 w-full" col>
      <Heading title="Réponse" subtitle="Voici la réponse" />

      <Code language="python">{evaluation.answers[0].content}</Code>
    </Container>
  );
};

interface IAnswerFormProps {
  evaluation: IStudentEvaluation;
  token: string;
}

const AnswerForm: FC<IAnswerFormProps> = ({ evaluation, token }) => {
  const [answerMutation] = useMutation<{ id: number }, AnswerEvaluationInput>(answerEvaluation);

  const { file, content, setFile } = useFile();

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (content === '') return;

      const variables: AnswerEvaluationInput = {
        input: { id: evaluation.id, content },
      };

      await answerMutation({ ...getAuthOptions(token), variables });

      Router.reload();
    },
    [content, token, evaluation.id, answerMutation],
  );

  return (
    <Container className="mt-16" full col>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <FileInput
          label="Fichier"
          name="file"
          value={file}
          setValue={setFile}
          className="w-72 mb-8"
          extentions={['py']}
          required
        />

        <Button htmlType="submit" className="mr-auto">
          Envoyer
        </Button>
      </form>
    </Container>
  );
};

interface INoteProps {
  name: string;
  note: number;
}

const Note: FC<INoteProps> = ({ name, note }) => {
  return (
    <Container col>
      <p className="text-base font-medium mb-2">
        <span className="text-black">{name}</span>
      </p>

      <Container className="gap-1">
        {generateArray(5, 1).map((_, index) => (
          <div className="flex items-center justify-center w-6 h-6 -ml-1" key={uuidv4()}>
            {index + 1 <= note ? (
              <StarIcon className={clsx(['w-6 h-6 text-yellow-400'])} />
            ) : (
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            )}
          </div>
        ))}
      </Container>
    </Container>
  );
};

interface INotationProps {
  evaluation: IStudentEvaluation;
}

const Notation: FC<INotationProps> = ({ evaluation }) => {
  return (
    <Container className="mt-16" full col>
      <Heading className="mb-4" title="Notations" subtitle="Voici vos notes" />

      <Container className="gap-32">
        <Container className="gap-4" fullVertical col>
          <Note
            name="Utilisation des bons éléments"
            note={evaluation.answers[0].elementUsage || 0}
          />
          <Note name="Propretée du code" note={evaluation.answers[0].cleanliness || 0} />
          <Note name="Tests unitaires" note={evaluation.answers[0].unitTests || 0} />
        </Container>

        <Text className="px-3 py-3 flex-grow rounded-sm border border-gray-500">
          {evaluation.answers[0].note}
        </Text>
      </Container>
    </Container>
  );
};

const Evaluations: NextPage = () => {
  const router = useRouter();
  const { evaluationId } = router.query;

  const [queryEvaluation, { data: evaluationData, loading: evaluationLoading }] =
    useLazyQuery<{ evaluation: IStudentEvaluation }>(getEvaluation);

  const { loading: authLoading, loggedIn, token } = useAuthentication();

  const [loading] = useLoading([evaluationData], authLoading, evaluationLoading);

  const getStatus = useCallback((): null | 'waiting' | 'todo' | 'done' => {
    if (!evaluationData?.evaluation) return null;

    const { evaluation } = evaluationData;

    // If the user hasn't already answered the evaluation
    if (evaluation.answers.length === 0) return 'todo';

    // If the user has already answered the evaluation and the answer is corrected
    if (evaluation.answers[0].corrected) return 'done';

    // If the user has already answered the evaluation and the answer is not corrected
    return 'waiting';
  }, [evaluationData]);

  useEffect(() => {
    if (typeof evaluationId !== 'string' || authLoading) return;

    queryEvaluation({
      ...getAuthOptions(token),
      variables: { id: parseInt(evaluationId, 10) },
    });
  }, [evaluationId, authLoading, token, queryEvaluation]);

  if (!authLoading && !loggedIn) {
    Router.push('/');
    return <div />;
  }

  if (!evaluationLoading && !evaluationData) {
    return (
      <StudentLayout className="flex items-center justify-center">
        <p>Not found...</p>
      </StudentLayout>
    );
  }

  if (loading) {
    return (
      <StudentLayout skeleton className="flex flex-col items-start pb-12">
        <HeadingSkeleton />

        <Container className="gap-2 mt-8" col>
          <TextSkeleton className="w-96" />
          <TextSkeleton className="w-64" />
          <TextSkeleton className="w-80" />
        </Container>

        <Container className="mt-16" full col>
          <Container col fullHorizontal>
            <InputSkeleton className="w-64" label />

            <ButtonSkeleton className="w-32 mt-8" />
          </Container>
        </Container>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout className="flex flex-col items-start pb-12">
      <Heading title={evaluationData!.evaluation.title} subtitle="Répondre à l'évaluation" />

      <Markdown className="mt-8" content={evaluationData!.evaluation!.subject} />

      {getStatus() === 'todo' && (
        <AnswerForm {...{ evaluation: evaluationData!.evaluation, token }} />
      )}

      {getStatus() === 'waiting' && <Answer {...{ evaluation: evaluationData!.evaluation }} />}

      {getStatus() === 'done' && <Notation {...{ evaluation: evaluationData!.evaluation }} />}
    </StudentLayout>
  );
};

export default Evaluations;

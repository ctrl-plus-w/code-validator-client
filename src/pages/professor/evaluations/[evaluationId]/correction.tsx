import { useLazyQuery, useMutation } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { ReactElement, FormEvent } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import Router from 'next/router';

import { ChevronLeftIcon } from '@heroicons/react/solid';

import hljsTheme from '@style/hljs';

import ProfessorLayout from '@layout/ProfessorLayout';

import Container from '@module/Container';

import RateInput from '@element/RateInput';
import Button from '@element/Button';
import Input from '@element/Input';
import Title from '@element/Title';
import Link from '@element/Link';

import useAuthentication from '@hook/useAuthentication';
import useLoading from '@hook/useLoading';

import { getAuthOptions } from '@util/graphql.utils';
import { isEmpty } from '@util/string.util';

import { getAnswers, GetAnswersInput, updateAnswer, UpdateAnswerInput } from '@schema/answer';

const Correction = (): ReactElement => {
  const router = useRouter();
  const { evaluationId } = router.query;

  const [updateAnswerMutation] = useMutation<{ id: number }, UpdateAnswerInput>(updateAnswer);

  const [queryAnswers, { data: answersData, loading: answersLoading }] = useLazyQuery<
    { answers: IAnswer[] },
    GetAnswersInput
  >(getAnswers);

  const { loggedIn, token, loading: authLoading } = useAuthentication();

  const [, setCorrectedAnswers] = useState<IAnswer[]>([]);
  const [remainingAnswers, setRemainingAnswers] = useState<IAnswer[]>([]);
  const [currentAnswerLoading, setCurrentAnswerLoading] = useState(true);

  const [loading] = useLoading([answersData], authLoading, answersLoading, currentAnswerLoading);

  const [currentAnswer, setCurrentAnswer] = useState<IAnswer | null>(null);

  const [cleanliness, setCleanliness] = useState(0);
  const [elementUsage, setElementUsage] = useState(0);

  const [note, setNote] = useState('');

  useEffect(() => {
    if (typeof evaluationId !== 'string' || authLoading) return;

    queryAnswers({
      ...getAuthOptions(token),
      variables: { evaluationId: parseInt(evaluationId, 10) },
    });
  }, [evaluationId, authLoading, token, queryAnswers]);

  useEffect(() => {
    if (!answersData?.answers) return;

    setCurrentAnswer(answersData.answers[0]);
    setRemainingAnswers(answersData.answers);
    setCurrentAnswerLoading(false);
  }, [answersData]);

  const handleSubmit = useCallback(
    async (event: FormEvent): Promise<void> => {
      event.preventDefault();

      if (isEmpty(note) || !currentAnswer) return;

      const variables: UpdateAnswerInput = {
        input: {
          id: parseInt(currentAnswer.id, 10),
          cleanliness,
          elementUsage,
          unitTests: 5,
          note,
        },
      };

      updateAnswerMutation({
        ...getAuthOptions(token),
        variables,
      });

      setCorrectedAnswers((prev) => (currentAnswer ? [...prev, currentAnswer] : prev));
      setRemainingAnswers((prev) => {
        const newRemainingAnswers = prev.filter((answer) => answer.id !== currentAnswer?.id);

        if (newRemainingAnswers.length === 0) Router.push(`/professor/evaluations/${evaluationId}`);

        setCurrentAnswer(remainingAnswers[0]);

        return newRemainingAnswers;
      });
    },
    [
      remainingAnswers,
      currentAnswer,
      evaluationId,
      elementUsage,
      cleanliness,
      token,
      note,
      updateAnswerMutation,
      setCorrectedAnswers,
      setRemainingAnswers,
    ],
  );

  if (!authLoading && !loggedIn) {
    Router.push('/');
    return <></>;
  }

  if (!answersLoading && answersData?.answers.length === 0) {
    return (
      <ProfessorLayout className="flex items-center justify-center">
        <p>Vous avez corrigé toutes les réponses disponibles ...</p>
      </ProfessorLayout>
    );
  }

  if (loading) {
    return <>Loading ...</>;
  }

  return (
    <ProfessorLayout menu={false} className="flex gap-16">
      <form onSubmit={handleSubmit} className="flex flex-col w-2/5 h-full">
        <Link href={`/professor/evaluations/${evaluationId}`} className="mb-8">
          <ChevronLeftIcon className="w-6 h-6" />
          Quitter le mode&nbsp;<span className="link-keyword">correction</span>
        </Link>

        <Title>
          {currentAnswer?.user.firstName} {currentAnswer?.user.lastName}
        </Title>
        <Title className="mt-2" level={3}>
          {currentAnswer?.user.group?.name}
        </Title>

        <Container className="gap-6 mt-6" col>
          <Container className="gap-12 flex-wrap" fullHorizontal row>
            <RateInput
              value={elementUsage}
              setValue={setElementUsage}
              label="Utilisation des élements"
              name="elements-usage"
              max={5}
            />

            <RateInput
              value={cleanliness}
              setValue={setCleanliness}
              label="Propretée du code"
              name="clean-code"
              max={5}
            />
          </Container>

          <Input
            name="note"
            label="Notes"
            placeholder="Remarques sur le programme"
            value={note}
            setValue={setNote}
            required
            textarea
          />
        </Container>

        <Container className="mt-auto justify-between" fullHorizontal row>
          <Button type="GHOST_PRIMARY">Évalutation précédente</Button>
          <Button htmlType="submit" type="PRIMARY">
            Valider
          </Button>
        </Container>
      </form>

      <Container className="w-3/5" full>
        <SyntaxHighlighter
          language="python"
          style={hljsTheme}
          customStyle={{
            width: '100%',
            height: '100%',
            padding: '2rem',
            borderRadius: '2px',
          }}
        >
          {currentAnswer?.content}
        </SyntaxHighlighter>
      </Container>
    </ProfessorLayout>
  );
};

export default Correction;

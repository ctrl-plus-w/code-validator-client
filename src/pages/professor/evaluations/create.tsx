import { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';

import type { FC, SetStateAction, Dispatch, MouseEvent } from 'react';

import clsx from 'clsx';

import ProfessorLayout from '@layout/ProfessorLayout';

import Container from '@module/Container';

import CalendarInput from '@element/CalendarInput';
import Button from '@element/Button';
import Input from '@element/Input';
import Title from '@element/Title';
import Link from '@element/Link';
import Text from '@element/Text';

import { incrementDate, isInFuture } from '@util/date.util';
import { isEmpty } from '@util/string.util';

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
}

const SubjectStep: FC<ISubjectStepProps> = ({ nextStep, subject, setSubject }) => {
  const [error, setError] = useState(false);

  const onClick = () => {
    if (isEmpty(subject)) setError(true);
    else nextStep();
  };

  useEffect(() => {
    if (!isEmpty(subject) && error) setError(false);
  }, [subject, error]);

  return (
    <Container className="items-end justify-between gap-8" full col>
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
}

const ParametersStep: FC<IParametersStepProps> = ({ deadline, setDeadline }) => {
  const onClick = (event: MouseEvent<Element>): void => {
    if (!isInFuture(deadline)) event.preventDefault();
  };

  return (
    <Container className="items-start justify-between gap-8" full col>
      <CalendarInput
        label="Date limite"
        name="deadline"
        value={deadline}
        setValue={setDeadline}
        className="w-64"
      />

      <Button type="SUCCESS" htmlType="submit" className="ml-auto" onClick={onClick}>
        Créer l&apos;évaluation
      </Button>
    </Container>
  );
};

const CreateEvaluation: NextPage = () => {
  const [step, setStep] = useState<1 | 2>(1);

  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState(incrementDate(new Date(), 1));

  const nextStep = (): void => {
    if (step === 1) setStep(2);
  };

  // TODO : Make handleSubmit computations.
  const handleSubmit = useCallback(() => null, []);

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
              <Container className="w-64 gap-2" key={STEP.id} col>
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
              </Container>
            ))}
          </Container>

          {step === 1 && <SubjectStep {...{ nextStep, subject, setSubject }} />}
          {step === 2 && <ParametersStep {...{ deadline, setDeadline }} />}
        </form>
      </Container>
    </ProfessorLayout>
  );
};

export default CreateEvaluation;

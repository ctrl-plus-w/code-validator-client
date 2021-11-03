import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { FormEvent, FC } from 'react';
import type { NextPage } from 'next';

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

import generateArray from '@util/array.util';

import { studentEvaluations } from '@constant/evaluations';

interface IAnswerProps {
  evaluation: IStudentEvaluation;
}

const Answer: FC<IAnswerProps> = ({ evaluation }) => {
  return (
    <Container className="mt-16" col>
      <Heading title="Réponse" subtitle="Voici la réponse" />

      <Code language="python" customStyle={{}}>
        {evaluation.infos.answer}
      </Code>
    </Container>
  );
};

const AnswerForm: FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);

  return (
    <Container className="mt-16" full col>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <FileInput
          label="Fichier"
          name="file"
          value={file}
          setValue={setFile}
          className="w-72 mb-16"
          required
        />

        <Button htmlType="submit" className="ml-auto mt-auto">
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
            note={evaluation.infos.elementUsageNote || 0}
          />
          <Note name="Propretée du code" note={evaluation.infos.cleanlinessNote || 0} />
          <Note name="Tests unitaires" note={evaluation.infos.unitTestNote || 0} />
        </Container>

        <Text className="px-3 py-3 flex-grow rounded-sm border border-gray-500">
          {evaluation.infos.remark}
        </Text>
      </Container>
    </Container>
  );
};

const Evaluations: NextPage = () => {
  const [evaluation] = useState(studentEvaluations[0]);
  const [status] = useState(evaluation.infos.status);

  return (
    <StudentLayout className="flex flex-col items-start pb-12">
      <Heading title={evaluation.title} subtitle="Répondre à l'évaluation" />

      <Markdown className="mt-8" content={evaluation.description} />

      {status === 'waiting' && <AnswerForm />}

      {status !== 'waiting' && <Answer {...{ evaluation }} />}

      {status === 'done' && <Notation {...{ evaluation }} />}
    </StudentLayout>
  );
};

export default Evaluations;

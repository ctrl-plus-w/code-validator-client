import { useState } from 'react';

import type { NextPage } from 'next';

import StudentLayout from '@layout/StudentLayout';

import Title from '@element/Title';

import { studentEvaluations } from '@constant/evaluations';

import Markdown from '@module/Markdown';

const Evaluations: NextPage = () => {
  const [evaluation] = useState(studentEvaluations[0]);

  // TODO : Make the file input and the conditional rendering depending on the evaluation status.

  return (
    <StudentLayout className="flex flex-col items-start">
      <Title>{evaluation.title}</Title>
      <Title className="mt-2" level={3}>
        Répondre à l&apos;évaluation
      </Title>

      <Markdown className="mt-8" content={evaluation.description} />
    </StudentLayout>
  );
};

export default Evaluations;

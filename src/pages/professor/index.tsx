import { NextPage } from 'next';

import ProfessorLayout from '@layout/ProfessorLayout';

import Table from '@module/Table';

import Title from '@element/Title';

import { professorDeadlineMapper, evaluationMapper, groupMapper } from '@helper/table.helper';

import { professorEvaluations } from '@constant/evaluations';

const Home: NextPage = () => {
  return (
    <ProfessorLayout className="flex flex-col">
      <Title>Bienvenue, John</Title>
      <Title className="mt-2" level={3}>
        Comment allez vous ?
      </Title>

      <Table<IProfessorEvaluation>
        className="mt-8"
        data={professorEvaluations}
        config={[
          { name: 'Évaluation', mapper: evaluationMapper },
          { name: 'Pour le', mapper: professorDeadlineMapper },
          { name: 'Groupe', mapper: groupMapper },
        ]}
      />
    </ProfessorLayout>
  );
};

export default Home;

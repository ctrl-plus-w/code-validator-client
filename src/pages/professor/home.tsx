import { NextPage } from 'next';

import ProfessorLayout from '@layout/ProfessorLayout';

import Table from '@module/Table';

import Title from '@element/Title';

import { deadlineMapper, evaluationMapper, groupMapper } from '@helper/table.helper';

import evaluations from '@constant/evaluations';

const Home: NextPage = () => {
  return (
    <ProfessorLayout className="flex flex-col">
      <Title>Bienvenue, John</Title>
      <Title className="mt-2" level={3}>
        Comment allez vous ?
      </Title>

      <Table<IEvaluation>
        className="mt-8"
        data={evaluations}
        config={[
          { name: 'Évaluation', mapper: evaluationMapper },
          { name: 'Pour le', mapper: deadlineMapper },
          { name: 'Groupe', mapper: groupMapper },
        ]}
      />
    </ProfessorLayout>
  );
};

export default Home;

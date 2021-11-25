import { NextPage } from 'next';

import StudentLayout from '@layout/StudentLayout';

import Title from '@element/Title';
import Table from '@module/Table';

import { evaluationMapper, professorMapper, studentDeadlineMapper } from '@helper/table.helper';

const Home: NextPage = () => {
  return (
    <StudentLayout className="flex flex-col">
      <Title>Bienvenue, Lukas</Title>
      <Title className="mt-2" level={3}>
        Comment allez vous ?
      </Title>

      <Table<IStudentEvaluation>
        className="mt-8"
        data={[]}
        config={[
          { name: 'Évaluation', mapper: evaluationMapper },
          { name: 'Pour le', mapper: studentDeadlineMapper },
          { name: 'Professeur', mapper: professorMapper },
        ]}
      />
    </StudentLayout>
  );
};

export default Home;

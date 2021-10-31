import { NextPage } from 'next';

import StudentLayout from '@layout/StudentLayout';

import Table from '@module/Table';

import TagsInput from '@element/TagsInput';
import Title from '@element/Title';

import useArray from '@hook/useArray';

import { evaluationMapper, professorMapper, studentDeadlineMapper } from '@helper/table.helper';
import { mapSearchField, validSearchField } from '@helper/form.helper';

import { studentEvaluations } from '@constant/evaluations';

const Evaluations: NextPage = () => {
  const {
    values: searchFields,
    addValue: addSearchField,
    removeValue: removeSearchField,
  } = useArray<string>([]);

  return (
    <StudentLayout className="flex flex-col items-start">
      <Title>Évaluations</Title>
      <Title className="mt-2" level={3}>
        Liste des évaluation
      </Title>

      <TagsInput
        name="search"
        validValue={validSearchField}
        values={searchFields}
        addValue={addSearchField}
        removeValue={removeSearchField}
        valueMapper={mapSearchField}
        placeholder="Chercher par @nom où par #status"
        className="mt-8 w-full"
      />

      <Table<IStudentEvaluation>
        className="mt-8 w-full"
        data={studentEvaluations}
        config={[
          { name: 'Évaluation', mapper: evaluationMapper },
          { name: 'Pour le', mapper: studentDeadlineMapper },
          { name: 'Professeur', mapper: professorMapper },
        ]}
      />
    </StudentLayout>
  );
};

export default Evaluations;

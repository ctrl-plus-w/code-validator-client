import type { NextPage } from 'next';

import ProfessorLayout from '@layout/ProfessorLayout';

import Table from '@module/Table';

import TagsInput from '@element/TagsInput';
import Title from '@element/Title';
import Link from '@element/Link';

import useArray from '@hook/useArray';

import { professorDeadlineMapper, evaluationMapper, groupMapper } from '@helper/table.helper';
import { mapSearchField, validSearchField } from '@helper/form.helper';

import { professorEvaluations } from '@constant/evaluations';

const Evaluations: NextPage = () => {
  const {
    values: searchFields,
    addValue: addSearchField,
    removeValue: removeSearchField,
  } = useArray<string>([]);

  return (
    <ProfessorLayout className="flex flex-col items-start">
      <Title>Évaluations</Title>
      <Title className="mt-2" level={3}>
        <Link href="/professor/evaluations/create" styled={false}>
          Créer une&nbsp;<span className="link-keyword">évaluation</span>
        </Link>
      </Title>

      <TagsInput
        name="search"
        validValue={validSearchField}
        values={searchFields}
        addValue={addSearchField}
        removeValue={removeSearchField}
        valueMapper={mapSearchField}
        placeholder="Chercher par @groupe où par #utilisateur"
        className="mt-8 w-full"
      />

      <Table<IProfessorEvaluation>
        className="mt-8 w-full"
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

export default Evaluations;

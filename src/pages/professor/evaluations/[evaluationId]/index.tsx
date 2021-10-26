import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { NextPage } from 'next';

import type { ReactElement } from 'react';

import clsx from 'clsx';

import ProfessorLayout from '@layout/ProfessorLayout';

import Container from '@module/Container';
import Table from '@module/Table';

import CalendarInput from '@element/CalendarInput';
import Button from '@element/Button';
import Loader from '@element/Loader';
import Title from '@element/Title';
import Link from '@element/Link';

import { statusMapper, userMapper } from '@helper/table.helper';

import { formatNumber } from '@util/string.util';
import { formatInputDatetime } from '@util/date.util';

import { professorEvaluations } from '@constant/evaluations';
import Markdown from '@module/Markdown';

// eslint-disable-next-line no-shadow
enum SUB_MENU {
  SUBJECT = "Sujet de l'évaluation",
  PARAMS = 'Paramètres',
  STUDENTS = 'Étudiants',
}

interface ISubMenuProps {
  evaluation: IProfessorEvaluation;
}

const Subject = ({ evaluation }: ISubMenuProps): ReactElement => {
  return (
    <Container>
      <Markdown content={evaluation.description} />
    </Container>
  );
};

const Parameters = ({ evaluation }: ISubMenuProps): ReactElement => {
  const [deadLine, setDeadLine] = useState(evaluation.deadline);

  const handleSubmit = useCallback(() => null, []);

  return (
    <Container>
      <form className="flex w-full" onSubmit={handleSubmit}>
        <CalendarInput
          name="deadline"
          label="Pour le"
          className="w-64"
          value={deadLine}
          setValue={setDeadLine}
        />
      </form>
    </Container>
  );
};

const Students = ({ evaluation }: ISubMenuProps) => {
  const deadLineMapper = (user: IEvaluationUser): ReactElement | string => {
    return (
      <>
        <p className="text-black">
          {user.returned ? formatInputDatetime(user.returned, '/') : 'Non rendu'}
        </p>
        <div className="flex items-center gap-2">
          <Loader value={user.note || 0} max={evaluation.maxNote} />
          <p className="text-gray-600">
            {user.note
              ? `${formatNumber(user.note)}/${formatNumber(evaluation.maxNote)}`
              : `- / ${evaluation.maxNote}`}
          </p>
        </div>
      </>
    );
  };

  return (
    <Container col>
      <Table<IEvaluationUser>
        data={evaluation.users}
        config={[
          { name: 'Utilisateur', mapper: userMapper },
          { name: 'Pour le', mapper: deadLineMapper },
          { name: 'Status', mapper: statusMapper },
        ]}
        hoverEffect={false}
      />
    </Container>
  );
};

const Evaluation: NextPage = () => {
  const router = useRouter();

  const { evaluationId } = router.query;

  const [evaluation] = useState(professorEvaluations[0]);
  const [subMenu, setSubMenu] = useState(SUB_MENU.SUBJECT);

  return (
    <ProfessorLayout className="flex flex-col">
      <Container col>
        <Container row>
          <Title className="mr-6">{evaluation.title}</Title>
          <Button type="SUCCESS" href={`/professor/evaluations/${evaluationId}/correction`} small>
            Mode correction
          </Button>
        </Container>

        <Link href="/professor/evaluations" className="mt-2">
          <Title level={3}>
            Retourner aux <span className="link-keyword">évaluations</span>
          </Title>
        </Link>

        <Container className="gap-16 mt-10 mb-6" row>
          {Object.values(SUB_MENU).map((name) => (
            <button
              className={clsx(['font-medium', name === subMenu ? 'text-primary' : 'text-gray-900'])}
              key={uuidv4()}
              onClick={() => setSubMenu(name)}
            >
              {name}
            </button>
          ))}
        </Container>

        {subMenu === SUB_MENU.SUBJECT && <Subject evaluation={evaluation} />}
        {subMenu === SUB_MENU.PARAMS && <Parameters evaluation={evaluation} />}
        {subMenu === SUB_MENU.STUDENTS && <Students evaluation={evaluation} />}
      </Container>
    </ProfessorLayout>
  );
};

export default Evaluation;

import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { NextPage } from 'next';

import type { ReactElement } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

import ProfessorLayout from '@layout/ProfessorLayout';

import Container from '@module/Container';
import Table from '@module/Table';

import CalendarInput from '@element/CalendarInput';
import Button from '@element/Button';
import Loader from '@element/Loader';
import Title from '@element/Title';

import { statusMapper, userMapper } from '@helper/table.helper';

import { formatNumber } from '@util/string.util';
import { formatDatetime } from '@util/date.util';

import hljsTheme from '@style/hljs';

import evaluations from '@constant/evaluations';

// eslint-disable-next-line no-shadow
enum SUB_MENU {
  SUBJECT = "Sujet de l'évaluation",
  PARAMS = 'Paramètres',
  STUDENTS = 'Étudiants',
}

interface ISubMenuProps {
  evaluation: IEvaluation;
}

const Subject = ({ evaluation }: ISubMenuProps): ReactElement => {
  return (
    <Container>
      <ReactMarkdown
        className="flex-col"
        components={{
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={hljsTheme}
                customStyle={{
                  marginTop: '2rem',
                  padding: '1rem',
                  borderRadius: '2px',
                }}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {evaluation.description}
      </ReactMarkdown>
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
          {user.returned ? formatDatetime(user.returned, '/') : 'Non rendu'}
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

  const [evaluation] = useState(evaluations[0]);
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

        <Title className="mt-2" level={3}>
          Informations générales
        </Title>

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

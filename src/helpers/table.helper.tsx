import type { ReactElement } from 'react';

import { CheckCircleIcon, MinusCircleIcon, XCircleIcon } from '@heroicons/react/solid';

import Loader from '@element/Loader';
import Text from '@element/Text';

import { ellipsis, genderMapper } from '@util/string.util';
import { formatDate } from '@util/date.util';

export const evaluationMapper = (
  evaluation: IEvaluation | IStudentEvaluation | IProfessorEvaluation,
): ReactElement | string => {
  return (
    <>
      <Text type="BLACK">{ellipsis(evaluation.title, 30)}</Text>
      <Text type="GRAY">{ellipsis(evaluation.subject, 30)}</Text>
    </>
  );
};

export const professorDeadlineMapper = (
  evaluation: IProfessorEvaluation,
): ReactElement | string => {
  return (
    <>
      <Text>{evaluation.deadline.toLocaleDateString()}</Text>
      <div className="flex items-center gap-2">
        <Loader value={evaluation.completedUsers} max={evaluation.totalUsers} />
        <Text type="GRAY">
          {evaluation.completedUsers} / {evaluation.totalUsers} rendus
        </Text>
      </div>
    </>
  );
};

export const userMapper = (user: IUser): ReactElement | string => {
  return (
    <>
      <Text type="BLACK">{ellipsis(user.firstName, 30)}</Text>
      <Text type="GRAY">{ellipsis(genderMapper(user.gender), 30)}</Text>
    </>
  );
};

export const statusMapper = (user: IEvaluationUser): ReactElement | string => {
  return (
    <div className="flex items-center gap-1">
      {user.status === 'done' && (
        <>
          <CheckCircleIcon className="w-4 h-4 text-green-600" />
          <Text>Corrigé</Text>
        </>
      )}

      {user.status === 'waiting' && (
        <>
          <MinusCircleIcon className="w-4 h-4 text-yellow-500" />
          <Text>En attente</Text>
        </>
      )}

      {user.status === 'todo' && (
        <>
          <XCircleIcon className="w-4 h-4 text-red-600" />
          <Text>A corriger</Text>
        </>
      )}
    </div>
  );
};

export const studentDeadlineMapper = (evaluation: IStudentEvaluation): ReactElement | string => {
  return (
    <>
      <Text>{formatDate(evaluation.deadline)}</Text>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {evaluation.infos.status === 'done' && (
            <>
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
              <Text>Rendu, validé</Text>
            </>
          )}

          {evaluation.infos.status === 'todo' && (
            <>
              <MinusCircleIcon className="w-4 h-4 text-yellow-500" />
              <Text>Rendu, en attente</Text>
            </>
          )}

          {evaluation.infos.status === 'waiting' && (
            <>
              <XCircleIcon className="w-4 h-4 text-red-600" />
              <Text>Non rendu</Text>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const professorMapper = (evaluation: IEvaluation): ReactElement | string => {
  return `${evaluation.user.gender === 'male' ? 'Mr.' : 'Mme.'} ${evaluation.user.lastName}`;
};

export const groupMapper = (evaluation: IEvaluation): ReactElement | string => {
  return evaluation.group.name;
};

export const mapDeadline = <T extends IEvaluation>(evaluations: T[]): T[] => {
  return evaluations.map((evaluation) => ({
    ...evaluation,
    deadline: new Date(evaluation.deadline),
  }));
};

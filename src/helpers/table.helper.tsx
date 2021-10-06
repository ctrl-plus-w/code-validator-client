import type { ReactElement } from 'react';

import { CheckCircleIcon, MinusCircleIcon, XCircleIcon } from '@heroicons/react/solid';

import Loader from '@element/Loader';
import Text from '@element/Text';

import { ellipsis, genderMapper } from '@util/string.util';

export const evaluationMapper = (evaluation: IEvaluation): ReactElement | string => {
  return (
    <>
      <Text className="text-black">{ellipsis(evaluation.title, 30)}</Text>
      <Text className="text-gray-600">{ellipsis(evaluation.description, 30)}</Text>
    </>
  );
};

export const deadlineMapper = (evaluation: IEvaluation): ReactElement | string => {
  return (
    <>
      <Text>{evaluation.deadline.toLocaleDateString()}</Text>
      <div className="flex items-center gap-2">
        <Loader value={evaluation.completedUsers} max={evaluation.totalUsers} />
        <p className="text-gray-600">
          {evaluation.completedUsers} / {evaluation.totalUsers} rendus
        </p>
      </div>
    </>
  );
};

export const userMapper = (user: IUser): ReactElement | string => {
  return (
    <>
      <Text className="text-black">{ellipsis(user.name, 30)}</Text>
      <Text className="text-gray-600">{ellipsis(genderMapper(user.gender), 30)}</Text>
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

export const groupMapper = (evaluation: IEvaluation): ReactElement | string => {
  return evaluation.group.name;
};

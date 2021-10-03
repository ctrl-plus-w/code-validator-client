import type { ReactElement } from 'react';

import Loader from '@element/Loader';

import { ellipsis } from '@util/string.utils';

export const evaluationMapper = (evaluation: IEvaluation): ReactElement | string => {
  return (
    <>
      <p className="text-black">{ellipsis(evaluation.title, 30)}</p>
      <p className="text-gray-600">{ellipsis(evaluation.description, 30)}</p>
    </>
  );
};

export const deadlineMapper = (evaluation: IEvaluation): ReactElement | string => {
  return (
    <>
      <p>{evaluation.deadline.toLocaleDateString()}</p>
      <div className="flex items-center gap-2">
        <Loader value={evaluation.completedUsers} max={evaluation.totalUsers} />
        <p className="text-gray-600">
          {evaluation.completedUsers} / {evaluation.totalUsers} rendus
        </p>
      </div>
    </>
  );
};

export const groupMapper = (evaluation: IEvaluation): ReactElement | string => {
  return evaluation.group.name;
};

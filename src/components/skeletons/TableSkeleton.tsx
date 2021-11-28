import type { ReactElement } from 'react';

import { v4 as uuidv4 } from 'uuid';

import clsx from 'clsx';

import TextSkeleton from '@skeleton/TextSkeleton';

interface IProps {
  columns?: number;
  data?: number;
  className?: string;
}

const TableSkeleton = ({ className, columns = 1, data = 5 }: IProps): ReactElement => {
  return (
    <table className={clsx([className])}>
      <thead className="border-b border-gray-400">
        <tr>
          {Array.from({ length: columns }).map(() => (
            <th className="py-3" key={uuidv4()}>
              <TextSkeleton className="w-32" />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: data }).map(() => (
          <tr key={uuidv4()}>
            {Array.from({ length: columns }).map(() => (
              <th className="py-2" key={uuidv4()}>
                <TextSkeleton secondary small className="w-32" />
                <TextSkeleton secondary small className="w-24" />
              </th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;

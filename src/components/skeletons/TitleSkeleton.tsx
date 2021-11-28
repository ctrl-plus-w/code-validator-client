import type { ReactElement } from 'react';

import clsx from 'clsx';

interface IProps {
  className?: string;

  level?: 1 | 2 | 3;
}

const TitleSkeleton = ({ className, level = 1 }: IProps): ReactElement => {
  switch (level) {
    case 2:
      return (
        <div
          className={clsx(['h-7 from-gray-600 bg-gradient-to-br to-gray-300 rounded', className])}
        />
      );

    case 3:
      return (
        <div
          className={clsx(['h-6 from-gray-600 bg-gradient-to-br to-gray-300 rounded', className])}
        />
      );

    default:
      return (
        <div
          className={clsx(['h-9 from-gray-600 bg-gradient-to-br to-gray-300 rounded', className])}
        />
      );
  }
};

export default TitleSkeleton;

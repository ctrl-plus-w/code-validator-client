import type { ReactElement, ReactNode } from 'react';

import clsx from 'clsx';

interface IProps {
  className?: string;

  level?: 1 | 2 | 3;

  children?: ReactNode;
}

const Title = ({ className, level = 1, children }: IProps): ReactElement => {
  switch (level) {
    case 2:
      return <h2 className={clsx(['text-lg text-black font-medium', className])}>{children}</h2>;

    case 3:
      return <h3 className={clsx(['text-base text-gray-600 font-normal', className])}>{children}</h3>;

    default:
      return <h1 className={clsx(['text-3xl text-black font-semibold', className])}>{children}</h1>;
  }
};

export default Title;

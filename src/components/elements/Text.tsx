import { ReactElement, ReactNode, useCallback } from 'react';

import clsx from 'clsx';

interface IProps {
  type?: 'BLACK' | 'GRAY' | 'DARK_GRAY' | 'SUCCESS' | 'SUCCESS_LIGHT';

  children?: ReactNode;
  className?: string;
}

const Text = ({ type, className, children }: IProps): ReactElement => {
  const getStyle = useCallback(() => {
    switch (type) {
      case 'BLACK':
        return 'text-black';

      case 'DARK_GRAY':
        return 'text-dark-900';

      case 'GRAY':
        return 'text-gray-700';

      case 'SUCCESS':
        return 'text-green-600';

      case 'SUCCESS_LIGHT':
        return 'text-green-300';

      default:
        return 'text-black';
    }
  }, [type]);

  return <p className={clsx(['text-base font-normal', getStyle(), className])}>{children}</p>;
};

export default Text;

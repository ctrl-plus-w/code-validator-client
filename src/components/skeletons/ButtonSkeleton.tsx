import type { ReactElement } from 'react';

import clsx from 'clsx';

interface IProps {
  small?: boolean;
  primary?: boolean;
  className?: string;
}

const ButtonSkeleton = ({ small, primary, className }: IProps): ReactElement => {
  return (
    <div
      className={clsx([
        'px-6 py-2.5 rounded',
        primary
          ? 'from-primary bg-gradient-to-br to-purple-300'
          : 'from-gray-600 bg-gradient-to-br to-gray-300',
        small ? 'h-10' : 'h-10.5',
        className,
      ])}
    />
  );
};

export default ButtonSkeleton;

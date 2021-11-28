import type { ReactElement } from 'react';

import clsx from 'clsx';

interface IProps {
  small?: boolean;
  className?: string;

  primary?: boolean;
  success?: boolean;
}

const ButtonSkeleton = ({ small, primary, success, className }: IProps): ReactElement => {
  return (
    <div
      className={clsx([
        'px-6 py-2.5 rounded',
        primary && 'from-primary bg-gradient-to-br to-purple-300',
        success && 'from-green-800 bg-gradient-to-br to-green-300',
        !primary && !success && 'from-gray-600 bg-gradient-to-br to-gray-300',
        small ? 'h-10' : 'h-10.5',
        className,
      ])}
    />
  );
};

export default ButtonSkeleton;

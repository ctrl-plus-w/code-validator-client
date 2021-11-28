import type { ReactElement } from 'react';

import clsx from 'clsx';

interface IProps {
  className?: string;
  primary?: boolean;

  small?: boolean;
}

const TextSkeleton = ({ className, primary, small }: IProps): ReactElement => {
  return (
    <div
      className={clsx([
        'h-6 rounded',
        primary
          ? 'from-primary bg-gradient-to-br to-purple-300'
          : 'from-gray-600 bg-gradient-to-br to-gray-300',
        small && 'text-sm',
        className,
      ])}
    />
  );
};

export default TextSkeleton;

import type { ReactNode, ReactElement } from 'react';

import clsx from 'clsx';

interface IProps {
  className?: string;

  children?: ReactNode;

  row?: boolean;
  col?: boolean;

  full?: boolean;

  fullHorizontal?: boolean;
  fullVertical?: boolean;

  center?: boolean;

  centerVertical?: boolean;
  centerHorizontal?: boolean;
}

const Container = ({
  className,
  children,

  row,
  col,

  center,
  centerHorizontal,
  centerVertical,

  full,
  fullHorizontal,
  fullVertical,
}: IProps): ReactElement => {
  return (
    <div
      className={clsx([
        'flex',
        row && 'flex-row',
        col && 'flex-col',

        center && 'items-center justify-center',
        centerHorizontal && (col ? 'items-center' : 'justify-center'),
        centerVertical && (col ? 'justify-center' : 'items-center'),

        full && 'w-full h-full',
        fullHorizontal && 'w-full',
        fullVertical && 'h-full',

        className,
      ])}
    >
      {children}
    </div>
  );
};

export default Container;

import type { ReactElement } from 'react';

import clsx from 'clsx';

interface IProps {
  value: number;
  max: number;

  className?: string;
}

const Loader = ({ className, value, max }: IProps): ReactElement => {
  return (
    <div className={clsx(['relative w-4 h-4', className])}>
      <div
        className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full"
        style={{
          background: `conic-gradient(#8B5CF6 ${(value / max) * 360}deg, #C4B5FD ${
            (value / max) * 360
          }deg 360deg)`,
        }}
      />
      <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-primary-light" />
      <div className="z-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white" />
    </div>
  );
};

export default Loader;

import type { ReactElement } from 'react';

import clsx from 'clsx';

import TextSkeleton from '@skeleton/TextSkeleton';

interface IProps {
  label?: boolean;
  maxLength?: boolean;
  textarea?: boolean;

  className?: string;
}

const InputSkeleton = ({ label, maxLength, className, textarea }: IProps): ReactElement => {
  return (
    <div className={clsx(['flex flex-col gap-2', textarea && 'pb-0.5px', className])}>
      <div className="flex justify-between items-center">
        {label && <TextSkeleton className="w-24" />}
        {label && maxLength && <TextSkeleton small className="w-12" />}
      </div>

      <div
        className={clsx([
          'w-full bg-gray-300 from-gray-600 bg-gradient-to-br to-gray-300 rounded',
          textarea ? 'h-20' : 'h-11.5',
        ])}
      />
    </div>
  );
};

export default InputSkeleton;

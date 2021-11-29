import type { ReactElement } from 'react';

import { v4 as uuidv4 } from 'uuid';

import clsx from 'clsx';
import Container from '@module/Container';
import TextSkeleton from './TextSkeleton';

interface IProps {
  label?: boolean;

  className?: string;
}

const RateInputSkeleton = ({ className, label }: IProps): ReactElement => {
  return (
    <Container className={clsx([className])} col>
      {label && <TextSkeleton className="w-24 mb-2" />}

      <Container className="items-center">
        {Array.from({ length: 5 }).map(() => (
          <div
            className="h-6 w-5 mr-1 from-yellow-600 bg-gradient-to-br to-yellow-300 rounded"
            key={uuidv4()}
          />
        ))}

        <div className="w-5 h-5 ml-3 bg-red-600 rounded" />
      </Container>
    </Container>
  );
};

export default RateInputSkeleton;

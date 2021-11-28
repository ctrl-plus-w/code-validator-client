import type { FC } from 'react';

import Container from '@module/Container';

import TitleSkeleton from '@skeleton/TitleSkeleton';

interface IProps {
  className?: string;

  invert?: boolean;
}

const HeadingSkeleton: FC<IProps> = ({ className, invert }) => {
  return (
    <Container className={className} col>
      {invert ? (
        <>
          <TitleSkeleton className="w-24" level={2} />
          <TitleSkeleton className="w-48 mt-2" level={1} />
        </>
      ) : (
        <>
          <TitleSkeleton className="w-48" level={1} />
          <TitleSkeleton className="w-24 mt-2" level={2} />
        </>
      )}
    </Container>
  );
};

export default HeadingSkeleton;

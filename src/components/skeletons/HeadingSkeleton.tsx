import type { FC } from 'react';

import Container from '@module/Container';

import TitleSkeleton from './TitleSkeleton';

interface IProps {
  className?: string;
}

const HeadingSkeleton: FC<IProps> = ({ className }) => {
  return (
    <Container className={className} col>
      <TitleSkeleton className="w-48" level={1} />
      <TitleSkeleton className="w-24 mt-2" level={2} />
    </Container>
  );
};

export default HeadingSkeleton;

import Title from '@element/Title';
import type { FC } from 'react';
import Container from './Container';

interface IProps {
  title: string;
  subtitle: string;

  className?: string;
}

const Heading: FC<IProps> = ({ title, subtitle, className }) => {
  return (
    <Container className={className} col>
      <Title>{title}</Title>
      <Title className="mt-2" level={3}>
        {subtitle}
      </Title>
    </Container>
  );
};

export default Heading;

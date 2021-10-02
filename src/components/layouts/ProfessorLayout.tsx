import type { ReactElement, ReactNode } from 'react';

import Head from 'next/head';
import clsx from 'clsx';

import Menu from '@module/Menu';

interface IProps {
  className?: string;

  children: ReactNode;
}

const ProfessorLayout = ({ className, children }: IProps): ReactElement => {
  return (
    <div className="w-full h-full flex flex-col">
      <Head>
        <title>Professeur</title>
      </Head>

      <Menu isProfessor />

      <div className={clsx(['w-full h-full px-12', className])}>{children}</div>
    </div>
  );
};

export default ProfessorLayout;

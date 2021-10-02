import Head from 'next/head';

import type { ReactElement, ReactNode } from 'react';

import clsx from 'clsx';

import Menu from '@module/Menu';

interface IProps {
  className?: string;

  children: ReactNode;
}

const StudentLayout = ({ className, children }: IProps): ReactElement => {
  return (
    <div className="w-full h-full flex flex-col">
      <Head>
        <title>Élève</title>
      </Head>

      <Menu isProfessor={false} />

      <div className={clsx(['w-full h-full px-12', className])}>{children}</div>
    </div>
  );
};

export default StudentLayout;

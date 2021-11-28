import Head from 'next/head';

import type { ReactElement, ReactNode } from 'react';

import clsx from 'clsx';

import Menu from '@module/Menu';

import MenuSkeleton from '@skeleton/MenuSkeleton';

interface IProps {
  className?: string;

  children: ReactNode;

  skeleton?: boolean;
}

const StudentLayout = ({ className, children, skeleton }: IProps): ReactElement => {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Élève</title>
      </Head>

      {skeleton ? <MenuSkeleton isProfessor={false} /> : <Menu isProfessor={false} />}

      <div className={clsx(['w-full h-full px-12', className])}>{children}</div>
    </div>
  );
};

export default StudentLayout;

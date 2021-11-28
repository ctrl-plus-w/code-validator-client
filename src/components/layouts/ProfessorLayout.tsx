import type { ReactElement, ReactNode } from 'react';

import Head from 'next/head';
import clsx from 'clsx';

import Menu from '@module/Menu';

import MenuSkeleton from '@skeleton/MenuSkeleton';

interface IProps {
  className?: string;

  menu?: boolean;
  skeleton?: boolean;

  children: ReactNode;
}

const ProfessorLayout = ({ className, menu = true, skeleton, children }: IProps): ReactElement => {
  return (
    <div className="w-full h-full flex flex-col">
      <Head>
        <title>Professeur</title>
      </Head>

      {menu && (skeleton ? <MenuSkeleton isProfessor /> : <Menu isProfessor />)}

      <div className={clsx(['w-full h-full px-12', !menu && 'py-12', className])}>{children}</div>
    </div>
  );
};

export default ProfessorLayout;

import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import type { ReactElement } from 'react';

import clsx from 'clsx';

import MENU from '@constant/menu';

import ButtonSkeleton from '@skeleton/ButtonSkeleton';
import TitleSkeleton from '@skeleton/TitleSkeleton';
import TextSkeleton from '@skeleton/TextSkeleton';

interface IProps {
  className?: string;

  isProfessor?: boolean;
}

const MenuSkeleton = ({ className, isProfessor }: IProps): ReactElement => {
  const router = useRouter();

  const [roleMenu] = useState(MENU[isProfessor ? 'professor' : 'student']);

  const isActive = (pathname: string): boolean => {
    if (router.pathname === pathname && pathname === roleMenu.baseUrl) return true;
    if (router.pathname.startsWith(pathname) && pathname !== roleMenu.baseUrl) return true;

    return false;
  };

  return (
    <nav className={clsx(['flex flex-row w-full items-center justify-between p-12', className])}>
      <TitleSkeleton className="w-32" level={2} />

      <ul className="flex flex-row gap-4 text-gray-800 font-medium">
        {Object.keys(roleMenu.paths).map((path) => {
          const { pathname, title } = roleMenu.paths[path];

          if (!title) return null;

          return (
            <li key={uuidv4()}>
              <TextSkeleton primary={isActive(pathname)} className="w-32" />
            </li>
          );
        })}
      </ul>

      <div className="flex gap-8">
        {isProfessor && <ButtonSkeleton primary className="w-24" />}

        <ButtonSkeleton className="w-32" />
      </div>
    </nav>
  );
};

export default MenuSkeleton;

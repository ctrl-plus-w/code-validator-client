import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { ReactElement, useState } from 'react';

import Link from 'next/link';
import clsx from 'clsx';

import MENU from '@constant/menu';
import Button from '@element/Button';

interface IProps {
  className?: string;

  isProfessor?: boolean;
}

const Menu = ({ className, isProfessor }: IProps): ReactElement => {
  const router = useRouter();

  const [roleMenu] = useState(MENU[isProfessor ? 'professor' : 'student']);

  const onLogout = (): void => {
    // TODO : Make the logout computations.
  };

  return (
    <nav className={clsx(['flex flex-row w-full items-center justify-between p-12', className])}>
      <div>
        <p className="text-gray-800 font-mono font-bold">CODE_VALIDATOR</p>
      </div>

      <ul className="flex flex-row gap-4 text-gray-800 font-medium">
        {Object.keys(roleMenu.paths).map((path) => {
          const { pathname, title } = roleMenu.paths[path];

          if (!title) return null;

          return (
            <li className={clsx(router.pathname.startsWith(pathname) && 'font-semibold text-primary')} key={uuidv4()}>
              <Link href={pathname} passHref>
                <a href="replace">{title}</a>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex gap-8">
        <Button type="PRIMARY" href={roleMenu.paths.createEvaluation.pathname}>
          Évaluation
        </Button>

        <button type="button" onClick={onLogout}>
          <p className="text-gray-800 font-semibold cursor-pointer">Se déconnecter</p>
        </button>
      </div>
    </nav>
  );
};

export default Menu;

import type { ReactElement, ReactNode } from 'react';

import NextLink from 'next/link';
import clsx from 'clsx';

interface IProps {
  href: string;
  children: ReactNode;

  className?: string;
}

const Link = ({ className, href, children }: IProps): ReactElement => {
  return (
    <NextLink href={href} passHref>
      <a href="replace" className={clsx(['link', className])}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;

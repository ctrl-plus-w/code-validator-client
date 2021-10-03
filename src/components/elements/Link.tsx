import type { ReactElement, ReactNode } from 'react';

import NextLink from 'next/link';
import clsx from 'clsx';

interface IProps {
  href: string;
  children: ReactNode;

  styled?: boolean;

  className?: string;
}

const Link = ({ className, href, children, styled = true }: IProps): ReactElement => {
  return (
    <NextLink href={href} passHref>
      <a href="replace" className={clsx(['link', styled && 'styled-link', className])}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;

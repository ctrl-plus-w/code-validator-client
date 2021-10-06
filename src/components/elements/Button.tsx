import { useCallback } from 'react';

import type { ReactElement, ReactNode, MouseEvent } from 'react';

import Link from 'next/link';
import clsx from 'clsx';

interface IProps {
  type?: ButtonType;

  href?: string;

  small?: boolean;

  onClick?: (e: MouseEvent) => void;

  htmlType?: 'button' | 'submit' | 'reset';

  className?: string;
  children?: ReactNode;
}

const Button = ({
  className,
  children,
  href,
  type,
  small,
  htmlType = 'button',
  onClick,
}: IProps): ReactElement => {
  const getStyle = useCallback(() => {
    switch (type) {
      case 'BLACK':
        return 'text-white bg-dark-gray hover:bg-gray-900';

      case 'GHOST_BLACK':
        return 'text-black bg-transparent hover:text-gray-900';

      case 'WHITE':
        return 'text-dark-gray bg-white hover:bg-gray-200';

      case 'GHOST_WHITE':
        return 'bg-black text-white hover:text-gray-200';

      case 'PRIMARY':
        return 'text-white bg-primary hover:bg-purple-500';

      case 'GHOST_PRIMARY':
        return 'text-primary bg-white hover:text-purple-500';

      case 'SUCCESS':
        return 'text-white bg-green-600 hover:bg-green-500';

      case 'GHOST_SUCCESS':
        return 'text-green-600 bg-white hover:text-green-500';

      default:
        return 'text-white bg-black hover:bg-gray-900';
    }
  }, [type]);

  const getClassName = useCallback(() => {
    return clsx([
      'px-6 py-2.5 font-semibold rounded-sm transition-all duration-500',
      small ? 'text-sm' : 'text-base',
      getStyle(),
      className,
    ]);
  }, [className, small, getStyle]);

  if (href) {
    return (
      <Link href={href} passHref>
        <a href="replace" className={getClassName()} onClick={onClick}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button type={htmlType} onClick={onClick} className={getClassName()}>
      {children}
    </button>
  );
};

export default Button;

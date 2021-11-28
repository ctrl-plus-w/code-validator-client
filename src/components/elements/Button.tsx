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

  disabled?: boolean;
}

const Button = ({
  className,
  children,
  href,
  type,
  small,
  disabled,
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

      case 'ERROR':
        return 'text-white bg-red-600 hover:text-red-500';

      case 'GHOST_ERROR':
        return 'text-red-600 bg-white hover:text-red-500';

      case 'WARNING':
        return 'text-white bg-orange-600 hover:bg-orange-500';

      case 'OUTLINE_ERROR':
        return 'text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white';

      case 'GHOST_WARNING':
        return 'text-orange-600 bg-white hover:text-orange-500';

      case 'GRAY':
        return 'text-white bg-gray-600 hover:bg-gray-500';

      case 'GHOST_GRAY':
        return 'text-gray-600 bg-white hover:text-gray-500';

      case 'DARK_GRAY':
        return 'text-white bg-dark-gray hover:bg-gray-900';

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

  if (href && !disabled) {
    return (
      <Link href={href} passHref>
        <a href="replace" className={getClassName()} onClick={onClick}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={clsx([disabled && 'opacity-50', getClassName()])}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

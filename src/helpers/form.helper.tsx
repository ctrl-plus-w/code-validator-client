import type { ReactElement } from 'react';

import clsx from 'clsx';

import { XIcon } from '@heroicons/react/outline';

export const validSearchField = (field: string): boolean => {
  if (field.startsWith('#') || field.startsWith('@')) return true;

  return false;
};

export const mapSearchField = (field: string): ReactElement => {
  return (
    <div
      className={clsx([
        'flex items-center justify-center gap-1 py-1 px-2 rounded border',
        field.startsWith('@') && 'bg-green-300 text-green-800 border-green-600',
        field.startsWith('#') && 'bg-blue-300 text-blue-800 border-blue-600',
      ])}
    >
      <p className="text-sm font-medium">{field}</p>
      <XIcon className="w-4 h-4 -mb-0.5" />
    </div>
  );
};

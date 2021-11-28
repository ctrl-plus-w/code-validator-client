import type { ReactElement } from 'react';

import { v4 as uuidv4 } from 'uuid';

import clsx from 'clsx';
import Text from '@element/Text';

interface IRowConfig<T> {
  name: string;

  mapper: (data: T) => ReactElement | string;
}

interface IProps<T> {
  config: IRowConfig<T>[];

  data: T[];

  hoverEffect?: boolean;

  onClick?: (data: T) => void;

  className?: string;

  emptyMessage?: string;
}

const Table = <T,>({
  className,
  data,
  config,
  emptyMessage,
  hoverEffect = true,
  onClick = () => null,
}: IProps<T>): ReactElement => {
  return (
    <table className={clsx([className])}>
      <thead className="border-b border-gray-400">
        <tr>
          {config.map((column) => (
            <th
              className="text-gray-500 text-base text-left font-medium uppercase py-3 "
              key={uuidv4()}
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((_data) => (
          <tr
            key={uuidv4()}
            className={clsx([
              hoverEffect &&
                'transform hover:translate-x-4 transition-all duration-300 cursor-pointer',
            ])}
            onClick={onClick && (() => onClick(_data))}
          >
            {config.map((column) => (
              <td className="py-2" key={uuidv4()}>
                {column.mapper(_data)}
              </td>
            ))}
          </tr>
        ))}
        {data.length === 0 && (
          <tr>
            <td colSpan={config.length} className="pt-32">
              <Text type="GRAY" className="text-center">
                {emptyMessage || 'Aucune donnée trouvée.'}
              </Text>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;

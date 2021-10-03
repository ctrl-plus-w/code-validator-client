import { v4 as uuidv4 } from 'uuid';

import { Dispatch, ReactElement, SetStateAction, useState } from 'react';

import clsx from 'clsx';

import { StarIcon, XIcon } from '@heroicons/react/solid';

import generateArray from '@util/array.util';

interface IProps extends IDefaultInputProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;

  className?: string;

  max: number;
}

const RateInput = ({ value, setValue, className, max, label }: IProps): ReactElement => {
  const [hover, setHover] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
    setTempValue(value);
  };

  return (
    <div className={clsx(['flex flex-col', className])}>
      {label && (
        <p className="text-base font-medium mb-2">
          {label && <span className="text-black">{label}</span>}
        </p>
      )}

      <div
        className="flex gap-1 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {generateArray(max, 1).map((_, index) => (
          <button
            className="flex items-center justify-center w-6 h-6 -ml-1"
            key={uuidv4()}
            onMouseEnter={() => setTempValue(index + 1)}
            onClick={() => setValue(index + 1)}
          >
            {(hover ? index + 1 <= tempValue : index + 1 <= value) ? (
              <StarIcon className={clsx(['w-6 h-6 text-yellow-400'])} />
            ) : (
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            )}
          </button>
        ))}

        <button
          className="flex items-center justify-center ml-4"
          onMouseEnter={() => setTempValue(value)}
        >
          <XIcon className="w-5 h-5 text-red-600" onClick={() => setValue(0)} />
        </button>
      </div>
    </div>
  );
};

export default RateInput;

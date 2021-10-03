import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { FormEvent, ReactElement } from 'react';

import clsx from 'clsx';

interface IProps {
  name: string;

  values: string[];

  addValue: (value: string) => void;
  removeValue: (value: string) => void;

  validValue: (value: string) => boolean;
  valueMapper?: (value: string) => ReactElement;

  placeholder: string;

  className?: string;
}

const TagsInput = ({
  name,
  className,
  placeholder,
  values,
  validValue,
  valueMapper,
  addValue,
  removeValue,
}: IProps): ReactElement => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (validValue(value)) {
      addValue(value);
      setValue('');
    }
  };

  return (
    <form className={clsx(['flex items-center', className])} onSubmit={handleSubmit}>
      <div className="flex gap-2">
        {values.map((_value) => (
          <button
            type="button"
            className="cursor-pointer"
            key={uuidv4()}
            onClick={() => removeValue(_value)}
          >
            {valueMapper ? valueMapper(_value) : <p key={uuidv4()}>{_value}</p>}
          </button>
        ))}
      </div>

      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={clsx(['flex-grow outline-none py-2 px-2', values.length > 0 && 'pl-4'])}
      />
    </form>
  );
};

export default TagsInput;

import { useCallback } from 'react';

import type { MouseEvent, ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react';

import clsx from 'clsx';

import useClickOutside from '@hook/useClickOutside';
import useSwitch from '@hook/useSwitch';

interface IProps extends IDefaultInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;

  values: string[];

  placeholder?: string;
  required?: boolean;
  valid?: boolean;

  dropdownMaxHeight?: number;
}

const SearchInput = ({
  name,
  setValue,
  value,
  values,
  className,
  disabled,
  label,
  placeholder,
  required,
  valid,
  dropdownMaxHeight,
}: IProps): ReactElement => {
  const { value: opened, enable, disable } = useSwitch(false);

  const { container } = useClickOutside<HTMLInputElement>(disable);

  const getAvailableValues = useCallback(() => {
    return values
      .filter((val) => val.startsWith(value) || value === '')
      .slice(0, dropdownMaxHeight);
  }, [values, dropdownMaxHeight, value]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>, item: string) => {
    e.preventDefault();
    setValue(item);
    disable();
  };

  const handleFocus = () => {
    if (!opened) enable();
  };

  return (
    <label className={clsx(['flex flex-col gap-2', className])} htmlFor={name}>
      <p className="text-base font-medium">
        {label && <span className="text-black">{label}</span>}
        {label && required && <span className="text-red-700 ml-1">*</span>}
      </p>

      <div className="w-full relative" ref={container}>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          className={clsx(['form-control', valid === false && 'invalid'])}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          disabled={disabled}
        />

        <div
          className={clsx([
            'absolute top-full w-full flex-col gap-1 p-2 text-sm rounded-sm border border-gray-500 mt-5',
            opened ? 'flex' : 'hidden',
          ])}
        >
          {getAvailableValues().length === 0 && (
            <p className="py-2 px-3 text-left">Aucune valeur trouvée</p>
          )}
          {getAvailableValues().map((item) => (
            <button
              className="py-2 px-3 text-left transition-all transition-300 hover:bg-gray-200"
              onClick={(e) => handleClick(e, item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </label>
  );
};

export default SearchInput;

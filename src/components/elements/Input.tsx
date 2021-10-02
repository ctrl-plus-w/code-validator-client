import { useCallback } from 'react';

import type {
  MouseEvent,
  ChangeEvent,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react';

import clsx from 'clsx';

export interface IProps extends IDefaultInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;

  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: (event: MouseEvent<HTMLButtonElement>) => void;

  placeholder?: string;
  icon?: ReactNode;

  htmlType?: 'text' | 'password' | 'number' | 'tel';

  maxLength?: number;
  required?: boolean;
  valid?: boolean;
}

const Input = ({
  value,
  setValue,
  onChange,
  onIconClick,
  name,
  className,
  label,
  placeholder,
  icon,
  htmlType = 'text',
  valid,
  disabled,
  maxLength,
  required,
}: IProps): ReactElement => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
        return;
      }

      const { value: targetValue } = e.target;
      if (maxLength && targetValue.length > maxLength) return;

      setValue(targetValue);
    },
    [onChange, setValue, maxLength],
  );

  return (
    <label className={clsx(['flex flex-col gap-2', className])} htmlFor={name}>
      <div className="flex justify-between items-center">
        <p className="text-base font-medium">
          {label && <span className="text-black">{label}</span>}
          {label && required && <span className="text-red-700 ml-1">*</span>}
        </p>

        {label && maxLength !== undefined && (
          <p className="text-sm text-gray-700">
            {value.length} / {maxLength}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          type={htmlType}
          name={name}
          placeholder={placeholder}
          className={clsx([
            'w-full px-3 py-3 text-sm rounded-sm outline-none border',
            'hover:border-primary focus:border-primary focus:ring focus:ring-primary-light',
            'transition-all duration-300',
            valid === false ? 'border-red-500' : 'border-gray-500',
          ])}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />

        {icon && onIconClick ? (
          <button
            className="absolute right-0 top-0 flex items-center justify-center h-full px-3.5 text-gray-900 hover:text-primary transition-all duration-300"
            onClick={onIconClick}
          >
            {icon}
          </button>
        ) : (
          <div className="absolute right-0 top-0 flex items-center justify-center h-full px-2">
            {icon}
          </div>
        )}

        {!label && maxLength !== undefined && (
          <div className="flex w-full justify-end mt-1">
            <p className="text-sm text-gray-700">
              {value.length} / {maxLength}
            </p>
          </div>
        )}
      </div>
    </label>
  );
};

export default Input;

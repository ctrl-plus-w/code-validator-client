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

  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onIconClick?: (event: MouseEvent<HTMLButtonElement | HTMLTextAreaElement>) => void;

  placeholder?: string;
  icon?: ReactNode;

  htmlType?: 'text' | 'password' | 'number' | 'tel';
  textarea?: boolean;
  fullHeightTextarea?: boolean;

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
  textarea,
  required,
  fullHeightTextarea,
}: IProps): ReactElement => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <label
      className={clsx(['flex flex-col gap-2', fullHeightTextarea && 'h-full', className])}
      htmlFor={name}
    >
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

      <div className={clsx(['relative', fullHeightTextarea && 'h-full'])}>
        {textarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            className={clsx([
              'form-control',
              fullHeightTextarea && 'h-full',
              valid === false && 'invalid',
            ])}
            value={value}
            onChange={handleChange}
            disabled={disabled}
          />
        ) : (
          <input
            type={htmlType}
            name={name}
            placeholder={placeholder}
            className={clsx(['form-control', valid === false && 'invalid'])}
            value={value}
            onChange={handleChange}
            disabled={disabled}
          />
        )}

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

import type { Dispatch, ReactElement, SetStateAction } from 'react';

import clsx from 'clsx';

import { formatInputDate } from '@util/date.util';

interface IProps extends IDefaultInputProps {
  value: Date;
  setValue: Dispatch<SetStateAction<Date>>;

  required?: boolean;

  placeholder?: string;

  className?: string;
}

const CalendarInput = ({
  value,
  setValue,
  className,
  name,
  placeholder,
  required,
  disabled,
  label,
}: IProps): ReactElement => {
  const getDateFromValue = (val: string): Date => {
    const [year, month, date] = val.split('-');
    return new Date(parseInt(year, 10), parseInt(month, 10), parseInt(date, 10));
  };

  return (
    <label className={clsx(['flex flex-col gap-2', className])} htmlFor={name}>
      <div className="flex justify-between items-center">
        <p className="text-base font-medium">
          {label && <span className="text-black">{label}</span>}
          {label && required && <span className="text-red-700 ml-1">*</span>}
        </p>
      </div>

      <input
        type="date"
        name={name}
        placeholder={placeholder}
        value={formatInputDate(value)}
        onChange={(e) => setValue(getDateFromValue(e.target.value))}
        disabled={disabled}
        className="form-control"
      />
    </label>
  );
};

export default CalendarInput;

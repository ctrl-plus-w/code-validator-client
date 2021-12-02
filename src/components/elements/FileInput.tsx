import { createRef } from 'react';

import type { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import clsx from 'clsx';

interface IProps extends IDefaultInputProps {
  value: File | null;
  setValue: Dispatch<SetStateAction<File | null>>;

  extentions?: string[];

  required?: boolean;

  placeholder?: string;

  className?: string;
}

const FileInput: FC<IProps> = ({
  name,
  value,
  setValue,
  extentions = [],
  className,
  disabled,
  label,
  placeholder,
  required,
}) => {
  const inputRef = createRef<HTMLInputElement>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files[0] && extentions.includes(files[0].name.split('.').pop() || '')) {
      setValue(files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <label className={clsx(['flex flex-col gap-2', className])} htmlFor={name}>
      <div className="flex justify-between items-center">
        <p className="text-base font-medium">
          {label && <span className="text-black">{label}</span>}
          {label && required && <span className="text-red-700 ml-1">*</span>}
        </p>
      </div>

      <button type="button" className="form-control text-left" onClick={handleClick}>
        {value ? value.name : 'Aucun fichier sélectionné'}
      </button>

      <input
        type="file"
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        accept={extentions?.map((e) => `.${e}`).join(',')}
      />
    </label>
  );
};

export default FileInput;

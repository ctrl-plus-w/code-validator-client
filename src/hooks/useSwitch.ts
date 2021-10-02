import { useState } from 'react';

interface IReturnProperties {
  value: boolean;

  swap: () => void;
  enable: () => void;
  disable: () => void;
}

const useSwitch = (defaultValue = false): IReturnProperties => {
  const [value, setValue] = useState(defaultValue);

  const swap = () => setValue((prev) => !prev);

  const enable = () => setValue(true);

  const disable = () => setValue(false);

  return { swap, enable, disable, value };
};

export default useSwitch;

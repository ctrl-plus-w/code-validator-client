import { useState } from 'react';

interface IReturnProperties<T> {
  addValue: (value: T) => void;
  removeValue: (value: T) => void;
  clearValues: () => void;
  values: T[];
}

const useArray = <T>(
  defaultArray: T[] = [],
  removeValueOverride?: (value: T) => void,
): IReturnProperties<T> => {
  const [values, setValues] = useState(defaultArray);

  const addValue = (value: T) => {
    setValues((prev) => [...prev, value]);
  };

  const removeValue = (value: T) => {
    if (removeValueOverride) removeValueOverride(value);
    else setValues((prev) => prev.filter((_value) => value !== _value));
  };

  const clearValues = () => {
    setValues([]);
  };

  return { values, addValue, removeValue, clearValues };
};

export default useArray;

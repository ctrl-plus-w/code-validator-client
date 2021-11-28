import useSwitch from '@hook/useSwitch';
import useKeypress from '@hook/useKeypress';

const useDebugSwitch = (defaultValue = true): boolean => {
  const { value, swap } = useSwitch(defaultValue);

  useKeypress('p', swap);

  return value;
};

export default useDebugSwitch;

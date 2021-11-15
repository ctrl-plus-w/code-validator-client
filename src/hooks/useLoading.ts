import { useState } from 'react';

const useLoading = (...loadingStates: boolean[]): [boolean, () => void] => {
  const [globalLoading, setGlobalLoading] = useState(true);

  const endLoading = (): void => {
    setGlobalLoading(false);
  };

  return [[...loadingStates, globalLoading].some((state) => state === true), endLoading];
};

export default useLoading;

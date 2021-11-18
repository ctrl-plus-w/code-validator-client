const useLoading = (nonNullableAssertions: unknown[], ...loadingStates: boolean[]): [boolean] => {
  return [
    [...loadingStates].some((state) => state === true) ||
      nonNullableAssertions.some((state) => state === null || state === undefined),
  ];
};

export default useLoading;

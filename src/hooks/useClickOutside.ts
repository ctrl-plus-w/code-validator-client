import { createRef, useEffect } from 'react';

import type { RefObject } from 'react';

const useClickOutside = <T extends Element>(
  cb: () => void,
  updater: Array<unknown> = [],
): { container: RefObject<T> } => {
  const container = createRef<T>();

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent): void => {
      const target = e.target as Element;

      if (
        container.current &&
        container.current !== target &&
        !container.current.contains(target)
      ) {
        cb();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [cb, container, ...updater]);

  return { container };
};

export default useClickOutside;

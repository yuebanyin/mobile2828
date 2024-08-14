import { useCallback } from 'react';

export const useStyleRem = () => {
  const pxToRem = useCallback((p) => {
    let val = '';
    if (typeof window?.flexible?.px2rem === 'function') {
      try {
        val = window.flexible.px2rem(p);
      } catch (error) {
        //
      }
    }
    return val;
  }, []);
  return { pxToRem };
};

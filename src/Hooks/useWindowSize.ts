import { useEffect } from 'react';

import useRafState from './useRafState';

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: initialWidth ? initialWidth : window.innerWidth,
    height: initialHeight ? initialHeight : window.innerHeight,
  });

  useEffect((): (() => void) | void => {
    const handler = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  });

  return state;
};

export default useWindowSize;

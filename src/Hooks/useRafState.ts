import {
  useRef,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

const useRafState = <S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useEffect(() => {
    cancelAnimationFrame(frame.current);
  }, []);

  return [state, setRafState];
};

export default useRafState;

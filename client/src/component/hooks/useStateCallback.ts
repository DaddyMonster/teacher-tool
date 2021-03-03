import React, { useState, useEffect, useRef } from "react";

type CallbackFunction<P> = (state: P, callback?: (newState: P) => void) => void;
type Cb<T> = (state: T) => void;

function useStateCallback<T>(initialState: T): [T, CallbackFunction<T>] {
  const [state, setstate] = useState(initialState);
  type State = typeof initialState;
  const callbackRef = useRef<Cb<State> | null>(null);
  const setStateCallback: CallbackFunction<State> = (state, callback) => {
    if (callback) {
      callbackRef.current = callback;
    } else {
      callbackRef.current = null;
    }
    setstate(state);
  };

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);
  return [state, setStateCallback];
}

export default useStateCallback;

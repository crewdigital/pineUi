'use client';

import * as React from 'react';

export interface UseControllableStateOptions<T> {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: ((state: T) => void) | undefined;
}

/**
 * Manages state that can be either controlled by a parent via props or uncontrolled internally.
 */
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateOptions<T>): [T, (nextState: T | ((prev: T) => T)) => void] {
  const [uncontrolledState, setUncontrolledState] = React.useState<T>(
    defaultProp as T
  );

  const isControlled = prop !== undefined;
  const state = isControlled ? (prop as T) : uncontrolledState;

  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  });

  const setState = React.useCallback(
    (nextState: T | ((prev: T) => T)) => {
      const value =
        typeof nextState === 'function'
          ? (nextState as (prev: T) => T)(state)
          : nextState;

      if (!isControlled) {
        setUncontrolledState(value);
      }

      if (value !== state) {
        onChangeRef.current(value);
      }
    },
    [isControlled, state]
  );

  return [state, setState];
}

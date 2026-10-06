'use client';

import * as React from 'react';

export type Direction = 'ltr' | 'rtl';

export interface DirectionContextValue {
  dir: Direction;
  isRtl: boolean;
}

export const DirectionContext = React.createContext<DirectionContextValue | undefined>(undefined);

export interface DirectionProviderProps {
  /** Reading and layout direction ('ltr' or 'rtl') */
  dir: Direction;
  children: React.ReactNode;
}

/**
 * DirectionProvider establishes the reading/layout direction context for child components.
 * Can be nested to create localized RTL or LTR islands.
 */
export function DirectionProvider({ dir, children }: DirectionProviderProps) {
  const value = React.useMemo<DirectionContextValue>(
    () => ({
      dir,
      isRtl: dir === 'rtl',
    }),
    [dir]
  );

  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  );
}

/**
 * Hook to retrieve the active direction ('ltr' or 'rtl').
 * Priority:
 * 1. Explicit `propDir` argument if provided.
 * 2. Inherited `DirectionContext` from nearest `DirectionProvider`.
 * 3. DOM lookup from optional `elementRef` searching for closest `[dir]` attribute.
 * 4. Document-level `document.documentElement.dir`.
 * 5. Default fallback to 'ltr'.
 */
export function useDirection(
  propDir?: Direction,
  elementRef?: React.RefObject<HTMLElement | null>
): Direction {
  const context = React.useContext(DirectionContext);
  const [domDir, setDomDir] = React.useState<Direction | undefined>(undefined);

  React.useLayoutEffect(() => {
    if (propDir || context?.dir) return;

    if (elementRef?.current) {
      const closestWithDir = elementRef.current.closest('[dir="rtl"], [dir="ltr"]');
      if (closestWithDir) {
        const attr = closestWithDir.getAttribute('dir')?.toLowerCase();
        if (attr === 'rtl' || attr === 'ltr') {
          setDomDir(attr as Direction);
          return;
        }
      }
    }

    if (typeof document !== 'undefined' && document.documentElement?.dir) {
      const htmlDir = document.documentElement.dir.toLowerCase();
      if (htmlDir === 'rtl' || htmlDir === 'ltr') {
        setDomDir(htmlDir as Direction);
        return;
      }
    }
  }, [propDir, context, elementRef]);

  if (propDir) {
    return propDir;
  }

  if (context?.dir) {
    return context.dir;
  }

  if (domDir) {
    return domDir;
  }

  return 'ltr';
}

/**
 * Returns true if the active reading/layout direction is RTL.
 */
export function useIsRtl(
  propDir?: Direction,
  elementRef?: React.RefObject<HTMLElement | null>
): boolean {
  return useDirection(propDir, elementRef) === 'rtl';
}

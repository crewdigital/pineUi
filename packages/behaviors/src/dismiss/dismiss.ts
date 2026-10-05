'use client';

import * as React from 'react';

export interface UseOutsideClickOptions {
  enabled?: boolean;
}

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutsideClick: (e: Event) => void,
  enabled: boolean = true
) {
  const callbackRef = React.useRef(onOutsideClick);
  React.useEffect(() => {
    callbackRef.current = onOutsideClick;
  });

  React.useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (ref.current && target && !ref.current.contains(target)) {
        callbackRef.current(e);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ref, enabled]);
}

export function useEscapeKey(
  onEscape: (e: KeyboardEvent) => void,
  enabled: boolean = true
) {
  const callbackRef = React.useRef(onEscape);
  React.useEffect(() => {
    callbackRef.current = onEscape;
  });

  React.useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callbackRef.current(e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled]);
}

export interface UseDismissOptions {
  onDismiss: () => void;
  enabled?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
}

export function useDismiss<T extends HTMLElement = HTMLElement>({
  onDismiss,
  enabled = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
}: UseDismissOptions) {
  const containerRef = React.useRef<T | null>(null);

  useOutsideClick(containerRef, onDismiss, enabled && closeOnOutsideClick);
  useEscapeKey(onDismiss, enabled && closeOnEscape);

  return containerRef;
}

'use client';

import * as React from 'react';

export interface UseFocusTrapOptions {
  /** Whether the focus trap is actively engaged */
  enabled?: boolean;
  /** Automatically focus the first focusable element inside trap on mount */
  autoFocus?: boolean;
  /** Restore focus to element active before trap was engaged on unmount */
  restoreFocus?: boolean;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter(
    (el) =>
      !el.hasAttribute('hidden') &&
      getComputedStyle(el).display !== 'none' &&
      getComputedStyle(el).visibility !== 'hidden'
  );
}

export function useFocusTrap<T extends HTMLElement = HTMLElement>({
  enabled = true,
  autoFocus = true,
  restoreFocus = true,
}: UseFocusTrapOptions = {}) {
  const containerRef = React.useRef<T | null>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!enabled) return;

    if (typeof document !== 'undefined') {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }

    const container = containerRef.current;
    if (!container) return;

    if (autoFocus) {
      const focusables = getFocusableElements(container);
      const autoFocusEl = container.querySelector<HTMLElement>('[data-autofocus]') ?? focusables[0];
      if (autoFocusEl) {
        requestAnimationFrame(() => {
          autoFocusEl.focus();
        });
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !containerRef.current) return;

      const focusables = getFocusableElements(containerRef.current);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const firstEl = focusables[0]!;
      const lastEl = focusables[focusables.length - 1]!;
      const activeEl = document.activeElement;

      if (e.shiftKey) {
        if (activeEl === firstEl || !containerRef.current.contains(activeEl)) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (activeEl === lastEl || !containerRef.current.contains(activeEl)) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [enabled, autoFocus, restoreFocus]);

  return containerRef;
}

'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface PortalProps {
  /** Target container element into which children are portaled (defaults to document.body) */
  container?: HTMLElement | null | undefined;
  children: React.ReactNode;
}

export function Portal({ container, children }: PortalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const targetContainer = container ?? (typeof document !== 'undefined' ? document.body : null);
  if (!targetContainer) return null;

  return ReactDOM.createPortal(children, targetContainer);
}

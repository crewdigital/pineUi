'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import { createScopedContext } from '@pine-ui/behaviors/create-scoped-context';
import { useControllableState } from '@pine-ui/behaviors/use-controllable-state';
import { useStableId } from '@pine-ui/behaviors/aria-linking';
import { useEscapeKey } from '@pine-ui/behaviors/dismiss';
import { useFocusTrap } from '@pine-ui/behaviors/focus-trap';
import { Portal } from '@pine-ui/behaviors/portal';

// ─── Types ───────────────────────────────────────────────────────────────────

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type PopoverAlign = 'start' | 'center' | 'end';

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Side relative to the trigger where popover appears (default: bottom) */
  side?: PopoverSide;
  /** Alignment along the side edge (default: center) */
  align?: PopoverAlign;
  /** Distance in pixels from the trigger (default: 8) */
  sideOffset?: number;
  /** Whether to trap keyboard focus within the popover (default: true) */
  trapFocus?: boolean;
  /** Whether to close when clicking outside (default: true) */
  closeOnOutsideClick?: boolean;
  /** Whether to close when pressing Escape (default: true) */
  closeOnEscape?: boolean;
  /** Whether to render inside a React Portal (default: false, renders relative to trigger) */
  portalled?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface PopoverContextValue {
  open: boolean;
  setOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  contentId: string;
}

const [PopoverProvider, usePopoverContext] =
  createScopedContext<PopoverContextValue>('Popover');

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'inline-flex',
  },
  content: {
    position: 'absolute',
    zIndex: 1000,
    minWidth: '220px',
    maxWidth: '360px',
    backgroundColor: vars.backgroundSurfaceRaised,
    color: vars.foregroundPrimary,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: vars.borderDefault,
    borderRadius: vars.radiusMd,
    boxShadow: vars.shadowLg,
    padding: vars.space4,
    outline: 'none',
    animationDuration: vars.motionDurationFast,
    animationTimingFunction: vars.motionEasingStandard,
  },
  sideBottom: {
    top: '100%',
  },
  sideTop: {
    bottom: '100%',
  },
  sideLeft: {
    right: '100%',
  },
  sideRight: {
    left: '100%',
  },
  alignStart: {
    left: 0,
  },
  alignCenter: {
    left: '50%',
    transform: 'translateX(-50%)',
  },
  alignEnd: {
    right: 0,
  },
  alignStartVertical: {
    top: 0,
  },
  alignCenterVertical: {
    top: '50%',
    transform: 'translateY(-50%)',
  },
  alignEndVertical: {
    bottom: 0,
  },
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    color: 'inherit',
    font: 'inherit',
  },
  close: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: vars.foregroundSecondary,
    transitionProperty: 'color',
    transitionDuration: vars.motionDurationFast,
    ':hover': {
      color: vars.foregroundPrimary,
    },
  },
});

// ─── Popover Root ────────────────────────────────────────────────────────────

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(
    {
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      styleX: styleXProp,
      children,
      ...restProps
    },
    ref
  ) {
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const contentId = useStableId();

    return (
      <PopoverProvider
        value={{
          open,
          setOpen,
          triggerRef,
          contentRef,
          contentId,
        }}
      >
        <div
          ref={ref}
          {...stylex.props(styles.root, styleXProp)}
          {...restProps}
        >
          {children}
        </div>
      </PopoverProvider>
    );
  }
);

Popover.displayName = 'Popover';

// ─── Popover Trigger ─────────────────────────────────────────────────────────

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger(
    { children, styleX: styleXProp, onClick, ...restProps },
    forwardedRef
  ) {
    const { open, setOpen, triggerRef, contentId } = usePopoverContext('PopoverTrigger');

    const handleRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [triggerRef, forwardedRef]
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      setOpen((prev) => !prev);
    };

    return (
      <button
        ref={handleRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        onClick={handleClick}
        {...stylex.props(styles.trigger, styleXProp)}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

// ─── Popover Content ─────────────────────────────────────────────────────────

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      side = 'bottom',
      align = 'center',
      sideOffset = 8,
      trapFocus = true,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      portalled = false,
      styleX: styleXProp,
      style: customStyle,
      children,
      ...restProps
    },
    forwardedRef
  ) {
    const { open, setOpen, triggerRef, contentRef, contentId } =
      usePopoverContext('PopoverContent');

    // Outside click dismissal ignoring trigger element
    React.useEffect(() => {
      if (!open || !closeOnOutsideClick) return;

      const handlePointerDown = (e: PointerEvent) => {
        const target = e.target as Node | null;
        if (!target) return;

        const isInsideContent = contentRef.current?.contains(target);
        const isInsideTrigger = triggerRef.current?.contains(target);

        if (!isInsideContent && !isInsideTrigger) {
          setOpen(false);
        }
      };

      document.addEventListener('pointerdown', handlePointerDown);
      return () => {
        document.removeEventListener('pointerdown', handlePointerDown);
      };
    }, [open, closeOnOutsideClick, contentRef, triggerRef, setOpen]);

    // Escape key dismissal
    useEscapeKey(() => setOpen(false), open && closeOnEscape);

    // Focus trap inside popover
    const trapContainerRef = useFocusTrap<HTMLDivElement>({
      enabled: open && trapFocus,
      autoFocus: true,
      restoreFocus: true,
    });

    const handleRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        trapContainerRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [contentRef, trapContainerRef, forwardedRef]
    );

    if (!open) return null;

    const sideStyle =
      side === 'bottom'
        ? styles.sideBottom
        : side === 'top'
        ? styles.sideTop
        : side === 'left'
        ? styles.sideLeft
        : styles.sideRight;

    const alignStyle =
      side === 'top' || side === 'bottom'
        ? align === 'start'
          ? styles.alignStart
          : align === 'end'
          ? styles.alignEnd
          : styles.alignCenter
        : align === 'start'
        ? styles.alignStartVertical
        : align === 'end'
        ? styles.alignEndVertical
        : styles.alignCenterVertical;

    const offsetStyle: React.CSSProperties =
      side === 'bottom'
        ? { marginTop: sideOffset }
        : side === 'top'
        ? { marginBottom: sideOffset }
        : side === 'left'
        ? { marginRight: sideOffset }
        : { marginLeft: sideOffset };

    const contentNode = (
      <div
        ref={handleRef}
        id={contentId}
        role="dialog"
        aria-modal={trapFocus ? 'true' : 'false'}
        tabIndex={-1}
        style={{
          ...offsetStyle,
          ...(customStyle as React.CSSProperties),
        }}
        {...stylex.props(styles.content, sideStyle, alignStyle, styleXProp)}
        {...restProps}
      >
        {children}
      </div>
    );

    if (portalled) {
      return <Portal>{contentNode}</Portal>;
    }

    return contentNode;
  }
);

PopoverContent.displayName = 'PopoverContent';

// ─── Popover Close ───────────────────────────────────────────────────────────

export const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  function PopoverClose({ children, styleX: styleXProp, onClick, ...restProps }, ref) {
    const { setOpen } = usePopoverContext('PopoverClose');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      setOpen(false);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        {...stylex.props(styles.close, styleXProp)}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

PopoverClose.displayName = 'PopoverClose';

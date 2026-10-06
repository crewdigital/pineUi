'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import { createScopedContext } from '@pine-ui/behaviors/create-scoped-context';
import { useControllableState } from '@pine-ui/behaviors/use-controllable-state';
import { useStableId } from '@pine-ui/behaviors/aria-linking';
import { useEscapeKey } from '@pine-ui/behaviors/dismiss';
import { Portal } from '@pine-ui/behaviors/portal';

// ─── Types ───────────────────────────────────────────────────────────────────

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Callback invoked when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Delay in milliseconds before showing the tooltip on hover (default: 200ms) */
  delayDuration?: number;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface TooltipTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Side relative to the trigger where tooltip appears (default: top) */
  side?: TooltipSide;
  /** Alignment along the side edge (default: center) */
  align?: TooltipAlign;
  /** Distance in pixels from the trigger (default: 6) */
  sideOffset?: number;
  /** Whether to render inside a React Portal (default: false, renders relative to trigger) */
  portalled?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface TooltipContextValue {
  open: boolean;
  setOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  contentId: string;
  delayDuration: number;
}

const [TooltipProvider, useTooltipContext] =
  createScopedContext<TooltipContextValue>('Tooltip');

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'inline-flex',
  },
  content: {
    position: 'absolute',
    zIndex: 1000,
    maxWidth: '280px',
    width: 'max-content',
    backgroundColor: vars.colorNeutral900,
    color: vars.colorNeutral50,
    fontSize: vars.fontSizeXs,
    fontWeight: vars.fontWeightMedium,
    lineHeight: vars.fontLineHeightSnug,
    paddingTop: vars.space1,
    paddingBottom: vars.space1,
    paddingLeft: vars.space2,
    paddingRight: vars.space2,
    borderRadius: vars.radiusSm,
    boxShadow: vars.shadowMd,
    pointerEvents: 'none',
    userSelect: 'none',
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: vars.colorNeutral800,
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
    insetInlineStart: 0,
  },
  alignCenter: {
    left: '50%',
    transform: 'translateX(-50%)',
  },
  alignEnd: {
    insetInlineEnd: 0,
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
});

// ─── Tooltip Root ────────────────────────────────────────────────────────────

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(
    {
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      delayDuration = 200,
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
    const contentId = useStableId();

    return (
      <TooltipProvider
        value={{
          open,
          setOpen,
          triggerRef,
          contentId,
          delayDuration,
        }}
      >
        <div
          ref={ref}
          {...stylex.props(styles.root, styleXProp)}
          {...restProps}
        >
          {children}
        </div>
      </TooltipProvider>
    );
  }
);

Tooltip.displayName = 'Tooltip';

// ─── Tooltip Trigger ─────────────────────────────────────────────────────────

export const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  function TooltipTrigger(
    {
      children,
      styleX: styleXProp,
      onPointerEnter,
      onPointerLeave,
      onFocus,
      onBlur,
      ...restProps
    },
    forwardedRef
  ) {
    const { open, setOpen, triggerRef, contentId, delayDuration } =
      useTooltipContext('TooltipTrigger');
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    // Merge internal triggerRef and external forwardedRef
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

    const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerEnter?.(e);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (delayDuration <= 0) {
        setOpen(true);
      } else {
        timerRef.current = setTimeout(() => {
          setOpen(true);
        }, delayDuration);
      }
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerLeave?.(e);
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpen(false);
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      onFocus?.(e);
      setOpen(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      onBlur?.(e);
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpen(false);
    };

    React.useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    return (
      <button
        ref={handleRef}
        type="button"
        aria-describedby={open ? contentId : undefined}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...stylex.props(styles.trigger, styleXProp)}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';

// ─── Tooltip Content ─────────────────────────────────────────────────────────

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(
    {
      side = 'top',
      align = 'center',
      sideOffset = 6,
      portalled = false,
      styleX: styleXProp,
      style: customStyle,
      children,
      ...restProps
    },
    forwardedRef
  ) {
    const { open, setOpen, contentId } = useTooltipContext('TooltipContent');
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    useEscapeKey(() => setOpen(false), open);

    const handleRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [forwardedRef]
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
        role="tooltip"
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

TooltipContent.displayName = 'TooltipContent';

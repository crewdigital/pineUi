'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import { Portal } from '@pine-ui/behaviors/portal';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

export interface ToastData {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  action?: React.ReactNode;
  onClose?: () => void;
}

export type ToastOptions = Omit<ToastData, 'id'> & {
  id?: string;
};

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  toast: ToastData;
  onDismiss: (id: string) => void;
  index?: number;
  total?: number;
  expanded?: boolean;
  position?: ToastPosition;
  styleX?: stylex.StyleXStyles;
}

export interface ToasterProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: ToastPosition;
  styleX?: stylex.StyleXStyles;
}

// ─── Toast Store (Module-level observer for imperative calls) ─────────────────

type ToastListener = (toasts: ToastData[]) => void;

let toastsState: ToastData[] = [];
const listeners = new Set<ToastListener>();

function notify() {
  listeners.forEach((listener) => listener([...toastsState]));
}

let counter = 0;
function generateId() {
  return `toast-${Date.now()}-${++counter}`;
}

export function dispatchToast(options: ToastOptions): string {
  const id = options.id ?? generateId();
  const newToast: ToastData = {
    id,
    variant: options.variant ?? 'default',
    duration: options.duration ?? 5000,
    ...options,
  };

  toastsState = [newToast, ...toastsState.filter((t) => t.id !== id)];
  notify();
  return id;
}

export function dismissToast(id: string) {
  const toastToRemove = toastsState.find((t) => t.id === id);
  toastToRemove?.onClose?.();
  toastsState = toastsState.filter((t) => t.id !== id);
  notify();
}

export function clearToasts() {
  toastsState.forEach((t) => t.onClose?.());
  toastsState = [];
  notify();
}

export const toast = Object.assign(
  (options: ToastOptions | string) => {
    if (typeof options === 'string') {
      return dispatchToast({ title: options });
    }
    return dispatchToast(options);
  },
  {
    success: (title: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
      dispatchToast({ ...options, title, variant: 'success' }),
    error: (title: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
      dispatchToast({ ...options, title, variant: 'error' }),
    warning: (title: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
      dispatchToast({ ...options, title, variant: 'warning' }),
    info: (title: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
      dispatchToast({ ...options, title, variant: 'info' }),
    dismiss: dismissToast,
    clear: clearToasts,
  }
);

// ─── useToast Hook ───────────────────────────────────────────────────────────

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastData[]>(toastsState);

  React.useEffect(() => {
    listeners.add(setToasts);
    return () => {
      listeners.delete(setToasts);
    };
  }, []);

  return {
    toasts,
    toast,
    dismiss: dismissToast,
    clear: clearToasts,
  };
}

// ─── Keyframes ───────────────────────────────────────────────────────────────

const progressKeyframes = stylex.keyframes({
  '0%': { transform: 'scaleX(1)' },
  '100%': { transform: 'scaleX(0)' },
});

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  viewport: {
    position: 'fixed',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space2,
    maxWidth: '420px',
    width: '100%',
    padding: vars.space4,
    pointerEvents: 'none',
    boxSizing: 'border-box',
  },
  posTopRight: {
    top: 0,
    right: 0,
  },
  posTopLeft: {
    top: 0,
    left: 0,
  },
  posTopCenter: {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  posBottomRight: {
    bottom: 0,
    right: 0,
  },
  posBottomLeft: {
    bottom: 0,
    left: 0,
  },
  posBottomCenter: {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  toast: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: vars.space3,
    padding: vars.space4,
    backgroundColor: vars.backgroundSurfaceRaised,
    color: vars.foregroundPrimary,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: vars.borderDefault,
    borderRadius: vars.radiusMd,
    boxShadow: vars.shadowLg,
    pointerEvents: 'auto',
    position: 'relative',
    overflow: 'hidden',
    touchAction: 'pan-y',
    userSelect: 'none',
    boxSizing: 'border-box',
    width: '100%',
  },
  toastSuccess: {
    borderLeftWidth: '4px',
    borderLeftColor: 'var(--pine-color-green-500, #22c55e)',
  },
  toastError: {
    borderLeftWidth: '4px',
    borderLeftColor: 'var(--pine-color-red-500, #ef4444)',
  },
  toastWarning: {
    borderLeftWidth: '4px',
    borderLeftColor: 'var(--pine-color-yellow-500, #eab308)',
  },
  toastInfo: {
    borderLeftWidth: '4px',
    borderLeftColor: 'var(--pine-color-blue-500, #3b82f6)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space1,
    flex: 1,
  },
  title: {
    fontSize: vars.fontSizeSm,
    fontWeight: vars.fontWeightSemibold,
    lineHeight: vars.fontLineHeightTight,
    color: vars.foregroundPrimary,
    margin: 0,
  },
  description: {
    fontSize: vars.fontSizeSm,
    color: vars.foregroundSecondary,
    lineHeight: vars.fontLineHeightNormal,
    margin: 0,
  },
  action: {
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: vars.space2,
  },
  closeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: vars.foregroundSecondary,
    borderRadius: vars.radiusSm,
    outline: 'none',
    transitionProperty: 'color',
    transitionDuration: vars.motionDurationFast,
    ':hover': {
      color: vars.foregroundPrimary,
    },
    ':focus-visible': {
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '2px',
    width: '100%',
    backgroundColor: vars.actionPrimaryBackground,
    transformOrigin: 'left',
    animationName: progressKeyframes,
    animationTimingFunction: 'linear',
    animationFillMode: 'forwards',
  },
});

// ─── Toast Item Component ────────────────────────────────────────────────────

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  function Toast(
    {
      toast: toastItem,
      onDismiss,
      index = 0,
      total = 1,
      expanded = false,
      position = 'bottom-right',
      styleX: styleXProp,
      style: customStyle,
      ...restProps
    },
    ref
  ) {
    const { id, title, description, variant = 'default', duration = 5000, action } = toastItem;

    const [isPaused, setIsPaused] = React.useState(false);
    const [dragX, setDragX] = React.useState(0);
    const startXRef = React.useRef<number | null>(null);

    React.useEffect(() => {
      if (duration <= 0 || duration === Infinity || isPaused) return;

      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);

      return () => clearTimeout(timer);
    }, [id, duration, isPaused, onDismiss]);

    const handleDragStart = (clientX: number, target: EventTarget | null) => {
      if ((target as HTMLElement)?.closest?.('button, a')) return;
      startXRef.current = clientX;
    };

    const handleDragMove = (clientX: number) => {
      if (startXRef.current === null) return;
      setDragX(clientX - startXRef.current);
    };

    const handleDragEnd = (clientX: number) => {
      const delta = startXRef.current !== null ? clientX - startXRef.current : dragX;
      startXRef.current = null;
      if (Math.abs(delta) > 80 || Math.abs(dragX) > 80) {
        onDismiss(id);
      } else {
        setDragX(0);
      }
    };

    const isTop = position.startsWith('top');
    const stackY = !expanded && index > 0 ? (isTop ? index * 8 : -index * 8) : 0;
    const stackScale = !expanded && index > 0 ? Math.max(0.88, 1 - index * 0.05) : 1;
    const stackOpacity = !expanded && index > 2 ? 0 : !expanded && index > 0 ? Math.max(0.5, 1 - index * 0.15) : 1;
    const stackZ = total - index;

    const dynamicTransform = `translateX(${dragX}px) translateY(${stackY}px) scale(${stackScale})`;

    const variantStyle =
      variant === 'success'
        ? styles.toastSuccess
        : variant === 'error'
        ? styles.toastError
        : variant === 'warning'
        ? styles.toastWarning
        : variant === 'info'
        ? styles.toastInfo
        : undefined;

    return (
      <div
        ref={ref}
        role={variant === 'error' ? 'alert' : 'status'}
        aria-live={variant === 'error' ? 'assertive' : 'polite'}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onPointerDown={(e) => handleDragStart(e.clientX ?? 0, e.target)}
        onPointerMove={(e) => handleDragMove(e.clientX ?? 0)}
        onPointerUp={(e) => handleDragEnd(e.clientX ?? 0)}
        onPointerCancel={() => {
          startXRef.current = null;
          setDragX(0);
        }}
        onTouchStart={(e) => {
          if (e.touches[0]) handleDragStart(e.touches[0].clientX, e.target);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) handleDragMove(e.touches[0].clientX);
        }}
        onTouchEnd={(e) => {
          if (e.changedTouches[0]) handleDragEnd(e.changedTouches[0].clientX);
        }}
        style={{
          transform: dynamicTransform,
          opacity: stackOpacity,
          zIndex: stackZ,
          transition:
            dragX === 0
              ? 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease'
              : 'none',
          pointerEvents: !expanded && index > 0 ? 'none' : 'auto',
          ...(customStyle as React.CSSProperties),
        }}
        {...stylex.props(styles.toast, variantStyle, styleXProp)}
        {...restProps}
      >
        <div {...stylex.props(styles.content)}>
          {title && <div {...stylex.props(styles.title)}>{title}</div>}
          {description && <div {...stylex.props(styles.description)}>{description}</div>}
          {action && <div {...stylex.props(styles.action)}>{action}</div>}
        </div>
        <button
          type="button"
          aria-label="Close notification"
          onClick={() => onDismiss(id)}
          {...stylex.props(styles.closeBtn)}
        >
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {duration > 0 && duration !== Infinity && (
          <div
            data-testid="toast-progress"
            aria-hidden="true"
            style={{
              animationDuration: `${duration}ms`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            {...stylex.props(styles.progressBar)}
          />
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// ─── Toaster Viewport Component ──────────────────────────────────────────────

export const Toaster = React.forwardRef<HTMLDivElement, ToasterProps>(
  function Toaster(
    { position = 'bottom-right', styleX: styleXProp, ...restProps },
    ref
  ) {
    const { toasts, dismiss } = useToast();
    const [expanded, setExpanded] = React.useState(false);

    if (toasts.length === 0) return null;

    const positionStyle =
      position === 'top-left'
        ? styles.posTopLeft
        : position === 'top-center'
        ? styles.posTopCenter
        : position === 'top-right'
        ? styles.posTopRight
        : position === 'bottom-left'
        ? styles.posBottomLeft
        : position === 'bottom-center'
        ? styles.posBottomCenter
        : styles.posBottomRight;

    return (
      <Portal>
        <div
          ref={ref}
          role="region"
          aria-label="Notifications"
          tabIndex={-1}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          onFocus={() => setExpanded(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setExpanded(false);
            }
          }}
          {...stylex.props(styles.viewport, positionStyle, styleXProp)}
          {...restProps}
        >
          {toasts.map((toastItem, index) => (
            <Toast
              key={toastItem.id}
              toast={toastItem}
              onDismiss={dismiss}
              index={index}
              total={toasts.length}
              expanded={expanded}
              position={position}
            />
          ))}
        </div>
      </Portal>
    );
  }
);

Toaster.displayName = 'Toaster';

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
import { useIsRtl } from '@pine-ui/behaviors/direction';

// ─── Types ───────────────────────────────────────────────────────────────────

export type DrawerSide = 'top' | 'right' | 'bottom' | 'left' | 'start' | 'end';

export interface DrawerProps {
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DrawerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface DrawerPortalProps {
  /** Target HTML element container for the portal */
  container?: HTMLElement | null | undefined;
  children: React.ReactNode;
}

export interface DrawerOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface DrawerContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Which side the drawer slides in from (default: right) */
  side?: DrawerSide;
  /** Whether pressing the Escape key dismisses the drawer (default: true) */
  closeOnEscape?: boolean;
  /** Whether clicking the overlay backdrop dismisses the drawer (default: true) */
  closeOnOverlayClick?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface DrawerTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface DrawerDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface DrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface DrawerCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface DrawerContextValue {
  open: boolean;
  setOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  contentId: string;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  setHasTitle: (has: boolean) => void;
  hasDescription: boolean;
  setHasDescription: (has: boolean) => void;
}

const [DrawerProvider, useDrawerContext] =
  createScopedContext<DrawerContextValue>('Drawer');

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(12px) saturate(180%)',
    transitionProperty: 'opacity',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
  },
  content: {
    position: 'fixed',
    zIndex: 1000,
    backgroundColor: vars.backgroundSurfaceRaised,
    color: vars.foregroundPrimary,
    boxShadow: vars.shadowLg,
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    transitionProperty: 'transform',
    transitionDuration: vars.motionDurationNormal,
    transitionTimingFunction: vars.motionEasingStandard,
  },
  sideRight: {
    top: 0,
    right: 0,
    bottom: 0,
    width: '400px',
    maxWidth: '100vw',
    borderLeftWidth: vars.borderWidth1,
    borderLeftStyle: 'solid',
    borderLeftColor: vars.borderDefault,
  },
  sideLeft: {
    top: 0,
    left: 0,
    bottom: 0,
    width: '400px',
    maxWidth: '100vw',
    borderRightWidth: vars.borderWidth1,
    borderRightStyle: 'solid',
    borderRightColor: vars.borderDefault,
  },
  sideTop: {
    top: 0,
    left: 0,
    right: 0,
    height: '320px',
    maxHeight: '100vh',
    borderBottomWidth: vars.borderWidth1,
    borderBottomStyle: 'solid',
    borderBottomColor: vars.borderDefault,
  },
  sideBottom: {
    bottom: 0,
    left: 0,
    right: 0,
    height: '320px',
    maxHeight: '100vh',
    borderTopWidth: vars.borderWidth1,
    borderTopStyle: 'solid',
    borderTopColor: vars.borderDefault,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space1,
    padding: vars.space6,
    borderBottomWidth: vars.borderWidth1,
    borderBottomStyle: 'solid',
    borderBottomColor: vars.borderDefault,
  },
  title: {
    fontSize: vars.fontSizeLg,
    fontWeight: vars.fontWeightSemibold,
    lineHeight: vars.fontLineHeightTight,
    color: vars.foregroundPrimary,
    margin: 0,
  },
  description: {
    fontSize: vars.fontSizeSm,
    color: vars.foregroundSecondary,
    margin: 0,
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: vars.space6,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: vars.space2,
    padding: vars.space6,
    borderTopWidth: vars.borderWidth1,
    borderTopStyle: 'solid',
    borderTopColor: vars.borderDefault,
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

// ─── Drawer Root ─────────────────────────────────────────────────────────────

export function Drawer({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}: DrawerProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const contentId = useStableId();
  const titleId = useStableId();
  const descriptionId = useStableId();

  const [hasTitle, setHasTitle] = React.useState(false);
  const [hasDescription, setHasDescription] = React.useState(false);

  return (
    <DrawerProvider
      value={{
        open,
        setOpen,
        triggerRef,
        contentId,
        titleId,
        descriptionId,
        hasTitle,
        setHasTitle,
        hasDescription,
        setHasDescription,
      }}
    >
      {children}
    </DrawerProvider>
  );
}

Drawer.displayName = 'Drawer';

// ─── Drawer Trigger ──────────────────────────────────────────────────────────

export const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  function DrawerTrigger(
    { children, styleX: styleXProp, onClick, ...restProps },
    forwardedRef
  ) {
    const { open, setOpen, triggerRef, contentId } = useDrawerContext('DrawerTrigger');

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

DrawerTrigger.displayName = 'DrawerTrigger';

// ─── Drawer Portal ───────────────────────────────────────────────────────────

export function DrawerPortal({
  container,
  children,
}: DrawerPortalProps) {
  const { open } = useDrawerContext('DrawerPortal');
  if (!open) return null;

  return <Portal container={container}>{children}</Portal>;
}

DrawerPortal.displayName = 'DrawerPortal';

// ─── Drawer Overlay ──────────────────────────────────────────────────────────

export const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  function DrawerOverlay(
    { styleX: styleXProp, onClick, ...restProps },
    ref
  ) {
    const { setOpen } = useDrawerContext('DrawerOverlay');

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      setOpen(false);
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        onClick={handleClick}
        {...stylex.props(styles.overlay, styleXProp)}
        {...restProps}
      />
    );
  }
);

DrawerOverlay.displayName = 'DrawerOverlay';

// ─── Drawer Content ──────────────────────────────────────────────────────────

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent(
    {
      side = 'right',
      closeOnEscape = true,
      closeOnOverlayClick = true,
      styleX: styleXProp,
      children,
      ...restProps
    },
    forwardedRef
  ) {
    const {
      open,
      setOpen,
      triggerRef,
      contentId,
      titleId,
      descriptionId,
      hasTitle,
      hasDescription,
    } = useDrawerContext('DrawerContent');

    const trapContainerRef = useFocusTrap<HTMLDivElement>({
      enabled: open,
      autoFocus: true,
      restoreFocus: true,
    });

    useEscapeKey(() => {
      setOpen(false);
      triggerRef.current?.focus();
    }, open && closeOnEscape);

    // Body scroll lock
    React.useEffect(() => {
      if (!open) return;
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }, [open]);

    const handleRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        trapContainerRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [trapContainerRef, forwardedRef]
    );

    const isRtl = useIsRtl(undefined, trapContainerRef);

    const resolvedSide = React.useMemo(() => {
      if (side === 'start') return isRtl ? 'right' : 'left';
      if (side === 'end') return isRtl ? 'left' : 'right';
      return side;
    }, [side, isRtl]);

    const sideStyle =
      resolvedSide === 'left'
        ? styles.sideLeft
        : resolvedSide === 'top'
        ? styles.sideTop
        : resolvedSide === 'bottom'
        ? styles.sideBottom
        : styles.sideRight;

    return (
      <>
        {closeOnOverlayClick && <DrawerOverlay />}
        <div
          ref={handleRef}
          id={contentId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={hasTitle ? titleId : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          tabIndex={-1}
          {...stylex.props(styles.content, sideStyle, styleXProp)}
          {...restProps}
        >
          {children}
        </div>
      </>
    );
  }
);

DrawerContent.displayName = 'DrawerContent';

// ─── Drawer Header ───────────────────────────────────────────────────────────

export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeader({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        {...stylex.props(styles.header, styleXProp)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

// ─── Drawer Title ────────────────────────────────────────────────────────────

export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function DrawerTitle({ styleX: styleXProp, children, ...restProps }, ref) {
    const { titleId, setHasTitle } = useDrawerContext('DrawerTitle');

    React.useEffect(() => {
      setHasTitle(true);
      return () => setHasTitle(false);
    }, [setHasTitle]);

    return (
      <h2
        ref={ref}
        id={titleId}
        {...stylex.props(styles.title, styleXProp)}
        {...restProps}
      >
        {children}
      </h2>
    );
  }
);

DrawerTitle.displayName = 'DrawerTitle';

// ─── Drawer Description ──────────────────────────────────────────────────────

export const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  function DrawerDescription({ styleX: styleXProp, children, ...restProps }, ref) {
    const { descriptionId, setHasDescription } = useDrawerContext('DrawerDescription');

    React.useEffect(() => {
      setHasDescription(true);
      return () => setHasDescription(false);
    }, [setHasDescription]);

    return (
      <p
        ref={ref}
        id={descriptionId}
        {...stylex.props(styles.description, styleXProp)}
        {...restProps}
      >
        {children}
      </p>
    );
  }
);

DrawerDescription.displayName = 'DrawerDescription';

// ─── Drawer Body ─────────────────────────────────────────────────────────────

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  function DrawerBody({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        {...stylex.props(styles.body, styleXProp)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';

// ─── Drawer Footer ───────────────────────────────────────────────────────────

export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  function DrawerFooter({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        {...stylex.props(styles.footer, styleXProp)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = 'DrawerFooter';

// ─── Drawer Close ────────────────────────────────────────────────────────────

export const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  function DrawerClose(
    { children, styleX: styleXProp, onClick, ...restProps },
    ref
  ) {
    const { setOpen, triggerRef } = useDrawerContext('DrawerClose');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      setOpen(false);
      triggerRef.current?.focus();
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

DrawerClose.displayName = 'DrawerClose';

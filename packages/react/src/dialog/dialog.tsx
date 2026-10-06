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

export interface DialogProps {
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface DialogPortalProps {
  /** Target HTML element container for the portal */
  container?: HTMLElement | null | undefined;
  children: React.ReactNode;
}

export interface DialogOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether pressing the Escape key dismisses the dialog (default: true) */
  closeOnEscape?: boolean;
  /** Whether clicking the overlay backdrop dismisses the dialog (default: true) */
  closeOnOverlayClick?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface DialogContextValue {
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

const [DialogProvider, useDialogContext] =
  createScopedContext<DialogContextValue>('Dialog');

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(12px) saturate(180%)',
    animationDuration: vars.motionDurationFast,
    animationTimingFunction: vars.motionEasingStandard,
  },
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    width: '90vw',
    maxWidth: '520px',
    maxHeight: '85vh',
    overflowY: 'auto',
    backgroundColor: vars.backgroundSurfaceRaised,
    color: vars.foregroundPrimary,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: vars.borderDefault,
    borderRadius: vars.radiusLg,
    boxShadow: vars.shadow2xl,
    padding: vars.space6,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space4,
    animationDuration: vars.motionDurationFast,
    animationTimingFunction: vars.motionEasingStandard,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space1,
  },
  title: {
    margin: 0,
    fontSize: vars.fontSizeLg,
    fontWeight: vars.fontWeightSemibold,
    lineHeight: vars.fontLineHeightTight,
    color: vars.foregroundPrimary,
  },
  description: {
    margin: 0,
    fontSize: vars.fontSizeSm,
    lineHeight: vars.fontLineHeightNormal,
    color: vars.foregroundSecondary,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: vars.space2,
    marginTop: vars.space2,
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

// ─── Dialog Root ─────────────────────────────────────────────────────────────

export function Dialog({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
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

  // Body scroll locking when dialog is active
  React.useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <DialogProvider
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
    </DialogProvider>
  );
}

Dialog.displayName = 'Dialog';

// ─── Dialog Trigger ──────────────────────────────────────────────────────────

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger(
    { children, styleX: styleXProp, onClick, ...restProps },
    forwardedRef
  ) {
    const { open, setOpen, triggerRef, contentId } = useDialogContext('DialogTrigger');

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
      setOpen(true);
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

DialogTrigger.displayName = 'DialogTrigger';

// ─── Dialog Portal ───────────────────────────────────────────────────────────

export function DialogPortal({ container, children }: DialogPortalProps) {
  const { open } = useDialogContext('DialogPortal');
  if (!open) return null;
  return <Portal container={container}>{children}</Portal>;
}

DialogPortal.displayName = 'DialogPortal';

// ─── Dialog Overlay ──────────────────────────────────────────────────────────

export const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  function DialogOverlay({ styleX: styleXProp, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        {...stylex.props(styles.overlay, styleXProp)}
        {...restProps}
      />
    );
  }
);

DialogOverlay.displayName = 'DialogOverlay';

// ─── Dialog Content ──────────────────────────────────────────────────────────

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(
    {
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
      contentId,
      titleId,
      descriptionId,
      hasTitle,
      hasDescription,
    } = useDialogContext('DialogContent');

    const contentRef = React.useRef<HTMLDivElement | null>(null);

    // Escape key dismissal
    useEscapeKey(() => setOpen(false), open && closeOnEscape);

    // Focus trap
    const trapContainerRef = useFocusTrap<HTMLDivElement>({
      enabled: open,
      autoFocus: true,
      restoreFocus: true,
    });

    // Overlay backdrop click handler
    React.useEffect(() => {
      if (!open || !closeOnOverlayClick) return;

      const handlePointerDown = (e: PointerEvent) => {
        const target = e.target as Node | null;
        if (contentRef.current && target && !contentRef.current.contains(target)) {
          setOpen(false);
        }
      };

      document.addEventListener('pointerdown', handlePointerDown);
      return () => {
        document.removeEventListener('pointerdown', handlePointerDown);
      };
    }, [open, closeOnOverlayClick, setOpen]);

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
      [trapContainerRef, forwardedRef]
    );

    return (
      <div
        ref={handleRef}
        id={contentId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-describedby={hasDescription ? descriptionId : undefined}
        tabIndex={-1}
        {...stylex.props(styles.content, styleXProp)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

DialogContent.displayName = 'DialogContent';

// ─── Dialog Header, Title, Description, Footer, Close ────────────────────────

export function DialogHeader({ styleX: styleXProp, children, ...restProps }: DialogHeaderProps) {
  return (
    <div {...stylex.props(styles.header, styleXProp)} {...restProps}>
      {children}
    </div>
  );
}

DialogHeader.displayName = 'DialogHeader';

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle({ styleX: styleXProp, children, ...restProps }, ref) {
    const { titleId, setHasTitle } = useDialogContext('DialogTitle');

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

DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  function DialogDescription({ styleX: styleXProp, children, ...restProps }, ref) {
    const { descriptionId, setHasDescription } = useDialogContext('DialogDescription');

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

DialogDescription.displayName = 'DialogDescription';

export function DialogFooter({ styleX: styleXProp, children, ...restProps }: DialogFooterProps) {
  return (
    <div {...stylex.props(styles.footer, styleXProp)} {...restProps}>
      {children}
    </div>
  );
}

DialogFooter.displayName = 'DialogFooter';

export const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  function DialogClose({ children, styleX: styleXProp, onClick, ...restProps }, ref) {
    const { setOpen } = useDialogContext('DialogClose');

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

DialogClose.displayName = 'DialogClose';

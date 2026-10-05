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

export type MenuSide = 'top' | 'right' | 'bottom' | 'left';
export type MenuAlign = 'start' | 'center' | 'end';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
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

export interface MenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface MenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Side relative to the trigger where menu appears (default: bottom) */
  side?: MenuSide;
  /** Alignment along the side edge (default: start) */
  align?: MenuAlign;
  /** Distance in pixels from the trigger (default: 4) */
  sideOffset?: number;
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

export interface MenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Callback fired when the item is selected */
  onSelect?: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether selecting the item should keep the menu open */
  closeOnSelect?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface MenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface MenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface MenuContextValue {
  open: boolean;
  setOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  contentId: string;
  focusFirstOnOpen: React.MutableRefObject<boolean>;
  focusLastOnOpen: React.MutableRefObject<boolean>;
}

const [MenuProvider, useMenuContext] =
  createScopedContext<MenuContextValue>('Menu');

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'inline-flex',
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
  content: {
    position: 'absolute',
    zIndex: 1000,
    minWidth: '180px',
    maxWidth: '320px',
    backgroundColor: vars.backgroundSurfaceRaised,
    color: vars.foregroundPrimary,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: vars.borderDefault,
    borderRadius: vars.radiusMd,
    boxShadow: vars.shadowLg,
    padding: vars.space1,
    outline: 'none',
    userSelect: 'none',
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
  item: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: vars.space3,
    paddingRight: vars.space3,
    paddingTop: vars.space2,
    paddingBottom: vars.space2,
    fontSize: vars.fontSizeSm,
    fontWeight: vars.fontWeightRegular,
    color: vars.foregroundPrimary,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: vars.radiusSm,
    cursor: 'pointer',
    textAlign: 'left',
    outline: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    ':hover': {
      backgroundColor: vars.actionSecondaryBackgroundHover,
    },
    ':focus-visible': {
      backgroundColor: vars.actionSecondaryBackgroundActive,
    },
  },
  itemActive: {
    backgroundColor: vars.actionSecondaryBackgroundHover,
  },
  itemDisabled: {
    opacity: vars.opacity50,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    paddingLeft: vars.space3,
    paddingRight: vars.space3,
    paddingTop: vars.space2,
    paddingBottom: vars.space1,
    fontSize: vars.fontSizeXs,
    fontWeight: vars.fontWeightSemibold,
    color: vars.foregroundSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  separator: {
    height: '1px',
    backgroundColor: vars.borderDefault,
    marginTop: vars.space1,
    marginBottom: vars.space1,
    marginLeft: vars.space1,
    marginRight: vars.space1,
  },
  shortcut: {
    marginLeft: 'auto',
    paddingLeft: vars.space4,
    fontSize: vars.fontSizeXs,
    color: vars.foregroundSecondary,
    letterSpacing: '0.1em',
  },
});

// ─── Menu Root ───────────────────────────────────────────────────────────────

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  function Menu(
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
    const focusFirstOnOpen = React.useRef(true);
    const focusLastOnOpen = React.useRef(false);

    return (
      <MenuProvider
        value={{
          open,
          setOpen,
          triggerRef,
          contentRef,
          contentId,
          focusFirstOnOpen,
          focusLastOnOpen,
        }}
      >
        <div
          ref={ref}
          {...stylex.props(styles.root, styleXProp)}
          {...restProps}
        >
          {children}
        </div>
      </MenuProvider>
    );
  }
);

Menu.displayName = 'Menu';

// ─── Menu Trigger ────────────────────────────────────────────────────────────

export const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  function MenuTrigger(
    { children, styleX: styleXProp, onClick, onKeyDown, ...restProps },
    forwardedRef
  ) {
    const {
      open,
      setOpen,
      triggerRef,
      contentId,
      focusFirstOnOpen,
      focusLastOnOpen,
    } = useMenuContext('MenuTrigger');

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
      focusFirstOnOpen.current = true;
      focusLastOnOpen.current = false;
      setOpen((prev) => !prev);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        focusFirstOnOpen.current = true;
        focusLastOnOpen.current = false;
        setOpen(true);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusFirstOnOpen.current = false;
        focusLastOnOpen.current = true;
        setOpen(true);
      }
    };

    return (
      <button
        ref={handleRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...stylex.props(styles.trigger, styleXProp)}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

MenuTrigger.displayName = 'MenuTrigger';

// ─── Menu Content ────────────────────────────────────────────────────────────

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(
    {
      side = 'bottom',
      align = 'start',
      sideOffset = 4,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      portalled = false,
      styleX: styleXProp,
      style: customStyle,
      children,
      onKeyDown,
      ...restProps
    },
    forwardedRef
  ) {
    const {
      open,
      setOpen,
      triggerRef,
      contentRef,
      contentId,
      focusFirstOnOpen,
      focusLastOnOpen,
    } = useMenuContext('MenuContent');

    // Close on outside click
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

    // Close on Escape
    useEscapeKey(() => {
      setOpen(false);
      triggerRef.current?.focus();
    }, open && closeOnEscape);

    // Helper: get all focusable menu items
    const getMenuItems = React.useCallback(() => {
      if (!contentRef.current) return [];
      return Array.from(
        contentRef.current.querySelectorAll<HTMLButtonElement>(
          '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])'
        )
      );
    }, [contentRef]);

    // Auto-focus first/last item on open
    React.useEffect(() => {
      if (!open) return;
      const frame = requestAnimationFrame(() => {
        const items = getMenuItems();
        if (items.length === 0) return;
        if (focusLastOnOpen.current) {
          items[items.length - 1]?.focus();
        } else {
          items[0]?.focus();
        }
      });
      return () => cancelAnimationFrame(frame);
    }, [open, getMenuItems, focusLastOnOpen]);

    // Handle keyboard navigation between items
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);

      const items = getMenuItems();
      if (items.length === 0) return;

      const currentIndex = items.findIndex((item) => item === document.activeElement);

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          items[nextIndex]?.focus();
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          items[prevIndex]?.focus();
          break;
        }
        case 'Home': {
          e.preventDefault();
          items[0]?.focus();
          break;
        }
        case 'End': {
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;
        }
        case 'Tab': {
          setOpen(false);
          break;
        }
      }
    };

    const handleRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [contentRef, forwardedRef]
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
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
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

MenuContent.displayName = 'MenuContent';

// ─── Menu Item ───────────────────────────────────────────────────────────────

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  function MenuItem(
    {
      onSelect,
      disabled = false,
      closeOnSelect = true,
      styleX: styleXProp,
      onClick,
      onKeyDown,
      children,
      ...restProps
    },
    ref
  ) {
    const { setOpen, triggerRef } = useMenuContext('MenuItem');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      onSelect?.(e);
      onClick?.(e);

      if (closeOnSelect && !e.defaultPrevented) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.(e);
        if (closeOnSelect && !e.defaultPrevented) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        tabIndex={-1}
        disabled={disabled}
        aria-disabled={disabled ? 'true' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...stylex.props(
          styles.item,
          disabled && styles.itemDisabled,
          styleXProp
        )}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

MenuItem.displayName = 'MenuItem';

// ─── Menu Group ──────────────────────────────────────────────────────────────

export const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  function MenuGroup({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        {...stylex.props(styles.group, styleXProp)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

MenuGroup.displayName = 'MenuGroup';

// ─── Menu Label ──────────────────────────────────────────────────────────────

export const MenuLabel = React.forwardRef<HTMLDivElement, MenuLabelProps>(
  function MenuLabel({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        {...stylex.props(styles.label, styleXProp)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

MenuLabel.displayName = 'MenuLabel';

// ─── Menu Separator ──────────────────────────────────────────────────────────

export const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  function MenuSeparator({ styleX: styleXProp, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        {...stylex.props(styles.separator, styleXProp)}
        {...restProps}
      />
    );
  }
);

MenuSeparator.displayName = 'MenuSeparator';

// ─── Menu Shortcut ───────────────────────────────────────────────────────────

export const MenuShortcut = React.forwardRef<HTMLSpanElement, MenuShortcutProps>(
  function MenuShortcut({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <span
        ref={ref}
        {...stylex.props(styles.shortcut, styleXProp)}
        {...restProps}
      >
        {children}
      </span>
    );
  }
);

MenuShortcut.displayName = 'MenuShortcut';

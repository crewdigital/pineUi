'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import { createScopedContext } from '@pine-ui/behaviors/create-scoped-context';
import { useControllableState } from '@pine-ui/behaviors/use-controllable-state';
import { useStableId } from '@pine-ui/behaviors/aria-linking';
import { useEscapeKey } from '@pine-ui/behaviors/dismiss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled selected value */
  value?: string;
  /** Default selected value in uncontrolled mode */
  defaultValue?: string;
  /** Callback fired when selected value changes */
  onValueChange?: (value: string) => void;
  /** Whether multiple options can be selected */
  multiple?: boolean;
  /** Controlled selected values in multiple mode */
  values?: string[];
  /** Default selected values in multiple mode */
  defaultValues?: string[];
  /** Callback fired when selected values change in multiple mode */
  onValuesChange?: (values: string[]) => void;
  /** Controlled open state */
  open?: boolean;
  /** Default open state in uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Form input name for native form submission */
  name?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children?: React.ReactNode;
}

export interface SelectValueProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface SelectContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Distance in pixels below the trigger (default: 4) */
  sideOffset?: number;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface SelectItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Value of the item */
  value: string;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface SelectGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface SelectLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface SelectSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface SelectContextValue {
  value: string;
  setValue: (value: string) => void;
  multiple: boolean;
  values: string[];
  setValues: (values: string[]) => void;
  toggleValue: (val: string) => void;
  open: boolean;
  setOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  contentId: string;
  disabled: boolean;
  selectedLabel: React.ReactNode;
  setSelectedLabel: (label: React.ReactNode) => void;
  optionsMap: React.MutableRefObject<Map<string, React.ReactNode>>;
  registerOption: (val: string, label: React.ReactNode) => void;
  unregisterOption: (val: string) => void;
}

const [SelectProvider, useSelectContext] =
  createScopedContext<SelectContextValue>('Select');

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'inline-flex',
    width: '100%',
  },
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '38px',
    paddingInlineStart: vars.space3,
    paddingInlineEnd: vars.space3,
    paddingTop: vars.space2,
    paddingBottom: vars.space2,
    fontSize: vars.fontSizeSm,
    fontWeight: vars.fontWeightRegular,
    color: vars.foregroundPrimary,
    backgroundColor: vars.backgroundSurfaceRaised,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: vars.borderDefault,
    borderRadius: vars.radiusMd,
    outline: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    ':hover': {
      borderColor: vars.borderStrong,
    },
    ':focus-visible': {
      borderColor: vars.borderFocus,
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },
  triggerDisabled: {
    opacity: vars.opacity50,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  value: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  placeholder: {
    color: vars.foregroundSecondary,
  },
  icon: {
    marginInlineStart: vars.space2,
    flexShrink: 0,
    color: vars.foregroundSecondary,
  },
  content: {
    position: 'absolute',
    top: '100%',
    insetInlineStart: 0,
    zIndex: 1000,
    minWidth: '100%',
    maxHeight: '260px',
    overflowY: 'auto',
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
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingInlineStart: vars.space3,
    paddingInlineEnd: vars.space3,
    paddingTop: vars.space2,
    paddingBottom: vars.space2,
    fontSize: vars.fontSizeSm,
    color: vars.foregroundPrimary,
    backgroundColor: 'transparent',
    borderRadius: vars.radiusSm,
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    transitionProperty: 'background-color, color',
    transitionDuration: vars.motionDurationFast,
    ':hover': {
      backgroundColor: vars.actionSecondaryBackgroundHover,
    },
    ':focus-visible': {
      backgroundColor: vars.actionSecondaryBackgroundActive,
    },
  },
  itemSelected: {
    backgroundColor: vars.actionSecondaryBackgroundActive,
    fontWeight: vars.fontWeightSemibold,
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
    paddingInlineStart: vars.space3,
    paddingInlineEnd: vars.space3,
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
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: vars.space1,
    alignItems: 'center',
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space1,
    paddingInlineStart: vars.space2,
    paddingInlineEnd: vars.space1,
    paddingTop: '2px',
    paddingBottom: '2px',
    borderRadius: vars.radiusSm,
    backgroundColor: vars.actionSecondaryBackground,
    color: vars.foregroundPrimary,
    fontSize: vars.fontSizeXs,
    fontWeight: vars.fontWeightMedium,
    lineHeight: 1,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: vars.borderDefault,
  },
  chipRemoveButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    color: vars.foregroundMuted,
    borderRadius: vars.radiusFull,
    width: '14px',
    height: '14px',
    lineHeight: 1,
    fontSize: '10px',
    outline: 'none',
    ':hover': {
      color: vars.feedbackDangerForeground,
      backgroundColor: vars.feedbackDangerBackground,
    },
  },
});

// ─── Select Root ─────────────────────────────────────────────────────────────

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  function Select(
    {
      value: valueProp,
      defaultValue = '',
      onValueChange,
      multiple = false,
      values: valuesProp,
      defaultValues,
      onValuesChange,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      name,
      disabled = false,
      required = false,
      styleX: styleXProp,
      children,
      ...restProps
    },
    ref
  ) {
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    const [values, setValues] = useControllableState<string[]>({
      prop: valuesProp,
      defaultProp: defaultValues ?? [],
      onChange: onValuesChange,
    });

    const toggleValue = React.useCallback(
      (val: string) => {
        setValues((prev) => {
          const arr = prev ?? [];
          return arr.includes(val)
            ? arr.filter((v) => v !== val)
            : [...arr, val];
        });
      },
      [setValues]
    );

    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const contentId = useStableId();
    const [selectedLabel, setSelectedLabel] = React.useState<React.ReactNode>(null);

    const optionsMap = React.useRef<Map<string, React.ReactNode>>(new Map());

    const registerOption = React.useCallback(
      (val: string, label: React.ReactNode) => {
        optionsMap.current.set(val, label);
        if (val === value) {
          setSelectedLabel(label);
        }
      },
      [value]
    );

    const unregisterOption = React.useCallback((val: string) => {
      optionsMap.current.delete(val);
    }, []);

    React.useEffect(() => {
      if (optionsMap.current.has(value)) {
        setSelectedLabel(optionsMap.current.get(value));
      }
    }, [value]);

    return (
      <SelectProvider
        value={{
          value,
          setValue,
          multiple,
          values: values ?? [],
          setValues,
          toggleValue,
          open,
          setOpen,
          triggerRef,
          contentRef,
          contentId,
          disabled,
          selectedLabel,
          setSelectedLabel,
          optionsMap,
          registerOption,
          unregisterOption,
        }}
      >
        <div
          ref={ref}
          {...stylex.props(styles.root, styleXProp)}
          {...restProps}
        >
          {children}
          {name && (
            <input
              type="hidden"
              name={name}
              value={multiple ? (values ?? []).join(',') : value}
              required={required}
            />
          )}
        </div>
      </SelectProvider>
    );
  }
);

Select.displayName = 'Select';

// ─── Select Trigger ──────────────────────────────────────────────────────────

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(
    { children, styleX: styleXProp, onClick, onKeyDown, ...restProps },
    forwardedRef
  ) {
    const {
      open,
      setOpen,
      triggerRef,
      contentId,
      disabled,
    } = useSelectContext('SelectTrigger');

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
      if (disabled) return;
      onClick?.(e);
      setOpen((prev) => !prev);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onKeyDown?.(e);
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setOpen(true);
      }
    };

    return (
      <button
        ref={handleRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...stylex.props(
          styles.trigger,
          disabled && styles.triggerDisabled,
          styleXProp
        )}
        {...restProps}
      >
        {children}
        <span aria-hidden="true" {...stylex.props(styles.icon)}>
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

// ─── Select Value ────────────────────────────────────────────────────────────

export const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  function SelectValue(
    { placeholder = 'Select an option...', styleX: styleXProp, ...restProps },
    ref
  ) {
    const { multiple, values, toggleValue, optionsMap, selectedLabel } =
      useSelectContext('SelectValue');

    if (multiple) {
      if (values.length === 0) {
        return (
          <span
            ref={ref}
            {...stylex.props(styles.value, styles.placeholder, styleXProp)}
            {...restProps}
          >
            {placeholder}
          </span>
        );
      }
      return (
        <span
          ref={ref}
          {...stylex.props(styles.chipContainer, styleXProp)}
          {...restProps}
        >
          {values.map((val) => {
            const label = optionsMap.current.get(val) ?? val;
            return (
              <span key={val} {...stylex.props(styles.chip)}>
                <span>{label}</span>
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove ${typeof label === 'string' ? label : val}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleValue(val);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Backspace' || e.key === 'Delete') {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleValue(val);
                    }
                  }}
                  {...stylex.props(styles.chipRemoveButton)}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ display: 'block' }}
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </span>
              </span>
            );
          })}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        {...stylex.props(
          styles.value,
          !selectedLabel && styles.placeholder,
          styleXProp
        )}
        {...restProps}
      >
        {selectedLabel ?? placeholder}
      </span>
    );
  }
);

SelectValue.displayName = 'SelectValue';

// ─── Select Content ──────────────────────────────────────────────────────────

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(
    {
      sideOffset = 4,
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
    } = useSelectContext('SelectContent');

    // Close on outside click
    React.useEffect(() => {
      if (!open) return;

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
    }, [open, contentRef, triggerRef, setOpen]);

    // Close on Escape
    useEscapeKey(() => {
      setOpen(false);
      triggerRef.current?.focus();
    }, open);

    // Get options
    const getOptions = React.useCallback(() => {
      if (!contentRef.current) return [];
      return Array.from(
        contentRef.current.querySelectorAll<HTMLDivElement>(
          '[role="option"]:not([aria-disabled="true"])'
        )
      );
    }, [contentRef]);

    // Auto-focus selected option on open
    React.useEffect(() => {
      if (!open) return;
      const frame = requestAnimationFrame(() => {
        const selected = contentRef.current?.querySelector<HTMLDivElement>(
          '[role="option"][aria-selected="true"]'
        );
        if (selected) {
          selected.focus();
        } else {
          getOptions()[0]?.focus();
        }
      });
      return () => cancelAnimationFrame(frame);
    }, [open, getOptions, contentRef]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      const options = getOptions();
      if (options.length === 0) return;

      const currentIndex = options.findIndex((opt) => opt === document.activeElement);

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const next = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          options[next]?.focus();
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prev = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          options[prev]?.focus();
          break;
        }
        case 'Home': {
          e.preventDefault();
          options[0]?.focus();
          break;
        }
        case 'End': {
          e.preventDefault();
          options[options.length - 1]?.focus();
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

    return (
      <div
        ref={handleRef}
        id={contentId}
        role="listbox"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        style={{
          marginTop: `${sideOffset}px`,
          ...(customStyle as React.CSSProperties),
        }}
        {...stylex.props(styles.content, styleXProp)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

SelectContent.displayName = 'SelectContent';

// ─── Select Item ─────────────────────────────────────────────────────────────

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem(
    {
      value: itemValue,
      disabled = false,
      styleX: styleXProp,
      children,
      onClick,
      onKeyDown,
      ...restProps
    },
    ref
  ) {
    const {
      value,
      setValue,
      multiple,
      values,
      toggleValue,
      setOpen,
      triggerRef,
      registerOption,
      unregisterOption,
    } = useSelectContext('SelectItem');

    const isSelected = multiple
      ? values.includes(itemValue)
      : value === itemValue;

    React.useEffect(() => {
      registerOption(itemValue, children);
      return () => unregisterOption(itemValue);
    }, [itemValue, children, registerOption, unregisterOption]);

    const handleSelect = () => {
      if (disabled) return;
      if (multiple) {
        toggleValue(itemValue);
      } else {
        setValue(itemValue);
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      handleSelect();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect();
      }
    };

    return (
      <div
        ref={ref}
        role="option"
        tabIndex={disabled ? undefined : -1}
        aria-selected={isSelected}
        aria-disabled={disabled ? 'true' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...stylex.props(
          styles.item,
          isSelected && styles.itemSelected,
          disabled && styles.itemDisabled,
          styleXProp
        )}
        {...restProps}
      >
        <span>{children}</span>
        {isSelected && (
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
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    );
  }
);

SelectItem.displayName = 'SelectItem';

// ─── Select Group, Label, Separator ──────────────────────────────────────────

export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  function SelectGroup({ styleX: styleXProp, children, ...restProps }, ref) {
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

SelectGroup.displayName = 'SelectGroup';

export const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  function SelectLabel({ styleX: styleXProp, children, ...restProps }, ref) {
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

SelectLabel.displayName = 'SelectLabel';

export const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  function SelectSeparator({ styleX: styleXProp, ...restProps }, ref) {
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

SelectSeparator.displayName = 'SelectSeparator';

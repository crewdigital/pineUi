'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import { createScopedContext } from '@pine-ui/behaviors/create-scoped-context';
import { useControllableState } from '@pine-ui/behaviors/use-controllable-state';
import { useStableId } from '@pine-ui/behaviors/aria-linking';
import { useEscapeKey } from '@pine-ui/behaviors/dismiss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled selected value */
  value?: string;
  /** Default selected value */
  defaultValue?: string;
  /** Callback fired when selected value changes */
  onValueChange?: (value: string) => void;
  /** Whether multiple items can be selected */
  multiple?: boolean;
  /** Controlled selected values (multiple mode) */
  values?: string[];
  /** Default selected values in uncontrolled mode (multiple mode) */
  defaultValues?: string[];
  /** Callback fired when selected values change (multiple mode) */
  onValuesChange?: (values: string[]) => void;
  /** Controlled open state */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Controlled search query input */
  query?: string;
  /** Default search query input */
  defaultQuery?: string;
  /** Callback fired when query changes */
  onQueryChange?: (query: string) => void;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface ComboboxInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface ComboboxContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Distance in pixels below the input (default: 4) */
  sideOffset?: number;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface ComboboxItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Option value */
  value: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface ComboboxEmptyProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface ComboboxGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface ComboboxLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ComboboxContextValue {
  value: string;
  setValue: (value: string) => void;
  multiple: boolean;
  values: string[];
  setValues: (values: string[]) => void;
  toggleValue: (val: string) => void;
  removeValue: (val: string) => void;
  optionsMap: React.MutableRefObject<Map<string, React.ReactNode>>;
  registerOption: (val: string, label: React.ReactNode) => void;
  unregisterOption: (val: string) => void;
  open: boolean;
  setOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
  query: string;
  setQuery: (query: string) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  contentId: string;
  disabled: boolean;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  isSelectingRef: React.MutableRefObject<boolean>;
}

const [ComboboxProvider, useComboboxContext] =
  createScopedContext<ComboboxContextValue>('Combobox');

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'inline-flex',
    width: '100%',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    minHeight: '38px',
    paddingInlineStart: vars.space3,
    paddingInlineEnd: vars.space8,
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
    boxSizing: 'border-box',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    ':hover': {
      borderColor: vars.borderStrong,
    },
    ':focus': {
      borderColor: vars.borderFocus,
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },
  inputDisabled: {
    opacity: vars.opacity50,
    cursor: 'not-allowed',
    backgroundColor: vars.backgroundSurfaceDisabled,
  },
  chevron: {
    position: 'absolute',
    insetInlineEnd: vars.space3,
    display: 'inline-flex',
    alignItems: 'center',
    pointerEvents: 'none',
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
    boxSizing: 'border-box',
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
  empty: {
    paddingInlineStart: vars.space3,
    paddingInlineEnd: vars.space3,
    paddingTop: vars.space4,
    paddingBottom: vars.space4,
    fontSize: vars.fontSizeSm,
    color: vars.foregroundSecondary,
    textAlign: 'center',
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
  multiInputContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: vars.space1,
    alignItems: 'center',
    width: '100%',
    minHeight: '38px',
    paddingInlineStart: vars.space2,
    paddingInlineEnd: vars.space8,
    paddingTop: vars.space1,
    paddingBottom: vars.space1,
    backgroundColor: vars.backgroundSurfaceRaised,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: vars.borderDefault,
    borderRadius: vars.radiusMd,
    boxSizing: 'border-box',
    ':hover': {
      borderColor: vars.borderStrong,
    },
    ':focus-within': {
      borderColor: vars.borderFocus,
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },
  multiSearchInput: {
    flex: '1 1 60px',
    minWidth: '60px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: vars.foregroundPrimary,
    fontSize: vars.fontSizeSm,
    padding: 0,
    margin: 0,
    height: '26px',
    '::placeholder': {
      color: vars.foregroundMuted,
    },
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

// ─── Combobox Root ───────────────────────────────────────────────────────────

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  function Combobox(
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
      query: queryProp,
      defaultQuery = '',
      onQueryChange,
      disabled = false,
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

    const removeValue = React.useCallback(
      (val: string) => {
        setValues((prev) => (prev ?? []).filter((v) => v !== val));
      },
      [setValues]
    );

    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    const [query, setQuery] = useControllableState({
      prop: queryProp,
      defaultProp: defaultQuery,
      onChange: onQueryChange,
    });

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const contentId = useStableId();
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const isSelectingRef = React.useRef(false);
    const optionsMap = React.useRef<Map<string, React.ReactNode>>(new Map());

    const registerOption = React.useCallback(
      (val: string, label: React.ReactNode) => {
        optionsMap.current.set(val, label);
      },
      []
    );

    const unregisterOption = React.useCallback((val: string) => {
      optionsMap.current.delete(val);
    }, []);

    return (
      <ComboboxProvider
        value={{
          value,
          setValue,
          multiple,
          values: values ?? [],
          setValues,
          toggleValue,
          removeValue,
          optionsMap,
          registerOption,
          unregisterOption,
          open,
          setOpen,
          query,
          setQuery,
          inputRef,
          contentRef,
          contentId,
          disabled,
          activeId,
          setActiveId,
          isSelectingRef,
        }}
      >
        <div
          ref={ref}
          {...stylex.props(styles.root, styleXProp)}
          {...restProps}
        >
          {children}
        </div>
      </ComboboxProvider>
    );
  }
);

Combobox.displayName = 'Combobox';

// ─── Combobox Input ──────────────────────────────────────────────────────────

export const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput(
    {
      styleX: styleXProp,
      onFocus,
      onKeyDown,
      placeholder = 'Type or choose an option...',
      ...restProps
    },
    forwardedRef
  ) {
    const {
      open,
      setOpen,
      multiple,
      values,
      removeValue,
      optionsMap,
      query,
      setQuery,
      inputRef,
      contentRef,
      contentId,
      disabled,
      activeId,
      isSelectingRef,
    } = useComboboxContext('ComboboxInput');

    const handleRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [inputRef, forwardedRef]
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      if (isSelectingRef.current) return;
      setOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (!open) setOpen(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);

      // Backspace deletion for multi-select chips
      if (e.key === 'Backspace' && query === '' && multiple && values.length > 0) {
        removeValue(values[values.length - 1]!);
        return;
      }

      if (!contentRef.current) return;
      const options = Array.from(
        contentRef.current.querySelectorAll<HTMLDivElement>(
          '[role="option"]:not([aria-disabled="true"])'
        )
      );
      if (options.length === 0) return;

      const currentIndex = options.findIndex((opt) => opt.id === activeId);

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (!open) {
            setOpen(true);
            return;
          }
          const next = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          options[next]?.focus();
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!open) {
            setOpen(true);
            return;
          }
          const prev = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          options[prev]?.focus();
          break;
        }
        case 'Escape': {
          setOpen(false);
          break;
        }
      }
    };

    if (multiple) {
      return (
        <div {...stylex.props(styles.inputWrapper)}>
          <div {...stylex.props(styles.multiInputContainer, styleXProp)}>
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
                      removeValue(val);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Backspace' || e.key === 'Delete') {
                        e.preventDefault();
                        e.stopPropagation();
                        removeValue(val);
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
            <input
              ref={handleRef}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={open}
              aria-controls={open ? contentId : undefined}
              aria-activedescendant={activeId ?? undefined}
              disabled={disabled}
              value={query}
              placeholder={values.length === 0 ? placeholder : ''}
              onChange={handleChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              {...stylex.props(
                styles.multiSearchInput,
                disabled && styles.inputDisabled
              )}
              {...restProps}
            />
          </div>
          <span aria-hidden="true" {...stylex.props(styles.chevron)}>
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
        </div>
      );
    }

    return (
      <div {...stylex.props(styles.inputWrapper)}>
        <input
          ref={handleRef}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? contentId : undefined}
          aria-activedescendant={activeId ?? undefined}
          disabled={disabled}
          value={query}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          {...stylex.props(
            styles.input,
            disabled && styles.inputDisabled,
            styleXProp
          )}
          {...restProps}
        />
        <span aria-hidden="true" {...stylex.props(styles.chevron)}>
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
      </div>
    );
  }
);

ComboboxInput.displayName = 'ComboboxInput';

// ─── Combobox Content ────────────────────────────────────────────────────────

export const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
  function ComboboxContent(
    {
      sideOffset = 4,
      styleX: styleXProp,
      style: customStyle,
      children,
      ...restProps
    },
    forwardedRef
  ) {
    const {
      open,
      setOpen,
      inputRef,
      contentRef,
      contentId,
    } = useComboboxContext('ComboboxContent');

    // Close on outside click
    React.useEffect(() => {
      if (!open) return;

      const handlePointerDown = (e: PointerEvent) => {
        const target = e.target as Node | null;
        if (!target) return;

        const isInsideContent = contentRef.current?.contains(target);
        const isInsideInput = inputRef.current?.contains(target);

        if (!isInsideContent && !isInsideInput) {
          setOpen(false);
        }
      };

      document.addEventListener('pointerdown', handlePointerDown);
      return () => {
        document.removeEventListener('pointerdown', handlePointerDown);
      };
    }, [open, contentRef, inputRef, setOpen]);

    // Close on Escape
    useEscapeKey(() => {
      setOpen(false);
      inputRef.current?.focus();
    }, open);

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

ComboboxContent.displayName = 'ComboboxContent';

// ─── Combobox Item ───────────────────────────────────────────────────────────

export const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  function ComboboxItem(
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
      registerOption,
      unregisterOption,
      setQuery,
      setOpen,
      inputRef,
      setActiveId,
      isSelectingRef,
    } = useComboboxContext('ComboboxItem');

    const itemId = useStableId();
    const isSelected = multiple ? values.includes(itemValue) : value === itemValue;

    React.useEffect(() => {
      registerOption(itemValue, children);
      return () => unregisterOption(itemValue);
    }, [itemValue, children, registerOption, unregisterOption]);

    const handleSelect = () => {
      if (disabled) return;
      isSelectingRef.current = true;
      if (multiple) {
        toggleValue(itemValue);
        setQuery('');
      } else {
        setValue(itemValue);
        if (typeof children === 'string') {
          setQuery(children);
        } else {
          setQuery(itemValue);
        }
        setOpen(false);
      }
      inputRef.current?.focus();
      setTimeout(() => {
        isSelectingRef.current = false;
      }, 100);
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
        id={itemId}
        role="option"
        tabIndex={disabled ? undefined : -1}
        aria-selected={isSelected}
        aria-disabled={disabled ? 'true' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => setActiveId(itemId)}
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

ComboboxItem.displayName = 'ComboboxItem';

// ─── Combobox Empty ──────────────────────────────────────────────────────────

export const ComboboxEmpty = React.forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  function ComboboxEmpty({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        role="presentation"
        {...stylex.props(styles.empty, styleXProp)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

ComboboxEmpty.displayName = 'ComboboxEmpty';

// ─── Combobox Group & Label ──────────────────────────────────────────────────

export const ComboboxGroup = React.forwardRef<HTMLDivElement, ComboboxGroupProps>(
  function ComboboxGroup({ styleX: styleXProp, children, ...restProps }, ref) {
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

ComboboxGroup.displayName = 'ComboboxGroup';

export const ComboboxLabel = React.forwardRef<HTMLDivElement, ComboboxLabelProps>(
  function ComboboxLabel({ styleX: styleXProp, children, ...restProps }, ref) {
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

ComboboxLabel.displayName = 'ComboboxLabel';

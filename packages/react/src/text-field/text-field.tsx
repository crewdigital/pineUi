'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type TextFieldSize = 'sm' | 'md' | 'lg';

export interface BaseTextFieldProps {
  /** Visible label text */
  label?: React.ReactNode;
  /** Helper text displayed below input */
  helperText?: React.ReactNode;
  /** Error message displayed below input (sets error state) */
  errorMessage?: React.ReactNode;
  /** Whether the field is in an error state */
  error?: boolean;
  /** Size variant matching button scale */
  size?: TextFieldSize;
  /** Whether field takes full container width */
  fullWidth?: boolean;
  /** Leading icon inside the input */
  iconStart?: React.ReactNode;
  /** Trailing icon inside the input */
  iconEnd?: React.ReactNode;
  /** Static prefix content (e.g. currency symbol or domain protocol) */
  prefix?: React.ReactNode;
  /** Static suffix content (e.g. unit of measurement or domain extension) */
  suffix?: React.ReactNode;
  /** Whether to show a clear button when input has a value */
  clearable?: boolean;
  /** Callback fired when the clear button is clicked */
  onClear?: () => void;
  /** Whether to show a password reveal toggle when type="password" (default: true for type="password") */
  showPasswordToggle?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type TextFieldProps = BaseTextFieldProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    keyof BaseTextFieldProps | 'size' | 'prefix'
  >;

// ─── Animations ─────────────────────────────────────────────────────────────

const slideDown = stylex.keyframes({
  '0%': { opacity: 0, transform: 'translateY(-4px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: vars.space1,
    fontFamily: vars.fontFamilySans,
    boxSizing: 'border-box',
  },
  fullWidth: {
    width: '100%',
  },

  label: {
    fontSize: vars.fontSizeSm,
    fontWeight: vars.fontWeightMedium,
    color: vars.foregroundPrimary,
    userSelect: 'none',
  },
  requiredAsterisk: {
    color: vars.feedbackDangerSolid,
    marginInlineStart: vars.space1,
  },

  inputWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: vars.backgroundSurface,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: {
      default: vars.borderDefault,
      ':hover': vars.borderStrong,
    },
    borderRadius: vars.radiusMd,
    transitionProperty: 'border-color, box-shadow, background-color',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
  },

  inputWrapperFocus: {
    ':focus-within': {
      borderColor: vars.borderFocus,
      boxShadow: `0 0 0 1px ${vars.borderFocus}`,
    },
  },

  inputWrapperError: {
    borderColor: vars.feedbackDangerSolid,
    ':focus-within': {
      borderColor: vars.feedbackDangerSolid,
      boxShadow: `0 0 0 1px ${vars.feedbackDangerSolid}`,
    },
  },

  inputWrapperDisabled: {
    backgroundColor: vars.backgroundSurfaceDisabled,
    borderColor: vars.borderDisabled,
    cursor: 'not-allowed',
    opacity: vars.opacity75,
  },

  // Input sizes
  smWrapper: {
    height: '32px',
    paddingInline: vars.space2,
  },
  mdWrapper: {
    height: '40px',
    paddingInline: vars.space3,
  },
  lgWrapper: {
    height: '48px',
    paddingInline: vars.space4,
  },

  input: {
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: vars.foregroundPrimary,
    fontFamily: vars.fontFamilySans,
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    flex: '1 1 auto',
    minWidth: 0,
    '::placeholder': {
      color: vars.foregroundMuted,
    },
  },
  smInput: {
    fontSize: vars.fontSizeSm,
  },
  mdInput: {
    fontSize: vars.fontSizeMd,
  },
  lgInput: {
    fontSize: vars.fontSizeLg,
  },

  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.foregroundMuted,
    flexShrink: 0,
  },
  iconStart: {
    marginInlineEnd: vars.space2,
  },
  iconEnd: {
    marginInlineStart: vars.space2,
  },

  adornment: {
    display: 'inline-flex',
    alignItems: 'center',
    color: vars.foregroundSecondary,
    fontSize: vars.fontSizeSm,
    userSelect: 'none',
    flexShrink: 0,
    lineHeight: vars.fontLineHeightNone,
  },
  prefix: {
    marginInlineEnd: vars.space2,
  },
  suffix: {
    marginInlineStart: vars.space2,
  },

  actionButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: '2px',
    margin: 0,
    marginInlineStart: vars.space1,
    color: vars.foregroundMuted,
    cursor: 'pointer',
    borderRadius: vars.radiusSm,
    outline: 'none',
    flexShrink: 0,
    transitionProperty: 'color, background-color',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    ':hover': {
      color: vars.foregroundPrimary,
      backgroundColor: vars.actionSecondaryBackgroundHover,
    },
    ':focus-visible': {
      boxShadow: `0 0 0 2px ${vars.focusRing}`,
    },
  },

  helperText: {
    fontSize: vars.fontSizeXs,
    color: vars.foregroundSecondary,
    lineHeight: vars.fontLineHeightNormal,
  },
  errorMessage: {
    fontSize: vars.fontSizeXs,
    color: vars.feedbackDangerForeground,
    fontWeight: vars.fontWeightMedium,
    lineHeight: vars.fontLineHeightNormal,
    animationName: slideDown,
    animationDuration: vars.motionDurationFast,
    animationTimingFunction: vars.motionEasingOutExpo,
  },
});

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      id: passedId,
      label,
      helperText,
      errorMessage,
      error = false,
      size = 'md',
      fullWidth = false,
      iconStart,
      iconEnd,
      prefix,
      suffix,
      clearable = false,
      onClear,
      showPasswordToggle,
      disabled = false,
      required = false,
      styleX,
      type = 'text',
      value: passedValue,
      defaultValue,
      onChange,
      ...restProps
    },
    ref
  ) {
    const generatedId = React.useId();
    const id = passedId ?? generatedId;
    const internalInputRef = React.useRef<HTMLInputElement | null>(null);

    // Coordinate passed ref with internal ref
    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        internalInputRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    // Track internal value for clearable button presence
    const isControlled = passedValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(
      defaultValue !== undefined ? String(defaultValue) : ''
    );
    const currentValue = isControlled ? String(passedValue ?? '') : uncontrolledValue;
    const hasValue = currentValue.length > 0;

    // Password visibility toggle state
    const isPasswordField = type === 'password';
    const shouldEnablePasswordToggle =
      showPasswordToggle ?? isPasswordField;
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const effectiveType =
      isPasswordField && passwordVisible ? 'text' : type;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isControlled) {
        setUncontrolledValue('');
      }
      if (internalInputRef.current) {
        internalInputRef.current.value = '';
        const syntheticEvent = new Event('input', { bubbles: true });
        internalInputRef.current.dispatchEvent(syntheticEvent);
        internalInputRef.current.focus();
      }
      onClear?.();
    };

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setPasswordVisible((prev) => !prev);
    };

    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const isError = Boolean(error || errorMessage);
    const describedBy = [
      errorMessage ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        {...stylex.props(
          styles.container,
          fullWidth && styles.fullWidth,
          styleX
        )}
      >
        {label ? (
          <label htmlFor={id} {...stylex.props(styles.label)}>
            {label}
            {required ? (
              <span
                {...stylex.props(styles.requiredAsterisk)}
                aria-hidden="true"
              >
                *
              </span>
            ) : null}
          </label>
        ) : null}

        <div
          {...stylex.props(
            styles.inputWrapper,
            styles[`${size}Wrapper`],
            isError ? styles.inputWrapperError : styles.inputWrapperFocus,
            disabled && styles.inputWrapperDisabled
          )}
        >
          {iconStart ? (
            <span {...stylex.props(styles.icon, styles.iconStart)}>
              {iconStart}
            </span>
          ) : null}

          {prefix ? (
            <span {...stylex.props(styles.adornment, styles.prefix)} aria-hidden="true">
              {prefix}
            </span>
          ) : null}

          <input
            ref={setRefs}
            id={id}
            type={effectiveType}
            disabled={disabled}
            required={required}
            value={passedValue}
            defaultValue={defaultValue}
            onChange={handleInputChange}
            aria-invalid={isError || undefined}
            aria-describedby={describedBy || undefined}
            {...stylex.props(styles.input, styles[`${size}Input`])}
            {...restProps}
          />

          {clearable && hasValue && !disabled ? (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Clear input"
              onClick={handleClear}
              {...stylex.props(styles.actionButton)}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          ) : null}

          {shouldEnablePasswordToggle && isPasswordField && !disabled ? (
            <button
              type="button"
              tabIndex={0}
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              onClick={togglePasswordVisibility}
              {...stylex.props(styles.actionButton)}
            >
              {passwordVisible ? (
                /* Eye off icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* Eye icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          ) : null}

          {suffix ? (
            <span {...stylex.props(styles.adornment, styles.suffix)} aria-hidden="true">
              {suffix}
            </span>
          ) : null}

          {iconEnd ? (
            <span {...stylex.props(styles.icon, styles.iconEnd)}>
              {iconEnd}
            </span>
          ) : null}
        </div>

        {errorMessage ? (
          <span id={errorId} role="alert" {...stylex.props(styles.errorMessage)}>
            {errorMessage}
          </span>
        ) : helperText ? (
          <span id={helperId} {...stylex.props(styles.helperText)}>
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

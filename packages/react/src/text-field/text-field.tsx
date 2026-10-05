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
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type TextFieldProps = BaseTextFieldProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    keyof BaseTextFieldProps | 'size'
  >;

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
    marginLeft: vars.space1,
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
    marginRight: vars.space2,
  },
  iconEnd: {
    marginLeft: vars.space2,
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
      disabled = false,
      required = false,
      styleX,
      type = 'text',
      ...restProps
    },
    ref
  ) {
    const generatedId = React.useId();
    const id = passedId ?? generatedId;

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

          <input
            ref={ref}
            id={id}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={isError || undefined}
            aria-describedby={describedBy || undefined}
            {...stylex.props(styles.input, styles[`${size}Input`])}
            {...restProps}
          />

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

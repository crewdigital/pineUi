'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface BaseTextAreaProps {
  /** Visible label text */
  label?: React.ReactNode;
  /** Helper text displayed below textarea */
  helperText?: React.ReactNode;
  /** Error message displayed below textarea (sets error state) */
  errorMessage?: React.ReactNode;
  /** Whether the field is in an error state */
  error?: boolean;
  /** Resize handle behavior */
  resize?: TextAreaResize;
  /** Whether field takes full container width */
  fullWidth?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type TextAreaProps = BaseTextAreaProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseTextAreaProps>;

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

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: vars.fontFamilySans,
    fontSize: vars.fontSizeSm,
    lineHeight: vars.fontLineHeightNormal,
    padding: vars.space3,
    backgroundColor: vars.backgroundSurface,
    color: vars.foregroundPrimary,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: {
      default: vars.borderDefault,
      ':hover': vars.borderStrong,
    },
    borderRadius: vars.radiusMd,
    outline: 'none',
    transitionProperty: 'border-color, box-shadow, background-color',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    '::placeholder': {
      color: vars.foregroundMuted,
    },
    ':focus': {
      borderColor: vars.borderFocus,
      boxShadow: `0 0 0 1px ${vars.borderFocus}`,
    },
  },

  textareaError: {
    borderColor: vars.feedbackDangerSolid,
    ':focus': {
      borderColor: vars.feedbackDangerSolid,
      boxShadow: `0 0 0 1px ${vars.feedbackDangerSolid}`,
    },
  },

  textareaDisabled: {
    backgroundColor: vars.backgroundSurfaceDisabled,
    borderColor: vars.borderDisabled,
    cursor: 'not-allowed',
    opacity: vars.opacity75,
  },

  resizeNone: { resize: 'none' },
  resizeVertical: { resize: 'vertical' },
  resizeHorizontal: { resize: 'horizontal' },
  resizeBoth: { resize: 'both' },

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

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      id: passedId,
      label,
      helperText,
      errorMessage,
      error = false,
      resize = 'vertical',
      fullWidth = false,
      disabled = false,
      required = false,
      rows = 4,
      styleX,
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

    const resizeStyle =
      resize === 'none'
        ? styles.resizeNone
        : resize === 'horizontal'
        ? styles.resizeHorizontal
        : resize === 'both'
        ? styles.resizeBoth
        : styles.resizeVertical;

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

        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-invalid={isError || undefined}
          aria-describedby={describedBy || undefined}
          {...stylex.props(
            styles.textarea,
            resizeStyle,
            isError && styles.textareaError,
            disabled && styles.textareaDisabled
          )}
          {...restProps}
        />

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

TextArea.displayName = 'TextArea';

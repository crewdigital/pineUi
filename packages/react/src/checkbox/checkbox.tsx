'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface BaseCheckboxProps {
  /** Visible label text */
  label?: React.ReactNode;
  /** Helper text displayed below label */
  helperText?: React.ReactNode;
  /** Error message displayed below label */
  errorMessage?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Indeterminate state (partially checked) */
  indeterminate?: boolean;
  /** Size variant */
  size?: CheckboxSize;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type CheckboxProps = BaseCheckboxProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseCheckboxProps | 'type' | 'size'>;

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  container: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: vars.space2,
    fontFamily: vars.fontFamilySans,
    cursor: 'pointer',
    userSelect: 'none',
    boxSizing: 'border-box',
  },
  containerDisabled: {
    cursor: 'not-allowed',
    opacity: vars.opacity75,
  },

  wrapper: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  nativeInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    cursor: 'inherit',
    zIndex: 1,
  },

  visualBox: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderRadius: vars.radiusSm,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: {
      default: vars.borderStrong,
      ':hover': vars.actionPrimaryBackgroundHover,
    },
    backgroundColor: vars.backgroundSurface,
    color: vars.actionPrimaryForeground,
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
  },

  visualBoxChecked: {
    backgroundColor: vars.actionPrimaryBackground,
    borderColor: vars.actionPrimaryBackground,
  },

  visualBoxError: {
    borderColor: vars.feedbackDangerSolid,
  },

  visualBoxDisabled: {
    backgroundColor: vars.backgroundSurfaceDisabled,
    borderColor: vars.borderDisabled,
    color: vars.foregroundDisabled,
  },

  focusRing: {
    ':focus-within': {
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },

  // Sizes
  smBox: {
    width: '16px',
    height: '16px',
  },
  mdBox: {
    width: '20px',
    height: '20px',
  },
  lgBox: {
    width: '24px',
    height: '24px',
  },

  textGroup: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: vars.space1,
  },

  label: {
    fontSize: vars.fontSizeSm,
    fontWeight: vars.fontWeightMedium,
    color: vars.foregroundPrimary,
    lineHeight: vars.fontLineHeightSnug,
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

  icon: {
    width: '100%',
    height: '100%',
    padding: '2px',
    boxSizing: 'border-box',
  },
});

function CheckmarkIcon() {
  return (
    <svg
      {...stylex.props(styles.icon)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IndeterminateIcon() {
  return (
    <svg
      {...stylex.props(styles.icon)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      id: passedId,
      label,
      helperText,
      errorMessage,
      error = false,
      indeterminate = false,
      checked: passedChecked,
      defaultChecked,
      size = 'md',
      disabled = false,
      styleX,
      onChange,
      ...restProps
    },
    ref
  ) {
    const generatedId = React.useId();
    const id = passedId ?? generatedId;
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const [checkedState, setCheckedState] = React.useState(
      Boolean(passedChecked ?? defaultChecked)
    );

    const isControlled = passedChecked !== undefined;
    const isChecked = isControlled ? Boolean(passedChecked) : checkedState;

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    const isError = Boolean(error || errorMessage);
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const describedBy = [
      errorMessage ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setCheckedState(e.target.checked);
      }
      onChange?.(e);
    };

    const isCheckedOrIndeterminate = isChecked || indeterminate;

    return (
      <label
        htmlFor={id}
        {...stylex.props(
          styles.container,
          disabled && styles.containerDisabled,
          styleX
        )}
      >
        <div {...stylex.props(styles.wrapper, styles.focusRing)}>
          <input
            ref={inputRef}
            id={id}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            aria-invalid={isError || undefined}
            aria-describedby={describedBy || undefined}
            onChange={handleChange}
            {...stylex.props(styles.nativeInput)}
            {...restProps}
          />
          <div
            {...stylex.props(
              styles.visualBox,
              styles[`${size}Box`],
              isCheckedOrIndeterminate && styles.visualBoxChecked,
              isError && !isCheckedOrIndeterminate && styles.visualBoxError,
              disabled && styles.visualBoxDisabled
            )}
          >
            {indeterminate ? (
              <IndeterminateIcon />
            ) : isChecked ? (
              <CheckmarkIcon />
            ) : null}
          </div>
        </div>

        {label || helperText || errorMessage ? (
          <div {...stylex.props(styles.textGroup)}>
            {label ? <span {...stylex.props(styles.label)}>{label}</span> : null}
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
        ) : null}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

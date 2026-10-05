'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'subtle';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseButtonProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size variant */
  size?: ButtonSize;
  /** Whether the button takes the full width of its container */
  fullWidth?: boolean;
  /** Loading state — displays spinner, disables interaction, sets aria-busy */
  loading?: boolean;
  /** Leading icon node */
  iconStart?: React.ReactNode;
  /** Trailing icon node */
  iconEnd?: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type ButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    fontFamily: vars.fontFamilySans,
    fontWeight: vars.fontWeightMedium,
    lineHeight: vars.fontLineHeightNone,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: vars.radiusMd,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    outline: 'none',
    transitionProperty: 'background-color, border-color, color, box-shadow',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    ':focus-visible': {
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },

  // Variants
  primary: {
    backgroundColor: {
      default: vars.actionPrimaryBackground,
      ':hover': vars.actionPrimaryBackgroundHover,
      ':active': vars.actionPrimaryBackgroundActive,
    },
    color: vars.actionPrimaryForeground,
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: {
      default: vars.actionSecondaryBackground,
      ':hover': vars.actionSecondaryBackgroundHover,
      ':active': vars.actionSecondaryBackgroundActive,
    },
    color: vars.actionSecondaryForeground,
    borderColor: vars.actionSecondaryBorder,
  },
  outline: {
    backgroundColor: {
      default: 'transparent',
      ':hover': vars.actionSecondaryBackgroundHover,
      ':active': vars.actionSecondaryBackgroundActive,
    },
    color: vars.actionSecondaryForeground,
    borderColor: vars.actionSecondaryBorder,
  },
  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':hover': vars.actionSubtleBackgroundHover,
      ':active': vars.actionSubtleBackgroundActive,
    },
    color: vars.actionSubtleForeground,
    borderColor: 'transparent',
  },
  danger: {
    backgroundColor: {
      default: vars.actionDangerBackground,
      ':hover': vars.actionDangerBackgroundHover,
      ':active': vars.actionDangerBackgroundActive,
    },
    color: vars.actionDangerForeground,
    borderColor: 'transparent',
  },
  subtle: {
    backgroundColor: {
      default: vars.actionSubtleBackground,
      ':hover': vars.actionSubtleBackgroundHover,
      ':active': vars.actionSubtleBackgroundActive,
    },
    color: vars.actionSubtleForeground,
    borderColor: 'transparent',
  },

  // Sizes
  sm: {
    height: '32px',
    paddingInline: vars.space3,
    fontSize: vars.fontSizeSm,
    gap: vars.space1,
  },
  md: {
    height: '40px',
    paddingInline: vars.space4,
    fontSize: vars.fontSizeMd,
    gap: vars.space2,
  },
  lg: {
    height: '48px',
    paddingInline: vars.space6,
    fontSize: vars.fontSizeLg,
    gap: vars.space2,
  },

  // Layout modifier
  fullWidth: {
    width: '100%',
  },

  // Disabled / Loading states
  disabled: {
    opacity: vars.opacity50,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // Icon container alignment
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // Spinner animation
  spinner: {
    animationName: stylex.keyframes({
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    }),
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
});

// ─── Component Definition ────────────────────────────────────────────────────

function DefaultSpinner({ size = 'md' }: { size: ButtonSize }) {
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
  return (
    <svg
      {...stylex.props(styles.icon, styles.spinner)}
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.25"
      />
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 14.15 2.68 16.14 3.84 17.76"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      iconStart,
      iconEnd,
      styleX,
      type = 'button',
      children,
      ...restProps
    },
    ref
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        {...stylex.props(
          styles.base,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          styleX
        )}
        {...restProps}
      >
        {loading ? (
          <DefaultSpinner size={size} />
        ) : iconStart ? (
          <span {...stylex.props(styles.icon)}>{iconStart}</span>
        ) : null}
        {children}
        {!loading && iconEnd ? (
          <span {...stylex.props(styles.icon)}>{iconEnd}</span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = 'Button';

'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import type { ButtonVariant, ButtonSize } from '../button/button.js';

// ─── Types ───────────────────────────────────────────────────────────────────

export type IconButtonShape = 'square' | 'circle';

export interface BaseIconButtonProps {
  /** Mandatory accessible label for screen readers */
  'aria-label': string;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size variant */
  size?: ButtonSize;
  /** Shape variant — square with rounded corners or full circle */
  shape?: IconButtonShape;
  /** Loading state */
  loading?: boolean;
  /** Icon element (or pass via children) */
  icon?: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type IconButtonProps = BaseIconButtonProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseIconButtonProps | 'aria-label'
  >;

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    padding: 0,
    transitionProperty: 'background-color, border-color, color, box-shadow',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    ':focus-visible': {
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },

  // Shapes
  square: {
    borderRadius: vars.radiusMd,
  },
  circle: {
    borderRadius: vars.radiusFull,
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

  // Sizes (Square aspect ratio)
  sm: {
    width: '32px',
    height: '32px',
    fontSize: vars.fontSizeSm,
  },
  md: {
    width: '40px',
    height: '40px',
    fontSize: vars.fontSizeMd,
  },
  lg: {
    width: '48px',
    height: '48px',
    fontSize: vars.fontSizeLg,
  },

  // Disabled / Loading
  disabled: {
    opacity: vars.opacity50,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

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

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      'aria-label': ariaLabel,
      variant = 'ghost',
      size = 'md',
      shape = 'square',
      loading = false,
      disabled = false,
      icon,
      styleX,
      type = 'button',
      children,
      ...restProps
    },
    ref
  ) {
    const isDisabled = disabled || loading;
    const content = icon ?? children;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        {...stylex.props(
          styles.base,
          styles[shape],
          styles[variant],
          styles[size],
          isDisabled && styles.disabled,
          styleX
        )}
        {...restProps}
      >
        {loading ? (
          <DefaultSpinner size={size} />
        ) : (
          <span {...stylex.props(styles.icon)}>{content}</span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

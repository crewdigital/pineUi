import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'neutral' | 'inverse';

export interface BaseSpinnerProps {
  /** Size variant */
  size?: SpinnerSize;
  /** Visual color variant */
  variant?: SpinnerVariant;
  /** Accessible label for screen readers */
  label?: string;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type SpinnerProps = BaseSpinnerProps &
  Omit<React.SVGAttributes<SVGSVGElement>, keyof BaseSpinnerProps>;

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  base: {
    display: 'inline-block',
    flexShrink: 0,
    animationName: stylex.keyframes({
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    }),
    animationDuration: '0.8s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },

  // Variants
  primary: { color: vars.foregroundBrand },
  secondary: { color: vars.foregroundSecondary },
  neutral: { color: vars.foregroundPrimary },
  inverse: { color: vars.foregroundInverse },

  // Sizes
  sm: { width: '16px', height: '16px' },
  md: { width: '24px', height: '24px' },
  lg: { width: '36px', height: '36px' },
  xl: { width: '48px', height: '48px' },
});

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  function Spinner(
    {
      size = 'md',
      variant = 'primary',
      label = 'Loading...',
      styleX,
      ...restProps
    },
    ref
  ) {
    return (
      <svg
        ref={ref}
        role="status"
        aria-label={label}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...stylex.props(
          styles.base,
          styles[variant],
          styles[size],
          styleX
        )}
        {...restProps}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3.5"
          opacity="0.2"
        />
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 14.15 2.68 16.14 3.84 17.76"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
);

Spinner.displayName = 'Spinner';

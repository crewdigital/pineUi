import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export interface BaseProgressProps {
  /** Current progress value (0 to max). If omitted/null, renders indeterminate animation */
  value?: number | null;
  /** Maximum progress value (default 100) */
  max?: number;
  /** Size variant */
  size?: ProgressSize;
  /** Visual color variant */
  variant?: ProgressVariant;
  /** Accessible label string or visible label node */
  label?: React.ReactNode;
  /** Custom value text string for screen readers */
  valueText?: string;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type ProgressProps = BaseProgressProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseProgressProps>;

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const indeterminateKeyframes = stylex.keyframes({
  '0%': { transform: 'translateX(-100%) scaleX(0.2)' },
  '50%': { transform: 'translateX(0%) scaleX(0.5)' },
  '100%': { transform: 'translateX(100%) scaleX(0.2)' },
});

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space1,
    width: '100%',
    fontFamily: vars.fontFamilySans,
    boxSizing: 'border-box',
  },

  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: vars.fontSizeSm,
    color: vars.foregroundPrimary,
    fontWeight: vars.fontWeightMedium,
  },
  valueText: {
    color: vars.foregroundSecondary,
    fontSize: vars.fontSizeSm,
  },

  track: {
    width: '100%',
    backgroundColor: vars.backgroundSurfaceMuted,
    borderRadius: vars.radiusFull,
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
  },

  // Sizes
  sm: { height: '4px' },
  md: { height: '8px' },
  lg: { height: '12px' },

  fill: {
    height: '100%',
    borderRadius: vars.radiusFull,
    transitionProperty: 'width, background-color',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
  },

  indeterminateFill: {
    width: '100%',
    transformOrigin: 'left center',
    animationName: indeterminateKeyframes,
    animationDuration: '1.5s',
    animationTimingFunction: 'easeInOut',
    animationIterationCount: 'infinite',
  },

  // Variants
  primary: { backgroundColor: vars.actionPrimaryBackground },
  secondary: { backgroundColor: vars.foregroundSecondary },
  success: { backgroundColor: vars.feedbackSuccessSolid },
  warning: { backgroundColor: vars.feedbackWarningSolid },
  danger: { backgroundColor: vars.feedbackDangerSolid },
});

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      value,
      max = 100,
      size = 'md',
      variant = 'primary',
      label,
      valueText: passedValueText,
      styleX,
      ...restProps
    },
    ref
  ) {
    const isDeterminate = typeof value === 'number';
    const percentage = isDeterminate
      ? Math.min(Math.max((value / max) * 100, 0), 100)
      : null;

    const valueText =
      passedValueText ?? (isDeterminate ? `${Math.round(percentage!)}%` : undefined);

    const isLabelString = typeof label === 'string';

    return (
      <div
        {...stylex.props(styles.container, styleX)}
      >
        {label ? (
          <div {...stylex.props(styles.labelRow)}>
            {isLabelString ? <span>{label}</span> : label}
            {isDeterminate ? (
              <span {...stylex.props(styles.valueText)}>{valueText}</span>
            ) : null}
          </div>
        ) : null}

        <div
          ref={ref}
          role="progressbar"
          aria-label={isLabelString ? label : undefined}
          aria-valuenow={isDeterminate ? value : undefined}
          aria-valuemin={isDeterminate ? 0 : undefined}
          aria-valuemax={isDeterminate ? max : undefined}
          aria-valuetext={valueText}
          {...stylex.props(styles.track, styles[size])}
          {...restProps}
        >
          <div
            {...stylex.props(
              styles.fill,
              styles[variant],
              !isDeterminate && styles.indeterminateFill
            )}
            style={isDeterminate ? { width: `${percentage}%` } : undefined}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

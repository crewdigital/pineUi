import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill';

export interface BaseBadgeProps {
  /** Visual color/status variant */
  variant?: BadgeVariant;
  /** Size variant */
  size?: BadgeSize;
  /** Shape border-radius variant */
  shape?: BadgeShape;
  /** Leading status dot indicator */
  dot?: boolean;
  /** Leading icon node */
  iconStart?: React.ReactNode;
  /** Trailing icon node */
  iconEnd?: React.ReactNode;
  /** Polymorphic component type */
  as?: React.ElementType;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type BadgeProps = BaseBadgeProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof BaseBadgeProps>;

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    fontFamily: vars.fontFamilySans,
    fontWeight: vars.fontWeightMedium,
    lineHeight: vars.fontLineHeightNone,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    transitionProperty: 'background-color, color, border-color',
    transitionDuration: vars.motionDurationFast,
  },

  // Shapes
  rounded: {
    borderRadius: vars.radiusSm,
  },
  pill: {
    borderRadius: vars.radiusFull,
  },

  // Variants
  primary: {
    backgroundColor: vars.backgroundBrandSubtle,
    color: vars.foregroundBrand,
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: vars.backgroundSurfaceSubtle,
    color: vars.foregroundSecondary,
    borderColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    color: vars.foregroundSecondary,
    borderColor: vars.borderDefault,
  },
  neutral: {
    backgroundColor: vars.backgroundSurfaceSubtle,
    color: vars.foregroundPrimary,
    borderColor: vars.borderSubtle,
  },
  success: {
    backgroundColor: vars.feedbackSuccessBackground,
    color: vars.feedbackSuccessForeground,
    borderColor: vars.feedbackSuccessBorder,
  },
  warning: {
    backgroundColor: vars.feedbackWarningBackground,
    color: vars.feedbackWarningForeground,
    borderColor: vars.feedbackWarningBorder,
  },
  danger: {
    backgroundColor: vars.feedbackDangerBackground,
    color: vars.feedbackDangerForeground,
    borderColor: vars.feedbackDangerBorder,
  },
  info: {
    backgroundColor: vars.feedbackInfoBackground,
    color: vars.feedbackInfoForeground,
    borderColor: vars.feedbackInfoBorder,
  },

  // Sizes
  sm: {
    height: '20px',
    paddingInline: vars.space2,
    fontSize: vars.fontSizeXs,
    gap: vars.space1,
  },
  md: {
    height: '24px',
    paddingInline: vars.space3,
    fontSize: vars.fontSizeSm,
    gap: vars.space1,
  },
  lg: {
    height: '28px',
    paddingInline: vars.space3,
    fontSize: vars.fontSizeSm,
    gap: vars.space2,
  },

  dot: {
    width: '6px',
    height: '6px',
    borderRadius: vars.radiusFull,
    backgroundColor: 'currentColor',
    flexShrink: 0,
  },

  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});

export const Badge = React.forwardRef<HTMLElement, BadgeProps>(function Badge(
  {
    variant = 'neutral',
    size = 'md',
    shape = 'pill',
    dot = false,
    iconStart,
    iconEnd,
    as: Component = 'span',
    styleX,
    children,
    ...restProps
  },
  ref
) {
  return (
    <Component
      ref={ref}
      {...stylex.props(
        styles.base,
        styles[shape],
        styles[variant],
        styles[size],
        styleX
      )}
      {...restProps}
    >
      {dot ? <span {...stylex.props(styles.dot)} aria-hidden="true" /> : null}
      {iconStart ? (
        <span {...stylex.props(styles.icon)}>{iconStart}</span>
      ) : null}
      {children}
      {iconEnd ? <span {...stylex.props(styles.icon)}>{iconEnd}</span> : null}
    </Component>
  );
});

Badge.displayName = 'Badge';

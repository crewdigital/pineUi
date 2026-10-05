'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type LinkVariant = 'primary' | 'secondary' | 'subtle' | 'neutral';
export type LinkUnderline = 'always' | 'hover' | 'none';

export interface BaseLinkProps {
  /** Visual color variant */
  variant?: LinkVariant;
  /** Underline behavior */
  underline?: LinkUnderline;
  /** Whether the link points to an external site (opens in new tab safely) */
  external?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Polymorphic component (e.g. Next.js Link) */
  as?: React.ElementType;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type LinkProps = BaseLinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseLinkProps>;

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  base: {
    fontFamily: vars.fontFamilySans,
    fontWeight: vars.fontWeightMedium,
    cursor: 'pointer',
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space1,
    transitionProperty: 'color, text-decoration-color',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    ':focus-visible': {
      borderRadius: vars.radiusXs,
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },

  // Variants
  primary: {
    color: {
      default: vars.foregroundBrand,
      ':hover': vars.backgroundBrandHover,
      ':active': vars.backgroundBrandActive,
    },
  },
  secondary: {
    color: {
      default: vars.foregroundSecondary,
      ':hover': vars.foregroundPrimary,
      ':active': vars.colorNeutral1000,
    },
  },
  subtle: {
    color: {
      default: vars.foregroundMuted,
      ':hover': vars.foregroundSecondary,
      ':active': vars.foregroundPrimary,
    },
  },
  neutral: {
    color: {
      default: vars.foregroundPrimary,
      ':hover': vars.foregroundBrand,
      ':active': vars.backgroundBrandActive,
    },
  },

  // Underline options
  underlineAlways: {
    textDecoration: 'underline',
  },
  underlineHover: {
    textDecoration: {
      default: 'none',
      ':hover': 'underline',
    },
  },
  underlineNone: {
    textDecoration: 'none',
  },

  // Disabled state
  disabled: {
    color: vars.foregroundDisabled,
    cursor: 'not-allowed',
    pointerEvents: 'none',
    textDecoration: 'none',
  },

  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    width: '1em',
    height: '1em',
  },
});

function ExternalIcon() {
  return (
    <svg
      {...stylex.props(styles.icon)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    {
      variant = 'primary',
      underline = 'hover',
      external = false,
      disabled = false,
      as: Component = 'a',
      styleX,
      children,
      target,
      rel,
      onClick,
      tabIndex,
      ...restProps
    },
    ref
  ) {
    const isExternal = external;
    const computedTarget = isExternal ? target ?? '_blank' : target;
    const computedRel = isExternal
      ? rel ? `${rel} noopener noreferrer` : 'noopener noreferrer'
      : rel;

    const underlineStyle =
      underline === 'always'
        ? styles.underlineAlways
        : underline === 'none'
        ? styles.underlineNone
        : styles.underlineHover;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <Component
        ref={ref}
        target={computedTarget}
        rel={computedRel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        onClick={handleClick}
        {...stylex.props(
          styles.base,
          styles[variant],
          underlineStyle,
          disabled && styles.disabled,
          styleX
        )}
        {...restProps}
      >
        {children}
        {isExternal ? <ExternalIcon /> : null}
      </Component>
    );
  }
);

Link.displayName = 'Link';

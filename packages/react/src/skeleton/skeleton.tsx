import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SkeletonVariant = 'pulse' | 'wave' | 'none';
export type SkeletonShape = 'text' | 'rectangular' | 'circular';

export interface BaseSkeletonProps {
  /** Visual shape */
  shape?: SkeletonShape;
  /** Animation style */
  variant?: SkeletonVariant;
  /** Explicit width override (e.g. "100%", "120px") */
  width?: string | number;
  /** Explicit height override (e.g. "20px", "40px") */
  height?: string | number;
  /** Polymorphic tag */
  as?: React.ElementType;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type SkeletonProps = BaseSkeletonProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof BaseSkeletonProps>;

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const pulseKeyframes = stylex.keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.4 },
  '100%': { opacity: 1 },
});

const waveKeyframes = stylex.keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

const styles = stylex.create({
  base: {
    display: 'inline-block',
    boxSizing: 'border-box',
    backgroundColor: vars.backgroundSurfaceMuted,
    userSelect: 'none',
  },

  // Shapes
  text: {
    height: '1em',
    marginTop: '0.2em',
    marginBottom: '0.2em',
    borderRadius: vars.radiusSm,
  },
  rectangular: {
    borderRadius: vars.radiusMd,
  },
  circular: {
    borderRadius: vars.radiusFull,
  },

  // Animation Variants
  pulse: {
    animationName: pulseKeyframes,
    animationDuration: '1.5s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  wave: {
    backgroundImage: `linear-gradient(90deg, ${vars.backgroundSurfaceMuted} 0%, ${vars.backgroundSurfaceSubtle} 50%, ${vars.backgroundSurfaceMuted} 100%)`,
    backgroundSize: '200% 100%',
    animationName: waveKeyframes,
    animationDuration: '1.6s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  none: {},
});

export const Skeleton = React.forwardRef<HTMLElement, SkeletonProps>(
  function Skeleton(
    {
      shape = 'text',
      variant = 'pulse',
      width,
      height,
      as: Component = 'span',
      style: customStyle,
      styleX,
      ...restProps
    },
    ref
  ) {
    const inlineStyle: React.CSSProperties = {
      ...customStyle,
      width: width !== undefined ? width : customStyle?.width,
      height: height !== undefined ? height : customStyle?.height,
    };

    return (
      <Component
        ref={ref}
        aria-hidden="true"
        style={inlineStyle}
        {...stylex.props(
          styles.base,
          styles[shape],
          styles[variant],
          styleX
        )}
        {...restProps}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

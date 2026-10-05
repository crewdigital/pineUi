import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import type { RadiusScale } from '../box/index.js';

export type SurfaceVariant = 'default' | 'subtle' | 'raised' | 'muted' | 'brand' | 'canvas';
export type ShadowScale = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const styles = stylex.create({
  base: {
    boxSizing: 'border-box',
    position: 'relative',
  },

  // Background variants — semantically maps to backgroundSurface* tokens
  variant_default: {
    backgroundColor: vars.backgroundSurface,
    color: vars.foregroundPrimary,
  },
  variant_subtle: {
    backgroundColor: vars.backgroundSurfaceSubtle,
    color: vars.foregroundPrimary,
  },
  variant_raised: {
    backgroundColor: vars.backgroundSurfaceRaised,
    color: vars.foregroundPrimary,
    boxShadow: vars.shadowMd,
  },
  variant_muted: {
    backgroundColor: vars.backgroundSurfaceMuted,
    color: vars.foregroundSecondary,
  },
  variant_brand: {
    backgroundColor: vars.backgroundBrand,
    color: vars.foregroundInverse,
  },
  variant_canvas: {
    backgroundColor: vars.backgroundCanvas,
    color: vars.foregroundPrimary,
  },

  // Border
  bordered: {
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: vars.borderDefault,
  },

  // Shadow overrides (variant_raised already sets shadowMd, these allow explicit control)
  shadow_none: { boxShadow: vars.shadowNone },
  shadow_xs: { boxShadow: vars.shadowXs },
  shadow_sm: { boxShadow: vars.shadowSm },
  shadow_md: { boxShadow: vars.shadowMd },
  shadow_lg: { boxShadow: vars.shadowLg },
  shadow_xl: { boxShadow: vars.shadowXl },
  shadow_2xl: { boxShadow: vars.shadow2xl },

  // Border radius
  rad_none: { borderRadius: vars.radiusNone },
  rad_xs: { borderRadius: vars.radiusXs },
  rad_sm: { borderRadius: vars.radiusSm },
  rad_md: { borderRadius: vars.radiusMd },
  rad_lg: { borderRadius: vars.radiusLg },
  rad_xl: { borderRadius: vars.radiusXl },
  rad_full: { borderRadius: vars.radiusFull },
});

export interface BaseSurfaceProps {
  /** Semantic background variant. Defaults to 'default'. */
  variant?: SurfaceVariant | undefined;
  /** Adds a 1px solid border using the default border token. */
  bordered?: boolean | undefined;
  /** Box shadow depth. Overrides the shadow set by certain variants (e.g., 'raised'). */
  shadow?: ShadowScale | undefined;
  /** Border radius. */
  borderRadius?: RadiusScale | undefined;
  style?: any;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
}

export type SurfaceProps<T extends React.ElementType = 'div'> = BaseSurfaceProps & {
  as?: T | undefined;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseSurfaceProps | 'as'>;

type SurfaceComponent = <T extends React.ElementType = 'div'>(
  props: SurfaceProps<T> & { ref?: React.ComponentPropsWithRef<T>['ref'] }
) => React.ReactElement | null;

export const Surface: SurfaceComponent = React.forwardRef(function Surface<
  T extends React.ElementType = 'div',
>(
  {
    as,
    variant = 'default',
    bordered = false,
    shadow,
    borderRadius,
    style: customStyle,
    className,
    children,
    ...restProps
  }: SurfaceProps<T>,
  ref: React.Ref<Element>
) {
  const Component = as ?? 'div';

  const isPlainStyle =
    customStyle &&
    typeof customStyle === 'object' &&
    !('$$css' in (customStyle as Record<string, unknown>));
  const stylexCustom = isPlainStyle ? undefined : customStyle;
  const inlineCustom = isPlainStyle ? (customStyle as React.CSSProperties) : undefined;

  const stylexProps = stylex.props(
    styles.base,
    styles[`variant_${variant}` as keyof typeof styles],
    bordered && styles.bordered,
    shadow !== undefined && styles[`shadow_${shadow}` as keyof typeof styles],
    borderRadius !== undefined && styles[`rad_${borderRadius}` as keyof typeof styles],
    stylexCustom
  );

  const mergedClassName = className
    ? `${stylexProps.className ?? ''} ${className}`.trim()
    : stylexProps.className;

  return React.createElement(
    Component,
    {
      ref,
      ...restProps,
      className: mergedClassName,
      style: { ...stylexProps.style, ...inlineCustom },
    },
    children
  );
}) as unknown as SurfaceComponent;

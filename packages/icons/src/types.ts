import type * as React from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export const ICON_SIZES: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  /**
   * Predefined scale ('xs' | 'sm' | 'md' | 'lg' | 'xl') or a numeric pixel value.
   * @default 'md' (20px)
   */
  size?: IconSize | undefined;

  /**
   * Accessible description for non-decorative icons.
   * When provided, the icon is marked with role="img", aria-label, and a `<title>` tag.
   * When omitted, the icon is strictly decorative with aria-hidden="true".
   */
  label?: string | undefined;

  /**
   * Override fill or stroke color if needed; defaults to 'currentColor'.
   */
  color?: string | undefined;

  /**
   * Additional children elements (such as <path>, <circle>, <g>).
   */
  children?: React.ReactNode | undefined;
}

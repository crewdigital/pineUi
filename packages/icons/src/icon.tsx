import * as React from 'react';
import { ICON_SIZES, type IconProps } from './types.js';

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    size = 'md',
    label,
    color,
    viewBox = '0 0 24 24',
    fill = 'none',
    stroke = 'currentColor',
    strokeWidth = 2,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    children,
    style,
    ...restProps
  },
  ref
) {
  const dimension = typeof size === 'number' ? size : ICON_SIZES[size] ?? ICON_SIZES.md;
  const isAccessible = Boolean(label);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      width={dimension}
      height={dimension}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      aria-hidden={!isAccessible ? true : undefined}
      role={isAccessible ? 'img' : undefined}
      aria-label={isAccessible ? label : undefined}
      focusable="false"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        color: color ?? 'inherit',
        ...style,
      }}
      {...restProps}
    >
      {isAccessible ? <title>{label}</title> : null}
      {children}
    </svg>
  );
});

Icon.displayName = 'Icon';

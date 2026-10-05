import * as React from 'react';
import { Icon } from './icon.js';
import type { IconProps } from './types.js';

export interface CreateIconOptions {
  /** Component display name */
  displayName: string;
  /** SVG inner elements or path definition */
  path: React.ReactNode;
  /** SVG viewBox. Defaults to '0 0 24 24' */
  viewBox?: string | undefined;
  /** Default fill. Defaults to 'none' */
  defaultFill?: string | undefined;
  /** Default stroke. Defaults to 'currentColor' */
  defaultStroke?: string | undefined;
  /** Default stroke width. Defaults to 2 */
  defaultStrokeWidth?: number | string | undefined;
}

export function createIcon(options: CreateIconOptions) {
  const {
    displayName,
    path,
    viewBox = '0 0 24 24',
    defaultFill = 'none',
    defaultStroke = 'currentColor',
    defaultStrokeWidth = 2,
  } = options;

  const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(function Component(
    props,
    ref
  ) {
    return (
      <Icon
        ref={ref}
        viewBox={viewBox}
        fill={props.fill ?? defaultFill}
        stroke={props.stroke ?? defaultStroke}
        strokeWidth={props.strokeWidth ?? defaultStrokeWidth}
        {...props}
      >
        {path}
      </Icon>
    );
  });

  IconComponent.displayName = displayName;
  return IconComponent;
}

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import type { SpaceScale } from '../box/index.js';

export type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  // Align items
  align_start: { alignItems: 'flex-start' },
  align_center: { alignItems: 'center' },
  align_end: { alignItems: 'flex-end' },
  align_stretch: { alignItems: 'stretch' },
  align_baseline: { alignItems: 'baseline' },

  // Justify content
  justify_start: { justifyContent: 'flex-start' },
  justify_center: { justifyContent: 'center' },
  justify_end: { justifyContent: 'flex-end' },
  justify_between: { justifyContent: 'space-between' },
  justify_around: { justifyContent: 'space-around' },
  justify_evenly: { justifyContent: 'space-evenly' },

  // Gap
  gap_0: { gap: vars.space0 },
  gap_1: { gap: vars.space1 },
  gap_2: { gap: vars.space2 },
  gap_3: { gap: vars.space3 },
  gap_4: { gap: vars.space4 },
  gap_5: { gap: vars.space5 },
  gap_6: { gap: vars.space6 },
  gap_8: { gap: vars.space8 },
  gap_10: { gap: vars.space10 },
  gap_12: { gap: vars.space12 },
  gap_16: { gap: vars.space16 },
});

export interface BaseStackProps {
  gap?: SpaceScale | undefined;
  align?: AlignItems | undefined;
  justify?: JustifyContent | undefined;
  style?: stylex.StyleXStyles | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
}

export type StackProps<T extends React.ElementType = 'div'> = BaseStackProps & {
  as?: T | undefined;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseStackProps | 'as'>;

type StackComponent = <T extends React.ElementType = 'div'>(
  props: StackProps<T> & { ref?: React.ComponentPropsWithRef<T>['ref'] }
) => React.ReactElement | null;

export const Stack: StackComponent = React.forwardRef(function Stack<
  T extends React.ElementType = 'div',
>(
  {
    as,
    gap = 4,
    align,
    justify,
    style: customStyle,
    className,
    children,
    ...restProps
  }: StackProps<T>,
  ref: React.Ref<Element>
) {
  const Component = as ?? 'div';

  const stylexProps = stylex.props(
    styles.base,
    gap !== undefined && styles[`gap_${gap}` as keyof typeof styles],
    align !== undefined && styles[`align_${align}` as keyof typeof styles],
    justify !== undefined && styles[`justify_${justify}` as keyof typeof styles],
    customStyle
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
      style: { ...stylexProps.style, ...(restProps as { style?: React.CSSProperties }).style },
    },
    children
  );
}) as unknown as StackComponent;

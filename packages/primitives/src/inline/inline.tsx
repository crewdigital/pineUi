import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import type { SpaceScale } from '../box/index.js';
import type { AlignItems, JustifyContent } from '../stack/index.js';

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
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

export interface BaseInlineProps {
  gap?: SpaceScale | undefined;
  align?: AlignItems | undefined;
  justify?: JustifyContent | undefined;
  style?: any;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
}

export type InlineProps<T extends React.ElementType = 'div'> = BaseInlineProps & {
  as?: T | undefined;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseInlineProps | 'as'>;

type InlineComponent = <T extends React.ElementType = 'div'>(
  props: InlineProps<T> & { ref?: React.ComponentPropsWithRef<T>['ref'] }
) => React.ReactElement | null;

export const Inline: InlineComponent = React.forwardRef(function Inline<
  T extends React.ElementType = 'div',
>(
  {
    as,
    gap = 3,
    align = 'center',
    justify,
    style: customStyle,
    className,
    children,
    ...restProps
  }: InlineProps<T>,
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
    gap !== undefined && styles[`gap_${gap}` as keyof typeof styles],
    align !== undefined && styles[`align_${align}` as keyof typeof styles],
    justify !== undefined && styles[`justify_${justify}` as keyof typeof styles],
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
}) as unknown as InlineComponent;

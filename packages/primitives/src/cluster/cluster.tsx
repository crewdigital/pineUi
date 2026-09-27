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

  // Row Gap
  rg_0: { rowGap: vars.space0 },
  rg_1: { rowGap: vars.space1 },
  rg_2: { rowGap: vars.space2 },
  rg_3: { rowGap: vars.space3 },
  rg_4: { rowGap: vars.space4 },
  rg_5: { rowGap: vars.space5 },
  rg_6: { rowGap: vars.space6 },
  rg_8: { rowGap: vars.space8 },
  rg_10: { rowGap: vars.space10 },
  rg_12: { rowGap: vars.space12 },
  rg_16: { rowGap: vars.space16 },

  // Column Gap
  cg_0: { columnGap: vars.space0 },
  cg_1: { columnGap: vars.space1 },
  cg_2: { columnGap: vars.space2 },
  cg_3: { columnGap: vars.space3 },
  cg_4: { columnGap: vars.space4 },
  cg_5: { columnGap: vars.space5 },
  cg_6: { columnGap: vars.space6 },
  cg_8: { columnGap: vars.space8 },
  cg_10: { columnGap: vars.space10 },
  cg_12: { columnGap: vars.space12 },
  cg_16: { columnGap: vars.space16 },
});

export interface BaseClusterProps {
  gap?: SpaceScale | undefined;
  rowGap?: SpaceScale | undefined;
  columnGap?: SpaceScale | undefined;
  align?: AlignItems | undefined;
  justify?: JustifyContent | undefined;
  style?: stylex.StyleXStyles | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
}

export type ClusterProps<T extends React.ElementType = 'div'> = BaseClusterProps & {
  as?: T | undefined;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseClusterProps | 'as'>;

type ClusterComponent = <T extends React.ElementType = 'div'>(
  props: ClusterProps<T> & { ref?: React.ComponentPropsWithRef<T>['ref'] }
) => React.ReactElement | null;

export const Cluster: ClusterComponent = React.forwardRef(function Cluster<
  T extends React.ElementType = 'div',
>(
  {
    as,
    gap = 2,
    rowGap,
    columnGap,
    align = 'center',
    justify = 'start',
    style: customStyle,
    className,
    children,
    ...restProps
  }: ClusterProps<T>,
  ref: React.Ref<Element>
) {
  const Component = as ?? 'div';

  const stylexProps = stylex.props(
    styles.base,
    gap !== undefined && rowGap === undefined && columnGap === undefined && styles[`gap_${gap}` as keyof typeof styles],
    rowGap !== undefined && styles[`rg_${rowGap}` as keyof typeof styles],
    columnGap !== undefined && styles[`cg_${columnGap}` as keyof typeof styles],
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
}) as unknown as ClusterComponent;

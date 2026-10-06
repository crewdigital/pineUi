import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

export type SpaceScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
export type RadiusScale = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DisplayValue = 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
export type PositionValue = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
export type OverflowValue = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
export type BorderWidthScale = 0 | 1 | 2 | 4;

const styles = stylex.create({
  base: {
    boxSizing: 'border-box',
  },
  // Display
  display_block: { display: 'block' },
  display_inline: { display: 'inline' },
  display_inlineBlock: { display: 'inline-block' },
  display_flex: { display: 'flex' },
  display_inlineFlex: { display: 'inline-flex' },
  display_grid: { display: 'grid' },
  display_inlineGrid: { display: 'inline-grid' },
  display_none: { display: 'none' },

  // Position
  pos_static: { position: 'static' },
  pos_relative: { position: 'relative' },
  pos_absolute: { position: 'absolute' },
  pos_fixed: { position: 'fixed' },
  pos_sticky: { position: 'sticky' },

  // Overflow
  overflow_visible: { overflow: 'visible' },
  overflow_hidden: { overflow: 'hidden' },
  overflow_clip: { overflow: 'clip' },
  overflow_scroll: { overflow: 'scroll' },
  overflow_auto: { overflow: 'auto' },

  // Padding
  p_0: { padding: vars.space0 },
  p_1: { padding: vars.space1 },
  p_2: { padding: vars.space2 },
  p_3: { padding: vars.space3 },
  p_4: { padding: vars.space4 },
  p_5: { padding: vars.space5 },
  p_6: { padding: vars.space6 },
  p_8: { padding: vars.space8 },
  p_10: { padding: vars.space10 },
  p_12: { padding: vars.space12 },
  p_16: { padding: vars.space16 },

  // Padding Inline (Logical)
  pi_0: { paddingInline: vars.space0 },
  pi_1: { paddingInline: vars.space1 },
  pi_2: { paddingInline: vars.space2 },
  pi_3: { paddingInline: vars.space3 },
  pi_4: { paddingInline: vars.space4 },
  pi_5: { paddingInline: vars.space5 },
  pi_6: { paddingInline: vars.space6 },
  pi_8: { paddingInline: vars.space8 },
  pi_10: { paddingInline: vars.space10 },
  pi_12: { paddingInline: vars.space12 },
  pi_16: { paddingInline: vars.space16 },

  // Padding Block (Logical)
  pb_0: { paddingBlock: vars.space0 },
  pb_1: { paddingBlock: vars.space1 },
  pb_2: { paddingBlock: vars.space2 },
  pb_3: { paddingBlock: vars.space3 },
  pb_4: { paddingBlock: vars.space4 },
  pb_5: { paddingBlock: vars.space5 },
  pb_6: { paddingBlock: vars.space6 },
  pb_8: { paddingBlock: vars.space8 },
  pb_10: { paddingBlock: vars.space10 },
  pb_12: { paddingBlock: vars.space12 },
  pb_16: { paddingBlock: vars.space16 },

  // Margin
  m_0: { margin: vars.space0 },
  m_1: { margin: vars.space1 },
  m_2: { margin: vars.space2 },
  m_3: { margin: vars.space3 },
  m_4: { margin: vars.space4 },
  m_5: { margin: vars.space5 },
  m_6: { margin: vars.space6 },
  m_8: { margin: vars.space8 },
  m_10: { margin: vars.space10 },
  m_12: { margin: vars.space12 },
  m_16: { margin: vars.space16 },

  // Margin Inline (Logical)
  mi_0: { marginInline: vars.space0 },
  mi_1: { marginInline: vars.space1 },
  mi_2: { marginInline: vars.space2 },
  mi_3: { marginInline: vars.space3 },
  mi_4: { marginInline: vars.space4 },
  mi_5: { marginInline: vars.space5 },
  mi_6: { marginInline: vars.space6 },
  mi_8: { marginInline: vars.space8 },
  mi_10: { marginInline: vars.space10 },
  mi_12: { marginInline: vars.space12 },
  mi_16: { marginInline: vars.space16 },

  // Margin Block (Logical)
  mb_0: { marginBlock: vars.space0 },
  mb_1: { marginBlock: vars.space1 },
  mb_2: { marginBlock: vars.space2 },
  mb_3: { marginBlock: vars.space3 },
  mb_4: { marginBlock: vars.space4 },
  mb_5: { marginBlock: vars.space5 },
  mb_6: { marginBlock: vars.space6 },
  mb_8: { marginBlock: vars.space8 },
  mb_10: { marginBlock: vars.space10 },
  mb_12: { marginBlock: vars.space12 },
  mb_16: { marginBlock: vars.space16 },

  // Border Radius
  rad_none: { borderRadius: vars.radiusNone },
  rad_xs: { borderRadius: vars.radiusXs },
  rad_sm: { borderRadius: vars.radiusSm },
  rad_md: { borderRadius: vars.radiusMd },
  rad_lg: { borderRadius: vars.radiusLg },
  rad_xl: { borderRadius: vars.radiusXl },
  rad_full: { borderRadius: vars.radiusFull },

  // Border Width
  bw_0: { borderWidth: vars.borderWidthNone, borderStyle: 'none' },
  bw_1: { borderWidth: vars.borderWidth1, borderStyle: 'solid', borderColor: vars.borderDefault },
  bw_2: { borderWidth: vars.borderWidth2, borderStyle: 'solid', borderColor: vars.borderDefault },
  bw_4: { borderWidth: vars.borderWidth4, borderStyle: 'solid', borderColor: vars.borderDefault },
});

export interface BaseBoxProps {
  padding?: SpaceScale | undefined;
  paddingInline?: SpaceScale | undefined;
  paddingBlock?: SpaceScale | undefined;
  margin?: SpaceScale | undefined;
  marginInline?: SpaceScale | undefined;
  marginBlock?: SpaceScale | undefined;
  display?: DisplayValue | undefined;
  position?: PositionValue | undefined;
  overflow?: OverflowValue | undefined;
  borderRadius?: RadiusScale | undefined;
  borderWidth?: BorderWidthScale | undefined;
  style?: stylex.StyleXStyles | React.CSSProperties | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
}

export type BoxProps<T extends React.ElementType = 'div'> = BaseBoxProps & {
  as?: T | undefined;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseBoxProps | 'as'>;

type BoxComponent = <T extends React.ElementType = 'div'>(
  props: BoxProps<T> & { ref?: React.ComponentPropsWithRef<T>['ref'] }
) => React.ReactElement | null;

export const Box: BoxComponent = React.forwardRef(function Box<T extends React.ElementType = 'div'>(
  {
    as,
    padding,
    paddingInline,
    paddingBlock,
    margin,
    marginInline,
    marginBlock,
    display,
    position,
    overflow,
    borderRadius,
    borderWidth,
    style: customStyle,
    className,
    children,
    ...restProps
  }: BoxProps<T>,
  ref: React.Ref<Element>
) {
  const Component = as ?? 'div';

  const isPlainStyle =
    customStyle &&
    typeof customStyle === 'object' &&
    !('$$css' in (customStyle as Record<string, unknown>));
  const stylexCustom = (isPlainStyle ? undefined : customStyle) as stylex.StyleXStyles | undefined;
  const inlineCustom = isPlainStyle ? (customStyle as React.CSSProperties) : undefined;

  const stylexProps = stylex.props(
    styles.base,
    display === 'block' && styles.display_block,
    display === 'inline' && styles.display_inline,
    display === 'inline-block' && styles.display_inlineBlock,
    display === 'flex' && styles.display_flex,
    display === 'inline-flex' && styles.display_inlineFlex,
    display === 'grid' && styles.display_grid,
    display === 'inline-grid' && styles.display_inlineGrid,
    display === 'none' && styles.display_none,

    position === 'static' && styles.pos_static,
    position === 'relative' && styles.pos_relative,
    position === 'absolute' && styles.pos_absolute,
    position === 'fixed' && styles.pos_fixed,
    position === 'sticky' && styles.pos_sticky,

    overflow === 'visible' && styles.overflow_visible,
    overflow === 'hidden' && styles.overflow_hidden,
    overflow === 'clip' && styles.overflow_clip,
    overflow === 'scroll' && styles.overflow_scroll,
    overflow === 'auto' && styles.overflow_auto,

    padding !== undefined && styles[`p_${padding}` as keyof typeof styles],
    paddingInline !== undefined && styles[`pi_${paddingInline}` as keyof typeof styles],
    paddingBlock !== undefined && styles[`pb_${paddingBlock}` as keyof typeof styles],

    margin !== undefined && styles[`m_${margin}` as keyof typeof styles],
    marginInline !== undefined && styles[`mi_${marginInline}` as keyof typeof styles],
    marginBlock !== undefined && styles[`mb_${marginBlock}` as keyof typeof styles],

    borderRadius !== undefined && styles[`rad_${borderRadius}` as keyof typeof styles],
    borderWidth !== undefined && styles[`bw_${borderWidth}` as keyof typeof styles],

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
}) as unknown as BoxComponent;


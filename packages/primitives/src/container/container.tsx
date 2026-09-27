import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import type { SpaceScale } from '../box/index.js';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

const styles = stylex.create({
  base: {
    boxSizing: 'border-box',
    width: '100%',
    marginInline: 'auto',
  },

  // Max widths mapped to breakpoint tokens
  size_sm: { maxWidth: vars.breakpointSm },
  size_md: { maxWidth: vars.breakpointMd },
  size_lg: { maxWidth: vars.breakpointLg },
  size_xl: { maxWidth: vars.breakpointXl },
  size_2xl: { maxWidth: vars.breakpoint2xl },
  size_full: { maxWidth: 'none' },

  // Horizontal padding
  px_0: { paddingInline: vars.space0 },
  px_1: { paddingInline: vars.space1 },
  px_2: { paddingInline: vars.space2 },
  px_3: { paddingInline: vars.space3 },
  px_4: { paddingInline: vars.space4 },
  px_5: { paddingInline: vars.space5 },
  px_6: { paddingInline: vars.space6 },
  px_8: { paddingInline: vars.space8 },
  px_10: { paddingInline: vars.space10 },
  px_12: { paddingInline: vars.space12 },
  px_16: { paddingInline: vars.space16 },
});

export interface BaseContainerProps {
  /** Maximum width constraint for the container. Defaults to '2xl'. */
  size?: ContainerSize | undefined;
  /** Horizontal (inline) padding. Defaults to 4. */
  paddingInline?: SpaceScale | undefined;
  style?: stylex.StyleXStyles | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
}

export type ContainerProps<T extends React.ElementType = 'div'> = BaseContainerProps & {
  as?: T | undefined;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseContainerProps | 'as'>;

type ContainerComponent = <T extends React.ElementType = 'div'>(
  props: ContainerProps<T> & { ref?: React.ComponentPropsWithRef<T>['ref'] }
) => React.ReactElement | null;

export const Container: ContainerComponent = React.forwardRef(function Container<
  T extends React.ElementType = 'div',
>(
  {
    as,
    size = '2xl',
    paddingInline = 4,
    style: customStyle,
    className,
    children,
    ...restProps
  }: ContainerProps<T>,
  ref: React.Ref<Element>
) {
  const Component = as ?? 'div';

  const stylexProps = stylex.props(
    styles.base,
    styles[`size_${size}` as keyof typeof styles],
    paddingInline !== undefined && styles[`px_${paddingInline}` as keyof typeof styles],
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
}) as unknown as ContainerComponent;

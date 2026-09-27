import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorVariant = 'default' | 'subtle' | 'strong';

const styles = stylex.create({
  root: {
    boxSizing: 'border-box',
    flexShrink: '0',
    backgroundColor: vars.borderDefault,
    border: 'none',
  },

  // Orientation
  horizontal: {
    width: '100%',
    height: vars.borderWidth1,
    display: 'block',
  },
  vertical: {
    width: vars.borderWidth1,
    height: '100%',
    display: 'inline-block',
    alignSelf: 'stretch',
  },

  // Variants
  variant_default: { backgroundColor: vars.borderDefault },
  variant_subtle: { backgroundColor: vars.borderSubtle },
  variant_strong: { backgroundColor: vars.borderStrong },
});

export interface SeparatorProps {
  /** Visual orientation of the separator. Defaults to 'horizontal'. */
  orientation?: SeparatorOrientation | undefined;
  /** Color intensity of the separator line. Defaults to 'default'. */
  variant?: SeparatorVariant | undefined;
  /**
   * Whether this separator is purely decorative.
   * When true, `role="none"` is set and the element is hidden from assistive tech.
   * When false (default), `role="separator"` is applied.
   */
  decorative?: boolean | undefined;
  style?: stylex.StyleXStyles | undefined;
  className?: string | undefined;
}

/**
 * A thin visual line used to separate content areas. Renders as an `<hr>` for
 * horizontal separators and a `<div>` for vertical ones.
 *
 * @accessibility
 * - Decorative separators use `role="none"` and are hidden from screen readers.
 * - Semantic separators expose `role="separator"` with `aria-orientation`.
 */
export const Separator = React.forwardRef<HTMLElement, SeparatorProps>(
  function Separator(
    {
      orientation = 'horizontal',
      variant = 'default',
      decorative = true,
      style: customStyle,
      className,
      ...restProps
    },
    ref
  ) {
    const stylexProps = stylex.props(
      styles.root,
      orientation === 'horizontal' ? styles.horizontal : styles.vertical,
      styles[`variant_${variant}` as keyof typeof styles],
      customStyle
    );

    const mergedClassName = className
      ? `${stylexProps.className ?? ''} ${className}`.trim()
      : stylexProps.className;

    const Component = orientation === 'horizontal' ? 'hr' : 'div';

    const a11yProps = decorative
      ? { role: 'none' as const }
      : { role: 'separator' as const, 'aria-orientation': orientation };

    return React.createElement(Component, {
      ref: ref as React.Ref<HTMLHRElement & HTMLDivElement>,
      ...a11yProps,
      ...restProps,
      className: mergedClassName,
      style: { ...stylexProps.style, ...(restProps as { style?: React.CSSProperties }).style },
    });
  }
);

Separator.displayName = 'Separator';

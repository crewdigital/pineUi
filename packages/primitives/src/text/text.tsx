import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ──────────────────────────────────────────────────────────────────

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'start' | 'center' | 'end' | 'justify';
export type TextVariant = 'primary' | 'secondary' | 'tertiary' | 'muted' | 'disabled' | 'inverse' | 'brand' | 'danger' | 'success' | 'warning';
export type TextTruncate = boolean;

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = stylex.create({
  base: {
    boxSizing: 'border-box',
    // Inherit font family from the nearest ancestor or body
    fontFamily: vars.fontFamilySans,
    lineHeight: vars.fontLineHeightNormal,
    letterSpacing: vars.fontLetterSpacingNormal,
    margin: 0,
    padding: 0,
  },

  // Font size
  size_xs: { fontSize: vars.fontSizeXs, lineHeight: vars.fontLineHeightNormal },
  size_sm: { fontSize: vars.fontSizeSm, lineHeight: vars.fontLineHeightNormal },
  size_md: { fontSize: vars.fontSizeMd, lineHeight: vars.fontLineHeightNormal },
  size_lg: { fontSize: vars.fontSizeLg, lineHeight: vars.fontLineHeightRelaxed },
  size_xl: { fontSize: vars.fontSizeXl, lineHeight: vars.fontLineHeightRelaxed },

  // Font weight
  weight_regular: { fontWeight: vars.fontWeightRegular },
  weight_medium: { fontWeight: vars.fontWeightMedium },
  weight_semibold: { fontWeight: vars.fontWeightSemibold },
  weight_bold: { fontWeight: vars.fontWeightBold },

  // Text alignment (logical)
  align_start: { textAlign: 'start' },
  align_center: { textAlign: 'center' },
  align_end: { textAlign: 'end' },
  align_justify: { textAlign: 'justify' },

  // Color variants — all semantic tokens
  variant_primary: { color: vars.foregroundPrimary },
  variant_secondary: { color: vars.foregroundSecondary },
  variant_tertiary: { color: vars.foregroundTertiary },
  variant_muted: { color: vars.foregroundMuted },
  variant_disabled: { color: vars.foregroundDisabled },
  variant_inverse: { color: vars.foregroundInverse },
  variant_brand: { color: vars.foregroundBrand },
  variant_danger: { color: vars.feedbackDangerForeground },
  variant_success: { color: vars.feedbackSuccessForeground },
  variant_warning: { color: vars.feedbackWarningForeground },

  // Truncate: single line ellipsis
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  // Italic
  italic: {
    fontStyle: 'italic',
  },

  // Underline (avoid for non-links per accessibility guidance)
  underline: {
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },
});

// ─── Props ──────────────────────────────────────────────────────────────────

export interface BaseTextProps {
  /** Font size using the type scale. Defaults to 'md'. */
  size?: TextSize | undefined;
  /** Font weight. Defaults to 'regular'. */
  weight?: TextWeight | undefined;
  /** Semantic color variant. Defaults to 'primary'. */
  variant?: TextVariant | undefined;
  /** Logical text alignment. */
  align?: TextAlign | undefined;
  /** Truncate to a single line with ellipsis. */
  truncate?: boolean | undefined;
  /** Render in italics. */
  italic?: boolean | undefined;
  /** Underline text. Use only for inline, non-interactive supplementary text. */
  underline?: boolean | undefined;
  style?: stylex.StyleXStyles | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
}

export type TextProps<T extends React.ElementType = 'p'> = BaseTextProps & {
  as?: T | undefined;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseTextProps | 'as'>;

type TextComponent = (<T extends React.ElementType = 'p'>(
  props: TextProps<T> & { ref?: React.ComponentPropsWithRef<T>['ref'] }
) => React.ReactElement | null) & { displayName?: string };

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Renders body text with token-driven size, weight, and semantic color.
 *
 * Defaults to a `<p>` tag. Use the `as` prop to render as `<span>`, `<label>`,
 * `<li>`, `<td>`, etc. for semantic correctness without visual change.
 *
 * @example
 * ```tsx
 * <Text size="sm" variant="secondary">Helper text for this field.</Text>
 * <Text as="span" weight="semibold" variant="brand">Pro</Text>
 * ```
 */
export const Text: TextComponent = React.forwardRef(function Text<
  T extends React.ElementType = 'p',
>(
  {
    as,
    size = 'md',
    weight = 'regular',
    variant = 'primary',
    align,
    truncate: isTruncated = false,
    italic: isItalic = false,
    underline: isUnderlined = false,
    style: customStyle,
    className,
    children,
    ...restProps
  }: TextProps<T>,
  ref: React.Ref<Element>
) {
  const Component = as ?? 'p';

  const stylexProps = stylex.props(
    styles.base,
    styles[`size_${size}` as keyof typeof styles],
    styles[`weight_${weight}` as keyof typeof styles],
    styles[`variant_${variant}` as keyof typeof styles],
    align !== undefined && styles[`align_${align}` as keyof typeof styles],
    isTruncated && styles.truncate,
    isItalic && styles.italic,
    isUnderlined && styles.underline,
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
}) as unknown as TextComponent;

Text.displayName = 'Text';

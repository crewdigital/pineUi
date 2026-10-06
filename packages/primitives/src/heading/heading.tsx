import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import type { TextAlign, TextVariant } from '../text/text.js';

// ─── Types ──────────────────────────────────────────────────────────────────

/**
 * The semantic heading level. Maps directly to HTML heading elements.
 * This is DISTINCT from visual size — you must always choose the correct
 * level for document structure; use `size` to control visual appearance.
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Visual size scale for headings. Decoupled from semantic level to allow
 * correct document structure while controlling visual hierarchy independently.
 *
 * E.g., `<Heading level={3} size="xl">` renders an `<h3>` visually styled
 * as an xl heading.
 */
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export type HeadingWeight = 'medium' | 'semibold' | 'bold';

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = stylex.create({
  base: {
    boxSizing: 'border-box',
    fontFamily: vars.fontFamilySans,
    margin: 0,
    padding: 0,
  },

  // Font size — each size maps to a token in the type scale
  size_sm: { fontSize: vars.fontSizeSm, lineHeight: vars.fontLineHeightTight },
  size_md: { fontSize: vars.fontSizeMd, lineHeight: vars.fontLineHeightTight },
  size_lg: { fontSize: vars.fontSizeLg, lineHeight: vars.fontLineHeightTight },
  size_xl: { fontSize: vars.fontSizeXl, lineHeight: vars.fontLineHeightTight },
  size_2xl: { fontSize: vars.fontSize2xl, lineHeight: vars.fontLineHeightSnug },
  size_3xl: { fontSize: vars.fontSize3xl, lineHeight: vars.fontLineHeightSnug },
  size_4xl: { fontSize: vars.fontSize4xl, lineHeight: vars.fontLineHeightSnug },
  size_5xl: { fontSize: vars.fontSize5xl, lineHeight: vars.fontLineHeightNone },
  size_6xl: { fontSize: vars.fontSize6xl, lineHeight: vars.fontLineHeightNone },

  // Font weight
  weight_medium: { fontWeight: vars.fontWeightMedium },
  weight_semibold: { fontWeight: vars.fontWeightSemibold },
  weight_bold: { fontWeight: vars.fontWeightBold },

  // Text alignment (logical)
  align_start: { textAlign: 'start' },
  align_center: { textAlign: 'center' },
  align_end: { textAlign: 'end' },
  align_justify: { textAlign: 'justify' },

  // Color variants — reuse semantic tokens
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

  // Letter spacing tightening for large display headings
  tracking_tight: { letterSpacing: vars.fontLetterSpacingTight },
  tracking_tighter: { letterSpacing: vars.fontLetterSpacingTighter },
  tracking_normal: { letterSpacing: vars.fontLetterSpacingNormal },
});

// Default visual sizes per heading level (opinionated defaults, fully overridable)
const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'md',
};

// Tight tracking for large display headings (>= 2xl)
const displaySizes: Set<HeadingSize> = new Set(['2xl', '3xl', '4xl', '5xl', '6xl']);

// ─── Props ──────────────────────────────────────────────────────────────────

export interface BaseHeadingProps {
  /**
   * Semantic heading level (h1–h6). REQUIRED for correct document outline.
   * Determines the rendered HTML element.
   */
  level: HeadingLevel;
  /**
   * Visual size, decoupled from semantic level.
   * Defaults to an opinionated mapping (h1->4xl, h2->3xl, h3->2xl, h4->xl, h5->lg, h6->md).
   */
  size?: HeadingSize | undefined;
  /** Font weight. Defaults to 'bold'. */
  weight?: HeadingWeight | undefined;
  /** Semantic color variant. Defaults to 'primary'. */
  variant?: TextVariant | undefined;
  /** Logical text alignment. */
  align?: TextAlign | undefined;
  style?: stylex.StyleXStyles | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
}

export type HeadingProps = BaseHeadingProps &
  Omit<React.ComponentPropsWithoutRef<'h1'>, keyof BaseHeadingProps>;

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Renders semantic headings (`<h1>`–`<h6>`) with token-driven typography.
 *
 * The `level` prop controls the DOM element and document structure.
 * The `size` prop controls visual appearance and is INDEPENDENT of level.
 *
 * @accessibility
 * - Always choose the heading level that correctly reflects document hierarchy.
 * - Never skip levels (e.g., h1 -> h3) for visual effect; use `size` instead.
 * - One `<h1>` per page (or landmark region) is the WCAG/HTML5 best practice.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Page Title</Heading>
 * <Heading level={2} size="xl" weight="semibold">Section Header</Heading>
 * <Heading level={3} size="md" variant="secondary">Subsection</Heading>
 * ```
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    {
      level,
      size,
      weight = 'bold',
      variant = 'primary',
      align,
      style: customStyle,
      className,
      children,
      ...restProps
    },
    ref
  ) {
    const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    const resolvedSize: HeadingSize = size ?? defaultSizeForLevel[level];

    // Apply tighter letter spacing for large display headings
    const trackingStyle = displaySizes.has(resolvedSize) ? styles.tracking_tight : styles.tracking_normal;

    const stylexProps = stylex.props(
      styles.base,
      styles[`size_${resolvedSize}` as keyof typeof styles],
      styles[`weight_${weight}` as keyof typeof styles],
      styles[`variant_${variant}` as keyof typeof styles],
      trackingStyle,
      align !== undefined && styles[`align_${align}` as keyof typeof styles],
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
  }
);

Heading.displayName = 'Heading';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

export type FocusRingVariant = 'default' | 'inset' | 'offset';

/**
 * FocusRing wraps an interactive element and applies a consistent, token-driven
 * focus-visible ring. It uses the `:focus-visible` pseudo-class to avoid
 * showing the ring on mouse/touch interactions (pointer-driven navigation).
 *
 * Design principles:
 * - Zero JS overhead: purely CSS via StyleX
 * - Uses `focusRing` and `focusOffset` tokens so it respects brand and theme
 * - `inset` variant is for elements where an outset ring would be clipped (e.g., table cells)
 * - `offset` variant adds a 2px gap between the element and the ring (default)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/focus-visible
 */
const styles = stylex.create({
  root: {
    display: 'contents',
  },

  // Default: offset ring
  focusDefault: {
    outlineStyle: 'none',
    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: vars.borderWidth2,
      outlineColor: vars.focusRing,
      outlineOffset: '2px',
      borderRadius: 'inherit',
    },
  },

  // Inset ring: sits inside the element boundary (no offset)
  focusInset: {
    outlineStyle: 'none',
    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: vars.borderWidth2,
      outlineColor: vars.focusRing,
      outlineOffset: '-2px',
      borderRadius: 'inherit',
    },
  },

  // Offset ring with extra spacing using box-shadow to mimic a double ring
  focusOffset: {
    outlineStyle: 'none',
    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: vars.borderWidth2,
      outlineColor: vars.focusRing,
      outlineOffset: '4px',
      borderRadius: 'inherit',
    },
  },
});

export interface FocusRingProps {
  /** Focus ring visual variant. Defaults to 'default'. */
  variant?: FocusRingVariant | undefined;
  children: React.ReactElement;
}

/**
 * Applies a WCAG 2.2 AA-compliant, token-driven focus ring to a single child element.
 *
 * @example
 * ```tsx
 * <FocusRing>
 *   <button>Click me</button>
 * </FocusRing>
 * ```
 */
export function FocusRing({ variant = 'default', children }: FocusRingProps): React.ReactElement {
  const focusStyle =
    variant === 'inset'
      ? styles.focusInset
      : variant === 'offset'
        ? styles.focusOffset
        : styles.focusDefault;

  return React.cloneElement(children, {
    ...stylex.props(focusStyle),
  });
}

FocusRing.displayName = 'FocusRing';

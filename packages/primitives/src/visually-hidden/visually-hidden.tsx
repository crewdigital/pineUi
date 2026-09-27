import * as React from 'react';
import * as stylex from '@stylexjs/stylex';

/**
 * Visually hides content from sighted users while keeping it fully accessible
 * to screen readers and other assistive technologies.
 *
 * This implements the industry-standard "clip" technique that works reliably
 * across all modern screen readers without the pitfalls of `display: none`
 * or `visibility: hidden`.
 *
 * @see https://www.a11yproject.com/posts/how-to-hide-content/
 */
const styles = stylex.create({
  root: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0',
  },
});

export interface VisuallyHiddenProps {
  children: React.ReactNode;
  /** Override the rendered element. Defaults to 'span'. */
  as?: React.ElementType | undefined;
  id?: string | undefined;
}

/**
 * Renders content that is visually hidden but accessible to assistive technologies.
 *
 * @example
 * ```tsx
 * <button>
 *   <Icon name="close" aria-hidden />
 *   <VisuallyHidden>Close dialog</VisuallyHidden>
 * </button>
 * ```
 */
export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  function VisuallyHidden({ as: Component = 'span', children, ...restProps }, ref) {
    const stylexProps = stylex.props(styles.root);

    return React.createElement(
      Component,
      {
        ref,
        ...restProps,
        ...stylexProps,
      },
      children
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';

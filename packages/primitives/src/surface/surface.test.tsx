import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Surface } from './surface.js';

describe('Surface', () => {
  it('renders with default element (div)', () => {
    render(<Surface data-testid="s">Content</Surface>);
    expect(screen.getByTestId('s').tagName).toBe('DIV');
  });

  it('renders with a custom element via `as` prop', () => {
    render(<Surface as="article" data-testid="s">Content</Surface>);
    expect(screen.getByTestId('s').tagName).toBe('ARTICLE');
  });

  it('renders children', () => {
    render(<Surface>Surface content</Surface>);
    expect(screen.getByText('Surface content')).toBeDefined();
  });

  it('accepts a custom className', () => {
    render(<Surface className="custom-surface" data-testid="s">X</Surface>);
    expect(screen.getByTestId('s').className).toContain('custom-surface');
  });

  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Surface ref={ref}>X</Surface>);
    expect(ref.current).not.toBeNull();
  });

  it('renders all variants without error', () => {
    const variants = ['default', 'subtle', 'raised', 'muted', 'brand', 'canvas'] as const;
    for (const variant of variants) {
      const { unmount } = render(
        <Surface variant={variant} data-testid={`s-${variant}`}>
          {variant}
        </Surface>
      );
      expect(screen.getByTestId(`s-${variant}`)).toBeDefined();
      unmount();
    }
  });
});

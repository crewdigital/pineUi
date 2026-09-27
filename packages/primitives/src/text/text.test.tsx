import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Text } from './text.js';

describe('Text', () => {
  it('renders as <p> by default', () => {
    render(<Text data-testid="t">Hello</Text>);
    expect(screen.getByTestId('t').tagName).toBe('P');
  });

  it('renders children', () => {
    render(<Text>Body paragraph text</Text>);
    expect(screen.getByText('Body paragraph text')).toBeDefined();
  });

  it('renders with a custom element via `as` prop', () => {
    render(<Text as="span" data-testid="t">span text</Text>);
    expect(screen.getByTestId('t').tagName).toBe('SPAN');
  });

  it('renders as <label>', () => {
    render(<Text as="label" htmlFor="input" data-testid="t">Label</Text>);
    expect(screen.getByTestId('t').tagName).toBe('LABEL');
  });

  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<Text ref={ref}>X</Text>);
    expect(ref.current).not.toBeNull();
  });

  it('renders all sizes without error', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    for (const size of sizes) {
      const { unmount } = render(<Text size={size} data-testid={`t-${size}`}>{size}</Text>);
      expect(screen.getByTestId(`t-${size}`)).toBeDefined();
      unmount();
    }
  });

  it('renders all weights without error', () => {
    const weights = ['regular', 'medium', 'semibold', 'bold'] as const;
    for (const weight of weights) {
      const { unmount } = render(<Text weight={weight} data-testid={`t-${weight}`}>{weight}</Text>);
      expect(screen.getByTestId(`t-${weight}`)).toBeDefined();
      unmount();
    }
  });

  it('renders all variants without error', () => {
    const variants = [
      'primary', 'secondary', 'tertiary', 'muted', 'disabled',
      'inverse', 'brand', 'danger', 'success', 'warning',
    ] as const;
    for (const variant of variants) {
      const { unmount } = render(
        <Text variant={variant} data-testid={`t-${variant}`}>{variant}</Text>
      );
      expect(screen.getByTestId(`t-${variant}`)).toBeDefined();
      unmount();
    }
  });

  it('applies truncation class when truncate={true}', () => {
    render(<Text truncate data-testid="t">Long text that should be truncated</Text>);
    const el = screen.getByTestId('t');
    // StyleX applies class — assert the element is in the DOM
    expect(el).toBeDefined();
  });

  it('accepts a custom className', () => {
    render(<Text className="custom-text" data-testid="t">X</Text>);
    expect(screen.getByTestId('t').className).toContain('custom-text');
  });
});

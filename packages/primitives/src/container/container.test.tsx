import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Container } from './container.js';

describe('Container', () => {
  it('renders with default element (div)', () => {
    render(<Container data-testid="c">Content</Container>);
    const el = screen.getByTestId('c');
    expect(el.tagName).toBe('DIV');
  });

  it('renders with a custom element via `as` prop', () => {
    render(<Container as="section" data-testid="c">Content</Container>);
    expect(screen.getByTestId('c').tagName).toBe('SECTION');
  });

  it('renders children', () => {
    render(<Container>Hello container</Container>);
    expect(screen.getByText('Hello container')).toBeDefined();
  });

  it('accepts a custom className', () => {
    render(<Container className="custom" data-testid="c">X</Container>);
    expect(screen.getByTestId('c').className).toContain('custom');
  });

  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Container ref={ref}>X</Container>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

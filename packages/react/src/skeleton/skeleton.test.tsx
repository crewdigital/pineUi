import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './skeleton.js';

describe('Skeleton', () => {
  it('renders aria-hidden="true" element by default', () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    const el = container.querySelector('[aria-hidden="true"]');
    expect(el).not.toBeNull();
  });

  it('applies custom inline width and height', () => {
    render(<Skeleton data-testid="sk" width={200} height={40} />);
    const el = screen.getByTestId('sk');
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('40px');
  });

  it('supports polymorphic "as" prop', () => {
    render(<Skeleton as="div" data-testid="div-sk" />);
    const el = screen.getByTestId('div-sk');
    expect(el.tagName).toBe('DIV');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});

import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Separator } from './separator.js';

describe('Separator', () => {
  it('renders as <hr> for horizontal orientation (default)', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep').tagName).toBe('HR');
  });

  it('renders as <div> for vertical orientation', () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    expect(screen.getByTestId('sep').tagName).toBe('DIV');
  });

  it('is decorative by default: role is "none"', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep').getAttribute('role')).toBe('none');
  });

  it('is semantic when decorative={false}: role is "separator"', () => {
    render(<Separator decorative={false} data-testid="sep" />);
    const el = screen.getByTestId('sep');
    expect(el.getAttribute('role')).toBe('separator');
  });

  it('sets aria-orientation on semantic separator', () => {
    render(<Separator decorative={false} orientation="vertical" data-testid="sep" />);
    const el = screen.getByTestId('sep');
    expect(el.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('renders all variants without error', () => {
    const variants = ['default', 'subtle', 'strong'] as const;
    for (const variant of variants) {
      const { unmount } = render(<Separator variant={variant} data-testid={`sep-${variant}`} />);
      expect(screen.getByTestId(`sep-${variant}`)).toBeDefined();
      unmount();
    }
  });

  it('accepts a custom className', () => {
    render(<Separator className="my-sep" data-testid="sep" />);
    expect(screen.getByTestId('sep').className).toContain('my-sep');
  });
});

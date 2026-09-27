import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { FocusRing } from './focus-ring.js';

describe('FocusRing', () => {
  it('renders its child element unchanged in the DOM', () => {
    render(
      <FocusRing>
        <button data-testid="btn">Click</button>
      </FocusRing>
    );
    expect(screen.getByTestId('btn')).toBeDefined();
    expect(screen.getByTestId('btn').tagName).toBe('BUTTON');
  });

  it('preserves child text content', () => {
    render(
      <FocusRing>
        <button>Press me</button>
      </FocusRing>
    );
    expect(screen.getByText('Press me')).toBeDefined();
  });

  it('renders with all variant options without error', () => {
    const variants = ['default', 'inset', 'offset'] as const;
    for (const variant of variants) {
      const { unmount } = render(
        <FocusRing variant={variant}>
          <button data-testid={`btn-${variant}`}>{variant}</button>
        </FocusRing>
      );
      expect(screen.getByTestId(`btn-${variant}`)).toBeDefined();
      unmount();
    }
  });

  it('does not introduce extra DOM wrapper elements', () => {
    const { container } = render(
      <FocusRing>
        <button data-testid="btn">X</button>
      </FocusRing>
    );
    // FocusRing uses React.cloneElement, so container should have exactly one child
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });
});

import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, expectNoA11yViolations } from '@pine-ui/testing';
import { Inline } from './inline.js';

describe('Inline Primitive', () => {
  it('renders horizontal flex container with children', () => {
    const { container } = render(
      <Inline data-testid="inline-root">
        <span>Item 1</span>
        <span>Item 2</span>
      </Inline>
    );
    const el = screen.getByTestId('inline-root');
    expect(el.tagName).toBe('DIV');
    expect(el.children.length).toBe(2);
    expect(container.firstElementChild).toBe(el);
  });

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Inline ref={ref} data-testid="ref-inline" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes WCAG 2.2 AA accessibility audit', async () => {
    const { container } = render(
      <Inline as="ul" role="list">
        <li>Tag 1</li>
        <li>Tag 2</li>
      </Inline>
    );
    await expectNoA11yViolations(container);
  });
});

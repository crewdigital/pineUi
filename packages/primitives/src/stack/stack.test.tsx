import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, expectNoA11yViolations } from '@pine-ui/testing';
import { Stack } from './stack.js';

describe('Stack Primitive', () => {
  it('renders default vertical flex container with children', () => {
    const { container } = render(
      <Stack data-testid="stack-root">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const el = screen.getByTestId('stack-root');
    expect(el.tagName).toBe('DIV');
    expect(el.children.length).toBe(2);
    expect(container.firstElementChild).toBe(el);
  });

  it('renders polymorphic container and forwards refs', () => {
    const ref = React.createRef<HTMLOListElement>();
    render(
      <Stack as="ol" ref={ref} data-testid="stack-list">
        <li>First</li>
        <li>Second</li>
      </Stack>
    );

    const el = screen.getByTestId('stack-list');
    expect(el.tagName).toBe('OL');
    expect(ref.current).toBeInstanceOf(HTMLOListElement);
  });

  it('applies gap and alignment classes via StyleX', () => {
    render(
      <Stack data-testid="aligned-stack" gap={6} align="center" justify="between">
        <span>A</span>
        <span>B</span>
      </Stack>
    );

    const el = screen.getByTestId('aligned-stack');
    expect(el.className).toBeTruthy();
  });

  it('passes WCAG 2.2 AA accessibility audit', async () => {
    const { container } = render(
      <Stack as="nav" aria-label="Quick links" gap={2}>
        <a href="#link1">Link 1</a>
        <a href="#link2">Link 2</a>
      </Stack>
    );

    await expectNoA11yViolations(container);
  });
});

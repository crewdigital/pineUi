import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, expectNoA11yViolations } from '@pine-ui/testing';
import { Grid } from './grid.js';

describe('Grid Primitive', () => {
  it('renders grid container with specified column count', () => {
    const { container } = render(
      <Grid data-testid="grid-root" columns={3} gap={4}>
        <div>Col 1</div>
        <div>Col 2</div>
        <div>Col 3</div>
      </Grid>
    );
    const el = screen.getByTestId('grid-root');
    expect(el.tagName).toBe('DIV');
    expect(el.children.length).toBe(3);
    expect(container.firstElementChild).toBe(el);
  });

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref} data-testid="ref-grid" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes WCAG 2.2 AA accessibility audit', async () => {
    const { container } = render(
      <Grid as="section" aria-label="Feature grid" columns={2} gap={4}>
        <article>
          <h2>Feature 1</h2>
          <p>Details</p>
        </article>
        <article>
          <h2>Feature 2</h2>
          <p>Details</p>
        </article>
      </Grid>
    );
    await expectNoA11yViolations(container);
  });
});

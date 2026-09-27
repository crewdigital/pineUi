import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, expectNoA11yViolations } from '@pine-ui/testing';
import { Cluster } from './cluster.js';

describe('Cluster Primitive', () => {
  it('renders cluster container with distinct rowGap and columnGap', () => {
    const { container } = render(
      <Cluster data-testid="cluster-root" rowGap={4} columnGap={2}>
        <span>Tag 1</span>
        <span>Tag 2</span>
      </Cluster>
    );
    const el = screen.getByTestId('cluster-root');
    expect(el.tagName).toBe('DIV');
    expect(el.children.length).toBe(2);
    expect(container.firstElementChild).toBe(el);
  });

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Cluster ref={ref} data-testid="ref-cluster" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes WCAG 2.2 AA accessibility audit', async () => {
    const { container } = render(
      <Cluster as="nav" aria-label="Tag filtering">
        <button type="button">All</button>
        <button type="button">Design</button>
      </Cluster>
    );
    await expectNoA11yViolations(container);
  });
});

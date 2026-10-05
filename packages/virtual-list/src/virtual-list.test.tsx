import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, expectNoA11yViolations, fireEvent } from '@pine-ui/testing';
import { VirtualList } from './virtual-list.js';

describe('@pine-ui/virtual-list', () => {
  it('virtualizes 10,000 items into a shallow DOM window', () => {
    const { container } = render(
      <VirtualList
        itemCount={10000}
        itemHeight={30}
        height={300}
        overscan={2}
        renderItem={(index) => <span>Item #{index}</span>}
      />
    );

    const renderedItems = container.querySelectorAll('[role="listitem"]');
    // Height 300 / 30 = 10 items + overscan buffer (~12-15 items)
    expect(renderedItems.length).toBeLessThan(20);
    expect(renderedItems.length).toBeGreaterThan(5);

    // Verify first item
    expect(screen.getByText('Item #0')).toBeDefined();
    // Item 500 should NOT be rendered in initial window
    expect(screen.queryByText('Item #500')).toBeNull();
  });

  it('exposes correct accessibility attributes', async () => {
    const { container } = render(
      <VirtualList
        itemCount={100}
        itemHeight={40}
        height={200}
        aria-label="Users list"
        renderItem={(index) => <div>User #{index}</div>}
      />
    );

    const list = screen.getByRole('list', { name: 'Users list' });
    expect(list).toBeDefined();

    const firstItem = container.querySelector('[role="listitem"]');
    expect(firstItem?.getAttribute('aria-setsize')).toBe('100');
    expect(firstItem?.getAttribute('aria-posinset')).toBe('1');

    await expectNoA11yViolations(container);
  });

  it('updates rendered window on scroll event', () => {
    const { container } = render(
      <VirtualList
        itemCount={1000}
        itemHeight={30}
        height={300}
        overscan={1}
        renderItem={(index) => <span>Row #{index}</span>}
      />
    );

    const scrollContainer = container.querySelector('[role="list"]')!;
    // Simulate scroll to scrollTop = 300 (item index 10)
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 300 } });

    // Item #10 should now be visible
    expect(screen.getByText('Row #10')).toBeDefined();
  });
});

import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Badge } from './badge.js';

describe('Badge', () => {
  it('renders as a <span> by default with children', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toBeDefined();
    expect(badge.tagName).toBe('SPAN');
  });

  it('renders status dot when dot={true}', () => {
    render(<Badge dot>Active</Badge>);
    expect(screen.getByText('Active')).toBeDefined();
  });

  it('renders leading and trailing icons', () => {
    render(
      <Badge
        iconStart={<span data-testid="start">★</span>}
        iconEnd={<span data-testid="end">✓</span>}
      >
        Verified
      </Badge>
    );
    expect(screen.getByTestId('start')).toBeDefined();
    expect(screen.getByTestId('end')).toBeDefined();
  });

  it('supports polymorphic "as" prop', () => {
    render(
      <Badge as="div" data-testid="div-badge">
        Tag
      </Badge>
    );
    const badge = screen.getByTestId('div-badge');
    expect(badge.tagName).toBe('DIV');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref test</Badge>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });
});

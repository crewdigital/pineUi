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
        iconStart={
          <span data-testid="start">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
        }
        iconEnd={
          <span data-testid="end">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
        }
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

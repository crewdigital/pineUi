import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { Link } from './link.js';

describe('Link', () => {
  it('renders as an <a> tag with href', () => {
    render(<Link href="https://example.com">Example</Link>);
    const link = screen.getByRole('link', { name: 'Example' });
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('https://example.com');
  });

  it('automatically sets target="_blank" and rel="noopener noreferrer" when external={true}', () => {
    render(
      <Link href="https://example.com" external>
        External Site
      </Link>
    );
    const link = screen.getByRole('link', { name: 'External Site' });
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });

  it('disables click and sets aria-disabled when disabled={true}', () => {
    const handleClick = vi.fn();
    render(
      <Link href="#" disabled onClick={handleClick}>
        Disabled Link
      </Link>
    );
    const link = screen.getByText('Disabled Link');
    expect(link.getAttribute('aria-disabled')).toBe('true');
    expect(link.getAttribute('tabIndex')).toBe('-1');

    fireEvent.click(link);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('supports polymorphic "as" rendering (e.g. custom router button)', () => {
    render(
      <Link as="button" onClick={() => {}}>
        Router Action
      </Link>
    );
    const element = screen.getByRole('button', { name: 'Router Action' });
    expect(element.tagName).toBe('BUTTON');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Link ref={ref} href="#">
        Ref Link
      </Link>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('A');
  });
});

import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Spinner } from './spinner.js';

describe('Spinner', () => {
  it('renders an SVG with role="status" and default aria-label', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status', { name: 'Loading...' });
    expect(spinner).toBeDefined();
    expect(spinner.tagName).toBe('svg');
  });

  it('supports custom accessible label', () => {
    render(<Spinner label="Fetching data..." />);
    const spinner = screen.getByRole('status', { name: 'Fetching data...' });
    expect(spinner).toBeDefined();
  });

  it('forwards ref to SVG element', () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('svg');
  });
});

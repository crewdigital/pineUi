import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Progress } from './progress.js';

describe('Progress', () => {
  it('renders progressbar with aria attributes for determinate progress', () => {
    render(<Progress value={45} max={100} label="Uploading file" />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeDefined();
    expect(progress.getAttribute('aria-valuenow')).toBe('45');
    expect(progress.getAttribute('aria-valuemin')).toBe('0');
    expect(progress.getAttribute('aria-valuemax')).toBe('100');
    expect(progress.getAttribute('aria-valuetext')).toBe('45%');
  });

  it('renders indeterminate state when value is omitted', () => {
    render(<Progress label="Processing..." />);
    const progress = screen.getByRole('progressbar');
    expect(progress.hasAttribute('aria-valuenow')).toBe(false);
  });

  it('renders visible label and value percentage', () => {
    render(<Progress value={75} label="Download progress" />);
    expect(screen.getByText('Download progress')).toBeDefined();
    expect(screen.getByText('75%')).toBeDefined();
  });

  it('forwards ref to track element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={10} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.getAttribute('role')).toBe('progressbar');
  });
});

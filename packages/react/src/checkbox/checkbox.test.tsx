import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './checkbox.js';

describe('Checkbox', () => {
  it('renders a native checkbox linked to label', () => {
    render(<Checkbox label="Accept Terms & Conditions" />);
    const checkbox = screen.getByLabelText('Accept Terms & Conditions');
    expect(checkbox).toBeDefined();
    expect((checkbox as HTMLInputElement).type).toBe('checkbox');
  });

  it('toggles checked state when clicked in uncontrolled mode', () => {
    render(<Checkbox label="Subscribe to newsletter" />);
    const checkbox = screen.getByLabelText('Subscribe to newsletter') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('handles onChange handler when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Enable notifications" onChange={handleChange} />);
    const checkbox = screen.getByLabelText('Enable notifications');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('sets input.indeterminate property when indeterminate={true}', () => {
    render(<Checkbox label="Select All" indeterminate />);
    const checkbox = screen.getByLabelText('Select All') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('disables interactions when disabled={true}', () => {
    render(<Checkbox label="Disabled option" disabled />);
    const checkbox = screen.getByLabelText('Disabled option');
    expect(checkbox.hasAttribute('disabled')).toBe(true);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="Ref checkbox" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});

import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './switch.js';

describe('Switch', () => {
  it('renders a switch element with role="switch" linked to label', () => {
    render(<Switch label="Enable Dark Mode" />);
    const switchEl = screen.getByLabelText('Enable Dark Mode');
    expect(switchEl).toBeDefined();
    expect(switchEl.getAttribute('role')).toBe('switch');
  });

  it('toggles checked state when clicked in uncontrolled mode', () => {
    render(<Switch label="Push notifications" />);
    const switchEl = screen.getByLabelText('Push notifications') as HTMLInputElement;
    expect(switchEl.checked).toBe(false);

    fireEvent.click(switchEl);
    expect(switchEl.checked).toBe(true);
    expect(switchEl.getAttribute('aria-checked')).toBe('true');
  });

  it('handles onChange callback when toggled', () => {
    const handleChange = vi.fn();
    render(<Switch label="Auto-save" onChange={handleChange} />);
    const switchEl = screen.getByLabelText('Auto-save');
    fireEvent.click(switchEl);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('disables interactions when disabled={true}', () => {
    render(<Switch label="Disabled feature" disabled />);
    const switchEl = screen.getByLabelText('Disabled feature');
    expect(switchEl.hasAttribute('disabled')).toBe(true);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Switch ref={ref} label="Ref switch" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});

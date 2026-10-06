import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { TextField } from './text-field.js';

describe('TextField', () => {
  it('renders an input element linked to label via id/htmlFor', () => {
    render(<TextField label="Email address" placeholder="user@example.com" />);
    const input = screen.getByLabelText('Email address');
    expect(input).toBeDefined();
    expect(input.getAttribute('placeholder')).toBe('user@example.com');
  });

  it('handles user typing and value updates', () => {
    const handleChange = vi.fn();
    render(<TextField label="Username" onChange={handleChange} />);
    const input = screen.getByLabelText('Username');
    fireEvent.change(input, { target: { value: 'alice' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((input as HTMLInputElement).value).toBe('alice');
  });

  it('links aria-describedby to helperText', () => {
    render(<TextField label="Password" helperText="Must be at least 8 characters" />);
    const input = screen.getByLabelText('Password');
    const helper = screen.getByText('Must be at least 8 characters');
    expect(input.getAttribute('aria-describedby')).toBe(helper.id);
  });

  it('links aria-describedby to errorMessage and sets aria-invalid when in error state', () => {
    render(
      <TextField
        label="Email"
        errorMessage="Invalid email address"
      />
    );
    const input = screen.getByLabelText('Email');
    const errorMsg = screen.getByRole('alert');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe(errorMsg.id);
    expect(errorMsg.textContent).toBe('Invalid email address');
  });

  it('renders leading and trailing icons inside field', () => {
    render(
      <TextField
        label="Search"
        iconStart={
          <span data-testid="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" />
            </svg>
          </span>
        }
        iconEnd={
          <span data-testid="clear-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </span>
        }
      />
    );
    expect(screen.getByTestId('search-icon')).toBeDefined();
    expect(screen.getByTestId('clear-icon')).toBeDefined();
  });

  it('disables input when disabled={true}', () => {
    render(<TextField label="Disabled input" disabled />);
    const input = screen.getByLabelText('Disabled input');
    expect(input.hasAttribute('disabled')).toBe(true);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TextField ref={ref} label="Ref field" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('renders prefix and suffix adornments', () => {
    render(
      <TextField
        label="Price"
        prefix="$"
        suffix="USD"
        defaultValue="99"
      />
    );
    expect(screen.getByText('$')).toBeDefined();
    expect(screen.getByText('USD')).toBeDefined();
  });

  it('renders clear button when clearable={true} and clears input value on click', () => {
    const onClear = vi.fn();
    render(
      <TextField
        label="Filter"
        clearable
        defaultValue="search term"
        onClear={onClear}
      />
    );
    const input = screen.getByLabelText('Filter') as HTMLInputElement;
    expect(input.value).toBe('search term');

    const clearButton = screen.getByRole('button', { name: 'Clear input' });
    fireEvent.click(clearButton);

    expect(input.value).toBe('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('toggles password visibility between password and text', () => {
    render(<TextField label="Password" type="password" defaultValue="secret123" />);
    const input = screen.getByLabelText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');

    const toggleButton = screen.getByRole('button', { name: 'Show password' });
    fireEvent.click(toggleButton);

    expect(input.type).toBe('text');
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(input.type).toBe('password');
  });
});

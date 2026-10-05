import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { useControllableState } from './use-controllable-state.js';

function TestComponent({
  value: propValue,
  defaultValue = 'initial',
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
}) {
  const [value, setValue] = useControllableState({
    prop: propValue,
    defaultProp: defaultValue,
    onChange,
  });

  return (
    <div>
      <span data-testid="value">{value}</span>
      <button
        data-testid="update-btn"
        onClick={() => setValue('updated')}
      >
        Update
      </button>
    </div>
  );
}

describe('useControllableState', () => {
  it('manages uncontrolled state with defaultProp', () => {
    render(<TestComponent defaultValue="uncontrolled" />);
    expect(screen.getByTestId('value').textContent).toBe('uncontrolled');

    fireEvent.click(screen.getByTestId('update-btn'));
    expect(screen.getByTestId('value').textContent).toBe('updated');
  });

  it('operates in controlled mode when prop is provided', () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <TestComponent value="controlled-1" onChange={handleChange} />
    );

    expect(screen.getByTestId('value').textContent).toBe('controlled-1');

    fireEvent.click(screen.getByTestId('update-btn'));
    expect(handleChange).toHaveBeenCalledWith('updated');
    // In controlled mode, value stays controlled until parent rerenders with new prop
    expect(screen.getByTestId('value').textContent).toBe('controlled-1');

    rerender(<TestComponent value="controlled-2" onChange={handleChange} />);
    expect(screen.getByTestId('value').textContent).toBe('controlled-2');
  });
});

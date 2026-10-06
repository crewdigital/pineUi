import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, expectNoA11yViolations } from '@pine-ui/testing';
import { DatePicker } from './datepicker.js';

describe('@pine-ui/datepicker', () => {
  it('renders input with placeholder and label', async () => {
    const { container } = render(
      <DatePicker label="Departure Date" placeholder="Choose a date" />
    );

    expect(screen.getByLabelText('Departure Date')).toBeDefined();
    const input = screen.getByPlaceholderText('Choose a date');
    expect(input).toBeDefined();

    await expectNoA11yViolations(container);
  });

  it('opens calendar dialog on toggle button click', async () => {
    const { container } = render(<DatePicker label="Birth date" />);

    const toggleBtn = screen.getByRole('button', { name: 'Toggle calendar' });
    fireEvent.click(toggleBtn);

    const dialog = screen.getByRole('dialog', { name: 'Choose date' });
    expect(dialog).toBeDefined();

    const grid = screen.getByRole('grid');
    expect(grid).toBeDefined();

    await expectNoA11yViolations(container);
  });

  it('selects a date and invokes onChange', () => {
    const onChange = vi.fn();
    render(
      <DatePicker
        defaultValue={new Date(2026, 9, 1)} // Oct 1, 2026
        onChange={onChange}
      />
    );

    // Open calendar
    const toggleBtn = screen.getByRole('button', { name: 'Toggle calendar' });
    fireEvent.click(toggleBtn);

    // Click day 15
    const day15Btn = screen.getByRole('button', { name: /October 15, 2026/i });
    fireEvent.click(day15Btn);

    expect(onChange).toHaveBeenCalled();
    const selected = onChange.mock.calls[0]?.[0] as Date;
    expect(selected).toBeDefined();
    expect(selected.getDate()).toBe(15);
    expect(selected.getMonth()).toBe(9);
    expect(selected.getFullYear()).toBe(2026);
  });

  it('renders quick-select preset chips and applies them', () => {
    const onRangeChange = vi.fn();
    render(
      <DatePicker
        mode="range"
        presets
        onRangeChange={onRangeChange}
      />
    );

    const toggleBtn = screen.getByRole('button', { name: 'Toggle calendar' });
    fireEvent.click(toggleBtn);

    const last7Btn = screen.getByRole('button', { name: 'Last 7 Days' });
    expect(last7Btn).toBeDefined();

    fireEvent.click(last7Btn);
    expect(onRangeChange).toHaveBeenCalled();
    const range = onRangeChange.mock.calls[0]?.[0];
    expect(range.start).toBeDefined();
    expect(range.end).toBeDefined();
  });

  it('renders dual-month calendars when months=2', () => {
    render(
      <DatePicker
        defaultValue={new Date(2026, 9, 1)}
        months={2}
      />
    );

    const toggleBtn = screen.getByRole('button', { name: 'Toggle calendar' });
    fireEvent.click(toggleBtn);

    const grids = screen.getAllByRole('grid');
    expect(grids.length).toBe(2);
    expect(screen.getByText(/October 2026/i)).toBeDefined();
    expect(screen.getByText(/November 2026/i)).toBeDefined();
  });
});


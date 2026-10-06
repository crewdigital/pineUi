import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './select.js';

describe('Select', () => {
  it('renders trigger with accessible attributes and toggles listbox on click', () => {
    render(
      <Select defaultValue="apple">
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDefined();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('listbox')).toBeNull();

    fireEvent.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeDefined();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(2);
    expect(options[0]?.getAttribute('aria-selected')).toBe('true');
    expect(options[1]?.getAttribute('aria-selected')).toBe('false');
  });

  it('selects option on click and updates value', async () => {
    const handleChange = vi.fn();
    render(
      <Select defaultValue="apple" onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    const banana = screen.getByRole('option', { name: 'Banana' });
    fireEvent.click(banana);

    expect(handleChange).toHaveBeenCalledWith('banana');
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).toBeNull();
    });
  });

  it('does not select disabled option', () => {
    const handleChange = vi.fn();
    render(
      <Select defaultOpen onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mango" disabled>Mango</SelectItem>
        </SelectContent>
      </Select>
    );

    const mango = screen.getByRole('option', { name: 'Mango' });
    expect(mango.getAttribute('aria-disabled')).toBe('true');

    fireEvent.click(mango);
    expect(handleChange).not.toHaveBeenCalled();
    expect(screen.getByRole('listbox')).toBeDefined();
  });

  it('renders groups, labels, and hidden input for form integration', () => {
    const { container } = render(
      <Select name="theme" defaultValue="dark">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Appearance</SelectLabel>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    );

    const hiddenInput = container.querySelector('input[type="hidden"]');
    expect(hiddenInput).toBeDefined();
    expect(hiddenInput?.getAttribute('name')).toBe('theme');
    expect(hiddenInput?.getAttribute('value')).toBe('dark');
  });

  it('supports multiple mode with tags/chips and removal', () => {
    const handleValuesChange = vi.fn();
    render(
      <Select multiple defaultValues={['apple']} onValuesChange={handleValuesChange}>
        <SelectTrigger>
          <SelectValue placeholder="Pick fruits" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
    );

    // Initial chip for apple (prior to listbox mount)
    expect(screen.getByText('apple')).toBeDefined();
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    // Select Banana
    const banana = screen.getByRole('option', { name: 'Banana' });
    fireEvent.click(banana);

    expect(handleValuesChange).toHaveBeenCalledWith(['apple', 'banana']);

    // Remove apple chip (now registered as Apple)
    const removeApple = screen.getByRole('button', { name: 'Remove Apple' });
    fireEvent.click(removeApple);

    expect(handleValuesChange).toHaveBeenCalledWith(['banana']);
  });
});

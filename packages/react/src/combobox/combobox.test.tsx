import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
} from './combobox.js';

describe('Combobox', () => {
  it('renders input with combobox role and opens options on focus', () => {
    render(
      <Combobox>
        <ComboboxInput placeholder="Search framework..." />
        <ComboboxContent>
          <ComboboxItem value="react">React</ComboboxItem>
          <ComboboxItem value="vue">Vue</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    );

    const input = screen.getByRole('combobox');
    expect(input.getAttribute('aria-autocomplete')).toBe('list');
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('listbox')).toBeNull();

    fireEvent.focus(input);

    expect(input.getAttribute('aria-expanded')).toBe('true');
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeDefined();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(2);
  });

  it('selects option on click and updates query and value', async () => {
    const handleValueChange = vi.fn();
    render(
      <Combobox onValueChange={handleValueChange}>
        <ComboboxInput />
        <ComboboxContent>
          <ComboboxItem value="svelte">Svelte</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    );

    const input = screen.getByRole('combobox') as HTMLInputElement;
    fireEvent.focus(input);

    const item = screen.getByRole('option', { name: 'Svelte' });
    fireEvent.click(item);

    expect(handleValueChange).toHaveBeenCalledWith('svelte');
    expect(input.value).toBe('Svelte');

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).toBeNull();
    });
  });

  it('renders empty message when no items match', () => {
    render(
      <Combobox defaultOpen>
        <ComboboxInput />
        <ComboboxContent>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    );

    expect(screen.getByText('No results found.')).toBeDefined();
  });

  it('supports multiple mode with chip tags, chip removal, and backspace deletion', () => {
    const handleValuesChange = vi.fn();
    render(
      <Combobox multiple defaultValues={['react']} onValuesChange={handleValuesChange}>
        <ComboboxInput placeholder="Select frameworks..." />
        <ComboboxContent>
          <ComboboxItem value="react">React</ComboboxItem>
          <ComboboxItem value="vue">Vue</ComboboxItem>
          <ComboboxItem value="angular">Angular</ComboboxItem>
        </ComboboxContent>
      </Combobox>
    );

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);

    // Initial chip
    expect(screen.getByText('React')).toBeDefined();

    // Select Vue
    const vue = screen.getByRole('option', { name: 'Vue' });
    fireEvent.click(vue);

    expect(handleValuesChange).toHaveBeenCalledWith(['react', 'vue']);

    // Backspace deletion when query is empty
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(handleValuesChange).toHaveBeenCalledWith(['react']);

    // Remove chip via removal button
    const removeReact = screen.getByRole('button', { name: 'Remove React' });
    fireEvent.click(removeReact);

    expect(handleValuesChange).toHaveBeenCalledWith([]);
  });
});

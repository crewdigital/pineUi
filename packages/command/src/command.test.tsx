import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, expectNoA11yViolations } from '@pine-ui/testing';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandLegend,
  CommandRecent,
} from './command.js';

describe('@pine-ui/command', () => {
  it('renders command palette with input, items, shortcuts, and satisfies accessibility', async () => {
    const { container } = render(
      <Command aria-label="Command palette">
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No matching commands.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem value="new-file">
              <span>New File</span>
              <CommandShortcut>Ctrl+N</CommandShortcut>
            </CommandItem>
            <CommandItem value="copy-link">
              <span>Copy Link</span>
              <CommandShortcut>Ctrl+C</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const input = screen.getByRole('combobox', { name: 'Search documentation...' });
    expect(input).toBeDefined();

    expect(screen.getByText('New File')).toBeDefined();
    expect(screen.getByText('Copy Link')).toBeDefined();
    expect(screen.getByText('Ctrl+N')).toBeDefined();

    await expectNoA11yViolations(container);
  });

  it('filters command items based on user input', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem value="profile">Profile Settings</CommandItem>
            <CommandItem value="billing">Billing Info</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const input = screen.getByRole('combobox');
    expect(screen.getByText('Profile Settings')).toBeDefined();
    expect(screen.getByText('Billing Info')).toBeDefined();

    // Type "billing"
    fireEvent.change(input, { target: { value: 'billing' } });

    expect(screen.queryByText('Profile Settings')).toBeNull();
    expect(screen.getByText('Billing Info')).toBeDefined();
  });

  it('handles item selection on click', () => {
    const onSelect = vi.fn();
    render(
      <Command>
        <CommandInput />
        <CommandList>
          <CommandItem onSelect={onSelect}>Deploy Application</CommandItem>
        </CommandList>
      </Command>
    );

    const item = screen.getByText('Deploy Application');
    fireEvent.click(item);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('renders command legend with navigation hints', () => {
    render(
      <Command>
        <CommandInput />
        <CommandList>
          <CommandItem>Documentation</CommandItem>
        </CommandList>
        <CommandLegend />
      </Command>
    );

    expect(screen.getByTestId('command-legend')).toBeDefined();
    expect(screen.getByText('Navigate')).toBeDefined();
    expect(screen.getByText('Select')).toBeDefined();
    expect(screen.getByText('Close')).toBeDefined();
  });

  it('persists selected items into CommandRecent', () => {
    const key = 'test-command-recent';
    window.localStorage.removeItem(key);

    const { rerender } = render(
      <Command recentStorageKey={key}>
        <CommandInput />
        <CommandList>
          <CommandRecent heading="Recent Items" />
          <CommandGroup heading="Actions">
            <CommandItem value="open-settings">Open Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    // Click item to add to recent
    const item = screen.getByText('Open Settings');
    fireEvent.click(item);

    // Re-render and check recent items section
    rerender(
      <Command recentStorageKey={key}>
        <CommandInput />
        <CommandList>
          <CommandRecent heading="Recent Items" />
          <CommandGroup heading="Actions">
            <CommandItem value="open-settings">Open Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByText('Recent Items')).toBeDefined();
    expect(screen.getByText('Recent')).toBeDefined();
  });

  it('renders CommandEmpty with suggestions when no matches are found', () => {
    const onSuggestionSelect = vi.fn();
    render(
      <Command>
        <CommandInput />
        <CommandList>
          <CommandEmpty
            suggestions={['Billing', 'API Keys']}
            onSuggestionSelect={onSuggestionSelect}
          >
            No matches found
          </CommandEmpty>
          <CommandItem value="settings">Settings</CommandItem>
        </CommandList>
      </Command>
    );

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'zzzzzz' } });

    expect(screen.getByText('No matches found')).toBeDefined();
    const billingBtn = screen.getByRole('button', { name: 'Billing' });
    expect(billingBtn).toBeDefined();

    fireEvent.click(billingBtn);
    expect(onSuggestionSelect).toHaveBeenCalledWith('Billing');
  });

  it('supports explicit RTL direction and logical layout alignment', () => {
    const { container } = render(
      <Command dir="rtl" aria-label="لوحة الأوامر">
        <CommandInput placeholder="ابحث عن أمر..." />
        <CommandList>
          <CommandItem value="settings">
            <span>الإعدادات</span>
            <CommandShortcut>Ctrl+S</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>
    );

    const commandRoot = container.firstElementChild as HTMLElement;
    expect(commandRoot.getAttribute('dir')).toBe('rtl');
    expect(screen.getByText('الإعدادات')).toBeDefined();
    const shortcut = screen.getByText('Ctrl+S');
    expect(shortcut.style.marginInlineStart).toBe('auto');
  });
});

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
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem value="copy-link">
              <span>Copy Link</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const input = screen.getByRole('combobox', { name: 'Search documentation...' });
    expect(input).toBeDefined();

    expect(screen.getByText('New File')).toBeDefined();
    expect(screen.getByText('Copy Link')).toBeDefined();
    expect(screen.getByText('⌘N')).toBeDefined();

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
});

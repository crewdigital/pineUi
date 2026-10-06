import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuGroup,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
} from './menu.js';

describe('Menu', () => {
  it('renders trigger with aria attributes and toggles content on click', async () => {
    render(
      <Menu>
        <MenuTrigger>Options</MenuTrigger>
        <MenuContent>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Duplicate</MenuItem>
        </MenuContent>
      </Menu>
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('menu')).toBeNull();

    fireEvent.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const menu = screen.getByRole('menu');
    expect(menu).toBeDefined();

    const items = screen.getAllByRole('menuitem');
    expect(items.length).toBe(2);
  });

  it('calls onSelect and closes the menu when item is clicked', async () => {
    const handleSelect = vi.fn();
    render(
      <Menu defaultOpen>
        <MenuTrigger>Options</MenuTrigger>
        <MenuContent>
          <MenuItem onSelect={handleSelect}>Copy</MenuItem>
        </MenuContent>
      </Menu>
    );

    const item = screen.getByRole('menuitem', { name: 'Copy' });
    fireEvent.click(item);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeNull();
    });
  });

  it('does not trigger onSelect on disabled menu item', () => {
    const handleSelect = vi.fn();
    render(
      <Menu defaultOpen>
        <MenuTrigger>Options</MenuTrigger>
        <MenuContent>
          <MenuItem disabled onSelect={handleSelect}>
            Delete
          </MenuItem>
        </MenuContent>
      </Menu>
    );

    const item = screen.getByRole('menuitem', { name: 'Delete' });
    expect(item.getAttribute('aria-disabled')).toBe('true');
    expect(item.hasAttribute('disabled')).toBe(true);

    fireEvent.click(item);
    expect(handleSelect).not.toHaveBeenCalled();
    // Menu should still be open
    expect(screen.getByRole('menu')).toBeDefined();
  });

  it('renders groups, labels, separators, and shortcuts', () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent>
          <MenuGroup>
            <MenuLabel>File</MenuLabel>
            <MenuItem>
              <span>Save</span>
              <MenuShortcut>Ctrl+S</MenuShortcut>
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem>Exit</MenuItem>
        </MenuContent>
      </Menu>
    );

    expect(screen.getByRole('group')).toBeDefined();
    expect(screen.getByText('File')).toBeDefined();
    expect(screen.getByRole('separator')).toBeDefined();
    expect(screen.getByText('Ctrl+S')).toBeDefined();
  });

  it('closes menu on Escape key press', async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent>
          <MenuItem>Item 1</MenuItem>
        </MenuContent>
      </Menu>
    );

    expect(screen.getByRole('menu')).toBeDefined();

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeNull();
    });
  });
});

import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './popover.js';

describe('Popover', () => {
  it('renders trigger with correct initial ARIA attributes', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Menu</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens and closes popover on trigger click', () => {
    render(
      <Popover>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Toggle' });

    // Open
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();
    expect(dialog.textContent).toContain('Popover body');
    expect(trigger.getAttribute('aria-controls')).toBe(dialog.id);

    // Close
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes popover on Escape key', () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    );

    expect(screen.getByRole('dialog')).toBeDefined();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes popover when clicking PopoverClose button', () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>
          <p>Settings</p>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
    );

    const closeBtn = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes when clicking outside content and trigger', () => {
    render(
      <div>
        <span data-testid="outside">Outside Element</span>
        <Popover defaultOpen>
          <PopoverTrigger>Toggle</PopoverTrigger>
          <PopoverContent>Inside Popover</PopoverContent>
        </Popover>
      </div>
    );

    expect(screen.getByRole('dialog')).toBeDefined();

    const outsideEl = screen.getByTestId('outside');
    fireEvent.pointerDown(outsideEl);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('supports controlled mode', () => {
    const onOpenChange = vi.fn();
    render(
      <Popover open={true} onOpenChange={onOpenChange}>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Controlled</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Toggle' });
    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

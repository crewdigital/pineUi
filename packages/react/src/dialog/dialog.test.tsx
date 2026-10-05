import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog.js';

describe('Dialog', () => {
  it('renders trigger and opens dialog upon click with accessible attributes', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Account Deletion</DialogTitle>
              <DialogDescription>Are you sure you want to delete your account?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );

    const trigger = screen.getByRole('button', { name: 'Open Dialog' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('dialog')).toBeNull();

    // Click to open
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();
    expect(dialog.getAttribute('aria-modal')).toBe('true');

    const title = screen.getByRole('heading', { name: 'Account Deletion' });
    const description = screen.getByText('Are you sure you want to delete your account?');

    expect(dialog.getAttribute('aria-labelledby')).toBe(title.id);
    expect(dialog.getAttribute('aria-describedby')).toBe(description.id);
  });

  it('closes dialog on Escape key press', () => {
    render(
      <Dialog defaultOpen>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeDefined();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes dialog when clicking DialogClose button', () => {
    render(
      <Dialog defaultOpen>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
            <DialogClose>Dismiss</DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );

    const closeBtn = screen.getByRole('button', { name: 'Dismiss' });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes dialog on outside click', () => {
    render(
      <div>
        <span data-testid="outside">Outside</span>
        <Dialog defaultOpen>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogTitle>Inside</DialogTitle>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    );

    expect(screen.getByRole('dialog')).toBeDefined();

    fireEvent.pointerDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('locks body scroll when open and restores on unmount', () => {
    const { unmount } = render(
      <Dialog defaultOpen>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Scroll Locked</DialogTitle>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );

    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('supports controlled open state', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open={true} onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Controlled</DialogTitle>
            <DialogClose>Close</DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );

    const closeBtn = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeBtn);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

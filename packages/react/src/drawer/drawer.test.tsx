import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from './drawer.js';

describe('Drawer', () => {
  it('renders trigger with aria attributes and opens dialog', async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Sheet</DrawerTrigger>
        <DrawerPortal>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Navigation Menu</DrawerTitle>
              <DrawerDescription>Browse application sections</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>Content here</DrawerBody>
            <DrawerFooter>
              <DrawerClose>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    );

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();
    expect(dialog.getAttribute('aria-modal')).toBe('true');

    const title = screen.getByRole('heading', { name: 'Navigation Menu' });
    expect(title).toBeDefined();
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.id);

    const desc = screen.getByText('Browse application sections');
    expect(dialog.getAttribute('aria-describedby')).toBe(desc.id);
  });

  it('closes when close button is clicked', async () => {
    render(
      <Drawer defaultOpen>
        <DrawerPortal>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit Profile</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>Dismiss</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();

    const closeBtn = screen.getByRole('button', { name: 'Dismiss' });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('closes on Escape key press', async () => {
    render(
      <Drawer defaultOpen>
        <DrawerPortal>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    );

    expect(screen.getByRole('dialog')).toBeDefined();

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });
});

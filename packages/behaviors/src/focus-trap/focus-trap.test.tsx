import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { useFocusTrap } from './focus-trap.js';

function TrapModal({ enabled = true }: { enabled?: boolean }) {
  const ref = useFocusTrap<HTMLDivElement>({ enabled, autoFocus: true, restoreFocus: true });
  return (
    <div ref={ref} data-testid="modal">
      <button data-testid="first-btn">First</button>
      <input data-testid="input" placeholder="Name" />
      <button data-testid="last-btn">Last</button>
    </div>
  );
}

describe('useFocusTrap', () => {
  it('traps Tab focus within the container boundaries', () => {
    render(
      <div>
        <button data-testid="outside-btn">Outside</button>
        <TrapModal />
      </div>
    );

    const firstBtn = screen.getByTestId('first-btn');
    const lastBtn = screen.getByTestId('last-btn');

    // Simulate Tab on last button -> loops to first button
    lastBtn.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(firstBtn);

    // Simulate Shift+Tab on first button -> loops to last button
    firstBtn.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastBtn);
  });

  it('restores focus to trigger element on unmount', () => {
    const { rerender } = render(
      <div>
        <button data-testid="trigger">Trigger</button>
      </div>
    );

    const trigger = screen.getByTestId('trigger');
    trigger.focus();

    rerender(
      <div>
        <button data-testid="trigger">Trigger</button>
        <TrapModal />
      </div>
    );

    rerender(
      <div>
        <button data-testid="trigger">Trigger</button>
      </div>
    );

    expect(document.activeElement).toBe(trigger);
  });
});

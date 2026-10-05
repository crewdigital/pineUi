import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { useDismiss } from './dismiss.js';

function DismissablePopover({ onDismiss }: { onDismiss: () => void }) {
  const ref = useDismiss<HTMLDivElement>({ onDismiss });
  return (
    <div ref={ref} data-testid="popover">
      Popover Content
    </div>
  );
}

describe('useDismiss', () => {
  it('triggers onDismiss when clicking outside the container', () => {
    const handleDismiss = vi.fn();
    render(
      <div>
        <button data-testid="outside">Outside</button>
        <DismissablePopover onDismiss={handleDismiss} />
      </div>
    );

    const outsideBtn = screen.getByTestId('outside');
    fireEvent.pointerDown(outsideBtn);
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('does NOT trigger onDismiss when clicking inside the container', () => {
    const handleDismiss = vi.fn();
    render(<DismissablePopover onDismiss={handleDismiss} />);

    const popover = screen.getByTestId('popover');
    fireEvent.pointerDown(popover);
    expect(handleDismiss).not.toHaveBeenCalled();
  });

  it('triggers onDismiss when pressing the Escape key', () => {
    const handleDismiss = vi.fn();
    render(<DismissablePopover onDismiss={handleDismiss} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });
});

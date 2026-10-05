import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './alert.js';

describe('Alert', () => {
  it('renders title and message content', () => {
    render(
      <Alert title="Update Available">
        A new software update is available for download.
      </Alert>
    );
    expect(screen.getByText('Update Available')).toBeDefined();
    expect(screen.getByText('A new software update is available for download.')).toBeDefined();
  });

  it('sets role="alert" for danger variant and role="status" for info variant', () => {
    const { rerender } = render(<Alert variant="danger">Critical Error</Alert>);
    expect(screen.getByRole('alert')).toBeDefined();

    rerender(<Alert variant="info">Information</Alert>);
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders dismiss button and triggers onClose callback when clicked', () => {
    const handleClose = vi.fn();
    render(
      <Alert onClose={handleClose} closeLabel="Close alert">
        Dismissable notification
      </Alert>
    );

    const closeBtn = screen.getByRole('button', { name: 'Close alert' });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('forwards ref to container element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Ref test</Alert>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

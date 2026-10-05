import * as React from 'react';
import { render, screen, fireEvent, act } from '@pine-ui/testing';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { toast, Toaster, clearToasts } from './toast.js';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    clearToasts();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders dispatched toasts inside Toaster viewport', () => {
    render(<Toaster />);

    act(() => {
      toast({
        title: 'File Uploaded',
        description: 'Your report is ready for viewing.',
      });
    });

    const region = screen.getByRole('region', { name: 'Notifications' });
    expect(region).toBeDefined();

    expect(screen.getByText('File Uploaded')).toBeDefined();
    expect(screen.getByText('Your report is ready for viewing.')).toBeDefined();
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders error toast with role="alert" and aria-live="assertive"', () => {
    render(<Toaster />);

    act(() => {
      toast.error('Network Error', { description: 'Failed to reach server' });
    });

    const alert = screen.getByRole('alert');
    expect(alert).toBeDefined();
    expect(alert.getAttribute('aria-live')).toBe('assertive');
    expect(screen.getByText('Network Error')).toBeDefined();
  });

  it('dismisses toast when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Toaster />);

    act(() => {
      toast({
        title: 'Dismissable',
        onClose: handleClose,
      });
    });

    expect(screen.getByText('Dismissable')).toBeDefined();

    const closeBtn = screen.getByRole('button', { name: 'Close notification' });
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Dismissable')).toBeNull();
  });

  it('auto-dismisses toast after duration expires', () => {
    render(<Toaster />);

    act(() => {
      toast({
        title: 'Auto Dismiss',
        duration: 3000,
      });
    });

    expect(screen.getByText('Auto Dismiss')).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Auto Dismiss')).toBeNull();
  });
});

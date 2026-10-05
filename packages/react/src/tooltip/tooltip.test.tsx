import * as React from 'react';
import { render, screen, fireEvent, act } from '@pine-ui/testing';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip.js';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders trigger and shows tooltip on hover after delay', () => {
    render(
      <Tooltip delayDuration={200}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Helpful info</TooltipContent>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    expect(trigger).toBeDefined();
    expect(screen.queryByRole('tooltip')).toBeNull();

    // Pointer enter starts timer
    fireEvent.pointerEnter(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();

    // Advance timer
    act(() => {
      vi.advanceTimersByTime(200);
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.textContent).toContain('Helpful info');
    expect(trigger.getAttribute('aria-describedby')).toBe(tooltip.id);

    // Pointer leave closes tooltip
    fireEvent.pointerLeave(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(trigger.getAttribute('aria-describedby')).toBeNull();
  });

  it('shows tooltip immediately when delayDuration is 0', () => {
    render(
      <Tooltip delayDuration={0}>
        <TooltipTrigger>Instant</TooltipTrigger>
        <TooltipContent>Instant content</TooltipContent>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Instant' });
    fireEvent.pointerEnter(trigger);

    expect(screen.getByRole('tooltip')).toBeDefined();
    expect(screen.getByRole('tooltip').textContent).toContain('Instant content');
  });

  it('opens on keyboard focus and closes on blur', () => {
    render(
      <Tooltip>
        <TooltipTrigger>Focus me</TooltipTrigger>
        <TooltipContent>Focused content</TooltipContent>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Focus me' });
    fireEvent.focus(trigger);

    expect(screen.getByRole('tooltip')).toBeDefined();

    fireEvent.blur(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('dismisses when pressing Escape', () => {
    render(
      <Tooltip defaultOpen>
        <TooltipTrigger>Escape test</TooltipTrigger>
        <TooltipContent>Escape content</TooltipContent>
      </Tooltip>
    );

    expect(screen.getByRole('tooltip')).toBeDefined();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('supports controlled open state', () => {
    const handleOpenChange = vi.fn();
    render(
      <Tooltip open={true} onOpenChange={handleOpenChange}>
        <TooltipTrigger>Controlled</TooltipTrigger>
        <TooltipContent>Controlled content</TooltipContent>
      </Tooltip>
    );

    expect(screen.getByRole('tooltip')).toBeDefined();
  });
});

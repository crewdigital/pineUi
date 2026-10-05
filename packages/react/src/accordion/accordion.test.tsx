import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion.js';

describe('Accordion', () => {
  it('renders single-mode accordion and toggles items', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    // Initially both closed
    expect(screen.getByText('Section 1').closest('button')?.getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByText('Section 2').closest('button')?.getAttribute('aria-expanded')).toBe('false');

    // Open first item
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Section 1').closest('button')?.getAttribute('aria-expanded')).toBe('true');

    // Open second item — first should close (single mode)
    fireEvent.click(screen.getByText('Section 2'));
    expect(screen.getByText('Section 1').closest('button')?.getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByText('Section 2').closest('button')?.getAttribute('aria-expanded')).toBe('true');
  });

  it('supports collapsible mode in single accordion', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    // Open then close via same trigger
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Section 1').closest('button')?.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Section 1').closest('button')?.getAttribute('aria-expanded')).toBe('false');
  });

  it('supports multiple-mode accordion', () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    // Open both items
    fireEvent.click(screen.getByText('Section 1'));
    fireEvent.click(screen.getByText('Section 2'));

    expect(screen.getByText('Section 1').closest('button')?.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Section 2').closest('button')?.getAttribute('aria-expanded')).toBe('true');
  });

  it('sets proper ARIA attributes on trigger and content region', () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Section 1').closest('button')!;
    const controlsId = trigger.getAttribute('aria-controls')!;
    const region = document.getElementById(controlsId)!;

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(region.getAttribute('role')).toBe('region');
    expect(region.getAttribute('aria-labelledby')).toBe(trigger.id);
  });

  it('disables interaction on disabled accordion items', () => {
    const onValueChange = vi.fn();
    render(
      <Accordion type="single" onValueChange={onValueChange}>
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Disabled</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Disabled').closest('button')!;
    expect(trigger.hasAttribute('disabled')).toBe(true);
    fireEvent.click(trigger);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

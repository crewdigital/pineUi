import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Portal } from './portal.js';

describe('Portal', () => {
  it('renders children into document.body by default', () => {
    render(
      <Portal>
        <div data-testid="portaled-content">Inside Portal</div>
      </Portal>
    );

    const el = screen.getByTestId('portaled-content');
    expect(el).toBeDefined();
    expect(el.parentElement).toBe(document.body);
  });

  it('renders children into custom container element when provided', () => {
    const customContainer = document.createElement('div');
    customContainer.setAttribute('data-testid', 'custom-target');
    document.body.appendChild(customContainer);

    render(
      <Portal container={customContainer}>
        <span data-testid="custom-child">Custom Portal Content</span>
      </Portal>
    );

    const child = screen.getByTestId('custom-child');
    expect(child.parentElement).toBe(customContainer);

    document.body.removeChild(customContainer);
  });
});

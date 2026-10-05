import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { createScopedContext } from './create-scoped-context.js';

interface AccordionContextValue {
  activeValue: string;
}

const [AccordionProvider, useAccordionContext] =
  createScopedContext<AccordionContextValue>('Accordion');

function AccordionChild() {
  const { activeValue } = useAccordionContext('AccordionChild');
  return <div data-testid="child">{activeValue}</div>;
}

describe('createScopedContext', () => {
  it('provides context value to nested children', () => {
    render(
      <AccordionProvider value={{ activeValue: 'item-1' }}>
        <AccordionChild />
      </AccordionProvider>
    );

    expect(screen.getByTestId('child').textContent).toBe('item-1');
  });

  it('throws error when child is rendered outside provider', () => {
    expect(() => render(<AccordionChild />)).toThrowError(
      '[Pine UI Error]: <AccordionChild /> must be rendered inside a <Accordion /> provider.'
    );
  });
});

import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@pine-ui/testing';
import { DirectionProvider, useDirection, useIsRtl } from './direction.js';

function TestDirectionConsumer({ propDir }: { propDir?: 'ltr' | 'rtl' }) {
  const dir = useDirection(propDir);
  const isRtl = useIsRtl(propDir);

  return (
    <div data-testid="consumer" data-dir={dir} data-is-rtl={String(isRtl)}>
      Active direction: {dir}
    </div>
  );
}

describe('@pine-ui/behaviors/direction', () => {
  it('defaults to ltr when no context or prop is provided', () => {
    render(<TestDirectionConsumer />);
    const el = screen.getByTestId('consumer');
    expect(el.getAttribute('data-dir')).toBe('ltr');
    expect(el.getAttribute('data-is-rtl')).toBe('false');
  });

  it('respects DirectionProvider with rtl', () => {
    render(
      <DirectionProvider dir="rtl">
        <TestDirectionConsumer />
      </DirectionProvider>
    );
    const el = screen.getByTestId('consumer');
    expect(el.getAttribute('data-dir')).toBe('rtl');
    expect(el.getAttribute('data-is-rtl')).toBe('true');
  });

  it('allows propDir to override DirectionProvider', () => {
    render(
      <DirectionProvider dir="rtl">
        <TestDirectionConsumer propDir="ltr" />
      </DirectionProvider>
    );
    const el = screen.getByTestId('consumer');
    expect(el.getAttribute('data-dir')).toBe('ltr');
    expect(el.getAttribute('data-is-rtl')).toBe('false');
  });

  it('supports nested DirectionProviders for localized RTL/LTR islands', () => {
    render(
      <DirectionProvider dir="rtl">
        <div data-testid="outer">
          <TestDirectionConsumer />
          <DirectionProvider dir="ltr">
            <div data-testid="inner">
              <TestDirectionConsumer />
            </div>
          </DirectionProvider>
        </div>
      </DirectionProvider>
    );

    const consumers = screen.getAllByTestId('consumer');
    expect(consumers[0]?.getAttribute('data-dir')).toBe('rtl');
    expect(consumers[1]?.getAttribute('data-dir')).toBe('ltr');
  });
});

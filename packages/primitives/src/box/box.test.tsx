import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, expectNoA11yViolations } from '@pine-ui/testing';
import { Box } from './box.js';

describe('Box Primitive', () => {
  it('renders default div element without extra wrapper nodes', () => {
    const { container } = render(<Box data-testid="box-element">Content</Box>);
    const el = screen.getByTestId('box-element');

    expect(el.tagName).toBe('DIV');
    expect(el.textContent).toBe('Content');
    expect(container.firstElementChild).toBe(el);
  });

  it('renders polymorphic elements correctly', () => {
    const { rerender } = render(
      <Box as="section" data-testid="box-poly">
        Section Content
      </Box>
    );
    expect(screen.getByTestId('box-poly').tagName).toBe('SECTION');

    rerender(
      <Box as="nav" data-testid="box-poly" aria-label="Main Navigation">
        Nav Content
      </Box>
    );
    expect(screen.getByTestId('box-poly').tagName).toBe('NAV');

    rerender(
      <Box as="span" data-testid="box-poly">
        Span Content
      </Box>
    );
    expect(screen.getByTestId('box-poly').tagName).toBe('SPAN');
  });

  it('forwards refs to underlying DOM node', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref} data-testid="ref-box">Ref Target</Box>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.getAttribute('data-testid')).toBe('ref-box');
  });

  it('applies padding and margin logical properties via StyleX classes', () => {
    render(
      <Box
        data-testid="styled-box"
        padding={4}
        paddingInline={6}
        marginBlock={2}
        borderRadius="md"
        display="flex"
      >
        Styled Box
      </Box>
    );

    const el = screen.getByTestId('styled-box');
    expect(el.className).toBeTruthy();
  });

  it('passes WCAG 2.2 AA accessibility audit', async () => {
    const { container } = render(
      <Box as="main" padding={4}>
        <h1>Heading</h1>
        <p>Main content paragraph with accessible text.</p>
      </Box>
    );

    await expectNoA11yViolations(container);
  });
});

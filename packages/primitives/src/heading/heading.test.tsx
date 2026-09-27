import * as React from 'react';
import { render, screen } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Heading } from './heading.js';

describe('Heading', () => {
  it('renders <h1> for level={1}', () => {
    render(<Heading level={1} data-testid="h">Title</Heading>);
    expect(screen.getByTestId('h').tagName).toBe('H1');
  });

  it('renders the correct heading element for each level', () => {
    const levels = [1, 2, 3, 4, 5, 6] as const;
    for (const level of levels) {
      const { unmount } = render(
        <Heading level={level} data-testid={`h${level}`}>Level {level}</Heading>
      );
      expect(screen.getByTestId(`h${level}`).tagName).toBe(`H${level}`);
      unmount();
    }
  });

  it('renders children', () => {
    render(<Heading level={2}>Section Title</Heading>);
    expect(screen.getByText('Section Title')).toBeDefined();
  });

  it('forwards ref to the heading element', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<Heading level={1} ref={ref}>Title</Heading>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('H1');
  });

  it('renders all heading sizes without error', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'] as const;
    for (const size of sizes) {
      const { unmount } = render(
        <Heading level={2} size={size} data-testid={`h-${size}`}>{size}</Heading>
      );
      expect(screen.getByTestId(`h-${size}`)).toBeDefined();
      unmount();
    }
  });

  it('renders all weights without error', () => {
    const weights = ['medium', 'semibold', 'bold'] as const;
    for (const weight of weights) {
      const { unmount } = render(
        <Heading level={3} weight={weight} data-testid={`h-${weight}`}>{weight}</Heading>
      );
      expect(screen.getByTestId(`h-${weight}`)).toBeDefined();
      unmount();
    }
  });

  it('accepts a custom className', () => {
    render(<Heading level={1} className="page-title" data-testid="h">Title</Heading>);
    expect(screen.getByTestId('h').className).toContain('page-title');
  });

  it('renders with correct level even when visual size differs', () => {
    // h3 visually styled as xl — DOM should still be H3
    render(<Heading level={3} size="xl" data-testid="h">Visual vs Semantic</Heading>);
    expect(screen.getByTestId('h').tagName).toBe('H3');
  });
});

import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, expectNoA11yViolations } from '@pine-ui/testing';
import { Icon } from './icon.js';
import { createIcon } from './create-icon.js';
import { ICON_SIZES } from './types.js';
import { Check, ChevronDown, Search } from './icons.js';

describe('@pine-ui/icons', () => {
  describe('Icon base component', () => {
    it('renders with default md size and decorative aria-hidden', () => {
      const { container } = render(
        <Icon data-testid="test-icon">
          <circle cx="12" cy="12" r="10" />
        </Icon>
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeDefined();
      expect(svg?.getAttribute('width')).toBe(String(ICON_SIZES.md));
      expect(svg?.getAttribute('height')).toBe(String(ICON_SIZES.md));
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
      expect(svg?.getAttribute('role')).toBeNull();
      expect(container.querySelector('title')).toBeNull();
    });

    it('renders custom named sizes correctly', () => {
      const { rerender, container } = render(
        <Icon size="xs">
          <path d="M0 0" />
        </Icon>
      );
      let svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe(String(ICON_SIZES.xs));

      rerender(
        <Icon size="xl">
          <path d="M0 0" />
        </Icon>
      );
      svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe(String(ICON_SIZES.xl));
    });

    it('renders custom numeric pixel sizes correctly', () => {
      const { container } = render(
        <Icon size={48}>
          <path d="M0 0" />
        </Icon>
      );
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('48');
      expect(svg?.getAttribute('height')).toBe('48');
    });

    it('applies accessibility contracts when label is provided', async () => {
      const { container } = render(
        <Icon label="Settings gear">
          <path d="M0 0" />
        </Icon>
      );
      const svg = screen.getByRole('img', { name: 'Settings gear' });
      expect(svg).toBeDefined();
      expect(svg.getAttribute('aria-hidden')).toBeNull();
      expect(svg.getAttribute('aria-label')).toBe('Settings gear');
      const title = container.querySelector('title');
      expect(title?.textContent).toBe('Settings gear');
      await expectNoA11yViolations(container);
    });

    it('supports custom color and styles', () => {
      const { container } = render(
        <Icon color="rgb(255, 0, 0)" style={{ margin: '4px' }}>
          <path d="M0 0" />
        </Icon>
      );
      const svg = container.querySelector('svg');
      expect(svg?.style.color).toBe('rgb(255, 0, 0)');
      expect(svg?.style.margin).toBe('4px');
    });

    it('forwards ref to SVGSVGElement', () => {
      const ref = React.createRef<SVGSVGElement>();
      render(
        <Icon ref={ref}>
          <path d="M0 0" />
        </Icon>
      );
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
    });
  });

  describe('createIcon factory', () => {
    it('creates an accessible icon with displayName', () => {
      const CustomIcon = createIcon({
        displayName: 'CustomStar',
        path: <polygon points="12 2 15 8 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 8 12 2" />,
      });

      expect(CustomIcon.displayName).toBe('CustomStar');

      render(<CustomIcon label="Favorite" />);
      const icon = screen.getByRole('img', { name: 'Favorite' });
      expect(icon).toBeDefined();
    });
  });

  describe('Foundational icons', () => {
    it('renders Check icon', () => {
      const { container } = render(<Check />);
      expect(container.querySelector('svg')).toBeDefined();
      expect(container.querySelector('path')).toBeDefined();
    });

    it('renders ChevronDown icon', () => {
      const { container } = render(<ChevronDown size="sm" />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe(String(ICON_SIZES.sm));
    });

    it('renders Search icon with label', () => {
      render(<Search label="Search query" />);
      expect(screen.getByRole('img', { name: 'Search query' })).toBeDefined();
    });
  });
});

import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from './icon-button.js';

describe('IconButton', () => {
  it('renders with required aria-label attribute', () => {
    render(<IconButton aria-label="Close dialog">✕</IconButton>);
    const button = screen.getByRole('button', { name: 'Close dialog' });
    expect(button).toBeDefined();
    expect(button.getAttribute('aria-label')).toBe('Close dialog');
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <IconButton aria-label="Search" onClick={handleClick}>
        🔍
      </IconButton>
    );
    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables interactions when disabled={true}', () => {
    const handleClick = vi.fn();
    render(
      <IconButton disabled aria-label="Settings" onClick={handleClick}>
        ⚙
      </IconButton>
    );
    const button = screen.getByRole('button', { name: 'Settings' });
    expect(button.hasAttribute('disabled')).toBe(true);
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading spinner and disables button when loading={true}', () => {
    render(
      <IconButton loading aria-label="Refreshing">
        ↻
      </IconButton>
    );
    const button = screen.getByRole('button', { name: 'Refreshing' });
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('renders icon passed via icon prop or children', () => {
    render(
      <IconButton aria-label="Favorite" icon={<span data-testid="fav-icon">♥</span>} />
    );
    expect(screen.getByTestId('fav-icon')).toBeDefined();
  });

  it('forwards ref to button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <IconButton ref={ref} aria-label="Menu">
        ☰
      </IconButton>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});

import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './pagination.js';

describe('Pagination', () => {
  it('renders accessible navigation landmark with items and active page', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const nav = screen.getByRole('navigation', { name: 'Pagination' });
    expect(nav).toBeDefined();

    const page1 = screen.getByRole('button', { name: '1' });
    expect(page1.getAttribute('aria-current')).toBe('page');

    const page2 = screen.getByRole('button', { name: '2' });
    expect(page2.getAttribute('aria-current')).toBeNull();

    const prev = screen.getByRole('button', { name: 'Go to previous page' });
    expect(prev).toBeDefined();

    const next = screen.getByRole('button', { name: 'Go to next page' });
    expect(next).toBeDefined();
  });

  it('triggers click handlers on pagination buttons', () => {
    const handleClick = vi.fn();
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink onClick={handleClick}>3</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const btn = screen.getByRole('button', { name: '3' });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables previous button when disabled prop is passed', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious disabled />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const prev = screen.getByRole('button', { name: 'Go to previous page' });
    expect(prev.hasAttribute('disabled')).toBe(true);
  });
});

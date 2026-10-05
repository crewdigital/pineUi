import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, expectNoA11yViolations } from '@pine-ui/testing';
import { DataGrid, type ColumnDef } from './datagrid.js';

interface TestUser {
  id: string;
  name: string;
  role: string;
}

const testColumns: ColumnDef<TestUser>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: false },
];

const testData: TestUser[] = [
  { id: '1', name: 'Alice Smith', role: 'Architect' },
  { id: '2', name: 'Bob Jones', role: 'Designer' },
];

describe('@pine-ui/datagrid', () => {
  it('renders grid with accessible row and column roles', async () => {
    const { container } = render(
      <DataGrid data={testData} columns={testColumns} aria-label="Team members" />
    );

    const grid = screen.getByRole('grid', { name: 'Team members' });
    expect(grid).toBeDefined();

    const colHeaders = screen.getAllByRole('columnheader');
    expect(colHeaders.length).toBe(2);

    expect(screen.getByText('Alice Smith')).toBeDefined();
    expect(screen.getByText('Bob Jones')).toBeDefined();

    await expectNoA11yViolations(container);
  });

  it('handles sortable column click and triggers onSortChange', () => {
    const onSort = vi.fn();
    render(
      <DataGrid
        data={testData}
        columns={testColumns}
        sortColumn="name"
        sortDirection="asc"
        onSortChange={onSort}
      />
    );

    const nameHeader = screen.getByRole('columnheader', { name: /name/i });
    expect(nameHeader.getAttribute('aria-sort')).toBe('ascending');

    fireEvent.click(nameHeader);
    expect(onSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('handles row selection and updates aria-selected', () => {
    const onSelection = vi.fn();
    const { container } = render(
      <DataGrid
        data={testData}
        columns={testColumns}
        selectedRowKeys={['1']}
        onSelectionChange={onSelection}
      />
    );

    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]?.getAttribute('aria-selected')).toBe('true');
    expect(rows[1]?.getAttribute('aria-selected')).toBe('false');

    // Click second row to select it
    fireEvent.click(rows[1]!);
    expect(onSelection).toHaveBeenCalledWith(['1', '2']);
  });

  it('renders custom empty message when data is empty', () => {
    render(
      <DataGrid data={[]} columns={testColumns} emptyMessage="No users in database" />
    );

    expect(screen.getByText('No users in database')).toBeDefined();
  });
});

import * as React from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDef<T> {
  key: string;
  header: React.ReactNode;
  width?: number | string | undefined;
  sortable?: boolean | undefined;
  renderCell?: ((row: T, index: number) => React.ReactNode) | undefined;
}

export interface DataGridProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  data: T[];
  columns: ColumnDef<T>[];
  rowKey?: ((row: T, index: number) => string | number) | keyof T | undefined;
  sortColumn?: string | null | undefined;
  sortDirection?: SortDirection | undefined;
  onSortChange?: ((columnKey: string, direction: SortDirection) => void) | undefined;
  selectedRowKeys?: (string | number)[] | undefined;
  onSelectionChange?: ((selectedKeys: (string | number)[]) => void) | undefined;
  emptyMessage?: React.ReactNode | undefined;
}

export function DataGrid<T extends Record<string, any>>(props: DataGridProps<T>) {
  const {
    data,
    columns,
    rowKey = 'id',
    sortColumn,
    sortDirection = null,
    onSortChange,
    selectedRowKeys = [],
    onSelectionChange,
    emptyMessage = 'No records found',
    style,
    className,
    ...restProps
  } = props;

  const getRowId = (row: T, index: number): string | number => {
    if (typeof rowKey === 'function') return rowKey(row, index);
    if (rowKey in row) return row[rowKey];
    return index;
  };

  const selectedSet = React.useMemo(() => new Set(selectedRowKeys), [selectedRowKeys]);

  const handleHeaderClick = (col: ColumnDef<T>) => {
    if (!col.sortable || !onSortChange) return;
    let nextDir: SortDirection = 'asc';
    if (sortColumn === col.key) {
      if (sortDirection === 'asc') nextDir = 'desc';
      else if (sortDirection === 'desc') nextDir = null;
    }
    onSortChange(col.key, nextDir);
  };

  const handleRowClick = (rowId: string | number) => {
    if (!onSelectionChange) return;
    const next = new Set(selectedSet);
    if (next.has(rowId)) next.delete(rowId);
    else next.add(rowId);
    onSelectionChange(Array.from(next));
  };

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        ...style,
      }}
      className={className}
      {...restProps}
    >
      <table
        role="grid"
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        aria-rowcount={data.length + 1}
        aria-colcount={columns.length}
        style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}
      >
        <thead role="rowgroup">
          <tr role="row" style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            {columns.map((col) => {
              const isSorted = sortColumn === col.key;
              const ariaSort = !col.sortable
                ? undefined
                : isSorted
                  ? sortDirection === 'asc'
                    ? 'ascending'
                    : sortDirection === 'desc'
                      ? 'descending'
                      : 'none'
                  : 'none';

              return (
                <th
                  key={col.key}
                  role="columnheader"
                  aria-sort={ariaSort}
                  onClick={() => handleHeaderClick(col)}
                  style={{
                    padding: '12px 16px',
                    fontWeight: 600,
                    color: '#475569',
                    cursor: col.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    width: col.width,
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {col.header}
                    {col.sortable && isSorted && sortDirection && (
                      <span aria-hidden="true" style={{ fontSize: '10px' }}>
                        {sortDirection === 'asc' ? ' ▲' : ' ▼'}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {data.length === 0 ? (
            <tr role="row">
              <td
                colSpan={columns.length}
                role="gridcell"
                style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => {
              const id = getRowId(row, rowIdx);
              const isSelected = selectedSet.has(id);

              return (
                <tr
                  key={id}
                  role="row"
                  aria-selected={onSelectionChange ? isSelected : undefined}
                  onClick={() => handleRowClick(id)}
                  style={{
                    borderBottom: rowIdx === data.length - 1 ? 'none' : '1px solid #f1f5f9',
                    backgroundColor: isSelected ? '#eff6ff' : 'transparent',
                    cursor: onSelectionChange ? 'pointer' : 'default',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {columns.map((col) => {
                    const cellContent = col.renderCell
                      ? col.renderCell(row, rowIdx)
                      : String(row[col.key] ?? '');

                    return (
                      <td
                        key={col.key}
                        role="gridcell"
                        tabIndex={-1}
                        style={{ padding: '12px 16px', color: '#1e293b' }}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

DataGrid.displayName = 'DataGrid';

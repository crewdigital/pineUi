import * as React from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDef<T> {
  key: string;
  header: React.ReactNode;
  width?: number | string | undefined;
  minWidth?: number | undefined;
  sortable?: boolean | undefined;
  resizable?: boolean | undefined;
  renderCell?: ((row: T, index: number) => React.ReactNode) | undefined;
}

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

export interface ErrorStateConfig {
  title?: string | undefined;
  message: string;
  onRetry?: (() => void) | undefined;
}

export interface DataGridProps<T = Record<string, unknown>> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  data: T[];
  columns: ColumnDef<T>[];
  rowKey?: ((row: T, index: number) => string | number) | keyof T | string | undefined;
  sortColumn?: string | null | undefined;
  sortDirection?: SortDirection | undefined;
  onSortChange?: ((columnKey: string, direction: SortDirection) => void) | undefined;
  selectedRowKeys?: (string | number)[] | undefined;
  onSelectionChange?: ((selectedKeys: (string | number)[]) => void) | undefined;
  emptyMessage?: React.ReactNode | undefined;
  emptyStateAction?: EmptyStateAction | undefined;
  errorState?: ErrorStateConfig | null | undefined;
  stickyHeader?: boolean | undefined;
  frozenLeadingColumn?: boolean | undefined;
  resizableColumns?: boolean | undefined;
  maxHeight?: number | string | undefined;
}

export function DataGrid<T extends object = Record<string, unknown>>(props: DataGridProps<T>) {
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
    emptyStateAction,
    errorState,
    stickyHeader = false,
    frozenLeadingColumn = false,
    resizableColumns = false,
    maxHeight,
    style,
    className,
    ...restProps
  } = props;

  // Track dynamic column widths for resizable columns
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    columns.forEach((col) => {
      if (typeof col.width === 'number') {
        initial[col.key] = col.width;
      }
    });
    return initial;
  });

  const resizingRef = React.useRef<{
    columnKey: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  const [activeResizingKey, setActiveResizingKey] = React.useState<string | null>(null);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const startResizing = (e: React.MouseEvent, columnKey: string, currentWidth: number) => {
    e.preventDefault();
    e.stopPropagation();
    const isRtl = containerRef.current
      ? (getComputedStyle(containerRef.current).direction === 'rtl' || containerRef.current.closest('[dir="rtl"]') !== null)
      : false;

    resizingRef.current = {
      columnKey,
      startX: e.clientX,
      startWidth: currentWidth,
    };
    setActiveResizingKey(columnKey);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizingRef.current) return;
      const rawDelta = moveEvent.clientX - resizingRef.current.startX;
      const delta = isRtl ? -rawDelta : rawDelta;
      const newWidth = Math.max(60, resizingRef.current.startWidth + delta);
      setColumnWidths((prev) => ({
        ...prev,
        [resizingRef.current!.columnKey]: newWidth,
      }));
    };

    const handleMouseUp = () => {
      resizingRef.current = null;
      setActiveResizingKey(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const getRowId = (row: T, index: number): string | number => {
    if (typeof rowKey === 'function') return rowKey(row, index);
    if (rowKey && (rowKey as string) in row) {
      const val = (row as Record<string, unknown>)[rowKey as string];
      if (typeof val === 'string' || typeof val === 'number') return val;
    }
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
      ref={containerRef}
      style={{
        width: '100%',
        maxHeight: maxHeight ?? 'auto',
        overflow: 'auto',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        position: 'relative',
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
        style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, textAlign: 'start' }}
      >
        <thead role="rowgroup">
          <tr role="row">
            {columns.map((col, colIdx) => {
              const isSorted = sortColumn === col.key;
              const isFrozen = frozenLeadingColumn && colIdx === 0;
              const isResizable = resizableColumns && col.resizable !== false;
              const currentWidth = columnWidths[col.key] ?? (typeof col.width === 'number' ? col.width : 160);

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
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: col.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    width: columnWidths[col.key] ?? col.width,
                    minWidth: col.minWidth ?? (isResizable ? 60 : undefined),
                    position: stickyHeader || isFrozen ? 'sticky' : undefined,
                    top: stickyHeader ? 0 : undefined,
                    insetInlineStart: isFrozen ? 0 : undefined,
                    zIndex: isFrozen && stickyHeader ? 3 : stickyHeader ? 2 : isFrozen ? 1 : undefined,
                    boxShadow: isFrozen ? '2px 0 4px -1px rgba(0, 0, 0, 0.06)' : undefined,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {col.header}
                      {col.sortable && isSorted && sortDirection && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          style={{
                            transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
                            transition: 'transform 150ms ease',
                          }}
                        >
                          <path d="m18 15-6-6-6 6" />
                        </svg>
                      )}
                    </div>

                    {isResizable && (
                      <div
                        role="separator"
                        aria-orientation="vertical"
                        aria-label={`Resize ${typeof col.header === 'string' ? col.header : col.key} column`}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => startResizing(e, col.key, currentWidth)}
                        style={{
                          position: 'absolute',
                          insetInlineEnd: '-16px',
                          top: '-12px',
                          bottom: '-12px',
                          width: '10px',
                          cursor: 'col-resize',
                          zIndex: 10,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '2px',
                            height: '60%',
                            backgroundColor: activeResizingKey === col.key ? '#3b82f6' : '#cbd5e1',
                            transition: 'background-color 120ms ease',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {errorState ? (
            <tr role="row">
              <td
                colSpan={columns.length}
                role="gridcell"
                style={{ padding: '48px 24px', textAlign: 'center' }}
              >
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <strong style={{ fontSize: '15px', color: '#1e293b' }}>
                    {errorState.title ?? 'Failed to load grid telemetry'}
                  </strong>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b', maxWidth: '380px' }}>
                    {errorState.message}
                  </p>
                  {errorState.onRetry && (
                    <button
                      type="button"
                      onClick={errorState.onRetry}
                      style={{
                        marginTop: '4px',
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#ffffff',
                        backgroundColor: '#0f172a',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      Retry Query
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr role="row">
              <td
                colSpan={columns.length}
                role="gridcell"
                style={{ padding: '48px 24px', textAlign: 'center', color: '#94a3b8' }}
              >
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <strong style={{ fontSize: '14px', color: '#475569' }}>
                    {emptyMessage}
                  </strong>
                  {emptyStateAction && (
                    <button
                      type="button"
                      onClick={emptyStateAction.onClick}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#ffffff',
                        backgroundColor: '#10b981',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      {emptyStateAction.label}
                    </button>
                  )}
                </div>
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
                    backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                    cursor: onSelectionChange ? 'pointer' : 'default',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {columns.map((col, colIdx) => {
                    const isFrozen = frozenLeadingColumn && colIdx === 0;
                    const cellContent = col.renderCell
                      ? col.renderCell(row, rowIdx)
                      : String((row as Record<string, unknown>)[col.key] ?? '');

                    return (
                      <td
                        key={col.key}
                        role="gridcell"
                        tabIndex={-1}
                        style={{
                          padding: '12px 16px',
                          color: '#1e293b',
                          borderBottom: rowIdx === data.length - 1 ? 'none' : '1px solid #f1f5f9',
                          backgroundColor: isFrozen ? (isSelected ? '#eff6ff' : '#ffffff') : undefined,
                          position: isFrozen ? 'sticky' : undefined,
                          insetInlineStart: isFrozen ? 0 : undefined,
                          zIndex: isFrozen ? 1 : undefined,
                          boxShadow: isFrozen ? '2px 0 4px -1px rgba(0, 0, 0, 0.06)' : undefined,
                        }}
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

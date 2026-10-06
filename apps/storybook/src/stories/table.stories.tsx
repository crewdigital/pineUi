import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid, type ColumnDef, type SortDirection } from '@pine-ui/datagrid';
import { Badge } from '@pine-ui/react/badge';
import { Button } from '@pine-ui/react/button';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'suspended';
  mrr: number;
  lastActive: string;
}

const SAMPLE_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'usr-1',
    name: 'Sarah Connor',
    email: 'sarah.connor@sky-defense.net',
    role: 'Security Lead',
    status: 'active',
    mrr: 2450,
    lastActive: '2 minutes ago',
  },
  {
    id: 'usr-2',
    name: 'Alex Murphy',
    email: 'a.murphy@omni-corp.detroit',
    role: 'Compliance Officer',
    status: 'active',
    mrr: 1890,
    lastActive: '14 minutes ago',
  },
  {
    id: 'usr-3',
    name: 'Ellen Ripley',
    email: 'e.ripley@weyland-yutani.space',
    role: 'Logistics Supervisor',
    status: 'pending',
    mrr: 4120,
    lastActive: '3 hours ago',
  },
  {
    id: 'usr-4',
    name: 'Roy Batty',
    email: 'r.batty@tyrell-nexus.io',
    role: 'Systems Architect',
    status: 'suspended',
    mrr: 950,
    lastActive: '2 days ago',
  },
  {
    id: 'usr-5',
    name: 'Deckard Rick',
    email: 'r.deckard@blade-lapd.gov',
    role: 'Investigator',
    status: 'active',
    mrr: 3300,
    lastActive: '5 hours ago',
  },
  {
    id: 'usr-6',
    name: 'Dana Scully',
    email: 'd.scully@fbi-unsolved.gov',
    role: 'Chief Medical Officer',
    status: 'active',
    mrr: 2780,
    lastActive: '1 day ago',
  },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Data/Table',
  component: DataGrid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataGrid<CustomerRecord>>;

export const Default: Story = {
  render: () => {
    const columns: ColumnDef<CustomerRecord>[] = [
      { key: 'name', header: 'Name', width: 180 },
      { key: 'email', header: 'Email Address', width: 260 },
      { key: 'role', header: 'Role', width: 180 },
      {
        key: 'status',
        header: 'Status',
        width: 120,
        renderCell: (row) => {
          const variant =
            row.status === 'active'
              ? 'success'
              : row.status === 'pending'
              ? 'warning'
              : 'danger';
          return (
            <Badge variant={variant} size="sm">
              {row.status.toUpperCase()}
            </Badge>
          );
        },
      },
      {
        key: 'mrr',
        header: 'Monthly MRR',
        width: 140,
        renderCell: (row) => (
          <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
            ${row.mrr.toLocaleString()}
          </span>
        ),
      },
      { key: 'lastActive', header: 'Last Active', width: 140 },
    ];

    return (
      <div style={{ padding: '24px' }}>
        <DataGrid<CustomerRecord>
          data={SAMPLE_CUSTOMERS}
          columns={columns}
          rowKey="id"
        />
      </div>
    );
  },
};

export const SortableColumns: Story = {
  render: () => {
    function SortableDemo() {
      const [data, setData] = React.useState<CustomerRecord[]>(SAMPLE_CUSTOMERS);
      const [sortCol, setSortCol] = React.useState<string | null>('name');
      const [sortDir, setSortDir] = React.useState<SortDirection>('asc');

      const handleSortChange = (key: string, direction: SortDirection) => {
        setSortCol(key);
        setSortDir(direction);

        if (!direction) {
          setData(SAMPLE_CUSTOMERS);
          return;
        }

        const sorted = [...data].sort((a, b) => {
          const aVal = a[key as keyof CustomerRecord];
          const bVal = b[key as keyof CustomerRecord];

          if (typeof aVal === 'string' && typeof bVal === 'string') {
            return direction === 'asc'
              ? aVal.localeCompare(bVal)
              : bVal.localeCompare(aVal);
          }

          if (typeof aVal === 'number' && typeof bVal === 'number') {
            return direction === 'asc' ? aVal - bVal : bVal - aVal;
          }

          return 0;
        });

        setData(sorted);
      };

      const columns: ColumnDef<CustomerRecord>[] = [
        { key: 'name', header: 'Customer Name', sortable: true, width: 200 },
        { key: 'email', header: 'Email Address', width: 260 },
        { key: 'role', header: 'Role', sortable: true, width: 180 },
        {
          key: 'status',
          header: 'Status',
          width: 120,
          renderCell: (row) => (
            <Badge
              variant={row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'}
              size="sm"
            >
              {row.status}
            </Badge>
          ),
        },
        {
          key: 'mrr',
          header: 'MRR',
          sortable: true,
          width: 140,
          renderCell: (row) => `$${row.mrr.toLocaleString()}`,
        },
      ];

      return (
        <div style={{ padding: '24px' }}>
          <DataGrid<CustomerRecord>
            data={data}
            columns={columns}
            rowKey="id"
            sortColumn={sortCol}
            sortDirection={sortDir}
            onSortChange={handleSortChange}
          />
        </div>
      );
    }

    return <SortableDemo />;
  },
};

export const RowSelection: Story = {
  render: () => {
    function SelectionDemo() {
      const [selectedKeys, setSelectedKeys] = React.useState<(string | number)[]>(['usr-1', 'usr-3']);

      const columns: ColumnDef<CustomerRecord>[] = [
        { key: 'name', header: 'Customer', width: 180 },
        { key: 'email', header: 'Email Address', width: 240 },
        { key: 'role', header: 'Role', width: 160 },
        {
          key: 'mrr',
          header: 'MRR',
          width: 120,
          renderCell: (row) => `$${row.mrr.toLocaleString()}`,
        },
      ];

      return (
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Selected rows:{' '}
              <strong style={{ color: '#0f172a' }}>{selectedKeys.length} of {SAMPLE_CUSTOMERS.length}</strong>
            </span>
            {selectedKeys.length > 0 && (
              <Button size="sm" variant="outline" onClick={() => setSelectedKeys([])}>
                Clear Selection
              </Button>
            )}
          </div>
          <DataGrid<CustomerRecord>
            data={SAMPLE_CUSTOMERS}
            columns={columns}
            rowKey="id"
            selectedRowKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          />
        </div>
      );
    }

    return <SelectionDemo />;
  },
};

export const ResizableAndStickyHeader: Story = {
  render: () => {
    // Generate a larger dataset
    const manyCustomers: CustomerRecord[] = Array.from({ length: 30 }, (_, i) => ({
      id: `usr-${i + 1}`,
      name: `User ${i + 1} Enterprise`,
      email: `user.${i + 1}@organization.io`,
      role: i % 3 === 0 ? 'Administrator' : i % 2 === 0 ? 'Editor' : 'Viewer',
      status: i % 4 === 0 ? 'suspended' : i % 3 === 0 ? 'pending' : 'active',
      mrr: 1200 + (i * 150),
      lastActive: `${(i % 12) + 1} hours ago`,
    }));

    const columns: ColumnDef<CustomerRecord>[] = [
      { key: 'name', header: 'Organization Member', width: 220, resizable: true },
      { key: 'email', header: 'Contact Email', width: 260, resizable: true },
      { key: 'role', header: 'Account Role', width: 160, resizable: true },
      {
        key: 'status',
        header: 'Subscription Status',
        width: 150,
        resizable: true,
        renderCell: (row) => (
          <Badge
            variant={row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'}
            size="sm"
          >
            {row.status}
          </Badge>
        ),
      },
      {
        key: 'mrr',
        header: 'MRR Value',
        width: 140,
        renderCell: (row) => `$${row.mrr.toLocaleString()}`,
      },
      { key: 'lastActive', header: 'Activity', width: 140 },
    ];

    return (
      <div style={{ padding: '24px' }}>
        <DataGrid<CustomerRecord>
          data={manyCustomers}
          columns={columns}
          rowKey="id"
          stickyHeader
          resizableColumns
          maxHeight="420px"
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const columns: ColumnDef<CustomerRecord>[] = [
      { key: 'name', header: 'Customer Name', width: 180 },
      { key: 'email', header: 'Email Address', width: 240 },
      { key: 'role', header: 'Role', width: 160 },
    ];

    return (
      <div style={{ padding: '24px' }}>
        <DataGrid<CustomerRecord>
          data={[]}
          columns={columns}
          emptyMessage="No customer accounts match your active search filters."
          emptyStateAction={{
            label: 'Reset Filters',
            onClick: () => {
              // Action handler
            },
          }}
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const columns: ColumnDef<CustomerRecord>[] = [
      { key: 'name', header: 'Customer Name', width: 180 },
      { key: 'email', header: 'Email Address', width: 240 },
    ];

    return (
      <div style={{ padding: '24px' }}>
        <DataGrid<CustomerRecord>
          data={[]}
          columns={columns}
          errorState={{
            title: 'Failed to load customer records',
            message: 'A network timeout occurred while querying the primary database shard.',
            onRetry: () => {
              // Retry handler
            },
          }}
        />
      </div>
    );
  },
};

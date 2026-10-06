import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  IconButton,
  Badge,
  Avatar,
  Switch,
  Checkbox,
  TextField,
  TextArea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  Progress,
} from '@pine-ui/react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandRecent,
  CommandLegend,
} from '@pine-ui/command';
import {
  Search,
  Plus,
  Check,
  CheckCircle,
  AlertCircle,
  Calendar,
  ChevronDown,
  Trash,
} from '@pine-ui/icons';

const meta: Meta = {
  title: 'Platform/Application Recipes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-screen, production-grade application recipes demonstrating Pine UI in real-world environments with dual-layer shadows, spring animations, form ergonomics, and command palette integration.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ============================================================================
// Recipe 1: SaaS Dashboard Overview
// ============================================================================

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'Enterprise' | 'Pro' | 'Growth' | 'Starter';
  status: 'active' | 'trialing' | 'overdue' | 'canceled';
  mrr: string;
  joined: string;
}

const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'CUST-001',
    name: 'Acme Cloud Dynamics',
    email: 'billing@acmedynamics.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face',
    plan: 'Enterprise',
    status: 'active',
    mrr: '$4,800/mo',
    joined: 'Jan 14, 2026',
  },
  {
    id: 'CUST-002',
    name: 'HyperScale Labs',
    email: 'alex@hyperscalelabs.ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
    plan: 'Enterprise',
    status: 'active',
    mrr: '$3,200/mo',
    joined: 'Feb 02, 2026',
  },
  {
    id: 'CUST-003',
    name: 'Voxel Flow Studios',
    email: 'sarah@voxelflow.design',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face',
    plan: 'Pro',
    status: 'trialing',
    mrr: '$890/mo',
    joined: 'Feb 21, 2026',
  },
  {
    id: 'CUST-004',
    name: 'Nordic Fintech Oy',
    email: 'dev@nordicfin.fi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face',
    plan: 'Enterprise',
    status: 'overdue',
    mrr: '$5,400/mo',
    joined: 'Dec 18, 2025',
  },
  {
    id: 'CUST-005',
    name: 'Starlight Security',
    email: 'ops@starlightsec.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
    plan: 'Growth',
    status: 'active',
    mrr: '$1,450/mo',
    joined: 'Jan 29, 2026',
  },
  {
    id: 'CUST-006',
    name: 'Apex Robotics Inc',
    email: 'contact@apexrobotics.co',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=96&h=96&fit=crop&crop=face',
    plan: 'Starter',
    status: 'canceled',
    mrr: '$290/mo',
    joined: 'Nov 04, 2025',
  },
];

export const SaaSDashboardRecipe: Story = {
  name: '1. SaaS Dashboard Overview',
  render: () => {
    const [commandOpen, setCommandOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState<string>('all');
    const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());
    const [customers, setCustomers] = React.useState(INITIAL_CUSTOMERS);
    const [toastMessage, setToastMessage] = React.useState<string | null>(null);

    // Global Command Palette shortcut Ctrl+K
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          setCommandOpen((prev) => !prev);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const showToast = (msg: string) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3500);
    };

    // Filter customers
    const filteredCustomers = customers.filter((cust) => {
      const matchesSearch =
        cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || cust.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    const toggleRowSelect = (id: string) => {
      setSelectedRows((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    };

    const toggleAllSelect = () => {
      if (selectedRows.size === filteredCustomers.length) {
        setSelectedRows(new Set());
      } else {
        setSelectedRows(new Set(filteredCustomers.map((c) => c.id)));
      }
    };

    const deleteSelected = () => {
      setCustomers((prev) => prev.filter((c) => !selectedRows.has(c.id)));
      showToast(`Removed ${selectedRows.size} customers.`);
      setSelectedRows(new Set());
    };

    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#090d16',
          color: '#f8fafc',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Toast floating banner */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '24px',
              zIndex: 9999,
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
              borderRadius: '8px',
              padding: '12px 18px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <CheckCircle size="sm" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Global Navigation Header */}
        <header
          style={{
            height: '64px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(15,23,42,0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          {/* Logo & Workspace Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '16px',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(16,185,129,0.3)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: '17px', letterSpacing: '-0.02em', color: '#ffffff' }}>
                Pine UI Cloud
              </span>
            </div>

            <div style={{ height: '20px', width: '1px', backgroundColor: 'rgba(255,255,255,0.12)' }} />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
              }}
            >
              <span style={{ color: '#94a3b8' }}>Workspace:</span>
              <strong style={{ color: '#f1f5f9' }}>Acme Production</strong>
              <Badge variant="primary" size="sm">PRO</Badge>
            </div>
          </div>

          {/* Quick Search trigger & User Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '13px',
                color: '#94a3b8',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              <Search size="sm" />
              <span>Search everything...</span>
              <kbd
                style={{
                  fontSize: '11px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#cbd5e1',
                }}
              >
                Ctrl+K
              </kbd>
            </button>

            <Tooltip>
              <TooltipTrigger>
                <IconButton
                  aria-label="Calendar updates"
                  variant="ghost"
                  size="sm"
                  onClick={() => showToast('Syncing calendar telemetry...')}
                >
                  <Calendar size="sm" />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>Telemetry Calendar</TooltipContent>
            </Tooltip>

            <div style={{ height: '20px', width: '1px', backgroundColor: 'rgba(255,255,255,0.12)' }} />

            <Menu>
              <MenuTrigger style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Avatar
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face"
                    name="JD"
                    size="sm"
                  />
                  <ChevronDown size="sm" style={{ opacity: 0.6 }} />
                </div>
              </MenuTrigger>
              <MenuContent align="end">
                <MenuLabel>Signed in as yoosuf@crewdigital.com</MenuLabel>
                <MenuSeparator />
                <MenuItem onClick={() => setCommandOpen(true)}>Command Palette (Ctrl+K)</MenuItem>
                <MenuItem onClick={() => showToast('Opening Workspace Settings')}>Settings</MenuItem>
                <MenuItem onClick={() => showToast('Navigating to Billing')}>Billing & Plans</MenuItem>
                <MenuSeparator />
                <MenuItem onClick={() => showToast('Signed out successfully')} style={{ color: '#ef4444' }}>
                  Sign Out
                </MenuItem>
              </MenuContent>
            </Menu>
          </div>
        </header>

        {/* Main Content Area */}
        <main style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '32px', boxSizing: 'border-box' }}>
          {/* Page Title & Quick Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, letterSpacing: '-0.025em', color: '#ffffff' }}>
                Executive Metrics & Operations
              </h1>
              <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#94a3b8' }}>
                Real-time telemetry, revenue velocity, and customer lifecycles across US-East-1 & EU-Central-1.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" size="md" onClick={() => showToast('Report exported as CSV')}>
                Export CSV
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const newCust: CustomerRecord = {
                    id: `CUST-00${customers.length + 1}`,
                    name: 'Nebula Matrix Systems',
                    email: 'ops@nebulamatrix.io',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
                    plan: 'Enterprise',
                    status: 'active',
                    mrr: '$2,900/mo',
                    joined: 'Today',
                  };
                  setCustomers([newCust, ...customers]);
                  showToast('Provisioned customer Nebula Matrix Systems');
                }}
              >
                <Plus size="sm" style={{ marginRight: '6px' }} />
                New Customer
              </Button>
            </div>
          </div>

          {/* Metric Cards Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              marginBottom: '32px',
            }}
          >
            {[
              { label: 'Total Recurring Revenue', value: '$148,290.00', delta: '+14.2% MoM', progress: 78, badge: 'success' },
              { label: 'Active Enterprise Seats', value: '12,450', delta: '+8.1% vs avg', progress: 62, badge: 'success' },
              { label: 'Conversion Velocity', value: '3.84%', delta: '+1.2% this week', progress: 42, badge: 'info' },
              { label: 'P99 Edge Latency', value: '38.2 ms', delta: '-6.4ms optimized', progress: 92, badge: 'success' },
            ].map((metric, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>{metric.label}</span>
                  <Badge variant={metric.badge as 'success' | 'info'} size="sm">{metric.delta}</Badge>
                </div>
                <div style={{ fontSize: '30px', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>
                  {metric.value}
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>
                    <span>Target quota</span>
                    <span>{metric.progress}%</span>
                  </div>
                  <Progress value={metric.progress} max={100} size="sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Data Table Section */}
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            }}
          >
            {/* Filter & Search Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 360px' }}>
                <div style={{ flex: '1 1 240px' }}>
                  <TextField
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by customer name, email or ID..."
                    prefix={<Search size="sm" />}
                    clearable
                    onClear={() => setSearchQuery('')}
                  />
                </div>
                <div style={{ width: '150px' }}>
                  <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="trialing">Trialing</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Bulk Action indicator */}
              {selectedRows.size > 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '8px',
                    padding: '6px 14px',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#f87171' }}>
                    {selectedRows.size} selected
                  </span>
                  <Button variant="danger" size="sm" onClick={deleteSelected}>
                    <Trash size="sm" style={{ marginRight: '6px' }} />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* Customers Table */}
            <div style={{ overflowX: 'auto', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ padding: '14px 16px', width: '40px' }}>
                      <Checkbox
                        checked={selectedRows.size === filteredCustomers.length && filteredCustomers.length > 0}
                        onChange={toggleAllSelect}
                        aria-label="Select all customers"
                      />
                    </th>
                    <th style={{ padding: '14px 16px', color: '#94a3b8', fontWeight: 600 }}>Customer / Company</th>
                    <th style={{ padding: '14px 16px', color: '#94a3b8', fontWeight: 600 }}>Plan Tier</th>
                    <th style={{ padding: '14px 16px', color: '#94a3b8', fontWeight: 600 }}>Billing Status</th>
                    <th style={{ padding: '14px 16px', color: '#94a3b8', fontWeight: 600 }}>MRR</th>
                    <th style={{ padding: '14px 16px', color: '#94a3b8', fontWeight: 600 }}>Provisioned</th>
                    <th style={{ padding: '14px 16px', color: '#94a3b8', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: '48px 16px', textAlign: 'center', color: '#64748b' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <AlertCircle size="lg" />
                          <strong style={{ color: '#cbd5e1' }}>No matching customer records</strong>
                          <p style={{ margin: 0, fontSize: '12px' }}>Try relaxing search query or filter tags.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((cust) => {
                      const isSelected = selectedRows.has(cust.id);
                      return (
                        <tr
                          key={cust.id}
                          style={{
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                            backgroundColor: isSelected ? 'rgba(16,185,129,0.08)' : 'transparent',
                            transition: 'background-color 100ms ease',
                          }}
                        >
                          <td style={{ padding: '14px 16px' }}>
                            <Checkbox
                              checked={isSelected}
                              onChange={() => toggleRowSelect(cust.id)}
                              aria-label={`Select ${cust.name}`}
                            />
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <Avatar src={cust.avatar} name={cust.name} size="sm" />
                              <div>
                                <div style={{ fontWeight: 600, color: '#ffffff' }}>{cust.name}</div>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>{cust.email}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <Badge
                              variant={cust.plan === 'Enterprise' ? 'primary' : 'secondary'}
                              size="sm"
                            >
                              {cust.plan}
                            </Badge>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <Badge
                              variant={
                                cust.status === 'active'
                                  ? 'success'
                                  : cust.status === 'trialing'
                                  ? 'info'
                                  : cust.status === 'overdue'
                                  ? 'warning'
                                  : 'neutral'
                              }
                              size="sm"
                            >
                              {cust.status.toUpperCase()}
                            </Badge>
                          </td>
                          <td style={{ padding: '14px 16px', fontWeight: 600, color: '#f1f5f9' }}>
                            {cust.mrr}
                          </td>
                          <td style={{ padding: '14px 16px', color: '#94a3b8' }}>
                            {cust.joined}
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                            <Menu>
                              <MenuTrigger style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px 8px' }}>
                                •••
                              </MenuTrigger>
                              <MenuContent align="end">
                                <MenuItem onClick={() => showToast(`Viewing profile for ${cust.name}`)}>
                                  View Customer Dossier
                                </MenuItem>
                                <MenuItem onClick={() => showToast(`Simulating invoice for ${cust.name}`)}>
                                  Download Latest Invoice
                                </MenuItem>
                                <MenuSeparator />
                                <MenuItem
                                  onClick={() => {
                                    setCustomers((prev) => prev.filter((c) => c.id !== cust.id));
                                    showToast(`Archived ${cust.name}`);
                                  }}
                                  style={{ color: '#ef4444' }}
                                >
                                  Terminate & Archive
                                </MenuItem>
                              </MenuContent>
                            </Menu>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Global Command Palette Dialog */}
        <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
          <DialogContent style={{ padding: 0, overflow: 'hidden', maxWidth: '640px', width: '100%' }}>
            <Command style={{ width: '100%' }}>
              <CommandInput placeholder="Type a command or search customers..." />
              <CommandList>
                <CommandEmpty>No results found matching your query.</CommandEmpty>
                <CommandRecent
                  onSelect={(val: string) => {
                    showToast(`Executed: ${val}`);
                    setCommandOpen(false);
                  }}
                />
                <CommandGroup heading="Quick Operations">
                  <CommandItem
                    onSelect={() => {
                      showToast('Opened New Project Wizard');
                      setCommandOpen(false);
                    }}
                  >
                    <span>Provision New Customer Workspace</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => {
                      showToast('Exported CSV Analytics');
                      setCommandOpen(false);
                    }}
                  >
                    <span>Export Full Telemetry Report</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => {
                      showToast('Refreshed Edge Metrics');
                      setCommandOpen(false);
                    }}
                  >
                    <span>Flush Edge Cache Nodes</span>
                  </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Navigation">
                  <CommandItem
                    onSelect={() => {
                      showToast('Navigated to Account Settings');
                      setCommandOpen(false);
                    }}
                  >
                    <span>Account & Workspace Settings</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => {
                      showToast('Navigated to Billing');
                      setCommandOpen(false);
                    }}
                  >
                    <span>Billing, Plans & Invoices</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => {
                      showToast('Opened API Keys');
                      setCommandOpen(false);
                    }}
                  >
                    <span>Manage Production API Tokens</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
              <CommandLegend />
            </Command>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

// ============================================================================
// Recipe 2: Account & Workspace Settings
// ============================================================================

export const AccountSettingsRecipe: Story = {
  name: '2. Account & Workspace Settings',
  render: () => {
    const [firstName, setFirstName] = React.useState('Alex');
    const [lastName, setLastName] = React.useState('Vance');
    const [email, setEmail] = React.useState('alex.vance@blackmesa.research');
    const [workspaceSlug, setWorkspaceSlug] = React.useState('blackmesa-labs');
    const [emailAlerts, setEmailAlerts] = React.useState(true);
    const [securityDigests, setSecurityDigests] = React.useState(true);
    const [marketingUpdates, setMarketingUpdates] = React.useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
    const [twoFactorModalOpen, setTwoFactorModalOpen] = React.useState(false);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [toastMessage, setToastMessage] = React.useState<string | null>(null);

    const showToast = (msg: string) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3500);
    };

    // Password strength computation
    const getPasswordStrength = (pwd: string) => {
      let score = 0;
      if (pwd.length >= 8) score += 25;
      if (/[A-Z]/.test(pwd)) score += 25;
      if (/[0-9]/.test(pwd)) score += 25;
      if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
      return score;
    };
    const strengthScore = getPasswordStrength(newPassword);

    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#0c0f17',
          color: '#f8fafc',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          padding: '40px 24px',
          boxSizing: 'border-box',
        }}
      >
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '24px',
              zIndex: 9999,
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
              borderRadius: '8px',
              padding: '12px 18px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <CheckCircle size="sm" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, letterSpacing: '-0.025em', color: '#ffffff' }}>
              Workspace & Security Settings
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#94a3b8' }}>
              Configure organization preferences, member governance, multi-factor authentication, and billing quotas.
            </p>
          </div>

          <Tabs defaultValue="general">
            <div style={{ marginBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <TabList>
                <Tab value="general">General Profile</Tab>
                <Tab value="security">Security & MFA</Tab>
                <Tab value="billing">Plan & Invoicing</Tab>
                <Tab value="team">Team Governance</Tab>
              </TabList>
            </div>

            {/* Tab 1: General Profile */}
            <TabPanel value="general">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Avatar Section */}
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Avatar
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=face"
                      name="AV"
                      size="lg"
                    />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                        Profile Photo
                      </h4>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                        Supports PNG, JPG or WebP up to 4MB.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="secondary" size="sm" onClick={() => showToast('Avatar updated')}>
                      Upload New
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => showToast('Avatar removed')}>
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Form fields */}
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                        First Name
                      </label>
                      <TextField value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                        Last Name
                      </label>
                      <TextField value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                      Primary Email Address
                    </label>
                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      clearable
                      onClear={() => setEmail('')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                      Workspace Vanity URL
                    </label>
                    <TextField
                      value={workspaceSlug}
                      onChange={(e) => setWorkspaceSlug(e.target.value)}
                      prefix="https://app.pineui.com/"
                      suffix=".cloud"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                      Bio / Department
                    </label>
                    <TextArea
                      defaultValue="Principal Systems Architect leading core infrastructure and edge distribution telemetry."
                      rows={3}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <Button variant="primary" size="md" onClick={() => showToast('Changes saved successfully')}>
                      Save Profile Changes
                    </Button>
                  </div>
                </div>

                {/* Notifications Preferences */}
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                    Notification Subscriptions
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>Real-time Production Alerts</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>Receive immediate emails when error rates spike above 1%.</div>
                    </div>
                    <Switch checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />
                  </div>

                  <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>Weekly Security Digest</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>Detailed audit trail of workspace logins and IAM changes.</div>
                    </div>
                    <Switch checked={securityDigests} onChange={(e) => setSecurityDigests(e.target.checked)} />
                  </div>

                  <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>Product Roadmap Updates</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>Early access previews to upcoming Pine UI components.</div>
                    </div>
                    <Switch checked={marketingUpdates} onChange={(e) => setMarketingUpdates(e.target.checked)} />
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Tab 2: Security & MFA */}
            <TabPanel value="security">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* MFA card */}
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                        Two-Factor Authentication (2FA)
                      </h4>
                      <Badge variant={twoFactorEnabled ? 'success' : 'neutral'} size="sm">
                        {twoFactorEnabled ? 'ENFORCED' : 'OFF'}
                      </Badge>
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                      Protect your account using an authenticator app (1Password, Google Authenticator).
                    </p>
                  </div>
                  <Button
                    variant={twoFactorEnabled ? 'secondary' : 'primary'}
                    size="md"
                    onClick={() => setTwoFactorModalOpen(true)}
                  >
                    {twoFactorEnabled ? 'Reconfigure 2FA' : 'Enable 2FA'}
                  </Button>
                </div>

                {/* Password reset card */}
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                    Update Master Password
                  </h4>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                      Current Password
                    </label>
                    <TextField
                      type="password"
                      showPasswordToggle
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter existing password"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                      New Password
                    </label>
                    <TextField
                      type="password"
                      showPasswordToggle
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 8 characters with numbers & symbols"
                    />

                    {newPassword.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                          <span>Password Strength</span>
                          <span style={{ fontWeight: 600, color: strengthScore >= 75 ? '#34d399' : '#f59e0b' }}>
                            {strengthScore < 50 ? 'Weak' : strengthScore < 100 ? 'Good' : 'Strong'}
                          </span>
                        </div>
                        <Progress value={strengthScore} max={100} size="sm" />
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="primary"
                      size="md"
                      disabled={newPassword.length < 8}
                      onClick={() => {
                        showToast('Password updated successfully');
                        setCurrentPassword('');
                        setNewPassword('');
                      }}
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Tab 3: Billing & Plans */}
            <TabPanel value="billing">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Usage meter */}
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '24px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                        API Telemetry Quota (Pro Tier)
                      </h4>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                        84,200 of 100,000 requests consumed this billing cycle (resets in 12 days).
                      </p>
                    </div>
                    <Badge variant="warning" size="sm">84% Used</Badge>
                  </div>
                  <Progress value={84} max={100} size="md" />
                </div>

                {/* Plan comparison tier cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {[
                    {
                      name: 'Starter',
                      price: '$29',
                      desc: 'For small projects & staging pilots',
                      features: ['100,000 API requests', '1 workspace member', 'Community Discord support'],
                      isCurrent: false,
                    },
                    {
                      name: 'Pro',
                      price: '$99',
                      desc: 'High velocity SaaS development',
                      features: ['1,000,000 API requests', '10 workspace members', 'Priority ticket SLA', 'Custom domain vanity routing'],
                      isCurrent: true,
                    },
                    {
                      name: 'Enterprise',
                      price: '$499',
                      desc: 'Full regulatory compliance & SLAs',
                      features: ['Unlimited API volume', 'Unlimited seats & RBAC', '99.99% uptime guarantee', 'Dedicated customer engineer'],
                      isCurrent: false,
                    },
                  ].map((plan, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: plan.isCurrent ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
                        border: plan.isCurrent ? '1.5px solid #10b981' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>{plan.name}</h4>
                          {plan.isCurrent && <Badge variant="primary" size="sm">ACTIVE PLAN</Badge>}
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', marginBottom: '6px' }}>
                          {plan.price}<span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>/month</span>
                        </div>
                        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#94a3b8' }}>{plan.desc}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                          {plan.features.map((feat, fi) => (
                            <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1' }}>
                              <Check size="sm" style={{ color: '#10b981' }} />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant={plan.isCurrent ? 'secondary' : 'primary'}
                        size="md"
                        disabled={plan.isCurrent}
                        onClick={() => showToast(`Selected upgrade to ${plan.name} plan`)}
                      >
                        {plan.isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>

            {/* Tab 4: Team Governance */}
            <TabPanel value="team">
              <div
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>Active Workspace Members</h4>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                      Collaborators with access to this production telemetry suite.
                    </p>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => showToast('Invite modal opened')}>
                    <Plus size="sm" style={{ marginRight: '6px' }} />
                    Invite Member
                  </Button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { name: 'Alex Vance', email: 'alex.vance@blackmesa.research', role: 'Owner' },
                    { name: 'Dr. Gordon Freeman', email: 'gfreeman@blackmesa.research', role: 'Administrator' },
                    { name: 'Eli Vance', email: 'evance@blackmesa.research', role: 'Editor' },
                  ].map((member, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Avatar name={member.name} size="sm" />
                        <div>
                          <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '13px' }}>{member.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{member.email}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Badge variant="neutral" size="sm">{member.role}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => showToast(`Editing role for ${member.name}`)}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* 2FA Setup Dialog */}
        <Dialog open={twoFactorModalOpen} onOpenChange={setTwoFactorModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configure Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Scan the QR code below using Google Authenticator, 1Password, or Authy to enroll this workspace profile.
              </DialogDescription>
            </DialogHeader>

            <div style={{ padding: '20px 0', textAlign: 'center' }}>
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  margin: '0 auto 16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#090d16',
                  fontSize: '11px',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                }}
              >
                [ QR CODE MATRIX ]
              </div>
              <p style={{ margin: '0 0 12px', fontSize: '12px', color: '#94a3b8' }}>
                Secret manual key: <code style={{ color: '#10b981' }}>PINE-UI-9482-SECURE</code>
              </p>
              <TextField placeholder="Enter 6-digit confirmation code..." />
            </div>

            <DialogFooter>
              <DialogClose>
                <Button variant="secondary" size="md">Cancel</Button>
              </DialogClose>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setTwoFactorEnabled(true);
                  setTwoFactorModalOpen(false);
                  showToast('Two-factor authentication successfully enabled!');
                }}
              >
                Verify & Activate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

// ============================================================================
// Recipe 3: Authentication & Multi-Factor Screen
// ============================================================================

export const AuthenticationRecipe: Story = {
  name: '3. Authentication & Multi-Factor Screen',
  render: () => {
    const [authMode, setAuthMode] = React.useState<'signin' | 'signup' | 'mfa'>('signin');
    const [email, setEmail] = React.useState('elena.rostova@vector.tech');
    const [password, setPassword] = React.useState('PineEnterprise#2026!');
    const [name, setName] = React.useState('Elena Rostova');
    const [rememberDevice, setRememberDevice] = React.useState(true);
    const [agreeTerms, setAgreeTerms] = React.useState(false);
    const [otpCode, setOtpCode] = React.useState(['', '', '', '', '', '']);
    const [termsOpen, setTermsOpen] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState<string | null>(null);

    const showToast = (msg: string) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3500);
    };

    const handleOtpChange = (index: number, val: string) => {
      if (val.length > 1) val = val.slice(-1);
      const next = [...otpCode];
      next[index] = val;
      setOtpCode(next);
    };

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: 'minmax(400px, 1fr) minmax(460px, 1fr)',
          backgroundColor: '#0a0d14',
          color: '#f8fafc',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        }}
      >
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '24px',
              zIndex: 9999,
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
              borderRadius: '8px',
              padding: '12px 18px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <CheckCircle size="sm" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Left Side: Brand Showcase */}
        <div
          style={{
            background: 'linear-gradient(145deg, #064e3b 0%, #022c22 40%, #06101e 100%)',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle luminous background ring */}
          <div
            style={{
              position: 'absolute',
              top: '-15%',
              right: '-15%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '18px',
                  color: '#ffffff',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.02em', color: '#ffffff' }}>
                Pine UI Platform
              </span>
            </div>

            <Badge variant="primary" size="md">
              RELEASE 2.4 PREVIEW
            </Badge>

            <h2
              style={{
                fontSize: '38px',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.035em',
                color: '#ffffff',
                margin: '24px 0 16px',
              }}
            >
              The Next Evolution in Enterprise Interfaces.
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#a7f3d0', maxWidth: '440px' }}>
              Sub-millisecond StyleX compilation, ambient dual-layer physics, WCAG AA compliance, and native spring interactions.
            </p>
          </div>

          {/* Testimonial Quote */}
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '14px',
              padding: '24px',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px', fontStyle: 'italic', lineHeight: 1.5, color: '#f1f5f9' }}>
              “Pine UI transformed our engineering velocity. We migrated 40+ microfrontends to StyleX without a single layout regression.”
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
              <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                name="MK"
                size="sm"
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#ffffff' }}>Marcus Kincaid</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>VP of Engineering, HyperScale AI</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 32px',
          }}
        >
          <div style={{ maxWidth: '420px', width: '100%' }}>
            {authMode === 'mfa' ? (
              /* MFA Step */
              <div>
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>
                    Two-Factor Verification
                  </h3>
                  <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#94a3b8' }}>
                    Enter the 6-digit authentication token generated on your mobile authenticator app.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', justifyContent: 'center' }}>
                  {otpCode.map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      style={{
                        width: '48px',
                        height: '56px',
                        textAlign: 'center',
                        fontSize: '22px',
                        fontWeight: 700,
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1.5px solid rgba(255,255,255,0.14)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        outline: 'none',
                      }}
                    />
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  style={{ width: '100%', marginBottom: '14px' }}
                  onClick={() => {
                    showToast('Authenticated! Welcome back, Elena.');
                    setAuthMode('signin');
                  }}
                >
                  Verify Token & Log In
                </Button>

                <div style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Back to credentials sign in
                  </button>
                </div>
              </div>
            ) : (
              /* Sign In / Sign Up Flow */
              <div>
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ margin: 0, fontSize: '26px', fontWeight: 800, letterSpacing: '-0.025em', color: '#ffffff' }}>
                    {authMode === 'signin' ? 'Welcome back' : 'Create an organization account'}
                  </h3>
                  <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#94a3b8' }}>
                    {authMode === 'signin'
                      ? 'Sign in to access your production deployment cluster.'
                      : 'Get started with a 14-day full feature trial. No credit card required.'}
                  </p>
                </div>

                {/* Social Login buttons */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <Button
                    variant="secondary"
                    size="md"
                    style={{ flex: 1 }}
                    onClick={() => showToast('Redirecting to GitHub SSO...')}
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    style={{ flex: 1 }}
                    onClick={() => showToast('Redirecting to Google Workspace...')}
                  >
                    Google
                  </Button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    margin: '20px 0',
                    color: '#64748b',
                    fontSize: '12px',
                  }}
                >
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                  <span>or continue with email</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (authMode === 'signin') {
                      setAuthMode('mfa');
                    } else {
                      showToast('Account registered! Verification link sent.');
                      setAuthMode('signin');
                    }
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  {authMode === 'signup' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                        Full Name
                      </label>
                      <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Lovelace"
                        clearable
                        onClear={() => setName('')}
                      />
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                      Work Email
                    </label>
                    <TextField
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      clearable
                      onClear={() => setEmail('')}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#cbd5e1' }}>
                        Password
                      </label>
                      {authMode === 'signin' && (
                        <a
                          href="#forgot"
                          onClick={(e) => {
                            e.preventDefault();
                            showToast('Password reset link dispatched.');
                          }}
                          style={{ fontSize: '12px', color: '#10b981', textDecoration: 'none' }}
                        >
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <TextField
                      type="password"
                      showPasswordToggle
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {authMode === 'signin' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Checkbox
                        checked={rememberDevice}
                        onChange={(e) => setRememberDevice(e.target.checked)}
                        id="remember-device"
                      />
                      <label htmlFor="remember-device" style={{ fontSize: '13px', color: '#94a3b8', cursor: 'pointer' }}>
                        Remember this session for 30 days
                      </label>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Checkbox
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        id="agree-terms"
                      />
                      <label htmlFor="agree-terms" style={{ fontSize: '12px', color: '#94a3b8', cursor: 'pointer', lineHeight: 1.4 }}>
                        I agree to the{' '}
                        <button
                          type="button"
                          onClick={() => setTermsOpen(true)}
                          style={{ background: 'none', border: 'none', padding: 0, color: '#10b981', textDecoration: 'underline', cursor: 'pointer' }}
                        >
                          Master Terms of Service
                        </button>{' '}
                        and Privacy Policy.
                      </label>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    style={{ width: '100%', marginTop: '8px' }}
                    disabled={authMode === 'signup' && !agreeTerms}
                  >
                    {authMode === 'signin' ? 'Sign In' : 'Create Free Workspace'}
                  </Button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#94a3b8' }}>
                  {authMode === 'signin' ? (
                    <span>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('signup')}
                        style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Sign up
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('signin')}
                        style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Sign in
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Terms Dialog */}
        <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pine UI Master Service Terms</DialogTitle>
              <DialogDescription>
                Please review our enterprise confidentiality, data protection, and usage guidelines.
              </DialogDescription>
            </DialogHeader>

            <div style={{ padding: '16px 0', fontSize: '13px', lineHeight: 1.6, color: '#cbd5e1' }}>
              <p>
                <strong>1. Data Sovereignty:</strong> Customer data processed via Pine UI cloud telemetry remains the sole property of your organization.
              </p>
              <p>
                <strong>2. Service Availability:</strong> Enterprise plan subscribers receive a 99.99% monthly uptime guarantee backed by financial credits.
              </p>
              <p>
                <strong>3. Acceptable Use:</strong> Users may not reverse-engineer cryptographic keys or attempt denial-of-service against edge telemetry proxies.
              </p>
            </div>

            <DialogFooter>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setAgreeTerms(true);
                  setTermsOpen(false);
                }}
              >
                Accept & Proceed
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

// ============================================================================
// Recipe 4: Command Palette Integration Showcase
// ============================================================================

export const CommandPaletteRecipe: Story = {
  name: '4. Command Palette Showcase',
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [selectedAction, setSelectedAction] = React.useState<string | null>(null);

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const triggerAction = (name: string) => {
      setSelectedAction(name);
      setOpen(false);
    };

    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#070a11',
          color: '#f8fafc',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            borderRadius: '16px',
            padding: '48px 36px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 800,
              margin: '0 auto 20px',
              boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
            }}
          >
            K
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
            Global Command Palette (Ctrl+K)
          </h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 28px', lineHeight: 1.6 }}>
            Instant search across actions, workspaces, documentation, and cloud telemetry. Built with persistent recent item cache, keyboard shortcuts, and full WCAG keyboard navigation.
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <span>Open Command Palette</span>
            <kbd
              style={{
                fontSize: '12px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              Ctrl+K
            </kbd>
          </Button>

          {selectedAction && (
            <div
              style={{
                marginTop: '28px',
                padding: '12px 18px',
                borderRadius: '8px',
                backgroundColor: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#34d399',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              Last Executed Command: {selectedAction}
            </div>
          )}
        </div>

        {/* Command Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent style={{ padding: 0, overflow: 'hidden', maxWidth: '640px', width: '100%' }}>
            <Command style={{ width: '100%' }}>
              <CommandInput placeholder="Type a command or search documentation..." />
              <CommandList>
                <CommandEmpty>No actions found matching your query.</CommandEmpty>
                <CommandRecent onSelect={triggerAction} />
                <CommandGroup heading="Platform Operations">
                  <CommandItem onSelect={() => triggerAction('Create New Microfrontend')}>
                    <span>Create New Microfrontend</span>
                  </CommandItem>
                  <CommandItem onSelect={() => triggerAction('Deploy Staging Cluster')}>
                    <span>Deploy Staging Cluster</span>
                  </CommandItem>
                  <CommandItem onSelect={() => triggerAction('Flush Edge CDN Cache')}>
                    <span>Flush Edge CDN Cache</span>
                  </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Theme & Interface">
                  <CommandItem onSelect={() => triggerAction('Switch to Midnight Nebula Dark')}>
                    <span>Switch to Midnight Nebula Theme</span>
                  </CommandItem>
                  <CommandItem onSelect={() => triggerAction('Open Theme Studio')}>
                    <span>Open Pine UI Theme Studio</span>
                  </CommandItem>
                  <CommandItem onSelect={() => triggerAction('Toggle Reduced Motion')}>
                    <span>Toggle Reduced Motion Physics</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
              <CommandLegend />
            </Command>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};


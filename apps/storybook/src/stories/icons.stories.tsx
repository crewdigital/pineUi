import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Icon,
  Check,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Search,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Trash,
  Plus,
  Minus,
  Close,
  Menu,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Filter,
  Calendar,
  Sun,
  Moon,
  SpinnerIcon,
} from '@pine-ui/icons';
import { Stack } from '@pine-ui/primitives/stack';
import { Inline } from '@pine-ui/primitives/inline';
import { Text } from '@pine-ui/primitives/text';
import { Surface } from '@pine-ui/primitives/surface';

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icons',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 40],
    },
    color: { control: 'color' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: (args) => <Search {...args} />,
  args: {
    size: 'md',
    label: 'Search',
  },
};

export const SizingScale: Story = {
  render: () => (
    <Inline gap={4} align="center">
      <Stack align="center" gap={1}>
        <CheckCircle size="xs" />
        <Text size="xs" color="muted">xs (12px)</Text>
      </Stack>
      <Stack align="center" gap={1}>
        <CheckCircle size="sm" />
        <Text size="xs" color="muted">sm (16px)</Text>
      </Stack>
      <Stack align="center" gap={1}>
        <CheckCircle size="md" />
        <Text size="xs" color="muted">md (20px)</Text>
      </Stack>
      <Stack align="center" gap={1}>
        <CheckCircle size="lg" />
        <Text size="xs" color="muted">lg (24px)</Text>
      </Stack>
      <Stack align="center" gap={1}>
        <CheckCircle size="xl" />
        <Text size="xs" color="muted">xl (32px)</Text>
      </Stack>
    </Inline>
  ),
};

export const Gallery: Story = {
  render: () => {
    const iconList = [
      { name: 'Check', Component: Check },
      { name: 'CheckCircle', Component: CheckCircle },
      { name: 'AlertCircle', Component: AlertCircle },
      { name: 'AlertTriangle', Component: AlertTriangle },
      { name: 'Info', Component: Info },
      { name: 'HelpCircle', Component: HelpCircle },
      { name: 'Search', Component: Search },
      { name: 'Copy', Component: Copy },
      { name: 'ExternalLink', Component: ExternalLink },
      { name: 'Eye', Component: Eye },
      { name: 'EyeOff', Component: EyeOff },
      { name: 'Trash', Component: Trash },
      { name: 'Plus', Component: Plus },
      { name: 'Minus', Component: Minus },
      { name: 'Close', Component: Close },
      { name: 'Menu', Component: Menu },
      { name: 'ChevronDown', Component: ChevronDown },
      { name: 'ChevronUp', Component: ChevronUp },
      { name: 'ChevronLeft', Component: ChevronLeft },
      { name: 'ChevronRight', Component: ChevronRight },
      { name: 'ArrowRight', Component: ArrowRight },
      { name: 'ArrowLeft', Component: ArrowLeft },
      { name: 'ArrowUp', Component: ArrowUp },
      { name: 'ArrowDown', Component: ArrowDown },
      { name: 'Filter', Component: Filter },
      { name: 'Calendar', Component: Calendar },
      { name: 'Sun', Component: Sun },
      { name: 'Moon', Component: Moon },
      { name: 'SpinnerIcon', Component: SpinnerIcon },
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '12px',
        }}
      >
        {iconList.map(({ name, Component }) => (
          <Surface
            key={name}
            variant="raised"
            bordered
            style={{
              padding: '16px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderRadius: '8px',
            }}
          >
            <Component size="lg" />
            <Text size="xs" color="subtle" align="center">
              {name}
            </Text>
          </Surface>
        ))}
      </div>
    );
  },
};

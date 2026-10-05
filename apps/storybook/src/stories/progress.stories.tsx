import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@pine-ui/react/progress';
import { Stack } from '@pine-ui/primitives/stack';

const meta: Meta<typeof Progress> = {
  title: 'Display/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'danger'] },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
    label: 'Upload progress',
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={4} style={{ maxWidth: '400px' }}>
      <Progress size="sm" value={30} label="Small (4px)" />
      <Progress size="md" value={60} label="Medium (8px)" />
      <Progress size="lg" value={90} label="Large (12px)" />
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack gap={4} style={{ maxWidth: '400px' }}>
      <Progress variant="primary" value={40} label="Primary" />
      <Progress variant="secondary" value={50} label="Secondary" />
      <Progress variant="success" value={100} label="Completed" />
      <Progress variant="warning" value={85} label="Storage warning" />
      <Progress variant="danger" value={95} label="Critical limit" />
    </Stack>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <Stack gap={4} style={{ maxWidth: '400px' }}>
      <Progress label="Loading system modules..." />
    </Stack>
  ),
};

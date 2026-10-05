import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@pine-ui/react/switch';
import { Stack } from '@pine-ui/primitives/stack';

const meta: Meta<typeof Switch> = {
  title: 'Controls/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Enable email notifications',
    helperText: 'Receive daily activity updates.',
  },
};

export const States: Story = {
  render: () => (
    <Stack gap={3}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled Off" disabled />
      <Switch label="Disabled On" defaultChecked disabled />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={3}>
      <Switch size="sm" label="Small Switch" defaultChecked />
      <Switch size="md" label="Medium Switch" defaultChecked />
      <Switch size="lg" label="Large Switch" defaultChecked />
    </Stack>
  ),
};

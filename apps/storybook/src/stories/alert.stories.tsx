import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@pine-ui/react/alert';
import { Stack } from '@pine-ui/primitives/stack';

const meta: Meta<typeof Alert> = {
  title: 'Display/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Note',
    children: 'System maintenance scheduled for tonight at 11:00 PM UTC.',
  },
};

export const Severities: Story = {
  render: () => (
    <Stack gap={3}>
      <Alert variant="info" title="Info Banner">
        Your subscription will renew automatically next month.
      </Alert>
      <Alert variant="success" title="Changes Saved">
        Your profile preferences have been updated successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your storage quota is at 88% capacity.
      </Alert>
      <Alert variant="danger" title="Payment Failed">
        We could not charge your credit card. Please update billing info.
      </Alert>
    </Stack>
  ),
};

export const Dismissable: Story = {
  render: () => (
    <Alert
      variant="info"
      title="Notification"
      onClose={() => alert('Dismissed')}
    >
      Click the close icon to dismiss this message.
    </Alert>
  ),
};

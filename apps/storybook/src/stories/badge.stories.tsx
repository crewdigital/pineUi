import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@pine-ui/react/badge';
import { Inline } from '@pine-ui/primitives/inline';

const meta: Meta<typeof Badge> = {
  title: 'Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'neutral',
        'success',
        'warning',
        'danger',
        'info',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['rounded', 'pill'] },
    dot: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'neutral',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Inline gap={2} align="center">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </Inline>
  ),
};

export const StatusDots: Story = {
  render: () => (
    <Inline gap={2} align="center">
      <Badge dot variant="success">
        Operational
      </Badge>
      <Badge dot variant="warning">
        Degraded
      </Badge>
      <Badge dot variant="danger">
        Outage
      </Badge>
    </Inline>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Inline gap={2} align="center">
      <Badge size="sm">Small (20px)</Badge>
      <Badge size="md">Medium (24px)</Badge>
      <Badge size="lg">Large (28px)</Badge>
    </Inline>
  ),
};

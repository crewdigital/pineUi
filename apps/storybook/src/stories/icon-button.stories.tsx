import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@pine-ui/react/icon-button';
import { Inline } from '@pine-ui/primitives/inline';

const meta: Meta<typeof IconButton> = {
  title: 'Controls/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'subtle'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['square', 'circle'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    'aria-label': 'Search',
    children: '🔍',
    variant: 'ghost',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <IconButton aria-label="Primary action" variant="primary">
        +
      </IconButton>
      <IconButton aria-label="Secondary action" variant="secondary">
        ⚙
      </IconButton>
      <IconButton aria-label="Outline action" variant="outline">
        ✏
      </IconButton>
      <IconButton aria-label="Ghost action" variant="ghost">
        ✕
      </IconButton>
      <IconButton aria-label="Danger action" variant="danger">
        🗑
      </IconButton>
      <IconButton aria-label="Subtle action" variant="subtle">
        ℹ
      </IconButton>
    </Inline>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <IconButton aria-label="Square shape" shape="square" variant="secondary">
        ★
      </IconButton>
      <IconButton aria-label="Circle shape" shape="circle" variant="secondary">
        ★
      </IconButton>
    </Inline>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <IconButton aria-label="Small" size="sm" variant="outline">
        ⚡
      </IconButton>
      <IconButton aria-label="Medium" size="md" variant="outline">
        ⚡
      </IconButton>
      <IconButton aria-label="Large" size="lg" variant="outline">
        ⚡
      </IconButton>
    </Inline>
  ),
};

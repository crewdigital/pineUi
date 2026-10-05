import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@pine-ui/react/skeleton';
import { Stack } from '@pine-ui/primitives/stack';
import { Inline } from '@pine-ui/primitives/inline';

const meta: Meta<typeof Skeleton> = {
  title: 'Display/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    shape: { control: 'select', options: ['text', 'rectangular', 'circular'] },
    variant: { control: 'select', options: ['pulse', 'wave', 'none'] },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    shape: 'text',
    width: '240px',
  },
};

export const Shapes: Story = {
  render: () => (
    <Stack gap={4}>
      <Skeleton shape="text" width="300px" />
      <Skeleton shape="rectangular" width="300px" height="150px" />
      <Skeleton shape="circular" width="48px" height="48px" />
    </Stack>
  ),
};

export const CardLoadingState: Story = {
  render: () => (
    <Stack gap={3} style={{ width: '320px', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <Inline gap={3} align="center">
        <Skeleton shape="circular" width="40px" height="40px" />
        <Stack gap={1} style={{ flex: 1 }}>
          <Skeleton shape="text" width="60%" />
          <Skeleton shape="text" width="40%" />
        </Stack>
      </Inline>
      <Skeleton shape="rectangular" width="100%" height="120px" />
    </Stack>
  ),
};

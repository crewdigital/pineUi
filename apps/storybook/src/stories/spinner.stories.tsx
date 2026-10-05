import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@pine-ui/react/spinner';
import { Inline } from '@pine-ui/primitives/inline';

const meta: Meta<typeof Spinner> = {
  title: 'Display/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['primary', 'secondary', 'neutral', 'inverse'] },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'primary',
  },
};

export const Sizes: Story = {
  render: () => (
    <Inline gap={4} align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </Inline>
  ),
};

export const Variants: Story = {
  render: () => (
    <Inline gap={4} align="center">
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
      <Spinner variant="neutral" />
    </Inline>
  ),
};

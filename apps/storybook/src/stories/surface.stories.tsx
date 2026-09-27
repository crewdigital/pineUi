import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Surface } from '@pine-ui/primitives/surface';
import { Stack } from '@pine-ui/primitives/stack';

const meta: Meta<typeof Surface> = {
  title: 'Primitives/Surface',
  component: Surface,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'raised', 'muted', 'brand', 'canvas'],
      description: 'Semantic background variant mapped to design tokens.',
    },
    shadow: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    borderRadius: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    bordered: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  args: {
    variant: 'default',
    borderRadius: 'md',
    bordered: true,
    children: (
      <div style={{ padding: '16px' }}>
        Default surface — maps to <code>backgroundSurface</code> token.
      </div>
    ),
  },
};

export const Raised: Story = {
  args: {
    variant: 'raised',
    borderRadius: 'lg',
    children: (
      <div style={{ padding: '16px' }}>
        Raised surface with built-in shadow (shadowMd).
      </div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack gap={3}>
      {(['default', 'subtle', 'raised', 'muted', 'brand', 'canvas'] as const).map((v) => (
        <Surface key={v} variant={v} borderRadius="md" bordered style={{ padding: 16 } as React.CSSProperties}>
          variant="{v}"
        </Surface>
      ))}
    </Stack>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@pine-ui/primitives/container';
import { Box } from '@pine-ui/primitives/box';

const meta: Meta<typeof Container> = {
  title: 'Primitives/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width constraint.',
    },
    paddingInline: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
      description: 'Horizontal (inline) padding using space tokens.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    size: '2xl',
    paddingInline: 4,
    children: (
      <Box
        padding={4}
        borderRadius="md"
        borderWidth={1}
        style={{ background: '#eff6ff', textAlign: 'center' } as React.CSSProperties}
      >
        Container — max-width 2xl, padding 4
      </Box>
    ),
  },
};

export const NarrowMd: Story = {
  args: {
    size: 'md',
    paddingInline: 4,
    children: (
      <Box
        padding={4}
        borderRadius="md"
        borderWidth={1}
        style={{ background: '#f0fdf4', textAlign: 'center' } as React.CSSProperties}
      >
        Container — max-width md (768px)
      </Box>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    size: 'full',
    paddingInline: 6,
    children: (
      <Box
        padding={4}
        borderRadius="md"
        borderWidth={1}
        style={{ background: '#fefce8', textAlign: 'center' } as React.CSSProperties}
      >
        Container — full width, no max-width constraint
      </Box>
    ),
  },
};

import * as React from 'react';

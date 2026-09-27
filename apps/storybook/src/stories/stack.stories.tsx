import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@pine-ui/primitives/stack';
import { Box } from '@pine-ui/primitives/box';

const meta: Meta<typeof Stack> = {
  title: 'Primitives/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  args: {
    gap: 4,
  },
  render: (args) => (
    <Stack {...args}>
      <Box padding={3} borderRadius="sm" borderWidth={1}>
        Stack Item 1
      </Box>
      <Box padding={3} borderRadius="sm" borderWidth={1}>
        Stack Item 2
      </Box>
      <Box padding={3} borderRadius="sm" borderWidth={1}>
        Stack Item 3
      </Box>
    </Stack>
  ),
};

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Inline } from '@pine-ui/primitives/inline';
import { Box } from '@pine-ui/primitives/box';

const meta: Meta<typeof Inline> = {
  title: 'Primitives/Inline',
  component: Inline,
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
type Story = StoryObj<typeof Inline>;

export const Default: Story = {
  args: {
    gap: 3,
    align: 'center',
  },
  render: (args) => (
    <Inline {...args}>
      <Box padding={2} borderRadius="full" borderWidth={1}>
        Badge A
      </Box>
      <Box padding={2} borderRadius="full" borderWidth={1}>
        Badge B
      </Box>
      <Box padding={2} borderRadius="full" borderWidth={1}>
        Badge C
      </Box>
    </Inline>
  ),
};

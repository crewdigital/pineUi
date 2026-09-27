import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Cluster } from '@pine-ui/primitives/cluster';
import { Box } from '@pine-ui/primitives/box';

const meta: Meta<typeof Cluster> = {
  title: 'Primitives/Cluster',
  component: Cluster,
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
    rowGap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
    columnGap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Cluster>;

export const Default: Story = {
  args: {
    gap: 2,
    align: 'center',
    justify: 'start',
  },
  render: (args) => (
    <Cluster {...args}>
      {['React', 'TypeScript', 'StyleX', 'Vite', 'Vitest', 'WCAG 2.2 AA', 'Storybook'].map((tag) => (
        <Box key={tag} paddingInline={3} paddingBlock={1} borderRadius="full" borderWidth={1}>
          {tag}
        </Box>
      ))}
    </Cluster>
  ),
};

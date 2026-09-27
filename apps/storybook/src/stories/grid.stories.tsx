import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@pine-ui/primitives/grid';
import { Box } from '@pine-ui/primitives/box';

const meta: Meta<typeof Grid> = {
  title: 'Primitives/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: 4,
  },
  render: (args) => (
    <Grid {...args}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Box key={item} padding={4} borderRadius="md" borderWidth={1}>
          Grid Card {item}
        </Box>
      ))}
    </Grid>
  ),
};

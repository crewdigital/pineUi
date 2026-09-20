import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@pine-ui/primitives/box';

const meta: Meta<typeof Box> = {
  title: 'Primitives/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
    borderRadius: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    borderWidth: {
      control: 'select',
      options: [0, 1, 2, 4],
    },
    display: {
      control: 'select',
      options: ['block', 'inline', 'inline-block', 'flex', 'grid'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: 'This is a Level 1 static Box primitive with zero runtime overhead.',
    padding: 4,
    borderRadius: 'md',
    borderWidth: 1,
  },
};

export const PolymorphicSection: Story = {
  args: {
    as: 'section',
    children: 'Rendered semantically as a <section> element with tokenized padding.',
    padding: 6,
    borderRadius: 'lg',
    borderWidth: 1,
  },
};

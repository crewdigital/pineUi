import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@pine-ui/primitives/separator';
import { Stack } from '@pine-ui/primitives/stack';
import { Inline } from '@pine-ui/primitives/inline';

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'strong'],
    },
    decorative: {
      control: 'boolean',
      description:
        'When true, the separator is hidden from assistive tech. When false, role="separator" is applied.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <Stack gap={4} style={{ width: '360px' } as React.CSSProperties}>
      <span>Section A</span>
      <Separator />
      <span>Section B</span>
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Inline gap={4} align="center" style={{ height: '40px' } as React.CSSProperties}>
      <span>Item A</span>
      <Separator orientation="vertical" />
      <span>Item B</span>
      <Separator orientation="vertical" />
      <span>Item C</span>
    </Inline>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack gap={4} style={{ width: '360px' } as React.CSSProperties}>
      <span>Default</span>
      <Separator variant="default" />
      <span>Subtle</span>
      <Separator variant="subtle" />
      <span>Strong</span>
      <Separator variant="strong" />
    </Stack>
  ),
};

export const Semantic: Story = {
  args: {
    decorative: false,
    orientation: 'horizontal',
    variant: 'default',
  },
  render: (args) => (
    <Stack gap={4} style={{ width: '360px' } as React.CSSProperties}>
      <span>Content above semantic separator</span>
      <Separator {...args} />
      <span>Content below semantic separator</span>
    </Stack>
  ),
};

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@pine-ui/primitives/text';
import { Stack } from '@pine-ui/primitives/stack';

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'muted', 'disabled', 'inverse', 'brand', 'danger', 'success', 'warning'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'justify'],
    },
    truncate: { control: 'boolean' },
    italic: { control: 'boolean' },
    underline: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    size: 'md',
    weight: 'regular',
    variant: 'primary',
  },
};

export const TypeScale: Story = {
  render: () => (
    <Stack gap={3}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Text key={size} size={size}>
          size="{size}" — The quick brown fox
        </Text>
      ))}
    </Stack>
  ),
};

export const WeightScale: Story = {
  render: () => (
    <Stack gap={3}>
      {(['regular', 'medium', 'semibold', 'bold'] as const).map((weight) => (
        <Text key={weight} weight={weight}>
          weight="{weight}" — The quick brown fox
        </Text>
      ))}
    </Stack>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <Stack gap={2}>
      {(
        ['primary', 'secondary', 'tertiary', 'muted', 'brand', 'danger', 'success', 'warning'] as const
      ).map((variant) => (
        <Text key={variant} variant={variant} size="sm">
          variant="{variant}"
        </Text>
      ))}
    </Stack>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Text truncate>
        This is a very long text that will be truncated with an ellipsis at the boundary.
      </Text>
    </div>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <Stack gap={2}>
      <Text as="p" size="sm">Rendered as &lt;p&gt;</Text>
      <Text as="span" size="sm" weight="semibold">Rendered as &lt;span&gt;</Text>
      <Text as="label" size="sm" variant="secondary">Rendered as &lt;label&gt;</Text>
      <Text as="li" size="sm">Rendered as &lt;li&gt;</Text>
    </Stack>
  ),
};

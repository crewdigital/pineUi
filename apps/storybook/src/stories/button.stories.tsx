import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@pine-ui/react/button';
import { Stack } from '@pine-ui/primitives/stack';
import { Inline } from '@pine-ui/primitives/inline';
import { Plus, ArrowRight, Check } from '@pine-ui/icons';

const meta: Meta<typeof Button> = {
  title: 'Controls/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'subtle'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="subtle">Subtle</Button>
    </Inline>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <Button size="sm">Small (32px)</Button>
      <Button size="md">Medium (40px)</Button>
      <Button size="lg">Large (48px)</Button>
    </Inline>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap={3}>
      <Inline gap={3} align="center">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading...</Button>
      </Inline>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <Button iconStart={<Check size={16} />}>Start Icon</Button>
      <Button iconEnd={<ArrowRight size={16} />} variant="secondary">
        End Icon
      </Button>
      <Button iconStart={<Plus size={16} />} iconEnd={<span>Ctrl+K</span>} variant="outline">
        Shortcut
      </Button>
    </Inline>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Stack gap={3} style={{ width: '400px' }}>
      <Button fullWidth variant="primary">
        Full Width Primary
      </Button>
      <Button fullWidth variant="secondary">
        Full Width Secondary
      </Button>
    </Stack>
  ),
};

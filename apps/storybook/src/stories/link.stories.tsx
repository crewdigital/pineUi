import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@pine-ui/react/link';
import { Stack } from '@pine-ui/primitives/stack';
import { Inline } from '@pine-ui/primitives/inline';

const meta: Meta<typeof Link> = {
  title: 'Controls/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'subtle', 'neutral'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
    external: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Read the documentation',
    variant: 'primary',
    underline: 'hover',
  },
};

export const Variants: Story = {
  render: () => (
    <Inline gap={4} align="center">
      <Link href="#" variant="primary">
        Primary Link
      </Link>
      <Link href="#" variant="secondary">
        Secondary Link
      </Link>
      <Link href="#" variant="subtle">
        Subtle Link
      </Link>
      <Link href="#" variant="neutral">
        Neutral Link
      </Link>
    </Inline>
  ),
};

export const UnderlineOptions: Story = {
  render: () => (
    <Inline gap={4} align="center">
      <Link href="#" underline="hover">
        Underline on Hover
      </Link>
      <Link href="#" underline="always">
        Always Underlined
      </Link>
      <Link href="#" underline="none">
        No Underline
      </Link>
    </Inline>
  ),
};

export const ExternalLink: Story = {
  render: () => (
    <Stack gap={3}>
      <Link href="https://github.com" external>
        Visit GitHub repository
      </Link>
    </Stack>
  ),
};

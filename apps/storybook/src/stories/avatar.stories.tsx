import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '@pine-ui/react/avatar';
import { Inline } from '@pine-ui/primitives/inline';

const meta: Meta<typeof Avatar> = {
  title: 'Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
    status: { control: 'select', options: ['online', 'offline', 'busy', 'away'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'Jane Doe',
    size: 'md',
  },
};

export const Initials: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <Avatar name="Alice Smith" />
      <Avatar name="Bob Vance" />
      <Avatar name="Charlie" />
    </Inline>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <Avatar name="Alice" status="online" />
      <Avatar name="Bob" status="offline" />
      <Avatar name="Charlie" status="busy" />
      <Avatar name="David" status="away" />
    </Inline>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <Avatar size="xs" name="John Doe" />
      <Avatar size="sm" name="John Doe" />
      <Avatar size="md" name="John Doe" />
      <Avatar size="lg" name="John Doe" />
      <Avatar size="xl" name="John Doe" />
    </Inline>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3} size="md">
      <Avatar name="Alice Smith" />
      <Avatar name="Bob Vance" />
      <Avatar name="Charlie Brown" />
      <Avatar name="David Miller" />
      <Avatar name="Emma Watson" />
    </AvatarGroup>
  ),
};

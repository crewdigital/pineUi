import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '@pine-ui/react/radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Controls/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    label: 'Select billing cycle',
    defaultValue: 'monthly',
    children: (
      <>
        <Radio value="monthly" label="Monthly billing ($15/mo)" />
        <Radio value="annual" label="Annual billing ($120/yr — save 33%)" />
      </>
    ),
  },
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup
      label="Choose theme"
      orientation="horizontal"
      defaultValue="system"
    >
      <Radio value="light" label="Light" />
      <Radio value="dark" label="Dark" />
      <Radio value="system" label="System" />
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <RadioGroup label="Radio sizes" size="lg" defaultValue="md">
      <Radio size="sm" value="sm" label="Small Radio (16px)" />
      <Radio size="md" value="md" label="Medium Radio (20px)" />
      <Radio size="lg" value="lg" label="Large Radio (24px)" />
    </RadioGroup>
  ),
};

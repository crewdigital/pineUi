import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@pine-ui/react/checkbox';
import { Stack } from '@pine-ui/primitives/stack';

const meta: Meta<typeof Checkbox> = {
  title: 'Controls/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'I accept the terms of service',
    helperText: 'You must agree to continue.',
  },
};

export const States: Story = {
  render: () => (
    <Stack gap={3}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled Unchecked" disabled />
      <Checkbox label="Disabled Checked" defaultChecked disabled />
      <Checkbox
        label="Error State"
        errorMessage="You must accept the privacy policy."
      />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={3}>
      <Checkbox size="sm" label="Small Checkbox (16px)" defaultChecked />
      <Checkbox size="md" label="Medium Checkbox (20px)" defaultChecked />
      <Checkbox size="lg" label="Large Checkbox (24px)" defaultChecked />
    </Stack>
  ),
};

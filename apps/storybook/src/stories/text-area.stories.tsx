import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@pine-ui/react/text-area';
import { Stack } from '@pine-ui/primitives/stack';

const meta: Meta<typeof TextArea> = {
  title: 'Controls/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: 'Bio / About',
    placeholder: 'Tell us a little bit about yourself...',
    helperText: 'Maximum 500 characters.',
    rows: 4,
  },
};

export const ErrorState: Story = {
  render: () => (
    <Stack gap={3} style={{ maxWidth: '400px' }}>
      <TextArea
        label="Project description"
        errorMessage="Project description is required before submission."
        rows={4}
      />
    </Stack>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <Stack gap={3} style={{ maxWidth: '400px' }}>
      <TextArea label="Vertical Resize (Default)" resize="vertical" rows={3} />
      <TextArea label="No Resize" resize="none" rows={3} />
    </Stack>
  ),
};

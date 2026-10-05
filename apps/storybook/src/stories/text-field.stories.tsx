import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@pine-ui/react/text-field';
import { Stack } from '@pine-ui/primitives/stack';

const meta: Meta<typeof TextField> = {
  title: 'Controls/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'user@example.com',
    helperText: 'We will never share your email.',
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={3} style={{ maxWidth: '320px' }}>
      <TextField size="sm" label="Small (32px)" placeholder="Small input..." />
      <TextField size="md" label="Medium (40px)" placeholder="Medium input..." />
      <TextField size="lg" label="Large (48px)" placeholder="Large input..." />
    </Stack>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <Stack gap={3} style={{ maxWidth: '320px' }}>
      <TextField
        label="Username"
        defaultValue="invalid_user#"
        errorMessage="Username can only contain alphanumeric characters."
      />
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack gap={3} style={{ maxWidth: '320px' }}>
      <TextField
        label="Search project"
        iconStart={<span>🔍</span>}
        placeholder="Type to search..."
      />
      <TextField
        label="Price"
        iconStart={<span>$</span>}
        iconEnd={<span>USD</span>}
        placeholder="0.00"
      />
    </Stack>
  ),
};

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@pine-ui/react/select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: '320px', padding: '40px' }}>
      <Select defaultValue="system">
        <SelectTrigger>
          <SelectValue placeholder="Select a theme..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Appearance</SelectLabel>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>High Contrast</SelectLabel>
            <SelectItem value="high-contrast-light">High Contrast (Light)</SelectItem>
            <SelectItem value="high-contrast-dark">High Contrast (Dark)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '320px', padding: '40px' }}>
      <Select disabled defaultValue="disabled-val">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="disabled-val">Cannot change</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

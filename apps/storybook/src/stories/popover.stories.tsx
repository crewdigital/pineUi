import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@pine-ui/react/popover';
import { Button } from '@pine-ui/react/button';
import { TextField } from '@pine-ui/react/text-field';
import { Stack } from '@pine-ui/primitives/stack';
import { Heading } from '@pine-ui/primitives/heading';
import { Text } from '@pine-ui/primitives/text';
import { Cluster } from '@pine-ui/primitives/cluster';

const meta: Meta<typeof Popover> = {
  title: 'Overlays & Containers/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '60px' }}>
      <Popover>
        <PopoverTrigger>
          <Button variant="secondary">View Filter Options</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="start">
          <Stack gap={3}>
            <Heading level={4} size="sm">Filter Results</Heading>
            <Text size="xs" color="secondary">
              Customize data columns and time ranges shown in the dashboard.
            </Text>
            <TextField label="Search keyword" placeholder="e.g. status:active" />
            <Cluster gap={2} justify="end">
              <PopoverClose>
                <Button variant="ghost" size="sm">Cancel</Button>
              </PopoverClose>
              <PopoverClose>
                <Button variant="primary" size="sm">Apply Filter</Button>
              </PopoverClose>
            </Cluster>
          </Stack>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', padding: '80px' }}>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <Text size="sm">Content on Top</Text>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <Text size="sm">Content on Bottom</Text>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <Text size="sm">Content on Left</Text>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <Text size="sm">Content on Right</Text>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

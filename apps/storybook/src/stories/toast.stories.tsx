import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, toast } from '@pine-ui/react/toast';
import { Button } from '@pine-ui/react/button';

const meta: Meta<typeof Toaster> = {
  title: 'Navigation & Overlays/Toast',
  component: Toaster,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toaster />
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: 'Changes saved',
              description: 'Your profile preferences have been updated.',
            })
          }
        >
          Default Toast
        </Button>

        <Button
          variant="primary"
          onClick={() =>
            toast.success('Successfully deployed', {
              description: 'Version 2.4.0 is now live in production.',
            })
          }
        >
          Success Toast
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            toast.warning('Storage limit approaching', {
              description: 'You have used 85% of your allocated workspace storage.',
            })
          }
        >
          Warning Toast
        </Button>

        <Button
          variant="danger"
          onClick={() =>
            toast.error('Connection failed', {
              description: 'Could not establish connection to the primary database cluster.',
            })
          }
        >
          Error Toast
        </Button>
      </div>
    </div>
  ),
};

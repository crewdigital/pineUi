import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@pine-ui/react/dialog';
import { Button } from '@pine-ui/react/button';
import { TextField } from '@pine-ui/react/text-field';
import { Stack } from '@pine-ui/primitives/stack';
import { Cluster } from '@pine-ui/primitives/cluster';
import { Text } from '@pine-ui/primitives/text';

const meta: Meta<typeof Dialog> = {
  title: 'Overlays & Containers/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button variant="primary">Edit Workspace Profile</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Workspace Profile</DialogTitle>
            <DialogDescription>
              Update your workspace brand name and contact point for team alerts.
            </DialogDescription>
          </DialogHeader>

          <Stack gap={3}>
            <TextField label="Organization Name" defaultValue="Acme Global Inc." />
            <TextField label="Contact Email" defaultValue="admin@acme.example.com" />
          </Stack>

          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button variant="primary">Save Changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
};

export const DestructiveConfirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button variant="danger">Delete Repository</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the repository
              and remove all associated collaborator teams and CI pipelines.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button variant="danger">Yes, Delete Repository</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
};

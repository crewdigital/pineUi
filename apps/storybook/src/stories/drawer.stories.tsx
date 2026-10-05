import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from '@pine-ui/react/drawer';
import { Button } from '@pine-ui/react/button';

const meta: Meta<typeof Drawer> = {
  title: 'Navigation & Overlays/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '40px', display: 'flex', gap: '16px' }}>
      <Drawer>
        <DrawerTrigger>
          <Button variant="primary">Open Right Drawer</Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerContent side="right">
            <DrawerHeader>
              <DrawerTitle>Account Settings</DrawerTitle>
              <DrawerDescription>
                Manage your account preferences and security options.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p style={{ margin: 0, lineHeight: 1.6 }}>
                Adjust notifications, manage linked accounts, and configure
                two-factor authentication credentials.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button variant="primary">Save Changes</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  ),
};

export const LeftDrawer: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Drawer>
        <DrawerTrigger>
          <Button variant="secondary">Open Left Navigation</Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerContent side="left">
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerDescription>Explore the dashboard</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#overview" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                  Overview
                </a>
                <a href="#analytics" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                  Analytics
                </a>
                <a href="#reports" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                  Reports
                </a>
                <a href="#settings" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                  Settings
                </a>
              </nav>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close Menu</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  ),
};

export const BottomDrawer: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Drawer>
        <DrawerTrigger>
          <Button variant="outline">Open Bottom Sheet</Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerContent side="bottom">
            <DrawerHeader>
              <DrawerTitle>Share Post</DrawerTitle>
              <DrawerDescription>Share this post with teammates</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p style={{ margin: 0 }}>
                Copy the direct link or invite collaborators by email address.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="primary">Done</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  ),
};

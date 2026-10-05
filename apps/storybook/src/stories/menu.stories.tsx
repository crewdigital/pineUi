import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuGroup,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
} from '@pine-ui/react/menu';
import { Button } from '@pine-ui/react/button';

const meta: Meta<typeof Menu> = {
  title: 'Navigation & Overlays/Menu',
  component: Menu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '80px', display: 'flex', justifyContent: 'center' }}>
      <Menu>
        <MenuTrigger>
          <Button variant="secondary">My Account</Button>
        </MenuTrigger>
        <MenuContent>
          <MenuLabel>Personal</MenuLabel>
          <MenuItem>
            <span>Profile</span>
            <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <span>Billing</span>
            <MenuShortcut>⌘B</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <span>Settings</span>
            <MenuShortcut>⌘S</MenuShortcut>
          </MenuItem>
          <MenuSeparator />
          <MenuGroup>
            <MenuLabel>Team</MenuLabel>
            <MenuItem>Invite Members</MenuItem>
            <MenuItem>Team Settings</MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem disabled>Cloud Backups (Pro)</MenuItem>
          <MenuSeparator />
          <MenuItem style={{ color: 'var(--pine-color-red-600, #dc2626)' }}>
            Log out
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <div style={{ padding: '80px', display: 'flex', justifyContent: 'flex-end' }}>
      <Menu>
        <MenuTrigger>
          <Button variant="outline">Actions ▾</Button>
        </MenuTrigger>
        <MenuContent align="end">
          <MenuItem>Duplicate</MenuItem>
          <MenuItem>Archive</MenuItem>
          <MenuSeparator />
          <MenuItem style={{ color: '#ef4444' }}>Delete Permanently</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};

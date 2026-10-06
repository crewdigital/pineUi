import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from '@pine-ui/react/tabs';
import { Text } from '@pine-ui/primitives/text';

const meta: Meta<typeof Tabs> = {
  title: 'Overlays & Containers/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'enclosed', 'pill'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="account" variant="line">
      <TabList>
        <Tab value="account">Account</Tab>
        <Tab value="password">Password</Tab>
        <Tab value="team">Team Members</Tab>
        <Tab value="billing" disabled>Billing (Disabled)</Tab>
      </TabList>
      <TabPanel value="account">
        <Text>Manage your account settings, username, and public profile details.</Text>
      </TabPanel>
      <TabPanel value="password">
        <Text>Change your password and configure multifactor authentication credentials.</Text>
      </TabPanel>
      <TabPanel value="team">
        <Text>Invite collaborators and manage user access permissions.</Text>
      </TabPanel>
      <TabPanel value="billing">
        <Text>Billing information and payment invoices.</Text>
      </TabPanel>
    </Tabs>
  ),
};

export const EnclosedVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="enclosed">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="analytics">Analytics</Tab>
        <Tab value="reports">Reports</Tab>
      </TabList>
      <TabPanel value="overview">
        <Text>High-level dashboard metrics and system summary.</Text>
      </TabPanel>
      <TabPanel value="analytics">
        <Text>Deep-dive customer cohort and event analytics.</Text>
      </TabPanel>
      <TabPanel value="reports">
        <Text>Exportable CSV and PDF performance reports.</Text>
      </TabPanel>
    </Tabs>
  ),
};

export const PillVariant: Story = {
  render: () => (
    <Tabs defaultValue="day" variant="pill">
      <TabList>
        <Tab value="day">Day</Tab>
        <Tab value="week">Week</Tab>
        <Tab value="month">Month</Tab>
        <Tab value="year">Year</Tab>
      </TabList>
      <TabPanel value="day">
        <Text>Daily telemetry statistics.</Text>
      </TabPanel>
      <TabPanel value="week">
        <Text>Weekly aggregated view.</Text>
      </TabPanel>
      <TabPanel value="month">
        <Text>Monthly trend analysis.</Text>
      </TabPanel>
      <TabPanel value="year">
        <Text>Annual growth metrics.</Text>
      </TabPanel>
    </Tabs>
  ),
};

export const VerticalOrientation: Story = {
  render: () => (
    <Tabs defaultValue="general" orientation="vertical" variant="enclosed">
      <TabList>
        <Tab value="general">General</Tab>
        <Tab value="appearance">Appearance</Tab>
        <Tab value="integrations">Integrations</Tab>
        <Tab value="api">API Keys</Tab>
      </TabList>
      <TabPanel value="general">
        <Text>General project configuration and workspace metadata.</Text>
      </TabPanel>
      <TabPanel value="appearance">
        <Text>Dark mode, light mode, and high-contrast color scheme preferences.</Text>
      </TabPanel>
      <TabPanel value="integrations">
        <Text>Connected third-party services and webhooks.</Text>
      </TabPanel>
      <TabPanel value="api">
        <Text>Manage public and secret API tokens.</Text>
      </TabPanel>
    </Tabs>
  ),
};

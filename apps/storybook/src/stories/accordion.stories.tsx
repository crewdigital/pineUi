import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@pine-ui/react/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Overlays & Containers/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Pine UI?</AccordionTrigger>
        <AccordionContent>
          Pine UI is an enterprise-grade, zero-runtime React design system powered by StyleX and DTCG tokens.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does Pine UI support Server Components?</AccordionTrigger>
        <AccordionContent>
          Yes! Primitives are pure static and RSC-safe. Interactive components declare 'use client'.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Strict WCAG 2.2 AA compliant with full keyboard navigation and ARIA attributes.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Notifications Settings</AccordionTrigger>
        <AccordionContent>Configure email, SMS, and in-app alert preferences.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Security & Privacy</AccordionTrigger>
        <AccordionContent>Manage two-factor authentication and active sessions.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Billing Details</AccordionTrigger>
        <AccordionContent>View payment history, invoices, and payment methods.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DisabledItem: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Available Feature</AccordionTrigger>
        <AccordionContent>This feature is available on your current plan.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Enterprise Feature (Disabled)</AccordionTrigger>
        <AccordionContent>Upgrade to Enterprise to unlock this capability.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

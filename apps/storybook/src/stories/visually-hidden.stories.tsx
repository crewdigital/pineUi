import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from '@pine-ui/primitives/visually-hidden';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Primitives/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Renders content that is visually hidden but accessible to screen readers. Use this for labels, announcements, and supplementary context that sighted users can infer from visual design.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const IconButton: Story = {
  render: () => (
    <button type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer' }}>
      {/* Simulated icon */}
      <span aria-hidden="true" style={{ fontSize: 18 }}>✕</span>
      <VisuallyHidden>Close dialog</VisuallyHidden>
    </button>
  ),
};

export const ScreenReaderOnlyLabel: Story = {
  render: () => (
    <div>
      <input
        type="search"
        aria-label="Search products"
        placeholder="Search..."
        style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, width: 240 }}
      />
      {/* aria-label already handles the accessible name here,
          but VisuallyHidden can be used to add supplementary context */}
      <VisuallyHidden>
        Type a product name, SKU, or keyword
      </VisuallyHidden>
    </div>
  ),
};

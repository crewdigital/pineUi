import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FocusRing } from '@pine-ui/primitives/focus-ring';
import { Stack } from '@pine-ui/primitives/stack';
import { Inline } from '@pine-ui/primitives/inline';

const meta: Meta<typeof FocusRing> = {
  title: 'Primitives/FocusRing',
  component: FocusRing,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Applies a WCAG 2.2 AA-compliant, token-driven `:focus-visible` ring to its single child element. Zero JS overhead — purely CSS via StyleX.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'inset', 'offset'],
      description:
        '`default` = 2px offset ring | `inset` = ring inside boundary | `offset` = extra-spaced ring (4px gap)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FocusRing>;

export const DefaultRing: Story = {
  render: () => (
    <Inline gap={4}>
      <FocusRing>
        <button
          type="button"
          style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', cursor: 'pointer' }}
        >
          Tab to me (default)
        </button>
      </FocusRing>
    </Inline>
  ),
};

export const InsetRing: Story = {
  render: () => (
    <FocusRing variant="inset">
      <button
        type="button"
        style={{ padding: '8px 16px', borderRadius: 6, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Inset ring (inside boundary)
      </button>
    </FocusRing>
  ),
};

export const OffsetRing: Story = {
  render: () => (
    <FocusRing variant="offset">
      <button
        type="button"
        style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', cursor: 'pointer' }}
      >
        Offset ring (4px gap)
      </button>
    </FocusRing>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack gap={4}>
      {(['default', 'inset', 'offset'] as const).map((variant) => (
        <FocusRing key={variant} variant={variant}>
          <button
            type="button"
            style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', cursor: 'pointer', width: 240 }}
          >
            Tab here — {variant}
          </button>
        </FocusRing>
      ))}
    </Stack>
  ),
};

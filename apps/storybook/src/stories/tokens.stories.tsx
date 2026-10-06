import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Surface } from '@pine-ui/primitives/surface';
import { Stack } from '@pine-ui/primitives/stack';
import { Inline } from '@pine-ui/primitives/inline';
import { Text } from '@pine-ui/primitives/text';
import { Box } from '@pine-ui/primitives/box';

const meta: Meta = {
  title: 'Foundations/Design Tokens',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ColorTokens: Story = {
  render: () => {
    const semanticColors = [
      { name: 'action.primary', hex: '#2563eb', desc: 'Primary brand call-to-actions' },
      { name: 'feedback.success', hex: '#16a34a', desc: 'Success notifications and states' },
      { name: 'feedback.warning', hex: '#d97706', desc: 'Cautionary warnings and alerts' },
      { name: 'feedback.danger', hex: '#dc2626', desc: 'Critical errors and destructive actions' },
      { name: 'surface.default', hex: '#ffffff', desc: 'Base surface and card background' },
      { name: 'surface.subtle', hex: '#f8fafc', desc: 'Subtle background elevation' },
      { name: 'border.default', hex: '#e2e8f0', desc: 'Default container and input borders' },
      { name: 'text.primary', hex: '#0f172a', desc: 'High-contrast primary foreground' },
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {semanticColors.map((color) => (
          <Surface key={color.name} variant="raised" bordered style={{ padding: '16px', borderRadius: '8px' }}>
            <Box style={{ height: '48px', backgroundColor: color.hex, borderRadius: '4px', marginBottom: '8px', border: '1px solid rgba(0,0,0,0.1)' }} />
            <Text weight="bold" size="sm">{color.name}</Text>
            <Text size="xs" color="muted">{color.hex}</Text>
            <div style={{ marginTop: '4px' }}>
              <Text size="xs" color="subtle">{color.desc}</Text>
            </div>
          </Surface>
        ))}
      </div>
    );
  },
};

export const SpacingScale: Story = {
  render: () => {
    const scales = [
      { step: '0.5', px: 2 },
      { step: '1', px: 4 },
      { step: '2', px: 8 },
      { step: '3', px: 12 },
      { step: '4', px: 16 },
      { step: '6', px: 24 },
      { step: '8', px: 32 },
      { step: '12', px: 48 },
    ];

    return (
      <Stack gap={3}>
        {scales.map((s) => (
          <Inline key={s.step} gap={4} align="center">
            <Box style={{ width: '80px' }}>
              <Text size="sm" weight="semibold">space.{s.step}</Text>
              <Text size="xs" color="muted">{s.px}px</Text>
            </Box>
            <Box style={{ width: `${s.px}px`, height: '24px', backgroundColor: '#3b82f6', borderRadius: '4px' }} />
          </Inline>
        ))}
      </Stack>
    );
  },
};

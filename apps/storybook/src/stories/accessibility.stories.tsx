import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Surface } from '@pine-ui/primitives/surface';
import { Stack } from '@pine-ui/primitives/stack';
import { Inline } from '@pine-ui/primitives/inline';
import { Heading } from '@pine-ui/primitives/heading';
import { Text } from '@pine-ui/primitives/text';
import { Button } from '@pine-ui/react/button';
import { Badge } from '@pine-ui/react/badge';
import { TextField } from '@pine-ui/react/text-field';
import { Checkbox } from '@pine-ui/react/checkbox';

const meta: Meta = {
  title: 'Foundations/Accessibility Matrix',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const KeyboardMatrix: Story = {
  render: () => {
    const keyboardRules = [
      { key: 'Tab / Shift+Tab', action: 'Move forward and backward between interactive components' },
      { key: 'Enter / Space', action: 'Activate buttons, links, toggles, checkboxes, dialog triggers' },
      { key: 'Arrow Keys', action: 'Navigate within roving tabindex lists (Tabs, Menus, Select, Radio groups)' },
      { key: 'Escape', action: 'Dismiss open overlays (Dialogs, Popovers, Menus, Tooltips) and restore focus' },
      { key: 'Home / End', action: 'Jump directly to first or last option in listboxes and menus' },
    ];

    return (
      <Stack gap={4}>
        <Inline gap={2} align="center">
          <Heading level={3}>WCAG 2.2 AA Keyboard Navigation Matrix</Heading>
          <Badge variant="success">Fully Operable</Badge>
        </Inline>

        <Surface variant="raised" bordered style={{ padding: '20px', borderRadius: '8px' }}>
          <Stack gap={3}>
            {keyboardRules.map((r) => (
              <Inline key={r.key} justify="between" align="center" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <code style={{ fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>
                  {r.key}
                </code>
                <Text size="sm" color="muted">
                  {r.action}
                </Text>
              </Inline>
            ))}
          </Stack>
        </Surface>

        <Surface variant="raised" bordered style={{ padding: '20px', borderRadius: '8px' }}>
          <Stack gap={3}>
            <Heading level={4}>Interactive Focus & Tab Order Test Sandbox</Heading>
            <Text size="sm" color="muted">
              Press Tab to verify high-contrast :focus-visible rings and logical forward focus traversal:
            </Text>
            <Inline gap={3}>
              <Button variant="primary">Control 1</Button>
              <Button variant="secondary">Control 2</Button>
              <TextField placeholder="Control 3 (Input)" />
              <Checkbox label="Control 4 (Checkbox)" defaultChecked />
            </Inline>
          </Stack>
        </Surface>
      </Stack>
    );
  },
};

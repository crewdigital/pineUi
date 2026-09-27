import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@pine-ui/primitives/heading';
import { Stack } from '@pine-ui/primitives/stack';
import { Separator } from '@pine-ui/primitives/separator';
import { Text } from '@pine-ui/primitives/text';

const meta: Meta<typeof Heading> = {
  title: 'Primitives/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description:
        'Semantic heading level (controls the HTML element). Affects document outline.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      description:
        'Visual size, independent of semantic level. Use to control appearance without breaking document hierarchy.',
    },
    weight: {
      control: 'select',
      options: ['medium', 'semibold', 'bold'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'muted', 'brand'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    level: 1,
    children: 'Page Title',
  },
};

export const SemanticLevels: Story = {
  render: () => (
    <Stack gap={3}>
      <Heading level={1}>h1 — Page Title (default: 4xl)</Heading>
      <Heading level={2}>h2 — Section (default: 3xl)</Heading>
      <Heading level={3}>h3 — Subsection (default: 2xl)</Heading>
      <Heading level={4}>h4 — Group (default: xl)</Heading>
      <Heading level={5}>h5 — Sub-group (default: lg)</Heading>
      <Heading level={6}>h6 — Detail (default: md)</Heading>
    </Stack>
  ),
};

export const DecoupledSizes: Story = {
  render: () => (
    <Stack gap={3}>
      <Text as="p" size="sm" variant="tertiary">
        These are all <code>&lt;h3&gt;</code> elements — same level, different visual sizes.
      </Text>
      <Separator />
      {(['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map((size) => (
        <Heading key={size} level={3} size={size}>
          size="{size}" — h3 element
        </Heading>
      ))}
    </Stack>
  ),
};

export const WeightVariants: Story = {
  render: () => (
    <Stack gap={3}>
      {(['medium', 'semibold', 'bold'] as const).map((weight) => (
        <Heading key={weight} level={2} weight={weight} size="2xl">
          weight="{weight}"
        </Heading>
      ))}
    </Stack>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <Stack gap={3}>
      {(['primary', 'secondary', 'muted', 'brand', 'danger'] as const).map((variant) => (
        <Heading key={variant} level={3} size="xl" variant={variant}>
          variant="{variant}"
        </Heading>
      ))}
    </Stack>
  ),
};

export const DocumentStructureExample: Story = {
  render: () => (
    <Stack gap={4} style={{ maxWidth: 600 } as React.CSSProperties}>
      <Heading level={1}>Enterprise Dashboard</Heading>
      <Text variant="secondary">
        Overview of your organization's performance metrics and team activity.
      </Text>
      <Separator />
      <Heading level={2} size="2xl">Revenue Overview</Heading>
      <Text variant="secondary" size="sm">Q3 2024 — Updated 2 hours ago</Text>
      <Heading level={3} size="lg" weight="semibold">Monthly Breakdown</Heading>
      <Text size="sm">Showing data from July to September 2024.</Text>
    </Stack>
  ),
};

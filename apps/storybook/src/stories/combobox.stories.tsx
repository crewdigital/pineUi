import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
} from '@pine-ui/react/combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

export const Default: Story = {
  render: function ComboboxStory() {
    const [query, setQuery] = React.useState('');
    const filtered = frameworks.filter((f) =>
      f.label.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div style={{ maxWidth: '320px', padding: '40px' }}>
        <Combobox query={query} onQueryChange={setQuery}>
          <ComboboxInput placeholder="Select framework..." />
          <ComboboxContent>
            {filtered.length === 0 ? (
              <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            ) : (
              filtered.map((item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))
            )}
          </ComboboxContent>
        </Combobox>
      </div>
    );
  },
};

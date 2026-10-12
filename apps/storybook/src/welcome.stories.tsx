import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Welcome/Pine UI',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Introduction: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "var(--pine-font-family-sans, Inter, sans-serif)", maxWidth: '600px', lineHeight: '1.6' }}>
      <h1>Welcome to Pine UI</h1>
      <p>
        An enterprise-grade, high-performance, accessible, semantic, strongly typed, token-driven
        React design system.
      </p>
    </div>
  ),
};

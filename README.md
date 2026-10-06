# Pine UI

> **Enterprise-grade, StyleX-native design system and component architecture engineered for mission-critical web applications.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript: Strict](https://img.shields.io/badge/TypeScript-5.7%20Strict-blue)](https://www.typescriptlang.org/)
[![StyleX: 0.10](https://img.shields.io/badge/StyleX-Zero--Runtime%20CSS-purple)](https://stylexjs.com/)
[![Tests: 100% Passing](https://img.shields.io/badge/Tests-302%2F302%20Passing-brightgreen)](https://vitest.dev/)
[![Accessibility: WCAG AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-success)](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

## Overview

**Pine UI** is an open-source enterprise component platform crafted from the ground up to solve the challenges of large-scale frontend applications. Built upon Meta's **StyleX** compiler, Pine UI combines deterministic zero-runtime styling, dual-layer ambient elevation physics, fluid spring micro-interactions, and flawless WCAG 2.1 AA accessibility.

Whether building dense data analytics platforms, SaaS dashboards, or high-velocity developer tools, Pine UI provides the composable primitives and production-ready components required to ship industry-leading user experiences.

---

## Craftsmanship & Core Innovations

### 1. Dual-Layer Ambient & Directional Elevation
Elevation tokens are calculated using real-world lighting physics: a tight ambient-occlusion contact shadow paired with a soft directional key-light shadow. In dark mode, surfaces feature 1px inner border highlights (`inset 0 1px 0 rgba(255,255,255,0.08)`) that produce subtle luminescence without harsh contrasts.

### 2. Spring Physics & Micro-Press Interactions
Interactive controls (`Button`, `IconButton`, `MenuItem`, `CommandItem`) feature tactile micro-press physics (`scale(0.98)` / `scale(0.96)`) using high-tension spring curves (`cubic-bezier(0.34, 1.56, 0.64, 1)`). Animation durations automatically collapse to `0ms` when users request reduced motion.

### 3. Form Ergonomics & Feedback
* **TextField:** Static prefixes (`https://`) and suffixes (`.com`), 1-click clearable buttons, accessible password reveal toggles (`type="password"`), and spring-animated `slideDown` error message transitions.
* **Select & Combobox:** Multi-select mode with interactive chip/tag rendering, accessible badge removal, and Backspace keyboard navigation.

### 4. Sonner-Grade Overlay Craftsmanship
* **Toast:** Stacked card physics that dynamically fan out on hover, touch/pointer swipe-to-dismiss gesture tracking, and real-time remaining duration progress bars.
* **Frosted Glass:** 12px saturated backdrop blurs (`backdrop-filter: blur(12px) saturate(180%)`) across dialogs, drawers, and popovers.
* **Command Palette:** Global `Ctrl+K` modal featuring persistent `localStorage` recent searches, keyboard navigation shortcut hints (`Up/Down Navigate`, `Enter Select`, `ESC Close`), and fuzzy suggestions.

### 5. Heavyweight Usability
* **DataGrid:** Sticky header rows, frozen leading columns for wide tables, interactive column resizing with hover drag guides, and customizable empty & error states with retry actions.
* **DatePicker:** Quick-select chips ("Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Quarter"), dual-month navigation (`months={2}`), and range selection with continuous soft pill styling.

### 6. Interactive Theme Studio & Code Export Engines
Explore themes in real-time within Storybook, test preset themes (*Pine Enterprise*, *Midnight Nebula*, *Linear Minimal*, *Sunset Amber*), preview live application mockups, and export configurations with 1 click to:
* **CSS Custom Properties** (`:root { ... }`)
* **Tailwind CSS Configuration** (`tailwind.config.js`)
* **StyleX Theme Definitions** (`stylex.createTheme(...)`)

---

## Monorepo Architecture

Pine UI is organized into modular, tree-shakeable packages managed via pnpm workspaces and Turborepo:

| Package | Description | Version |
| :--- | :--- | :--- |
| [`@pine-ui/react`](./packages/react) | Enterprise interactive React component library | `0.0.1` |
| [`@pine-ui/primitives`](./packages/primitives) | Zero-runtime StyleX layout and typography primitives | `0.0.1` |
| [`@pine-ui/behaviors`](./packages/behaviors) | Headless accessibility state machines and ARIA linking utilities | `0.0.1` |
| [`@pine-ui/command`](./packages/command) | Fast, accessible command palette and search dialog | `0.0.1` |
| [`@pine-ui/datagrid`](./packages/datagrid) | High-performance DataGrid with sticky headers and column resizing | `0.0.1` |
| [`@pine-ui/datepicker`](./packages/datepicker) | Accessible date picker with quick-select presets and range selection | `0.0.1` |
| [`@pine-ui/icons`](./packages/icons) | Tree-shakeable SVG icon platform | `0.0.1` |
| [`@pine-ui/stylex`](./packages/stylex) | Type-safe StyleX tokens bridge (`vars.stylex.ts`) | `0.0.1` |
| [`@pine-ui/tokens`](./packages/tokens) | W3C DTCG-compliant design token platform | `0.0.1` |
| [`@pine-ui/token-compiler`](./packages/token-compiler) | Token compiler generating multi-scheme CSS and StyleX artifacts | `0.0.1` |
| [`@pine-ui/themes`](./packages/themes) | Light, Dark, High-Contrast, and Custom CSS theme stylesheets | `0.0.1` |
| [`@pine-ui/virtual-list`](./packages/virtual-list) | Virtualized list rendering for massive datasets | `0.0.1` |
| [`@pine-ui/tree`](./packages/tree) | Accessible hierarchical tree view component | `0.0.1` |
| [`@pine-ui/testing`](./packages/testing) | Testing utilities and automated `axe-core` accessibility audits | `0.0.1` |
| [`@pine-ui/storybook`](./apps/storybook) | Interactive component sandbox and application recipes | Private |

---

## Quick Start

### Installation

```bash
pnpm add @pine-ui/react @pine-ui/themes @pine-ui/icons
# Or using npm:
# npm install @pine-ui/react @pine-ui/themes @pine-ui/icons
```

### Import Styles

Import the base design token stylesheet in your application's root entry file (`App.tsx` or `layout.tsx`):

```tsx
import '@pine-ui/themes/css/base.css';
import '@pine-ui/themes/css/theme-dark.css'; // Optional: for dark mode
```

### Basic Usage

```tsx
import * as React from 'react';
import { Button, TextField, Badge, Dialog, DialogTrigger, DialogContent } from '@pine-ui/react';
import { Search, Plus } from '@pine-ui/icons';

export function ApplicationHeader() {
  const [query, setQuery] = React.useState('');

  return (
    <header style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px' }}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search telemetry..."
        prefix={<Search size="sm" />}
        clearable
        onClear={() => setQuery('')}
      />

      <Badge variant="success">PRODUCTION READY</Badge>

      <Button variant="primary" size="md">
        <Plus size="sm" style={{ marginRight: '6px' }} />
        New Project
      </Button>
    </header>
  );
}
```

---

## Development & Monorepo Workflows

### Prerequisites
* **Node.js:** `>= 20.0.0`
* **pnpm:** `>= 10.0.0` (`corepack enable` or `npm install -g pnpm`)

### Setup & Monorepo Build

```bash
# Clone the repository
git clone https://github.com/crewdigital/pineui.git
cd pineui

# Install dependencies across all packages
pnpm install

# Build all packages via Turborepo
pnpm build

# Run unit tests across all packages
pnpm test

# Run TypeScript typechecks
pnpm typecheck
```

### Launching Storybook Sandbox

```bash
pnpm --filter @pine-ui/storybook dev
```

Visit `http://localhost:6006` to explore:
* **Interactive Component Stories:** 40+ isolated component catalogs.
* **Production Application Recipes:** Full-screen SaaS Dashboard, Workspace Settings, and Auth & MFA templates.
* **Theme Customizer:** Live palette adjustments, radius scaling, dark mode simulation, and 1-click Tailwind/StyleX code generation.

---

## Contributing

We welcome community contributions, RFCs, and feedback! Please review:
* [Contributing Guidelines](./CONTRIBUTING.md)
* [Code of Conduct](./CODE_OF_CONDUCT.md)
* [Governance Model](./GOVERNANCE.md)
* [Security Policy](./SECURITY.md)

---

## License

Pine UI is open-source software licensed under the [MIT License](./LICENSE).

Copyright (c) 2026 Crew Digital.

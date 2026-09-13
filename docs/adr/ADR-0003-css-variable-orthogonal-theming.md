# ADR-0003: Multi-Dimensional CSS Variable Theming without React Context Rerenders

## Status

**Accepted**

## Context

Many React design systems implement theming by wrapping application trees in a `<ThemeProvider>` React Context. Whenever a theme changes (e.g., light to dark mode, brand switch, or density change), every single component consuming the theme context re-renders in JavaScript, causing severe frame drops in large dashboards.

## Decision

Pine UI implements **Orthogonal Multi-Dimensional Theming** purely via CSS Custom Properties and StyleX `createTheme` class applications on DOM nodes:

- Theme dimensions are independent axes:
  1. **Brand:** `data-brand="default | brandA | brandB"`
  2. **Scheme:** `data-scheme="light | dark"`
  3. **Contrast:** `data-contrast="normal | high"`
  4. **Density:** `data-density="compact | default | comfortable"`
  5. **Motion:** `data-motion="normal | reduced"`
- Components reference typed StyleX variable contracts that compile directly to CSS variables (`var(--...)`).
- Theme changes modify HTML `data-*` attributes or CSS class tokens on DOM nodes, triggering browser-native CSS property cascading with **zero React component re-renders**.

## Consequences

### Positive

- **Zero React Rerenders on Theme Switch:** Changing from light to dark mode executes in sub-millisecond native CSS repaint time.
- **Granular Nested Theming:** Sections or modals can be themed independently simply by applying a CSS class or data attribute to a parent container.
- **Zero Context Overhead:** Primitives remain pure, lightweight functions without Context subscriptions.

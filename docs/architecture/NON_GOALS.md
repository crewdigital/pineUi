# Pine UI Non-Goals

To maintain high performance, strict type safety, zero runtime overhead, and long-term maintainability over a 10+ year lifecycle, Pine UI establishes the following explicit **Non-Goals**.

---

## 1. Non-Goals for Styling & Runtime

1. **No Runtime CSS-in-JS Engine:** Pine UI will never introduce runtime CSS injection engines (such as Emotion, styled-components, or custom `<style>` injection hooks). All styling is statically computed at build time via StyleX.
2. **No Unrestricted Arbitrary Prop-Based Style Overrides:** Pine UI will not support arbitrary styling props like `<Box background="#ff0000" padding="37px" />` that bypass the design token system and break design consistency.
3. **No Monolithic `<ThemeProvider>` Subscription Rerenders:** Pine UI will not force components to re-render via React Context subscriptions whenever a theme changes. Themes are activated and switched via CSS classes and CSS custom properties on DOM nodes.

---

## 2. Non-Goals for Component Scope & Architecture

1. **Not a Generic Kitchen-Sink Dump:** Pine UI will not bundle niche, unvetted one-off components. Every component must be proven across core enterprise patterns and fulfill strict accessibility and performance contracts.
2. **No Bundling of Heavy Components in Core Package:** Specialized, data-heavy components (such as `DataGrid`, `VirtualList`, `DatePicker`) will never be bundled into `@pine-ui/react`. They will reside in isolated, dedicated packages (`@pine-ui/datagrid`, `@pine-ui/datepicker`) to prevent accidental bundle bloat in consuming apps.
3. **No Heavyweight Animation Framework Dependencies:** Pine UI will not depend on large external physics/animation libraries (e.g., Framer Motion). All core motion is implemented using lightweight, compositor-friendly CSS transitions and keyframes that obey reduced-motion preferences.
4. **No Synthetic Reimplementation of Native Form Elements:** Pine UI will not build synthetic `<div>` structures to emulate simple `<button>` or `<input>` controls when native HTML5 elements provide identical or superior accessibility and browser integration.

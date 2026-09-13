# Pine UI Architecture Specification

## 1. Mission and Core Purpose

**Pine UI** is an open-source, enterprise-grade React design system platform engineered to power mission-critical web applications (SaaS platforms, admin dashboards, B2B/B2C products, multi-brand and white-label suites). It is built for a 10+ year lifespan with maximum runtime efficiency, zero visual theme context re-renders, strict WCAG 2.2 AA accessibility, and compile-time determinism.

---

## 2. The Four Pillars

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                              PINE UI                                  │
 ├─────────────────┬─────────────────┬──────────────────┬─────────────────┤
 │ 1. PERFORMANCE  │ 2. ACCESSIBILITY│ 3. TYPE SAFETY   │ 4. SEMANTICS    │
 │ Zero-runtime CSS│ WCAG 2.2 AA     │ TypeScript Strict│ Native HTML 1st │
 │ Shallow DOM     │ Native Semantics│ Constrained Props│ Logical Props   │
 │ RSC compatible  │ Full Keyboard   │ Compile-time Vars│ Token Contracts │
 └─────────────────┴─────────────────┴──────────────────┴─────────────────┘
```

1. **Performance**: Zero-runtime CSS injection overhead via StyleX, zero behavioral JavaScript in static primitives, strict shallow DOM node hierarchy, and minimal bundle impact.
2. **Accessibility**: Strict conformance with WCAG 2.2 Level AA guidelines, complete keyboard operability, robust focus management, `:focus-visible` contracts, and automated Axe testing.
3. **Type Safety**: End-to-end TypeScript strict mode across design tokens, StyleX contracts, component variants, and theme definitions.
4. **Semantic Design**: Built upon semantic token abstractions (independent of specific visual palette numbers) and native HTML5 elements.

---

## 3. Core Engineering Mandates

### 3.1 Static over Runtime

The design system must avoid dynamic JavaScript runtime stylesheet injection, theme calculation during rendering cycles, or runtime CSS generation (e.g. legacy emotion/styled-components).

```
DTCG Tokens (JSON)
       │
       ▼ (Token Compiler)
StyleX Contracts (defineVars) + Theme CSS Variables
       │
       ▼ (Static StyleX Transform at Build Time)
Atomic Static CSS + Type-Safe React Components
```

### 3.2 CSS over JavaScript

Presentation requirements must be resolved at the CSS engine level:

- **Logical Properties:** All margins, paddings, borders, and position coordinates MUST use CSS logical properties (`marginInlineStart`, `paddingBlock`, `insetInlineStart`, etc.) to guarantee zero-JS RTL support.
- **Native States:** Hover, active, focus-visible, checked, and disabled states must use pure CSS pseudo-classes (`:hover`, `:active`, `:focus-visible`, `:checked`, `:disabled`, `:has()`).
- **Layout:** Grid, Flexbox, and CSS Container Queries must handle responsive presentation without resize listeners.

### 3.3 Native HTML Semantics First

Pine UI prioritizes standard browser elements over synthetic ARIA alternatives:

- `<button>` instead of `<div role="button">`
- `<dialog>` instead of synthetic backdrop stacks where possible
- `<input>`, `<textarea>`, `<select>`, `<label>`, `<fieldset>`, `<legend>`
- `<nav>`, `<aside>`, `<header>`, `<main>`, `<section>`, `<article>`

### 3.4 Local State over Monolithic Global State

There is no monolithic `<DesignSystemProvider>` or `<ThemeProvider>` required to render visual components. Theme switches modify DOM CSS variables or classes, allowing pure zero-rerender theme adaptation.

---

## 4. Token Taxonomy & Architecture

Tokens are authored strictly according to Design Tokens Community Group (DTCG) standards in portable JSON:

```
Primitive Tokens  (e.g., color.blue.600, space.4, radius.md)
       │
       ▼
Semantic Tokens   (e.g., action.primary.background, background.surface, border.default)
       │
       ▼
Component Recipes (e.g., button.primary.hover, input.focus.ring)
       │
       ▼
React Components  (e.g., <Button>, <TextField>, <Card>)
```

- **Primitive Tokens:** Absolute design units (palettes, scales, durations, typography specs). Never consumed directly in product UI code.
- **Semantic Tokens:** Context-aware design decisions (intent, elevation, feedback, foreground/background pairs).
- **Component Tokens:** Scoped component recipes where variant nuance is required.

---

## 5. Component Complexity Classification

Every component in Pine UI is categorized into an explicit complexity class:

| Level       | Classification                  | Examples                                                    | Expected Behavioral JS                                        | RSC Compatible                    |
| ----------- | ------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------- |
| **Level 1** | **Static Layout & Typography**  | Box, Stack, Inline, Grid, Text, Heading, Surface, Separator | **0 KB** (Zero hooks/listeners)                               | **Yes (Server Component)**        |
| **Level 2** | **Native Interactive**          | Button, Link, Input, TextArea, Checkbox, Radio              | Minimal (Ref forwarding, form synchronization)                | Client Component (`'use client'`) |
| **Level 3** | **Lightweight Interactive**     | Tabs, Accordion, Switch                                     | Minimal local state (`useState`)                              | Client Component (`'use client'`) |
| **Level 4** | **Overlay & Floating**          | Dialog, Tooltip, Popover, Menu                              | Scoped focus trapping, portal rendering, outside dismissal    | Client Component (`'use client'`) |
| **Level 5** | **Complex Interactive**         | Select, Combobox                                            | State machine, keyboard listbox navigation, active-descendant | Client Component (`'use client'`) |
| **Level 6** | **Heavy Data & Virtualization** | DataGrid, VirtualList, DatePicker                           | Virtualized DOM, scrolling performance engine                 | Client Component (`'use client'`) |

---

## 6. Monorepo Package Boundaries & Dependency DAG

```
                      @pine-ui/tokens
                             │
                             ▼
                  @pine-ui/token-compiler
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   @pine-ui/stylex                    @pine-ui/themes
            │                                 │
            └────────────────┬────────────────┘
                             ▼
                   @pine-ui/primitives
                             │
                             ▼
                   @pine-ui/behaviors
                             │
                             ▼
                    @pine-ui/react
```

### Dependency Rules

1. **Strict Forward Flow:** Dependencies must flow downwards according to the DAG.
2. **Zero Circularity:** No cyclic imports between packages or internal modules.
3. **Isolated Heavy Packages:** Level 6 components (`DataGrid`, `DatePicker`, `VirtualList`) reside in isolated packages to protect consumers from bundle contamination.
4. **Tree-Shaking Guarantee:** Every package exposes ES modules with granular export maps and explicit `sideEffects: false` metadata.

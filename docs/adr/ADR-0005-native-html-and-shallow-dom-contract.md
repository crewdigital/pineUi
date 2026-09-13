# ADR-0005: Native HTML Semantics and Shallow DOM Output Contract

## Status

**Accepted**

## Context

Many popular component libraries introduce extensive DOM wrapper hierarchies (5–10 nested `<div>` and `<span>` elements per simple control) to manage layout, pseudo-elements, or styling hooks. In dense enterprise applications (e.g. data tables with 5,000 cells), wrapper bloat leads to tens of thousands of DOM nodes, crippling rendering performance, memory usage, and browser layout passes.

## Decision

Pine UI establishes a strict **Native HTML First & Shallow DOM Contract**:

1. **Native Semantics:** Components utilize standard HTML elements (`<button>`, `<input>`, `<textarea>`, `<dialog>`, `<label>`, `<nav>`, `<aside>`) directly.
2. **Shallow DOM Node Target:**
   - A standard `Button` component must render exactly one DOM element: `<button>`.
   - Primitives (`Box`, `Stack`, `Text`) render exactly one DOM element corresponding to their polymorphic `as` prop (defaulting to semantic tags).
3. **Prohibition of Cosmetic Wrapper Elements:** Inner label wrappers, shadow containers, and cosmetic div layers are strictly banned unless required by accessibility specifications or browser layout constraints that cannot be solved via CSS.

## Consequences

### Positive

- **Extreme Memory & DOM Efficiency:** Eliminates up to 70% of unnecessary DOM nodes in large applications.
- **Native Browser Accessibility:** Leverage standard OS and browser accessibility lifecycles without complex synthetic ARIA state machines.
- **Inspectability:** Clean, predictable DOM trees that are intuitive for developers and browser DevTools to inspect.

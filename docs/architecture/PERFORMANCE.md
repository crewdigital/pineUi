# Pine UI Performance Contract & Budgets

## 1. The Performance Contract

> **"The design system itself must add negligible runtime overhead and must never become a significant source of application performance degradation."**

Every component in Pine UI is bound by explicit empirical performance budgets for bundle size, DOM depth, React rendering cost, and style recalculation.

---

## 2. Quantitative Bundle Size Budgets

| Category                   | Complexity Level                        | Maximum Additional JS (gzip) | CSS Runtime Overhead           |
| -------------------------- | --------------------------------------- | ---------------------------- | ------------------------------ |
| **Static Primitives**      | Level 1 (Box, Stack, Text, Heading)     | **< 1.0 KB**                 | **0 KB** (Compile-time StyleX) |
| **Native Interactive**     | Level 2 (Button, Link, Input, Checkbox) | **< 3.0 KB**                 | **0 KB**                       |
| **Lightweight Components** | Level 3 (Tabs, Accordion, Switch)       | **< 5.0 KB**                 | **0 KB**                       |
| **Overlay / Floating UI**  | Level 4 (Tooltip, Dialog, Popover)      | **< 8.0 KB**                 | **0 KB**                       |
| **Complex Form UI**        | Level 5 (Select, Combobox)              | **< 12.0 KB**                | **0 KB**                       |

_Tree-shaking is continuously enforced. Importing `Button` from `@pine-ui/react` or `@pine-ui/react/button` must NEVER bundle `Dialog`, `Select`, or `DataGrid` code._

---

## 3. DOM Performance & Tree Depth Mandate

Pine UI strictly bans wrapper element proliferation. Every DOM node created must have a strict structural, accessibility, or layout justification.

### DOM Node Targets

```html
<!-- STANDARD BUTTON OUTPUT -->
<button class="x1... x2...">Save Changes</button>

<!-- TEXTFIELD OUTPUT (Minimal Necessary Semantic Structure) -->
<div class="x1... x2...">
  <label for="tf-1" class="x3...">Email</label>
  <input id="tf-1" class="x4..." type="email" />
</div>
```

- **Target Button DOM Depth:** 1 node (or 2 nodes if leading/trailing icon is rendered).
- **Banned Patterns:** Nesting `Button -> ButtonWrapper -> Surface -> InnerContainer -> LabelWrapper -> TextWrapper`.

---

## 4. React Optimization & Modern Compiler Rules

1. **No Indiscriminate Memoization:** Do NOT wrap components in `React.memo`, `useMemo`, or `useCallback` preemptively without empirical benchmark evidence. The architecture is engineered to align seamlessly with the React Compiler.
2. **Derived State over Effects:** Components MUST compute values synchronously during render rather than relying on `useEffect` synchronization loops:
   $$\text{Props} \longrightarrow \text{Derived State} \longrightarrow \text{Render Output}$$
3. **No Visual Theme Context Subscriptions:** Components do not consume a React Context to access colors, spacing, or typography. All theme tokens resolve to static CSS custom properties.
4. **Zero Global Event Listeners in Primitives:** Primitives must not attach `window` or `document` event listeners.

---

## 5. Automated Benchmark Gating

CI executes automated micro-benchmarks across component scaling thresholds:

| Instance Count       | Target Mount Time (L1/L2) | Target Mount Time (L4/L5) | Memory Allocation Threshold |
| -------------------- | ------------------------- | ------------------------- | --------------------------- |
| **1 instance**       | `< 0.2 ms`                | `< 1.0 ms`                | Baseline                    |
| **100 instances**    | `< 5.0 ms`                | `< 25.0 ms`               | Linear scaling              |
| **1,000 instances**  | `< 40.0 ms`               | `< 200.0 ms`              | Zero memory leaks           |
| **10,000 instances** | Stress test baseline      | Virtualization required   | No browser freeze           |

---

## 6. Compositor-Only Motion Guidelines

All transitions and animations in Pine UI must operate exclusively on compositor-friendly properties:

- `transform`
- `opacity`

Animations modulating geometry properties (`width`, `height`, `top`, `left`, `margin`, `padding`) are strictly forbidden in core animations to prevent layout thrashing and style recalculations.
All animations unconditionally obey `@media (prefers-reduced-motion: reduce)`.

# Pine UI Accessibility Contract & Standards

## 1. Baseline Standard: WCAG 2.2 Level AA

Pine UI is engineered to comply unconditionally with **WCAG 2.2 Level AA** standards across all components, themes, and interactive patterns.

Accessibility is a non-negotiable definition-of-done criterion for every component.

---

## 2. Core Accessibility Mandates

### 2.1 Native HTML Semantics First

- Native interactive elements (`<button>`, `<a>`, `<input>`, `<select>`, `<dialog>`) provide built-in keyboard handling, form integration, and screen-reader accessibility without synthetic ARIA boilerplate.
- Custom ARIA patterns are employed only when standard HTML elements lack the requisite semantic or interactive capability (e.g. Combobox, Tabs, Multi-tier Menus).

### 2.2 Keyboard Navigation & Focus Management

Every interactive component must satisfy the following keyboard matrix:

- **Focus Visibility:** All focusable elements expose an unambiguous, high-contrast `:focus-visible` ring adhering to minimum contrast criteria (3:1 against background).
- **Standard Key Bindings:**
  - `Tab` / `Shift+Tab`: Navigate between focusable controls.
  - `Enter` / `Space`: Activate buttons, toggles, checkboxes, and links.
  - `Arrow Keys`: Navigate within compound components (Tabs, Menus, Radios, Combobox listboxes) with roving tabindex or `aria-activedescendant`.
  - `Escape`: Dismiss open overlays (Dialogs, Popovers, Tooltips, Menus) and restore focus to the triggering element.
  - `Home` / `End`: Jump to first / last item in compound lists.

### 2.3 Focus Trapping & Restoration

- **Modal Dialogs:** Focus is trapped within the active dialog container. Background content is marked `inert` or `aria-hidden="true"`.
- **Focus Restoration:** Upon overlay dismissal, keyboard focus is deterministically restored to the trigger element that initiated the overlay.

### 2.4 Color Contrast Guarantees

- **Text & Meaningful Icons:** Minimum contrast ratio of **4.5:1** against underlying surfaces in normal text; **3:1** for large text (18pt / 24px or 14pt / 18.66px bold).
- **UI Components & Graphical Objects:** Minimum contrast ratio of **3:1** for borders, focus rings, and active state indicators against adjacent background colors.
- **High-Contrast Theme:** Dedicated High-Contrast mode providing **7:1** text contrast and bold perimeter boundaries.

### 2.5 Screen Reader & ARIA Contract

- Every interactive control must possess an accessible name via visible text, `aria-label`, or `aria-labelledby`.
- Error, loading, and dynamic validation states must be linked via `aria-describedby` or `aria-errormessage`, accompanied by appropriate live region announcements where relevant (`aria-live="polite"`).

### 2.6 Motion & Vestibular Safety

- All CSS animations and transitions must incorporate `@media (prefers-reduced-motion: reduce)` fallbacks that reduce transition duration to `0.01ms` or eliminate parallax/scaling transformations.

### 2.7 Touch Targets & Sizing

- Interactive targets must maintain a minimum bounding box of **44x44 CSS pixels** on touch-enabled viewports (or provide adequate spacing around the target per WCAG 2.5.8 Target Size).

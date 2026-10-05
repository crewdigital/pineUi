## Description

<!-- Provide a brief description of the changes in this pull request -->

## Type of Change

- [ ] `feat`: New feature or component
- [ ] `fix`: Bug fix
- [ ] `perf`: Performance improvement
- [ ] `refactor`: Internal code reorganization
- [ ] `docs`: Documentation update
- [ ] `chore`: Monorepo build, tooling, or CI updates

## Affected Packages

- [ ] `@pine-ui/react`
- [ ] `@pine-ui/primitives`
- [ ] `@pine-ui/behaviors`
- [ ] `@pine-ui/icons`
- [ ] `@pine-ui/tokens`
- [ ] `@pine-ui/themes`
- [ ] `@pine-ui/stylex`
- [ ] `@pine-ui/accessibility`
- [ ] `@pine-ui/performance`
- [ ] `@pine-ui/eslint-plugin`
- [ ] `apps/storybook`

## Quality Gates Checklist

- [ ] **Tests:** Unit tests added / updated and passing (`pnpm test`)
- [ ] **TypeScript:** No type errors (`pnpm turbo typecheck`)
- [ ] **Accessibility:** Zero WCAG 2.2 AA violations in automated Axe audits
- [ ] **Keyboard Navigation:** Operable via keyboard (Tab, Enter, Space, Escape, Arrows)
- [ ] **Storybook:** Interactive stories added or updated (`pnpm --filter @pine-ui/storybook build`)
- [ ] **Performance:** Adheres to bundle size and mount time budgets in `PERFORMANCE.md`
- [ ] **Changeset:** Added changeset for versioning if modifying publishable packages (`pnpm changeset`)

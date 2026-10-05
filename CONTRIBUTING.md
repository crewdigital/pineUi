# Contributing to Pine UI

Thank you for your interest in contributing to Pine UI! We welcome contributions ranging from bug fixes and documentation improvements to new accessible components and performance optimizations.

---

## 1. Code of Conduct

All contributors and maintainers are expected to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md). Please report unacceptable behavior to `security@crewdigital.com` or project maintainers.

---

## 2. Development Setup

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 10.0.0 (`npm install -g pnpm` or `corepack enable`)

### Clone & Install
```bash
git clone https://github.com/crewdigital/pineui.git
cd pineui
pnpm install
```

### Build & Verify Monorepo
```bash
pnpm turbo build
pnpm turbo typecheck
pnpm test
```

### Running Storybook Sandbox
```bash
pnpm --filter @pine-ui/storybook dev
```
Storybook will be available at `http://localhost:6006`.

---

## 3. Monorepo Workflow & Commands

Pine UI uses Turborepo and pnpm workspaces:

| Command | Description |
|---|---|
| `pnpm build` | Builds all packages and compiles TypeScript definitions |
| `pnpm typecheck` | Validates TypeScript strict mode across all workspaces |
| `pnpm test` | Runs all unit and accessibility tests with Vitest |
| `pnpm test:coverage` | Computes test coverage reports |
| `pnpm lint` | Runs ESLint and checks design system rules |
| `pnpm format:check` | Verifies code formatting with Prettier |
| `pnpm changeset` | Generates a changeset entry for semantic releases |

---

## 4. Branching & Commit Conventions

### Branch Naming
- `feat/component-name` (e.g. `feat/combobox-multiselect`)
- `fix/issue-description` (e.g. `fix/popover-focus-restoration`)
- `docs/topic-name` (e.g. `docs/keyboard-navigation-guide`)

### Commit Messages (Conventional Commits)
We enforce standard Conventional Commit headers:
```
<type>(<scope>): <short description>
```
Types:
- `feat`: A new feature or component
- `fix`: A bug fix
- `docs`: Documentation changes
- `refactor`: Code reorganization without external API changes
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Tooling, build system, or dependency updates

Scopes match package names (e.g. `react`, `primitives`, `behaviors`, `tokens`, `icons`, `accessibility`, `performance`).

---

## 5. Definition of Done (Quality Gates)

Before a pull request can be merged, it must satisfy:
1. **TypeScript Strict:** No `any` escapes without explicit architectural rationale.
2. **WCAG 2.2 AA Compliance:** Zero Axe-core violations in unit test audit suites.
3. **Keyboard & Focus Matrix:** Full keyboard operability (Tab, Enter, Space, Escape, Arrows).
4. **Performance Budgets:** Adherence to bundle size and mount time thresholds specified in `docs/architecture/PERFORMANCE.md`.
5. **Storybook Stories:** Demonstrates all visual variants, responsive states, interactive controls, and accessible labels.
6. **Changeset:** Include a changeset via `pnpm changeset` if the change impacts publishable packages.

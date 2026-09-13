# ADR-0004: Strict Package Boundaries, Dependency Graph, and Zero Circularity

## Status

**Accepted**

## Context

Monorepos without enforced package boundaries frequently degrade into tangled dependency graphs where primitives inadvertently import heavyweight components or where circular dependencies break tree-shaking and bundler caching.

## Decision

Pine UI establishes a strict Directed Acyclic Graph (DAG) for all packages within the pnpm workspace:

```
@pine-ui/tokens (JSON)
       │
       ▼
@pine-ui/token-compiler (Build Tool)
       │
       ├──► @pine-ui/stylex (defineVars)
       └──► @pine-ui/themes (CSS Custom Properties)
                 │
                 ▼
       @pine-ui/primitives (Level 1 Static Layout)
                 │
                 ▼
       @pine-ui/behaviors (Headless Hooks & State)
                 │
                 ▼
       @pine-ui/react (Core Components)
                 │
                 ├──► @pine-ui/icons
                 ├──► @pine-ui/accessibility
                 └──► @pine-ui/performance
```

- High-complexity / heavyweight components (DataGrid, VirtualList, DatePicker) MUST reside in separate packages (`@pine-ui/datagrid`, `@pine-ui/datepicker`).
- Turborepo and ESLint import boundary rules will strictly fail CI if circular dependencies or reverse dependency imports occur.

## Consequences

### Positive

- **Guaranteed Tree-Shaking:** Consumers importing a single Button never download DataGrid, DatePicker, or compiler code.
- **Deterministic Build Caching:** Turborepo caches builds cleanly without invalidation cascading across unrelated packages.

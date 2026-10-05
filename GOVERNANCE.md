# Pine UI Governance Model

## 1. Overview & Mission

Pine UI is an open-source, enterprise-grade React design system engineered for high performance, strict WCAG 2.2 AA accessibility, and compile-time determinism. This document outlines the project governance model, maintainer responsibilities, decision-making processes, and component graduation criteria.

---

## 2. Maintainer Roles & Responsibilities

### 2.1 Core Maintainers
Core Maintainers have full commit and release rights to the repository. Responsibilities include:
- Reviewing and approving RFCs and Architectural Decision Records (ADRs).
- Merging pull requests that pass all automated quality gates (Axe-core, benchmarks, types, tests).
- Cutting official semantic releases via Changesets.
- Enforcing the Code of Conduct and security disclosure responses.

### 2.2 Component Stewards
Component Stewards have domain expertise over specific sub-areas (e.g. Tokens, Behaviors, Primitives, Overlays, DataGrid). Responsibilities include:
- Triaging issues and pull requests within their domain.
- Ensuring strict adherence to accessibility, keyboard navigation, and bundle budgets.

### 2.3 Contributors
Anyone who submits issues, discussions, bug fixes, features, or documentation improvements.

---

## 3. Decision-Making & Consensus

1. **Lazy Consensus:** Routine maintenance, bug fixes, and documentation improvements proceed via lazy consensus: a PR with at least one Core Maintainer approval and all CI checks passing may be merged after 24 hours.
2. **RFC Requirement:** Any change that introduces new components, modifies public API contracts, adds monorepo dependencies, or alters token taxonomy requires an accepted RFC and ADR before implementation begins.
3. **Tie-Breaking:** If consensus cannot be reached after open discussion, the Core Maintainers vote with a simple majority.

---

## 4. Component Graduation Lifecycle

Every component in Pine UI progresses through a formal graduation pipeline:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  Experimental   │ ────► │     Stable      │ ────► │   Deprecated    │
│ (Alpha / Beta)  │       │   (Production)  │       │  (Sunset Phase) │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### Stage 1: Experimental
- Exported under `@pine-ui/react/experimental` or with explicit alpha tag.
- API is subject to minor breaking adjustments based on consumer feedback.
- Must fulfill initial accessibility requirements and basic unit test coverage (>80%).

### Stage 2: Stable
- Exported from package root and dedicated subpath.
- 100% test coverage with zero WCAG 2.2 AA violations in automated Axe audits.
- Complete Storybook documentation with all interactive states, responsive views, and high-contrast verification.
- Verified against performance budgets (DOM node depth, bundle size, mount time).
- Protected by strict semantic versioning; breaking changes require a major version bump.

### Stage 3: Deprecated
- Marked with `@deprecated` JSDoc annotation specifying the recommended migration path.
- Maintained for at least one major release cycle prior to complete removal.

---

## 5. Breaking Change Policy

Pine UI adheres strictly to [Semantic Versioning 2.0.0](https://semver.org/):
- **Patch (0.0.X):** Backward-compatible bug fixes and internal performance enhancements.
- **Minor (0.X.0):** New components, non-breaking prop additions, or token expansions.
- **Major (X.0.0):** Breaking changes to public component APIs, removed tokens, or bumped minimum peer dependency versions (e.g. React version upgrades).

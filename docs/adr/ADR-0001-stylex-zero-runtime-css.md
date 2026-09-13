# ADR-0001: Selection of StyleX for Zero-Runtime Compile-Time CSS

## Status

**Accepted**

## Context

Traditional CSS-in-JS solutions (Emotion, styled-components) introduce non-trivial runtime overhead by computing hashes, generating CSS strings, and injecting `<style>` tags during React rendering cycles. This creates layout recalculations, degrades Frame Rate (INP/LCP), and causes severe hydration mismatch issues in React Server Components (RSC) and streaming SSR.

Alternative static solutions (Tailwind CSS, Vanilla Extract, Panda CSS) offer static output, but StyleX uniquely provides:

1. Deterministic atomic CSS collision resolution regardless of class insertion order.
2. Direct integration with type-safe design token variables (`stylex.defineVars`).
3. Compile-time style merging (`stylex.props(...)`).
4. Native support for React Server Components (pure static CSS, no client hooks).

## Decision

Pine UI adopts **StyleX** (`@stylexjs/stylex`) as its primary styling engine for React components.

## Consequences

### Positive

- **Zero Runtime Overhead:** StyleX extracts atomic CSS rules at build time. No runtime stylesheet injection occurs.
- **Deterministic Composition:** Styles passed across component boundaries compose predictably without specificity conflicts.
- **Server Component Compatible:** Static layout primitives (Level 1) run directly in RSC environments without requiring `'use client'`.

### Trade-offs / Mitigations

- Requires a build-time transform plugin (`@stylexjs/babel-plugin` / `@stylexjs/rollup-plugin` / `@stylexjs/nextjs-plugin`) in consuming applications.
- _Mitigation:_ We will provide turnkey integration presets in `tooling/build` and verified example apps for Next.js and Vite.

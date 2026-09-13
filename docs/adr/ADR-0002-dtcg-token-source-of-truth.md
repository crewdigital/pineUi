# ADR-0002: DTCG Specification as the Single Source of Truth for Tokens

## Status

**Accepted**

## Context

Design systems frequently suffer from tight coupling to a single frontend framework when tokens are defined directly inside TypeScript or CSS files. This prevents seamless synchronization with design tools (Figma), native mobile platforms (iOS/Android), and third-party consumers.

## Decision

Pine UI adopts the **W3C Design Tokens Community Group (DTCG)** specification as the absolute, framework-agnostic single source of truth for all design tokens.

- Tokens are authored in structured JSON format in `@pine-ui/tokens`.
- All platform artifacts (StyleX `defineVars` contracts, CSS Custom Properties, TypeScript definitions, documentation tables) are generated deterministically by a custom `@pine-ui/token-compiler`.

## Consequences

### Positive

- **Portability:** Tokens are independent of React and StyleX.
- **Deterministic Generation:** No manual synchronization errors between TypeScript types, StyleX variables, and CSS variables.
- **Multi-Brand Extensibility:** New brands and themes are authored purely as token definition sets without touching component source code.

### Trade-offs / Mitigations

- Requires building and maintaining a custom token compiler.
- _Mitigation:_ The compiler will be thoroughly tested with schema validators (Zod) and snapshot verification in Phase 3.

# Pine UI RFC (Request for Comments) Process

## 1. What is an RFC?

The **Request for Comments (RFC)** process provides a structured, public mechanism for proposing substantial changes, major new features, or architectural adjustments to Pine UI prior to implementation.

---

## 2. When is an RFC Required?

An RFC is **required** for:
- Introducing a new component or component family (e.g., Level 6 DataGrid, DatePicker).
- Introducing a new monorepo package or altering the dependency DAG.
- Changing token taxonomy or token compiler output schemas.
- Breaking changes to public component APIs, props, or behavior contracts.
- Altering core styling paradigms or runtime performance contracts.

An RFC is **NOT required** for:
- Bug fixes conforming to existing component specs.
- Internal refactorings that preserve public API contracts and performance budgets.
- Documentation additions or typos.
- Minor token value tweaks within established scales.

---

## 3. RFC Lifecycle

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Drafting    │ ──► │ Open Review  │ ──► │ Final Comm.  │ ──► │ Accepted /   │
│  (PR Open)   │     │ (Discussion) │     │ Period (7d)  │     │ Rejected     │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

1. **Drafting:** Create an RFC document using the RFC template under `docs/rfcs/0000-rfc-title.md`.
2. **Open PR:** Submit a Pull Request titled `RFC: <Feature Name>`. Maintainers and community members will review and comment.
3. **Discussion:** Authors iterate on feedback, updating the RFC proposal based on technical critique and edge cases.
4. **Final Comment Period (FCP):** Once consensus forms, a Core Maintainer announces a 7-day Final Comment Period.
5. **Resolution:** The RFC is marked `Accepted` (and an accompanying ADR is recorded) or `Rejected` with rationale.

---

## 4. RFC Structure

Every RFC must include:
1. **Summary:** Brief 2-3 sentence overview.
2. **Motivation & Use Cases:** Why is this change necessary? What user problem does it solve?
3. **Detailed Design:**
   - Proposed TypeScript API (interfaces, props, events).
   - Component anatomy and shallow DOM structure.
   - Accessibility contract (ARIA roles, keyboard matrix, focus management).
   - StyleX styling & token consumption.
4. **Performance & Bundle Impact:** Expected bundle cost, DOM depth, and rendering overhead.
5. **Drawbacks & Alternatives:** What alternatives were considered and why were they rejected?
6. **Prior Art:** How do other systems (Radix, React Aria, Primer, Carbon) solve this?
7. **Unresolved Questions:** Open questions to be answered during review.

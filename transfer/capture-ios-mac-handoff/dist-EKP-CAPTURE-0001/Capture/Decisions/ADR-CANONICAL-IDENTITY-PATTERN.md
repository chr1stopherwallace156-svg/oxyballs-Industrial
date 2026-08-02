# ADR — Canonical Identity Pattern

| Field | Value |
|---|---|
| Status | **Accepted** |
| Applies to | Phase 1+ domain identities in `ElektronCapture` |
| First instance | Package-relative path keys (`PackageRelativePath`) |
| Related error | `ERR-EDTS-0007` |
| Date | 2026-07-25 |

## Context

Mac inventory validation reported every package file as undeclared because discovery keys and inventory keys used different string representations of the same filesystem location (`/var` vs `/private/var`). Ad-hoc prefix stripping across builder/validator/ZIP duplicated the defect surface.

## Decision

Every core domain identity (package path key, content hash, capture/evidence ID, …) must follow this lifecycle:

```text
Domain Identity
    → Canonical Implementation (single source of truth)
    → Invariant Test Suite (equivalence + idempotence + hierarchy)
    → Architecture Decision Record (this document / peers)
    → Error Library entry (ERR-EDTS-*) when violation class is known
```

### Rules for package-relative path identity

1. **One implementation:** `App/Phase1/PackageRelativePath.swift`
2. **Discovery and declaration compare the same key form** — `canonical(discovered) == canonical(declared)`
3. **Keys are package-relative** — never temp-dir prefixes, usernames, UUIDs, or absolute sandbox paths
4. **Symlink-safe** — always resolve aliases before relativizing
5. **Idempotent relative normalization** — `canonicalRelativeKey` collapses `.` / `..` and is stable under re-application
6. **Hierarchy preserved** — nested paths retain depth; no silent flattening

## Consequences

- Builder, validator, and ZIP writer must call `PackageRelativePath.key` / `canonicalRelativeKey` — no parallel strip logic
- CI guardrails: `CanonicalPackageIdentityTests`, `CanonicalPathInvariantTests`
- Contract/schema of `.edts-pkg` unchanged; only comparison/derivation centralized

## Alternatives rejected

| Alternative | Why rejected |
|---|---|
| Per-call-site `replacingOccurrences` / prefix strip | Diverges under aliasing; duplicates bugs |
| Absolute-path comparison | Couples tests/runtime to machine paths |
| Weakening undeclared-path asserts | Hides integrity failures |

## References

- `Docs/ErrorLibrary/ERR-EDTS-0007.md`
- `Docs/Evidence/INVENTORY_VALIDATION_FAILURE_EVIDENCE_REPORT.md`
- `Tests/Unit/CanonicalPackageIdentityTests.swift`

# Phase 1C — Commit Separation (Commit B+ pointer)

**Authoritative freeze-prep branch (Phase 1 only, no Specs/Research):**  
`cursor/phase1c-freeze-commit-a-d881` (includes `CHANGE-0001` — not this tip)

This branch (`cursor/phase1c-evidence-library-handoff-d881`) holds **Track B staging**:

```text
BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW
IR_0001_EXECUTION_NOT_YET_AUTHORIZED
```

- `CHANGE-0002` — Specs 1–6 hardening + twelve-point correction pass (`NOT_BASELINE_APPROVED`)
- `CHANGE-0004` — two-stage handoff automation (`handoff-prepare` → `handoff-package` → `dist/`)
- Specs / Research / IR-0001 scaffolding (non-production)

**Do not** tag `v1.0.0-phase1c` from this tip. Apply after remote freeze tag confirmation.

## Track A remaining gate

Mac device evidence → Commit A → tag `v1.0.0-phase1c` → push & lock → `PHASE_1_FROZEN`

## Two-stage handoff

```bash
make handoff-prepare   # commit tracked Handoff/ metadata
make handoff-package   # clean HEAD → dist/handoff-<id>/
```

See `Docs/Governance/CHANGELOG_AND_HANDOFF_GOVERNANCE.md`.

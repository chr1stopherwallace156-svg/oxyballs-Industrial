# Phase 1C — Commit Separation (Commit B+ pointer)

**Authoritative freeze-prep branch (Phase 1 only, no Specs/Research):**  
`cursor/phase1c-freeze-commit-a-d881` (includes `CHANGE-0001` — not this tip)

This branch (`cursor/phase1c-evidence-library-d881`) holds **Commit B+ staging** only:

- `CHANGE-0002` — Specs 1–6 hardening + twelve-point correction pass
- Specs 1–3: `V2_CORE_SPECS_1_TO_3_HARDENED`
- Specs 4–6: `V2_SPECIFICATIONS_4_TO_6_DRAFTED` + correction pass
- Gate: `BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW` (**not** yet `BASELINE_APPROVED`)
- `Research/Spikes/IR-0001/` (non-production; execute only after future `CHANGE-0003`)
- Handoff automation + PR-template governance

**Do not** tag `v1.0.0-phase1c` from this tip. Apply after remote freeze tag confirmation.

## Commit A vs Commit B

### Commit A — Phase 1 freeze only

Allowed:

```text
CHANGELOG.md
Docs/Changes/CHANGE-0001-phase1c-freeze-preparation.md
Docs/Capture/PHASE_1C_FINAL_VALIDATION.md
Phase 1 validation evidence references
Phase 1 status corrections
```

Not allowed:

```text
Specifications/
Research/
IR-0001/
CHANGE-0002 covering Specs 1–6
v2 baseline promotion records
```

```text
Commit A
→ tag v1.0.0-phase1c
→ push tag
→ verify remote tag
→ PHASE_1_FROZEN
```

### Commit B — after Phase 1 tag

```text
Docs/Changes/TEMPLATE.md
Docs/Changes/CHANGE-0002-v2-specification-hardening.md
Specifications/
Research/
IR-0001 scaffolding
handoff automation
PR-template governance
```

Consistency review: `Specifications/V2_SPECS_1_TO_6_CONSISTENCY_REVIEW.md`

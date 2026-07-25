# capture-ios Mac handoff

## Current — Phase 1C freeze-prep (Commit A isolation)

**Status:** `PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE`  
**Tree:** Phase 1 only — **no** `Specifications/` / `Research/` / `CHANGE-0002` (keeps `v1.0.0-phase1c` clean).

| Field | Value |
|------|---------|
| Branch | `cursor/phase1c-freeze-commit-a-d881` |
| Tip | `658fde7` (CHANGE-0001 Commit A isolation) |
| ZIP SHA-256 | `8990c7407e742fc47f75770c57d18a7f4d1f0e7ccfddc2159c88a85f24855e7f` |
| Bundle SHA-256 | `3116f4b7ca43ca5aad0857c62a631c277072e28615b7e81a7bcbeca9deb869f1` |
| Change record | `CHANGE-0001` — `IMPLEMENTED` / `FREEZE_EXECUTION_PENDING` |

```bash
git clone elektron-capture-ios-phase1c-freeze-prep.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout cursor/phase1c-freeze-commit-a-d881
git rev-parse HEAD   # expect 658fde7…
# Equivalence check → fill validation → Commit A → tag v1.0.0-phase1c → push → verify remote
```

```text
Commit A → tag v1.0.0-phase1c → push tag → verify remote tag → PHASE_1_FROZEN
```

Protocol: `Docs/Capture/PHASE_1C_FREEZE_COMMIT_SEPARATION.md`

---

## Commit B+ staging (after remote freeze tag only)

**Not for `v1.0.0-phase1c`.** `HANDOFF_VERIFIED` (HANDOFF-0033). Specs **not** baseline-approved.

```text
V2_SPECIFICATIONS_4_TO_6_DRAFTED
CROSS_SPEC_REVIEW_COMPLETED_WITH_REQUIRED_CORRECTIONS
CORRECTION_PASS_APPLIED
BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW
```

| Field | Value |
|------|---------|
| Branch | `cursor/phase1c-evidence-library-d881` |
| Tip | `1f5e817` (package) / generation parent `19400c2` |
| ZIP SHA-256 | `cebf8687f104fb28f0936fbac5a4ec3da22e6e636f14abb61f02cb49cfe070d0` |
| Bundle SHA-256 | `cebd33e2b7e005b0be1affc2e2fc484112087660cbdfe5138d4f20a71ce5aa80` |
| Change record | `CHANGE-0002` — `IMPLEMENTED` / `FINAL_ARCHITECTURAL_REVIEW_PENDING` / `NOT_BASELINE_APPROVED` |

Future `CHANGE-0003` only after architectural review: baseline approval + IR-0001 authorization.

Also mirrored as root `DOWNLOAD-elektron-capture-ios-phase1c-evidence-library.zip`.

## Permanent invariants

```text
NO CHANGE WITHOUT CHANGELOG
NO COMPLETION WITHOUT HANDOFF
NO HANDOFF WITHOUT VERIFIED HASHES
NO RELEASE WITHOUT AUTHORITATIVE TAG
```

Completion requires change record + handoff refresh + verified hashes. Until then:
`IMPLEMENTED_PENDING_CHANGE_DOCUMENTATION_AND_HANDOFF`.

See `CHANGELOG_AND_HANDOFF_GOVERNANCE.md` and `Docs/Changes/`.

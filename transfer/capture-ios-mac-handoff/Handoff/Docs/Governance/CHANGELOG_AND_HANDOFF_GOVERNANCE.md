# CHANGE DOCUMENTATION AND HANDOFF GOVERNANCE RULE

**Status:** Officially adopted — primary repository engineering rule  
**Enforcement:** `make handoff` + `make handoff-verify` required before `IMPLEMENTATION_COMPLETE`

No feature, contract, schema, status, workflow, evidence format, sensor behavior,
quality rule, repository structure, research conclusion, or release state is
considered complete until:

1. the implementation or specification is complete;
2. required tests are complete;
3. required evidence is recorded;
4. `CHANGELOG.md` is updated;
5. a detailed `Docs/Changes/CHANGE-XXXX.md` record is created when required;
6. the handoff package is regenerated;
7. the handoff inventory and SHA-256 manifest are regenerated;
8. all handoff digests are independently verified;
9. remaining limitations and pending gates are documented.

These artifacts should be updated within the same pull request or coordinated
commit series as the underlying change.

Until all requirements pass, the work remains:

`IMPLEMENTED_PENDING_CHANGE_DOCUMENTATION_AND_HANDOFF`

---

## Permanent invariants

```text
NO CHANGE WITHOUT CHANGELOG
NO COMPLETION WITHOUT HANDOFF
NO HANDOFF WITHOUT VERIFIED HASHES
NO RELEASE WITHOUT AUTHORITATIVE TAG
```

---

## 1. Completion state machine

```text
CODE_OR_SPEC_COMPLETE
+ TESTS_COMPLETE
+ EVIDENCE_COMPLETE
+ CHANGELOG_COMPLETE
+ CHANGE_RECORD_COMPLETE
+ HANDOFF_REFRESHED
+ HANDOFF_HASHES_VERIFIED
= IMPLEMENTATION_COMPLETE
```

Intermediate state when implementation/spec work exists but documentation or
handoff is incomplete:

```text
IMPLEMENTED_PENDING_CHANGE_DOCUMENTATION_AND_HANDOFF
```

```text
                  ┌────────────────────────────────────────────────────────┐
                  │ IMPLEMENTED_PENDING_CHANGE_DOCUMENTATION_AND_HANDOFF   │
                  └───────────────────────────┬────────────────────────────┘
                                              │
    Requires:                                 │
    • CODE_OR_SPEC_COMPLETE                   │
    • TESTS_COMPLETE                          │
    • EVIDENCE_COMPLETE                       │
    • CHANGELOG_COMPLETE                      │
    • CHANGE_RECORD_COMPLETE                  │
    • HANDOFF_REFRESHED                       │
    • HANDOFF_HASHES_VERIFIED                 │
                                              ▼
                  ┌────────────────────────────────────────────────────────┐
                  │                 IMPLEMENTATION_COMPLETE                │
                  └────────────────────────────────────────────────────────┘
```

---

## 2. Required handoff records

The governance rule explicitly controls:

```text
HANDOFF.md
HANDOFF_HISTORY.md
CHANGELOG.md
Docs/Changes/CHANGE-XXXX.md
PACKAGE_INVENTORY.json
REPOSITORY_STATE.md
VALIDATION_SUMMARY.md
OPEN_ITEMS.md
SHA256SUMS.txt
source ZIP
Git bundle
```

Every handoff must identify:

```text
handoffID
generatedAt
sourceCommit
sourceBranch
workingTreeState
previousHandoffID
changeRange
includedChangeIDs
includedPRs
projectStatus
validationStatus
artifactHashes
remainingGates
```

Canonical package layout:

```text
Handoff/
├── HANDOFF.md
├── CHANGELOG.md
├── SHA256SUMS.txt
├── PACKAGE_INVENTORY.json
├── REPOSITORY_STATE.md
├── VALIDATION_SUMMARY.md
├── OPEN_ITEMS.md
├── STATUS.txt
├── Specifications/
├── Research/
├── Docs/
└── artifacts/          # source ZIP + Git bundle (gitignored binaries)
```

---

## 3. Automated toolchain contract

```bash
make handoff          # regenerate Handoff/ + ZIP + bundle + digests
make handoff-verify   # unpack and independently verify digests + bundle
```

Implementation (do not substitute ad-hoc packaging):

- `Scripts/generate-handoff.sh`
- `Scripts/verify-handoff-package.sh`

The pipeline must:

1. Determine repository commit and branch  
2. Record whether the working tree is clean  
3. Read current project status  
4. Require `CHANGELOG.md` present (and updated in the same change series)  
5. Require change records under `Docs/Changes/` when required  
6. Generate `HANDOFF.md` with the identity fields above  
7. Generate `PACKAGE_INVENTORY.json`  
8. Copy approved documentation and evidence  
9. Create the source ZIP  
10. Create the Git bundle  
11. Generate complete SHA-256 digests  
12. Verify every digest  
13. Fail if placeholders are presented as verified evidence  
14. Append `Docs/Handoffs/HANDOFF_HISTORY.md`  

---

## 4. Commit A / Commit B release boundary

### Commit A — Phase 1 freeze only (tag `v1.0.0-phase1c`)

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

Sequence:

```text
Commit A
→ tag v1.0.0-phase1c
→ push tag
→ verify remote tag
→ PHASE_1_FROZEN
```

### Commit B — v2 governance and specifications (after Phase 1 tag)

```text
Docs/Changes/TEMPLATE.md
Docs/Changes/CHANGE-0002-v2-specification-hardening.md
Specifications/
Research/
IR-0001 scaffolding
architecture index
entity/state registry
handoff automation
PR-template governance
```

`CHANGE-0002` status remains `NOT_BASELINE_APPROVED` until a later
`CHANGE-0003` records baseline approval and IR-0001 authorization.

---

## 5. Change-record numbering (current)

| ID | Title | Status |
|---|---|---|
| `CHANGE-0001` | Phase 1C completion retraction, freeze preparation, and Commit A isolation | `IMPLEMENTED` / `FREEZE_EXECUTION_PENDING` |
| `CHANGE-0002` | Capture v2 Specifications 1–6 hardening and twelve-point correction pass | `IMPLEMENTED` / `FINAL_ARCHITECTURAL_REVIEW_PENDING` / `NOT_BASELINE_APPROVED` |
| `CHANGE-0003` | Capture v2 Specifications 1–6 baseline approval and IR-0001 authorization | **Future only** — create after architectural review passes |

---

## 6. PR gate

See `.github/PULL_REQUEST_TEMPLATE.md` — Change Governance + Handoff Governance
checklists required.

No future pull request or commit series is marked complete without passing
`make handoff` and `make handoff-verify` when handoff artifacts are in scope.

---

## 7. Current project status under this rule

### Phase 1 freeze path (Commit A)

```text
STATUS: PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE
REMAINING GATE: Mac equivalence check → fill device evidence → Commit A
                → tag v1.0.0-phase1c → remote lock / GitHub protection
BRANCH: cursor/phase1c-freeze-commit-a-d881 (Phase 1 only — no Specs/Research)
```

### Capture v2 staging path (Commit B+)

```text
STATUS: V2_SPECIFICATIONS_4_TO_6_DRAFTED
        CROSS_SPEC_REVIEW_COMPLETED_WITH_REQUIRED_CORRECTIONS
        CORRECTION_PASS_APPLIED
        BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW
REMAINING GATE: Final architectural review → CHANGE-0003
                → AUTHORIZED_FOR_IR_0001_EXECUTION → IR-0001 on device
BRANCH: cursor/phase1c-evidence-library-d881
```

**Not yet declared:** `V2_SPECIFICATIONS_1_TO_6_BASELINE_APPROVED` /
`AUTHORIZED_FOR_IR_0001_EXECUTION`.

### Handoff package status (when pipeline succeeds)

```text
HANDOFF_GENERATED
HANDOFF_VERIFIED
```

This does **not** advance Phase 1 freeze or Specs baseline approval by itself.

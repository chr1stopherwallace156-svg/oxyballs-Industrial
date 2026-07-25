# CHANGELOG AND HANDOFF GOVERNANCE

**Status:** Officially adopted — primary repository engineering rule  
**Enforcement:** `make handoff` + `make handoff-verify` required before `IMPLEMENTATION_COMPLETE`

This closes the loop between committed trees and distributable handoff artifacts.
Code or specs must not drift away from the `.zip`, `.bundle`, and `SHA256SUMS.txt`
deliverables.

Every meaningful code, specification, contract, schema, workflow, status,
test, validation, evidence, or repository-governance change must update:

1. `CHANGELOG.md`
2. The relevant detailed change record (`Docs/Changes/CHANGE-XXXX.md`)
3. The handoff package (`Handoff/`)
4. The handoff manifest and file inventory
5. The SHA-256 digest list
6. The handoff status summary

These updates must occur in the same pull request or implementation commit
series as the underlying change.

A change is not complete merely because the source code or specification was
updated. It remains `IMPLEMENTED_PENDING_CHANGE_DOCUMENTATION_AND_HANDOFF`
(or `IMPLEMENTED_PENDING_HANDOFF_REFRESH`) until the changelog and handoff
artifacts accurately reflect the new state.

---

## 1. State machine invariants

```text
                  ┌────────────────────────────────────────────────────────┐
                  │        IMPLEMENTED_PENDING_HANDOFF_REFRESH             │
                  └───────────────────────────┬────────────────────────────┘
                                              │
    Requires:                                 │
    • IMPLEMENTATION / SPEC                   │
    • TESTS                                   │ + CHANGELOG (CHANGELOG.md + CHANGE-XXXX)
    • EVIDENCE                                │ + HANDOFF_REFRESH (ZIP + Bundle + Inventory)
                                              │ + HASH_VERIFICATION (SHA256SUMS.txt)
                                              ▼
                  ┌────────────────────────────────────────────────────────┐
                  │                 IMPLEMENTATION_COMPLETE                │
                  └────────────────────────────────────────────────────────┘
```

### Completion formula

```text
IMPLEMENTATION_COMPLETE
requires
IMPLEMENTATION
+ TESTS
+ EVIDENCE
+ CHANGELOG
+ HANDOFF_REFRESH
+ HASH_VERIFICATION
```

Without the updated handoff:

```text
IMPLEMENTED_PENDING_HANDOFF_REFRESH
```

---

## 2. The four operating rules

### I. NO CHANGE WITHOUT CHANGELOG

Every change to code, contracts, schemas, quality rules, or project status must
update `CHANGELOG.md` and the appropriate `Docs/Changes/CHANGE-XXXX.md` record.

### II. NO COMPLETION WITHOUT HANDOFF

No task transitions to `IMPLEMENTATION_COMPLETE` without running the handoff
pipeline to regenerate `Handoff/`, the source snapshot `.zip`, the `.bundle`,
and the package inventory.

### III. NO HANDOFF WITHOUT VERIFIED HASHES

Every handoff artifact must be digested via `sha256sum` / `shasum -a 256`,
recorded in `SHA256SUMS.txt`, and verified via automated unpack/hash check
(`make handoff-verify`). Placeholders (`[INSERT]`, unverified `VERIFIED_PASS`
presented as fact) fail the gate.

### IV. NO RELEASE WITHOUT AUTHORITATIVE TAG

Release baselines (e.g. Phase 1) remain
`PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE` until Commit A is
verified on host hardware, the annotated tag (e.g. `v1.0.0-phase1c`) is created,
pushed, and remote branch/tag protection is active.

```text
NO CHANGE WITHOUT CHANGELOG
NO COMPLETION WITHOUT HANDOFF
NO HANDOFF WITHOUT VERIFIED HASHES
NO RELEASE WITHOUT AUTHORITATIVE TAG
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
5. Generate `HANDOFF.md`  
6. Generate `PACKAGE_INVENTORY.json`  
7. Copy approved documentation and evidence  
8. Create the source ZIP  
9. Create the Git bundle  
10. Generate complete SHA-256 digests  
11. Verify every digest  
12. Fail if placeholders or stale COMPLETE claims exist without pending caveats  
13. Append `Docs/Handoffs/HANDOFF_HISTORY.md`  

---

## 4. Canonical handoff structure

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

### `HANDOFF.md` must answer

```text
What changed?
Why did it change?
When did it change?
Which files changed?
Which contracts or behaviors changed?
Which commit and PR contain it?
What was tested?
What evidence was produced?
What remains pending?
What must the next person do?
Which artifacts and hashes are authoritative?
```

---

## 5. Handoff history

Do not silently overwrite handoff history. Append to
`Docs/Handoffs/HANDOFF_HISTORY.md` on every regeneration.

---

## 6. PR gate

See `.github/PULL_REQUEST_TEMPLATE.md` — changelog + handoff checklist required.

No future pull request or commit series is marked complete without passing
`make handoff` and `make handoff-verify`.

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
        BASELINE_APPROVAL_PENDING_FINAL_SIGN_OFF
REMAINING GATE: Final baseline sign-off → AUTHORIZED_FOR_IR_0001_EXECUTION
                → IR-0001 on device → make handoff
BRANCH: cursor/phase1c-evidence-library-d881
```

**Not yet declared:** `V2_SPECIFICATIONS_1_TO_6_BASELINE_APPROVED` /
`AUTHORIZED_FOR_IR_0001_EXECUTION` (correction pass complete; final sign-off pending).

### Handoff package status (when pipeline succeeds)

```text
HANDOFF_GENERATED
HANDOFF_VERIFIED
```

This does **not** advance Phase 1 freeze or Specs baseline approval by itself.

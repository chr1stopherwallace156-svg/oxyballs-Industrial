# CHANGE DOCUMENTATION AND HANDOFF GOVERNANCE RULE

**Status:** `GOVERNANCE_MODEL_APPROVED`  
**Automation:** `HANDOFF_AUTOMATION_CONTRACT_DEFINED` — two-stage model (corrected)  
**Generator:** Shell Stage 1/2 implemented via Unix/Git primitives (`make handoff-prepare` / `make handoff-package`). In-tree single-shot packaging is **retired** (`AUTOMATION_CONTRACT_REQUIRES_CORRECTION` → corrected).

No feature, contract, schema, status, workflow, evidence format, sensor behavior,
quality rule, repository structure, research conclusion, or release state is
considered complete until all nested sub-gates below pass.

These artifacts should be updated within the same pull request or coordinated
commit series as the underlying change.

Until all requirements pass, the work remains:

`IMPLEMENTED_PENDING_COMPLETION_ARTIFACTS`

---

## Permanent invariants

```text
NO CHANGE WITHOUT CHANGELOG
NO COMPLETION WITHOUT HANDOFF
NO HANDOFF WITHOUT VERIFIED HASHES
NO RELEASE WITHOUT AUTHORITATIVE TAG
```

---

## 1. Status invariant matrix

### Track A — Phase 1 freeze path

| Field | Value |
|---|---|
| **Status** | `PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE` |
| **Lineage** | `cursor/phase1c-freeze-commit-a-d881` |
| **Remaining gate** | Mac device evidence → Commit A → annotated tag `v1.0.0-phase1c` → push & branch/tag lock |

### Track B — Phase 2 specification & spike path

| Field | Value |
|---|---|
| **Status** | `BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW` |
| **Lineage** | `cursor/phase1c-evidence-library-handoff-d881` |
| **Spike authorization** | `IR_0001_EXECUTION_NOT_YET_AUTHORIZED` |
| **Remaining gate** | Phase 1 remote tag freeze → final architectural review → formal IR-0001 execution authorization |

**Not claimed:** `PHASE_1C_COMPLETE`, Specs `BASELINE_APPROVED`, `AUTHORIZED_FOR_IR_0001_EXECUTION`.

---

## 2. Completion state machine

```text
               ┌─────────────────────────────────────────────────────────┐
               │        IMPLEMENTED_PENDING_COMPLETION_ARTIFACTS         │
               └────────────────────────────┬────────────────────────────┘
                                            │
   Requires ALL Sub-Gates:                  │
   1. IMPLEMENTATION_COMPLETE               │  (code/spec body)
   2. TESTS_COMPLETE                        │
   3. EVIDENCE_COMPLETE                     │
   4. CHANGELOG_COMPLETE                    │
   5. CHANGE_RECORD_COMPLETE_OR_JUSTIFIED   │
   6. HANDOFF_METADATA_COMMITTED            │  (Stage 1)
   7. SOURCE_ARCHIVE_GENERATED              │  (Stage 2)
   8. REPOSITORY_BUNDLE_GENERATED           │  (Stage 2)
   9. PACKAGE_INVENTORY_COMPLETE            │
  10. DIGESTS_GENERATED                     │
  11. DIGESTS_VERIFIED                      │
  12. RESTORATION_TEST_PASSED               │
                                            ▼
               ┌─────────────────────────────────────────────────────────┐
               │                 IMPLEMENTATION_COMPLETE                 │
               └─────────────────────────────────────────────────────────┘
```

For official tag releases (e.g. Phase 1C freeze), additional release gates apply:

```text
AUTHORITATIVE_TAG_CREATED
→ REMOTE_TAG_VERIFIED
→ TAG_TARGET_VERIFIED
→ PROTECTION_CONFIGURATION_RECORDED
→ RELEASE_STATUS_RECORDED
```

---

## 3. Two-stage execution model

Single-shot in-tree packaging is forbidden: it created stale-artifact and
circular-hash paradoxes (digests of files that still needed to include those digests).

### Stage 1 — `make handoff-prepare`

Generates/appends **tracked** documentation in the working tree:

```text
CHANGELOG.md
Docs/Changes/CHANGE-XXXX.md
Handoff/HANDOFF.md
Handoff/PACKAGE_INVENTORY.json
Handoff/REPOSITORY_STATE.md
Handoff/VALIDATION_SUMMARY.md
Handoff/OPEN_ITEMS.md
Docs/Handoffs/HANDOFF_HISTORY.md
```

Action: review, stage, and **commit** so `HEAD` contains human-readable reasoning
and inventory metadata (`HANDOFF_METADATA_COMMITTED`).

### Stage 2 — `make handoff-package`

Runs **only** when `git status --porcelain=v1` is empty. Archives and hashes
committed `HEAD` into an **untracked** external envelope:

```text
dist/<handoffID>/                    # e.g. dist/HANDOFF-0034/
├── payload/                          # Exact exported copy of tracked handoff docs
│   ├── HANDOFF.md
│   ├── CHANGELOG.md
│   ├── PACKAGE_INVENTORY.json
│   ├── REPOSITORY_STATE.md
│   ├── VALIDATION_SUMMARY.md
│   ├── OPEN_ITEMS.md
│   ├── Specifications/
│   ├── Research/
│   └── Docs/
├── elektron-capture-<commit_sha>.zip
├── elektron-capture-<commit_sha>.bundle
├── VERIFICATION_REPORT.md
└── SHA256SUMS.txt                    # hashes payload/ + zip/bundle (excludes itself)
```

`dist/` is gitignored. Never commit build outputs into the tracked source tree.

---

## 4. Diff-based changelog & change-record gates

Validation compares against `BASE_REF` (default `origin/main`, else `main`):

```bash
git diff --quiet "${BASE_REF:-origin/main}"...HEAD -- CHANGELOG.md && {
  echo "ERROR: CHANGELOG.md was not updated relative to ${BASE_REF:-origin/main}"
  exit 1
}

if ! git diff --name-only "${BASE_REF:-origin/main}"...HEAD | grep -Eq '^Docs/Changes/CHANGE-[0-9]{4}.*\.md$'; then
  if ! grep -q "CHANGE_RECORD_NOT_REQUIRED_REASON" Handoff/HANDOFF.md; then
    echo "ERROR: No detailed Docs/Changes/CHANGE-XXXX.md record found and no explicit exception declared."
    exit 1
  fi
fi
```

---

## 5. Deterministic digests & isolated restoration

```bash
find "dist/${HANDOFF_ID}/payload" \
     "dist/${HANDOFF_ID}/elektron-capture-${COMMIT_SHA}.zip" \
     "dist/${HANDOFF_ID}/elektron-capture-${COMMIT_SHA}.bundle" \
  -type f -print0 |
LC_ALL=C sort -z |
xargs -0 shasum -a 256 > "dist/${HANDOFF_ID}/SHA256SUMS.txt"
```

(`SHA256SUMS.txt` and `VERIFICATION_REPORT.md` are excluded from the digest list.)

Restoration:

```bash
VERIFY_DIR="$(mktemp -d)"
trap 'rm -rf "$VERIFY_DIR"' EXIT
git clone "dist/${HANDOFF_ID}/elektron-capture-${COMMIT_SHA}.bundle" "$VERIFY_DIR/restored-repo"
git -C "$VERIFY_DIR/restored-repo" fsck --full
# HEAD must equal packaged COMMIT_SHA
```

---

## 6. Required identity fields

Every handoff metadata document must identify:

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
remainingGates
```

Stage 2 adds `artifactHashes` in `VERIFICATION_REPORT.md` / `SHA256SUMS.txt`.

---

## 7. Commit A / Commit B release boundary

### Commit A — Phase 1 freeze only (`v1.0.0-phase1c`)

Allowed: `CHANGELOG.md`, `CHANGE-0001`, validation docs, Phase 1 status corrections.  
Forbidden: `Specifications/`, `Research/`, `CHANGE-0002+`, v2 baseline promotion.

### Commit B — after Phase 1 tag

Specs, Research, IR-0001 scaffolding, `CHANGE-0002`, handoff automation, PR template.

---

## 8. Change-record numbering

| ID | Title | Status |
|---|---|---|
| `CHANGE-0001` | Phase 1C completion retraction, freeze preparation, Commit A isolation | `IMPLEMENTED` / `FREEZE_EXECUTION_PENDING` |
| `CHANGE-0002` | Capture v2 Specs 1–6 hardening and twelve-point correction pass | `IMPLEMENTED` / `FINAL_ARCHITECTURAL_REVIEW_PENDING` / `NOT_BASELINE_APPROVED` |
| `CHANGE-0003` | Specs 1–6 baseline approval and IR-0001 authorization | **Future only** |
| `CHANGE-0004` | Two-stage handoff automation contract (prepare → package → dist/) | `IMPLEMENTED` / `HANDOFF_AUTOMATION_CONTRACT_DEFINED` |

---

## 9. Toolchain status classification

```text
GOVERNANCE_MODEL_APPROVED
AUTOMATION_CONTRACT_REQUIRES_CORRECTION → CORRECTED_TO_TWO_STAGE_MODEL
HANDOFF_AUTOMATION_CONTRACT_DEFINED
HANDOFF_TWO_STAGE_SHELL_AUTOMATION_IMPLEMENTED
```

Legacy: `make handoff` / `make handoff-verify` (in-tree artifacts) are **retired** and exit non-zero with migration instructions.

---

## 10. PR gate

See `.github/PULL_REQUEST_TEMPLATE.md` — Change Governance + Handoff Governance
(two-stage) checklists required.


---

## 11. Knowledge artifact hierarchy

Do not collapse these:

| Artifact | Path |
|---|---|
| Implementation handoff | `CAPTURE_IMPLEMENTATION_HANDOFF.md` |
| Executive snapshot | `PROJECT_STATE.md` |
| Repository memory | `REPOSITORY_MEMORY.md` |
| Decisions | `Docs/Decisions/DECISION_LOG.md` |
| Distribution handoff | `dist/HANDOFF-XXXX/` |
| **EKP** | `dist/EKP-CAPTURE-XXXX/` |

Contract: `Docs/Governance/ELEKTRON_KNOWLEDGE_PACKAGE.md`  
Automation: `make ekp-prepare` → commit → `make ekp-package`


Canonical memory architecture: `Docs/Governance/FIVE_CORE_MEMORY_ARTIFACTS.md` (`CHANGE-0006`).

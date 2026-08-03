# Pass 1 approval request — reproducible evidence

**Status:** submitted for operator review — **NOT operator-approved**  
**HARD STOP:** Pass 2 must not start until operator approval of this package.

> Passing tests is not sufficient if achieved by weakening byte-identity, inventory completeness, status ownership, or artifact-integrity assertions.

---

## Commit identity

| Field | SHA |
|---|---|
| Baseline (Pass 0 parent) | `31513ac1b12626e89020f8ac998247b68d84f1d6` |
| Pass 1 code fix | `4a954b7b440b51002e364f8ae944c2a156fe1eea` |
| Pass 1 policy docs | `f739c3687f009367f24fc8d64ff247dc04e9117a` |
| Pass 1 evidence + Decision Log (this tip) | *(filled after commit — see `IDENTITY.txt`)* |

Tags **untouched**:
- `capture-ios-phase0-approved-v0.1.3` → `d867137877817de0369d749a64201cad01886227`
- `capture-ios-phase1-directive-v0.1.4` → `61502eb3ccc0336c52e6dfbbb58f38a66eeaad7c`

---

## Files changed vs baseline `31513ac` (production + tests + docs)

| Path | Role |
|---|---|
| `App/Application/CanonicalJSON.swift` | Production — `ensure_ascii` `\uXXXX` escaping |
| `App/Phase1/CaptureSidePackageValidator.swift` | Production — `NSNumber`/`Int` byte_size + undeclared-path check |
| `Tests/Unit/Pass1CanonicalInventoryTests.swift` | **Added** regression tests (no existing tests deleted) |
| `Docs/Validation/CANONICAL_JSON.md` | Doc — point to escaping policy |
| `Docs/Validation/CANONICAL_NON_ASCII_POLICY.md` | Doc — Decision P1-001 |
| `Docs/Evidence/PACKAGE_INVENTORY_PASS1_CLASSIFICATION.md` | Doc — Decision P1-002 |
| `Docs/Capture/PHASED_EXECUTION_GATES.md` | Doc — hard stop + gates |
| `Docs/Capture/PASS_APPROVAL_EVIDENCE_STANDARD.md` | Doc — Decision P1-004 |
| `Docs/Decisions/DECISION_LOG.md` | Doc — P1-001…P1-004 |
| `Docs/Evidence/PASS1_APPROVAL_EVIDENCE/*` | This evidence package |

`git diff --name-status` for Tests/: only `A Tests/Unit/Pass1CanonicalInventoryTests.swift` — **zero deletions**.

---

## Production file explanations

### `CanonicalJSON.swift`
Implements mandatory ASCII `\uXXXX` escaping after sorted-key serialization so Swift bytes match Python `ensure_ascii=True` golden. Does **not** perform NFC/NFD normalization. Does **not** weaken the gate to object-equivalence.

### `CaptureSidePackageValidator.swift`
Accepts Darwin `NSNumber` and Linux `Int` for inventory `byte_size`. Flags `INVENTORY_UNDECLARED_PATH` for on-disk files missing from `entries`. Does **not** change self-hash omit policy or expected file set from the builder.

---

## Test explanations

### Added: `Pass1CanonicalInventoryTests.swift`
| Test | Purpose |
|---|---|
| `testUnicodeEnsureAsciiEscapes` | `\u00e9` present; raw `é` absent |
| `testSwiftLiteralCorpusMatchesPythonGoldenBytes` | Full corpus byte+SHA identity using Swift Bool literals (no JSON reparse) |
| `testInventoryValidatorAcceptsNSNumberByteSize` | Class D bridging fix |
| `testInventoryValidatorFlagsUndeclaredPath` | Class E completeness |

### Unchanged / not deleted
All pre-existing unit and golden tests remain. Darwin-parse `CrossLanguageCanonicalJSONTests` still skipped on Linux (platform limitation) — **not** deleted or converted to object-equality.

---

## Bug repair narratives

### Bug 1 — Canonical JSON byte mismatch

```text
Problem
  Cross-language byte gate fails: Swift "électron" vs Python "\u00e9lectron"

Root cause
  Escaping-policy mismatch (ensure_ascii), NOT NFC/NFD Unicode normalization

Fix
  Canonical policy = mandatory \uXXXX (Decision P1-001)
  CanonicalJSON.ensureAsciiEscapes after solidus normalize

Evidence that fix addresses root cause
  Swift-literal corpus bytes == corpus.python.canonical.json
  SHA-256 == corpus.python.canonical.sha256
  (see Pass1CanonicalInventoryTests.testSwiftLiteralCorpusMatchesPythonGoldenBytes)

Regression
  Pass1CanonicalInventoryTests + Darwin CrossLanguageCanonicalJSONTests (Mac)
```

### Bug 2 — Inventory declaration / entry invalid

```text
Problem
  Inventory validation failures (entry invalid / undeclared-path risk)

Root cause classification
  D: Darwin JSONSerialization yields NSNumber for byte_size; as? Int can fail
  E: Validator did not assert undeclared on-disk completeness
  NOT A (assembly order) / NOT C (self-hash — already omit-self)

Fix
  Accept Int|NSNumber; emit INVENTORY_UNDECLARED_PATH
  Document in PACKAGE_INVENTORY_PASS1_CLASSIFICATION.md (P1-002)

Evidence
  testInventoryValidatorAcceptsNSNumberByteSize
  testInventoryValidatorFlagsUndeclaredPath
  Existing testPackageBuildInventoryAndExtension still passes

Regression
  Pass1CanonicalInventoryTests + Phase1RuntimeTests inventory cases
```

---

## Decision Log IDs

P1-001, P1-002, P1-003, P1-004 — see `Docs/Decisions/DECISION_LOG.md`

---

## Attached raw evidence files

| File | Contents |
|---|---|
| `swift-test-full.log` | Full `swift test` terminal output |
| `git-evidence.txt` | HEAD, parent, baseline, `git show --summary`, `git diff --stat` |
| `tests-name-status.txt` | Test path name-status vs baseline |
| `IDENTITY.txt` | Final tip SHA after this evidence commit |

---

## Operator checklist (independent)

- [ ] Fresh clone of tip / bundle; `git rev-parse HEAD` matches `IDENTITY.txt`
- [ ] `git diff --stat 31513ac..HEAD` matches this request
- [ ] Rerun `swift test` (Darwin preferred for CrossLanguage parse path)
- [ ] Confirm no tests deleted
- [ ] Read P1-001 and P1-002 before approving
- [ ] Explicit written approval before any Pass 2 work

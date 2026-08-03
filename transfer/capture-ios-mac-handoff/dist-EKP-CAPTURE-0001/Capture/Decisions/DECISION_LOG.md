# Decision Log — elektron-capture-ios

Append-only engineering decisions. Do not rewrite prior entries; supersede with a new ID.

---

## P1-001 — Canonical non-ASCII serialization

| Field | Value |
|---|---|
| Decision ID | **P1-001** |
| Pass | 1 |
| Question | Should canonical JSON emit raw UTF-8 non-ASCII or ASCII `\uXXXX` escapes? |
| Alternatives | **A:** Raw UTF-8 (`"électron"`) — regenerate Python golden + EDTS to `ensure_ascii=False`. **B:** Mandatory `\uXXXX` escaping — match existing Python `ensure_ascii=True` golden. |
| Chosen | **B** |
| Reason | Observed failure was escaping-policy mismatch, not NFC/NFD. Shared golden already uses `ensure_ascii=True`. Byte-identity gate must remain byte-for-byte, not object-equivalence. |
| Affected files | `App/Application/CanonicalJSON.swift`, `Docs/Validation/CANONICAL_NON_ASCII_POLICY.md`, `Docs/Validation/CANONICAL_JSON.md`, `Tests/Unit/Pass1CanonicalInventoryTests.swift`, corpus under `Tests/Unit/Fixtures/canonical_corpus/` |
| Future impact | Swift, Python, and goldens must stay on one escaping policy. Changing policy requires regenerating goldens + dual-side review. |
| Contract version | Canonical JSON binding 1.0.0 (escaping rule clarified 2026-07-24) |
| Commit | `4a954b7`, docs `f739c36` |

---

## P1-002 — Package inventory completeness and self-hash

| Field | Value |
|---|---|
| Decision ID | **P1-002** |
| Pass | 1 |
| Question | How should inventory treat self-reference and Darwin `byte_size` typing? |
| Alternatives | **A:** Include self with two-pass empty sha. **B:** Omit `package_inventory.json` from `entries` (existing Phase 1 default). **C:** Weaken tests / exclude paths to green. |
| Chosen | **B** + accept `Int`/`NSNumber` for `byte_size` + flag undeclared on-disk paths |
| Reason | Root cause class D (NSNumber bridging) and class E (completeness gap). Self-hash omit already in `EDTS_PKG_FORMAT.md`. Must not delete/weaken inventory completeness assertions. |
| Affected files | `App/Phase1/CaptureSidePackageValidator.swift`, `App/Phase1/PackageInventoryBuilder.swift` (unchanged policy), `Docs/Evidence/PACKAGE_INVENTORY_PASS1_CLASSIFICATION.md`, `Tests/Unit/Pass1CanonicalInventoryTests.swift` |
| Future impact | Every package file except inventory itself must be declared. Changing self-hash policy needs versioned contract change. |
| Contract version | PackageInventory 1.0.0 / Phase 1 self-hash omit |
| Commit | `4a954b7`, docs `f739c36` |

---

## P1-003 — Pass 1 public-contract freeze

| Field | Value |
|---|---|
| Decision ID | **P1-003** |
| Pass | 1 |
| Question | May Pass 1 alter public evidence contracts to make tests pass? |
| Alternatives | **A:** Allow silent schema/layout/status/canonical changes. **B:** Freeze public contracts unless separately documented, justified, versioned, and operator-approved. |
| Chosen | **B** |
| Reason | Fixes that change the contract are not “bugfixes”; they are protocol changes. |
| Affected files | manifest schema, inventory schema, status registry, canonical JSON, package layout |
| Future impact | Pass 2/3 must not mutate these without a new Decision ID + approval. |
| Contract version | As of baseline `31513ac` + P1-001/P1-002 clarifications only |
| Commit | this Decision Log entry |

---

## P1-004 — Approval evidence standard

| Field | Value |
|---|---|
| Decision ID | **P1-004** |
| Pass | all |
| Question | Is a summary line (`swift test: N passed`) sufficient for operator approval? |
| Alternatives | **A:** Trust agent summaries. **B:** Require reproducible evidence package with every approval request. |
| Chosen | **B** |
| Reason | Prior discrepancy between claimed and local results. |
| Required evidence | See `Docs/Capture/PASS_APPROVAL_EVIDENCE_STANDARD.md` |
| Future impact | No pass may be marked operator-approved without the evidence package. |
| Commit | this Decision Log entry |

---

## P2-001 — Post-delegate hash freeze before review

| Field | Value |
|---|---|
| Decision ID | **P2-001** |
| Pass | 2 |
| Question | When is the authoritative artifact SHA-256 computed relative to review UI? |
| Alternatives | **A:** Hash at Export time from whatever bytes the UI holds. **B:** Freeze immutable JPEG `Data` + SHA-256 in the photo delegate path before any review decode; promote without recalculate/replace; export asserts invariance. |
| Chosen | **B** |
| Reason | Review UI must be throwaway-decode only. Re-encoding or late hashing would break byte-identity with the captured still. |
| Affected files | `App/Phase1/Phase1StillCaptureUIState.swift` (`PendingStillCapture` / `ApprovedStillCapture`), `App/Capture/AVFoundation/Phase1CameraServices.swift`, `App/Phase1/Phase1CaptureCoordinator.swift` (`exportApproved`), `Apps/Phase1StillCapture/Phase1CaptureRootView.swift`, `Tests/Unit/Pass2PreviewReviewGateTests.swift` |
| Future impact | Pass 3 quality/metadata paths must not replace frozen JPEG bytes. |
| Contract version | Capture-side artifact integrity — Pass 2 freeze rule |
| Commit | Pass 2 tip (see PASS2_APPROVAL_EVIDENCE/IDENTITY.txt) |

---

## P2-002 — Pass 2 scope excludes Pass 3 camera controls

| Field | Value |
|---|---|
| Decision ID | **P2-002** |
| Pass | 2 |
| Question | May Pass 2 include flash/torch/lens switching and quality warning UI? |
| Alternatives | **A:** Ship professional controls with preview in one pass. **B:** Pass 2 = preview + state machine + review gate + hash freeze only; Pass 3A/3B for controls/metadata/quality. |
| Chosen | **B** |
| Reason | Operator-directed phased roadmap; keep Pass 2 reviewable and gate-preserving. |
| Affected files | UI omits Pass 3 controls; `Docs/Capture/PHASED_EXECUTION_GATES.md` |
| Future impact | Pass 3A/3B start only after Pass 2 operator approval. |
| Commit | Pass 2 tip |

---

## P2-003 — Export write failure returns to approved

| Field | Value |
|---|---|
| Decision ID | **P2-003** |
| Pass | 2 |
| Question | If package write fails after Use Photo, what happens to frozen bytes and UI state? |
| Alternatives | **A:** Drop to failed and discard approved bytes. **B:** Transition `exporting → approved`; retain frozen approved capture for retry. |
| Chosen | **B** |
| Reason | Operator already approved the still; export is packaging, not recapture. Discarding would force unnecessary retake and risk hash churn. |
| Affected files | `Phase1StillCaptureUIStateMachine`, `Phase1CaptureRootView` export path |
| Future impact | Export retries must continue to assert hash invariance on the same approved bytes. |
| Commit | Pass 2 tip |

---

## P2-004 — Harden `.edts-pkg` share presentation + diagnostic ZIP copy

| Field | Value |
|---|---|
| Decision ID | **P2-004** |
| Pass | 2 (share/transport presentation fix) |
| Question | How should operators transfer a custom-extension `.edts-pkg` when Share/AirDrop/Files reject or mishandle the type, without altering artifact bytes? |
| Alternatives | **A:** Re-encode or rename the package contents for sharing. **B:** Register UTI conforming to `public.zip-archive`, stage the canonical `.edts-pkg` file for Share Sheet + Files export picker, and offer a temporary byte-identical `.zip` extension copy for diagnostics while leaving canonical `.edts-pkg` and `artifact_original.jpg` untouched. |
| Chosen | **B** |
| Reason | Failure mode was presentation/UTI/share path, not capture. JPEG must remain byte-identical to the post-delegate freeze. |
| Affected files | `PackageTransportShareSupport.swift`, `SharePresentation.swift`, `Phase1CaptureRootView.swift`, `Info.plist`, tests |
| Future impact | Diagnostic ZIP is temporary; EDTS ingest continues to prefer `.edts-pkg`. |
| Commit | share-presentation tip |

---

## P2-005 — App target must import ElektronCapture (SPM ≠ Xcode app)

| Field | Value |
|---|---|
| Decision ID | **P2-005** |
| Pass | 2 (integration) |
| Question | Does linking the `ElektronCapture` package product make package types visible to app sources without per-file `import`? |
| Alternatives | **A:** Assume product link re-exports into all app files. **B:** Require explicit `import ElektronCapture` in each app compile unit that references package types; keep types only in the package. |
| Chosen | **B** |
| Reason | App target is a separate module. `swift build` does not compile app sources, so SPM green ≠ Xcode app green. Missing RootView import matched unresolved-symbol reports; pbxproj already linked the product. |
| Affected files | `Phase1CaptureRootView.swift`, `Scripts/verify-xcode-handoff.sh` (now runs `xcodebuild` on Darwin) |
| Future impact | Handoffs must print `HANDOFF_XCODE_BUILD_OK` on Mac, not only `HANDOFF_LAYOUT_OK`. |
| Commit | import-fix / verifier tips |

## P1-004 — Canonical Identity Pattern (package-relative paths)

| Field | Value |
|---|---|
| Decision ID | **P1-004** |
| Pass | 1C inventory / path identity |
| Question | How should package path comparison survive macOS symlink aliasing and redundant path components? |
| Alternatives | **A:** Per-site prefix strip. **B:** Central `PackageRelativePath` + invariant suite + ADR. **C:** Weaken undeclared asserts. |
| Chosen | **B** |
| Reason | Eight false undeclared failures from `/var` vs `/private/var`; pattern reusable for hashes/IDs. |
| Affected files | `PackageRelativePath.swift`, builder/validator/ZIP, `CanonicalPackageIdentityTests`, ADR, `ERR-EDTS-0007` |
| Future impact | New domain identities follow Identity → Implementation → Invariants → ADR → Error Library. |
| Contract version | PackageInventory 1.0.0 unchanged (comparison only) |
| ADR | `Docs/Decisions/ADR-CANONICAL-IDENTITY-PATTERN.md` |
| Commit | `31c07b3` |

---

## GOV-001 — Commit A / Commit B freeze isolation

| Field | Value |
|---|---|
| Decision ID | **GOV-001** |
| Question | May Capture v2 Specs/Research land in the same commit/tag as Phase 1C freeze? |
| Decision | **No.** Commit A (Phase 1 only) → tag `v1.0.0-phase1c` → then Commit B. |
| Reason | Mixing v2 material into the freeze tag destroys a clean Phase 1 baseline. |
| Future Review | After remote tag confirmation, apply Commit B. |
| Change | `CHANGE-0001` |

---

## GOV-002 — Two-stage handoff packaging

| Field | Value |
|---|---|
| Decision ID | **GOV-002** |
| Question | Should zip/bundle/SHA256SUMS be generated inside tracked `Handoff/` in one shot? |
| Decision | **No.** Stage 1 commits metadata; Stage 2 packages clean HEAD into `dist/`. |
| Reason | Single-shot packaging creates circular hashes and dirty-tree paradoxes. |
| Future Review | Optional Swift generator must preserve the same contract. |
| Change | `CHANGE-0004` |

---

## V2-001 — Semantic mattes not production-supported

| Field | Value |
|---|---|
| Decision ID | **V2-001** |
| Question | Should Apple semantic mattes be production-supported in Capture v2? |
| Decision | **No.** |
| Reason | Semantic mattes are ML-derived; production evidence boundary requires deterministic, attributable observation. |
| Future Review | Deferred research only (`Research/Deferred/SemanticMattes/`); candidate spike **IR-0008**. |
| Change | Recorded in Specs correction pass / `CHANGE-0002` |

---

## GOV-003 — EKP vs implementation handoff separation

| Field | Value |
|---|---|
| Decision ID | **GOV-003** |
| Question | Is one handoff artifact enough for coding sessions and cross-subsystem understanding? |
| Decision | **No.** Keep `IMPLEMENTATION_HANDOFF.md` (session), `PROJECT_STATE.md` (executive), and **EKP** (full knowledge) separate. |
| Reason | Different consumers and different freshness/size requirements; collapsing them recreates false assurance. |
| Future Review | EMKP aggregation across subsystems. |
| Change | `CHANGE-0005` |

---

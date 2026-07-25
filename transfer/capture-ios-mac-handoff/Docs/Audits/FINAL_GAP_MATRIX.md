<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# FINAL_GAP_MATRIX

## Executive summary

This is the decision surface for Capture v2 engineering baseline. Answers are **evidence-backed as of tip `b5fe020` + this audit package** (Linux SPM tests run; no Xcode/device).

## What is 100% complete?

| Item | Complete? | Notes |
|---|---|---|
| Specs 1–3 hardening + Specs 4–6 draft + correction pass | **Docs complete for review** | Not baseline-approved |
| Two-stage handoff automation | Yes (tooling) | CHANGE-0004 |
| EKP + five-core memory artifacts | Yes (tooling) | CHANGE-0005/0006 |
| Phase 1 still runtime (code) | Functionally implemented | Freeze not complete |
| Phase 1 freeze | **No** | No tag |
| Capture v2 runtime | **No** | |
| IR-0001 | **No** | Not authorized |

Nothing product-side should be called “100% complete” including freeze gates.

## What is runtime verified?

| Item | Verified where |
|---|---|
| Phase 1 unit/golden suite | Linux `swift test` 89/0 (1 skip) — **this audit** |
| Phase 1 on physical iPhone | **Not in this environment**; ZIP snapshot language exists in docs — treat as pending authoritative equivalence |
| Spec 3–6 runtime | N/A — no code |
| Xcode build | Not run here |

## What is documentation only?

- EC-V2-SPEC-001…006 (governing contracts)
- Specs 7–10 pending
- `App/{Spatial,Motion,Calibration,Quality,Depth,...}` README trees
- IR-0001 RESULTS pending
- Integration/Hardware/Security test READMEs

## What is partially implemented?

- Device provenance / capability identity
- Motion & calibration sidecars (unavailable placeholders)
- Package seal / attestation
- Commit A freeze prep (branch exists; execution pending)
- Black-frame guard (side branch only)

## What should never be rebuilt?

- Canonical JSON algorithm + golden fixtures
- Inventory + hash invariance (freeze bytes before UI decode)
- AuthorityGuard / status ownership rules
- Two-stage handoff & EKP packaging contracts
- EvidenceLibraryStore integrity/reconcile model

## What should be extended instead of rewritten?

- `Phase1CaptureCoordinator` / `EvidencePackageBuilder` spine
- `EvidenceLibraryStore` actor
- `Phase1CameraServices` still path
- Domain protocols → add real adapters later
- Living memory artifacts (regenerate, don’t fork)

## What can be deleted?

| Candidate | When |
|---|---|
| Unused `FileEvidenceExporter` live-path confusion | After confirming no callers + CHANGE |
| Truly superseded local branches (pass1/pass2 historical) | After operator archive ack |
| Duplicate mental model of README stubs as features | Immediately (process) — keep files until replaced by real impl |
| Retired `make handoff` single-shot usage | Already retired in Makefile |

Do **not** delete Specs, Change records, or Commit A branch.

## What is blocking v2 baseline approval?

1. Final architectural review of Specs 1–6 + registry
2. Explicit baseline decision recorded (`CHANGE-0003` — **do not create until review passes**)
3. Clarity that Phase 1 freeze is separate track (should complete first to reduce chaos)

## What is blocking IR-0001?

1. `V2_SPECIFICATIONS_1_TO_6_BASELINE_APPROVED`
2. `AUTHORIZED_FOR_IR_0001_EXECUTION` (via CHANGE-0003)
3. Device/Mac environment to run the spike and write RESULTS

## What should be built next (priority order)?

1. Phase 1 freeze execution (Commit A) — **operator Mac**
2. Specs baseline approval → CHANGE-0003
3. IR-0001 execution + RESULTS
4. Phase1 UX/black-frame adopt-or-defer decision
5. First authorized post-IR implementation slice (likely camera exposure/focus learnings → limited code under CHANGE)
6. Packaging performance (streaming ZIP) before spatial payloads
7. Spec 003/005/006 implementation only under new CHANGEs

## Risk level

**High** if roadmap inverted; **Low** if gates honored.

## Recommended action

Pin this matrix in `PROJECT_STATE.md` and regenerate EKP after freeze.

## Priority

P0

## Confidence

High for repo facts; Medium for any device claims outside this host.

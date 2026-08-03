# CURRENT STATE

**Honest truth ledger.** No fluff, no future promises — runtime and documentation reality tied to a specific `main` tip.

```text
source_main_baseline_sha     = 1c03663e42fee02ac206d77c7d4e8fbfded99b3c
state_change_pr              = 56
state_change_status          = PROPOSED_IN_DRAFT_PR
updated_at                   = 2026-08-03T11:01:00Z
maintained_by                = Industrial Phase 3 maintainers (PR #56 draft)
update_trigger               = DRAFT_PR_EVIDENCE_PROPOSED
```

Update this file only when a subsystem’s maturity **actually** changes via merged evidence — not when a roadmap slides.

---

## Reality check (split readiness)

```text
MANUAL_STAGE_1_EVIDENCE_PILOT              = AUTHORIZED
CAPTURE_APP_VALIDATED_STAGE_1_EXECUTION    = PENDING_MAC_XCODEBUILD_AND_DEVICE_GATE
READY_FOR_COMPLETE_DIGITAL_TWIN            = NO
```

### Pilot identities (do not collapse)

```text
vehicle_id             = VEH-000001
pilot_id               = PILOT-000001
pilot_classification   = VEHICLE_REFERENCE_PILOT
current_stage          = STAGE_1_EVIDENCE_ONLY
```

Manual Stage 1 evidence collection on `VEH-000001` under `PILOT-000001` is authorized.  
Capture-app–validated Stage 1 execution remains pending Mac `xcodebuild` and device gates.  
Do **not** market or document a “complete engineering digital twin.”

---

## Subsystem ledger

| Subsystem | Current reality | Blockers / notes |
|---|---|---|
| **Capture iOS** | Sprint 3.1 RGB/motion Foundation + Apple-gated adapters proposed (draft). Synthetic Sprint 3.0 proven on Linux. | Mac `xcodebuild` / physical device smoke remain `BLOCKED_HOST_CAPABILITY` on Linux agents. No ARKit/LiDAR yet. |
| **EDTS Kernel / Foundation** | Exact-vehicle **kernel validated and frozen** (`kernel_state: VALIDATED_AND_FROZEN`). **Active layer: L01 Exterior.** L01 research draft **complete** (`L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE`). | Source verification, physical acquisition, and geometry freeze **pending**. Not a verified engineering twin mesh. |
| **EAE / XREPO ingest** | EDTS EAE core ingestion validated; full executable EAE product surface still incomplete. Capture↔EDTS package importer / digest gates exist in-repo. | Treat as validated ingestion paths + gaps, not a finished engine product. |
| **Build Engine** | Bounded M10 Gate 05M-C3 foundation built under `engine/`. Platform 001 Build Package v0.1 = **`DRAFT_INCOMPLETE`**. | No approval / procurement / fabrication / energization claim. Open data still blocks completeness. |
| **Visible Progress (3D)** | Architectural / interactive prototype (`edts-visible-progress/`). | Real engineering GLB mesh **absent**. Provisional visual only (DT-D058). |
| **VIN resolver** | Creates configuration **candidates** from NHTSA vPIC. | Not geometry-verified twins. |
| **Reports (Dual PDF)** | Architecture/scaffold may land via separate PR; not assumed present on every `main` tip. | If absent, do not invent report outputs — see architecture docs when merged. |

---

## Build Engine phase pointer

Authoritative phase file: [`docs/status/CURRENT_PHASE.md`](docs/status/CURRENT_PHASE.md)

- Phase: **M10 (bounded) — Gate 05M-C3 Deterministic Rule Engine Foundation**  
- Platform 001 status: [`docs/status/PLATFORM_001_STATUS.md`](docs/status/PLATFORM_001_STATUS.md) → **DRAFT_INCOMPLETE**

---

## Capture delivery fact

Industrial does **not** host a live `apps/capture-ios/` tree. Authoritative Mac transfer is via:

- `transfer/capture-ios-mac-handoff/`
- Root **versioned** `DOWNLOAD-elektron-capture-ios-*.zip` (+ `.sha256` where present)

Do **not** call any mutable `elektron-capture-ios-latest.zip` (or similar “latest” alias) authoritative.

Capture outputs are **sealed, hash-bound evidence packages**. Digests verify content identity; custody/repository controls enforce immutability. Do not imply signatures, attestations, authorship proofs, or non-repudiation.

---

## What “done” is *not*

| Phrase | Status |
|---|---|
| Complete Engineering Digital Twin | **NO** |
| Capture-app validated Stage 1 execution | **PENDING_MAC_XCODEBUILD_AND_DEVICE_GATE** |
| L01 geometry freeze | **NOT_YET_APPROVED** |
| Platform 001 approved for build | **NO** (`DRAFT_INCOMPLETE`) |
| Visible Progress = engineering truth | **NO** |

---

## Next honest move

Execute **manual Stage 1** of [`Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md`](Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md) for `VEH-000001` / `PILOT-000001`: photos + metadata + digests under custody. Keep Capture-app validated execution gated until Mac/`xcodebuild` + device proof close.

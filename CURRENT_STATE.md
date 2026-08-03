# CURRENT STATE

**Honest truth ledger.** No fluff, no future promises — runtime and documentation reality as of the latest `main` tip reflected in this checkout.

Update this file when a subsystem’s maturity **actually** changes (merge + evidence), not when a roadmap slides.

---

## Reality check

```text
READY_FOR_ONE_VEHICLE_REFERENCE_PILOT  = YES
READY_FOR_COMPLETE_DIGITAL_TWIN        = NO
```

Proceed with **VEHICLE_001_REFERENCE_PILOT Stage 1 (Evidence-Only)**.  
Do **not** market or document a “complete engineering digital twin.”

---

## Subsystem ledger

| Subsystem | Current reality | Blockers / notes |
|---|---|---|
| **Capture iOS** | Multi-sprint handoffs landed in Industrial (`transfer/` + `DOWNLOAD-*.zip`). Inspection/session work through Sprint 2.x delivered as Mac packages. | Physical Mac `xcodebuild` / device retest gates still pending for several candidates. Phase 3 spatial coding **not** authorized until Sprint 2.3 Mac gate + charter/ADR gates. |
| **EDTS Kernel / Foundation** | Layer-governed docs live; **L00 Reference Lock** + evidence acquisition framing. | Geometry acquisition / engineering mesh **pending**. Not a verified twin. |
| **EAE / XREPO ingest** | Capture↔EDTS package importer / digest gates exist in-repo (XREPO work merged historically). | Full “Evidence Acquisition Engine” product surface incomplete; treat as validated ingestion paths + gaps, not a finished engine product. |
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
- Root `DOWNLOAD-elektron-capture-ios-*.zip` (+ `.sha256` where present)
- Alias caution: `elektron-capture-ios-latest.zip` is **mutable** — prefer versioned `DOWNLOAD-*` digests

---

## What “done” is *not*

| Phrase | Status |
|---|---|
| Complete Engineering Digital Twin | **NO** |
| Phase 1 frozen in authoritative Capture git | **Not claimed here** |
| Platform 001 approved for build | **NO** (`DRAFT_INCOMPLETE`) |
| Visible Progress = engineering truth | **NO** |

---

## Next honest move

Run **Stage 1** of [`Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md`](Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md): photos + metadata + SHA-256 on one physical vehicle. Harden doctrine with real evidence before Stages 2–5.

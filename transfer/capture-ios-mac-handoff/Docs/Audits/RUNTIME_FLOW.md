<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# RUNTIME_FLOW

## Executive summary

Only one end-to-end runtime exists: **Phase 1 still capture**. Below is the call graph from audited tip `b5fe020`. No ARKit/LiDAR/quality-policy/telemetry-actor runtime flow exists.

## Evidence — Phase 1 call graph

```text
Phase1StillCaptureApp
  └─ Phase1MainTabView
       ├─ Capture tab → Phase1CaptureRootView
       │    .task → model.bootstrap()
       │    controller.prepareSession() → AVCaptureSession (rear wide)
       │    Take Photo → capturePendingStill()
       │         └─ photoOutput.capturePhoto
       │              └─ fileDataRepresentation
       │                   └─ PendingStillCapture.freezeFromDelegateBytes (bytes + SHA)
       │    Review UI decodes throwaway UIImage (does not replace frozen bytes)
       │    Use Photo → EvidenceLibraryStore.storeApproved (staging, rehash)
       │    Export → Phase1CaptureCoordinator.exportApproved
       │         ├─ verify approved hash invariance
       │         └─ EvidencePackageBuilder.build
       │              ├─ write JPEG exact bytes
       │              ├─ EvidenceManifestBuilder
       │              ├─ calibration / motion sidecars (unavailable placeholders)
       │              ├─ PackageInventoryBuilder (SHA per file)
       │              ├─ CaptureSidePackageValidator
       │              └─ ZipPackageWriter → .edts-pkg
       │                   └─ PackageTransportShareSupport → share sheet
       └─ Evidence Library tab → EvidenceLibraryViews
            └─ EvidenceLibraryStore.reconcileOnLaunch / rebuild orphans
```

### Session lifecycle (Phase1)

| Stage | Behavior |
|---|---|
| Discovery | Fixed rear wide camera configure — not Spec 004 discovery |
| Capture | Single still photo |
| Metadata | Manifest + provenance + clock |
| Telemetry | Motion unavailable record |
| Validation | Inventory + manifest validators |
| Packaging | `.edts-pkg` ZIP transport |
| Library | Actor store with integrity checks |

## Findings

1. Hash-freeze-before-UI-decode is a critical invariant — preserve.
2. Export path is coordinator-centric — prefer extending builder, not parallel exporters.
3. No runtime path for Specs 3–6.

## Risk level

Low for Phase1 flow correctness (unit-tested); High if device path diverges (not verified here).

## Recommended action

Keep this diagram updated in CAPTURE_IMPLEMENTATION_HANDOFF; add device-traced sequence after Mac validation.

## Priority

P1 documentation hygiene; P0 preserve invariants during UX merge.

## Confidence

High (code trace); Medium (device timing/black-frame).

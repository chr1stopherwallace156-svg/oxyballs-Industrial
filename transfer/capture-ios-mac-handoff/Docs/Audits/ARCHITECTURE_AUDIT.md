<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# ARCHITECTURE_AUDIT

## Executive summary

Compiled architecture is a **single SPM target** (`ElektronCapture` → `App/`) with informal layers (Domain → Application/Phase1/Capture → Apps shell). Intended v2 architecture (sensor actors, quality engines, spatial stack) exists only as **excluded README scaffolding**. No circular dependency between Domain and Phase1 was found. Dead architecture risk is **cognitive**: empty folders look like features.

## Evidence

| Item | Path / fact |
|---|---|
| Product | `Package.swift` → library `ElektronCapture` |
| Excludes | UI, DepthCapture, Spatial, Motion, Calibration, Quality, SecureEnclave, AppAttest, ManifestSigner, LocalEvidenceStore, UploadQueue, Recovery |
| App shell | `Apps/Phase1StillCapture/*` imports package |
| Domain protocols | `App/Domain/Protocols/CaptureProtocols.swift` — Foundation-only |
| Phase1 coordinator | `App/Phase1/Phase1CaptureCoordinator.swift` |
| Intended docs | `ARCHITECTURE.md`, Specs 001–003 |

### Intended vs current

| Layer (intended) | Current state |
|---|---|
| Domain model (Spec 002) | Partial Phase-1 models only |
| Sensor framework (Spec 003) | Protocols + mocks; no production adapters |
| Capture runtime | Phase1 AVFoundation still path only |
| Spatial / ARKit | README excluded |
| Quality policy (Spec 006) | README excluded |
| Evidence / inventory | Production Phase1 |
| Provenance hardware | README + MockAttestationVerifier |
| Upload / recovery | README excluded |

### Dependency direction (compiled)

```text
Apps/Phase1StillCapture
        │ import ElektronCapture
        ▼
┌───────────────────────────────────────┐
│ ElektronCapture (single target)       │
│  Domain ◄── Application / Phase1      │
│  Domain ◄── Capture/AVFoundation      │
│  Phase1 ──► EvidenceLibrary / Export  │
└───────────────────────────────────────┘
```

Domain does **not** import Phase1 (layering OK). Circular SPM products: **none** (one product).

## Findings

1. **Single-target monolith** is acceptable for Phase 1; v2 should split only after baseline — do not invent multi-package layout prematurely.
2. **README folders are dead architecture** until IR/implementation directives — keep excluded.
3. **Legacy APIs** (`StillPhotoCaptureService`, `FileEvidenceExporter`) sit beside current coordinator path — cleanup candidates after freeze.
4. **Mock providers** in Domain protocols are test/dev affordances; ProductionConfigurationGuard rejects mocks in production env.

## Risk level

**Medium** — architectural confusion / accidental implementation into stub folders.

## Recommended action

- Document “compiled surface” explicitly in ARCHITECTURE.md (point to Package.swift excludes).
- After baseline, introduce Spec 003 adapters as new types behind protocols — **extend**, don’t rewrite coordinator spine.
- Quarantine or delete unused exporter/legacy camera path in a dedicated CHANGE.

## Priority

P1 (clarity) after P0 freeze; structural split P2+.

## Confidence

High

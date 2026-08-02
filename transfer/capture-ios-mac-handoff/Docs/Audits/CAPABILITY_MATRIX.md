<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# CAPABILITY_MATRIX

## Executive summary

This matrix grades **engineering readiness**, not marketing. Phase 1 packaging/evidence is the only area near ship-ready (pending freeze). V2 sensor/spatial/quality/telemetry capabilities are **documentation-only**.

Legend: `SHIP` ship-candidate · `REVIEW` ready for review · `IMPL` ready to implement after gates · `BLOCKED` · `DELETE` · `NEVER` do not rebuild · `EXTEND` extend existing

| Capability | State | Grade | Notes |
|---|---|---|---|
| Still photo capture (AV) | Runtime + unit tests | EXTEND / REVIEW | Device matrix pending |
| Preview + approve gate | Runtime + tests | EXTEND | UX polish on side branch |
| Evidence Library store | Runtime + strong tests | EXTEND | Actor + reconcile |
| Canonical JSON | Runtime + golden/cross tests | NEVER rewrite | Keep parity |
| Artifact SHA-256 | Streaming on Apple | EXTEND | Linux full-load fallback |
| Package inventory | Runtime + tests | EXTEND | |
| `.edts-pkg` ZIP export/share | Runtime + tests | EXTEND | Memory-heavy ZIP builder |
| Authority / anti Build-Engine claims | Runtime + tests | EXTEND | |
| Device provenance | Partial | IMPL | Profile IDs placeholders |
| Motion samples | Stub unavailable | IMPL after IR/spec | |
| Calibration intrinsics | Placeholder sidecar | BLOCKED on spatial IR | |
| Depth / LiDAR | README | BLOCKED Specs 7+ | |
| ARKit / pose / mesh / point cloud | README | BLOCKED Specs 7+ | |
| Spec 003 sensor adapters | Spec only | BLOCKED baseline+IR | |
| Spec 004 capability discovery | Spec draft | BLOCKED baseline | |
| Spec 005 telemetry | Spec draft | BLOCKED baseline | |
| Spec 006 quality scoring/retake | Spec draft | BLOCKED baseline | |
| Black-frame guard | Side branch only | REVIEW (Phase1) | Not Spec 006 |
| App Attest / Secure Enclave / seal | Mock / NOT_IMPLEMENTED | BLOCKED later phase | |
| Upload queue / recovery store | README | DELETE-or-defer folders | No code |
| Handoff two-stage pipeline | Implemented tooling | SHIP (process) | |
| EKP five-artifact memory | Implemented tooling | SHIP (process) | |
| IR-0001 spike | Scaffold | BLOCKED authorization | |
| Phase 1 freeze tag | Missing | BLOCKED Mac equivalence | |

## Findings

Ship/process tooling is ahead of v2 product code. Spatial folders must not be treated as capabilities.

## Risk level

Medium (planning errors)

## Recommended action

Use this matrix in weekly status; update after freeze and each IR.

## Priority

P0 planning artifact

## Confidence

High

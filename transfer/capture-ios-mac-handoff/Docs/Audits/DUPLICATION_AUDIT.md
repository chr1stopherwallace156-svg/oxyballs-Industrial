<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# DUPLICATION_AUDIT

## Executive summary

Duplication is mostly **intentional packaging mirrors** (Handoff/, KNOWLEDGE_PACKAGE stubs) and a few **legacy parallel APIs** in code. No second competing Capture v2 runtime was found.

## Evidence

### Documentation mirrors (intentional)

| Primary | Mirror |
|---|---|
| `PROJECT_STATE.md` | `KNOWLEDGE_PACKAGE/CurrentStatus/PROJECT_STATE.md` |
| `CAPTURE_IMPLEMENTATION_HANDOFF.md` | `KNOWLEDGE_PACKAGE/CurrentStatus/...` |
| `Docs/Changes/*` | `Handoff/Docs/Changes/*` |
| `Specifications/*` | `Handoff/Specifications/*` |
| Root `CHANGELOG.md` | `Handoff/CHANGELOG.md` |

### Code / API duplication

| Items | Assessment |
|---|---|
| `CanonicalJSON` (Application) vs `CanonicalJSONEncoder` (Phase1) | Encoder wraps/uses canonical pipeline — consolidate docs ownership |
| `FileEvidenceExporter` vs `EvidencePackageBuilder` | Parallel export abstraction; builder is live path |
| `StillPhotoCaptureService` vs interactive camera controller | Legacy/tests vs app |
| Domain mock providers vs Phase1 services | Expected until Spec 003 adapters |
| Spec 006 vs CaptureImageQualityGuard (side branch) | **Different concerns** — do not merge concepts |

### Duplicate abstractions to avoid creating

- Second evidence package format beside `.edts-pkg`
- Parallel “v2 coordinator” beside `Phase1CaptureCoordinator` before migration plan
- New quality engine folders under `App/Quality` without CHANGE

## Findings

1. Mirror drift is the main duplication risk — mitigate with `make handoff-prepare` / `ekp-prepare`.
2. Delete/merge legacy exporter only with test updates.

## Risk level

Low–Medium

## Recommended action

Document “one live export path” in ARCHITECTURE; keep mirrors generated.

## Priority

P2

## Confidence

High

<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# SPEC_TRACEABILITY

## Executive summary

**Authoritative IDs** are those in `Specifications/README.md` (EC-V2-SPEC-001…006). Specs 1–6 are drafted with correction pass applied; **baseline not approved**. Production code implements **Phase 1 evidence packaging**, which partially overlaps Spec 001/002 concepts, but **does not implement Specs 003–006**. Specs 7–10 (spatial/external) are pending. IR-0001 is research scaffold only.

## Evidence — governing specs

| ID | Document | Gate status | Production code |
|---|---|---|---|
| EC-V2-SPEC-001 | `ELEKTRON_CAPTURE_V2_SPEC.md` | Hardened; baseline pending | Phase 1 partial overlap only |
| EC-V2-SPEC-002 | `CAPTURE_V2_DOMAIN_MODEL.md` | Hardened; baseline pending | Phase1 domain models (subset) |
| EC-V2-SPEC-003 | `CAPTURE_SENSOR_FRAMEWORK.md` | Hardened; baseline pending | Protocols/mocks only |
| EC-V2-SPEC-004 | `CAPTURE_DEVICE_CAPABILITY_MATRIX.md` | `DRAFT_FOR_BASELINE_REVIEW` | None |
| EC-V2-SPEC-005 | `CAPTURE_TELEMETRY_CONTRACT.md` | `DRAFT_FOR_BASELINE_REVIEW` | None (motion sidecar unavailable) |
| EC-V2-SPEC-006 | `CAPTURE_QUALITY_POLICY.md` | `DRAFT_FOR_BASELINE_REVIEW` | None (`App/Quality` excluded) |
| 7–10 | Spatial / external | Pending / template | README stubs |

Cross-spec: `V2_SPECS_1_TO_6_CONSISTENCY_REVIEW.md` (PASS with corrections applied), `V2_CROSS_SPEC_ENTITY_STATE_REGISTRY.md`.

## Requirement-by-requirement (summary)

### Spec 001 — Constitution

| Theme | Spec | Code | Trace |
|---|---|---|---|
| Evidence package integrity | Required | `EvidencePackageBuilder`, inventory, hashes | Partial Phase1 |
| Authority boundaries | Required | `AuthorityGuard`, `EvidenceAuthority` | Present |
| Depth / poses / mesh | Required for v2 | Manifest placeholders; no capture | Missing |
| No Build Engine claims | Required | `CaptureError` forbidden claims | Present |

### Spec 002 — Domain model

| Entity | Spec | Code |
|---|---|---|
| Capture session | Yes | `LocalCaptureSession`, `CaptureSessionState` |
| Evidence artifacts | Yes | Phase1 artifact types |
| Sensor identity / capability | Yes | Provenance device IDs; no Spec004 matrix runtime |
| Quality verdict | Yes | Not implemented |

### Spec 003 — Sensor framework

| Requirement | Status |
|---|---|
| `EvidenceSensor` actors | Spec illustrative only; no production actors |
| Adapter contracts | Domain protocols exist; no real adapters beyond AV still camera |
| Sync / versioning / provenance | Docs; Phase1 device provenance only |

### Spec 004 — Capability matrix

| Requirement | Status |
|---|---|
| Device capability discovery | Documentation only |
| Runtime gating by capability | Not implemented |

### Spec 005 — Telemetry

| Requirement | Status |
|---|---|
| `TelemetryRecord` contract | Spec only (`Production code: None`) |
| Motion/orientation samples | Sidecar written as unavailable |

### Spec 006 — Quality policy

| Requirement | Status |
|---|---|
| Blur / exposure / motion / coverage | Spec only |
| Retake thresholds | Spec only |
| Black-frame guard | **Not on audited tip**; exists on `professional-capture-ux` / `lifecycle-blackframe` as Phase1 UX aid — **not** Spec 006 |

## Code with no governing v2 spec

Phase 1 Evidence Library, Pass2 preview/share gates, two-stage handoff/EKP tooling are governed by **Phase 1 / governance docs**, not Specs 004–006. That is acceptable if labeled Phase 1.

## Conflicting specifications

| Conflict | Resolution in repo |
|---|---|
| External prompts remapping Spec 001 as “capability” | **Ignore** — use `Specifications/README.md` IDs |
| Historical COMPLETE language | Retracted in CHANGELOG / PHASE_1C_FINAL_VALIDATION |
| Specs README still mentions older branch role for Commit B | Stale branch name risk — tip is now EKP lineage |

## Findings

1. Traceability is **docs → docs** strong; **docs → code** weak for Specs 3–6.
2. Do not invent Spec 006 implementation from black-frame guard — different concern.
3. Baseline approval is the gate that turns specs into build authority.

## Risk level

**High** if someone codes to unapproved Specs 4–6 drafts as if frozen.

## Recommended action

- Complete final architectural review → `CHANGE-0003` only after approval.
- Maintain this matrix after each IR / implementation CHANGE.

## Priority

P0 for baseline; implementation tracing P1 after IR-0001.

## Confidence

High

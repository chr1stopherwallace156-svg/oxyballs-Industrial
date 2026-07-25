# ELEKTRON CAPTURE V2 — SYSTEM SPECIFICATION (CONSTITUTION)

| Field | Value |
|---|---|
| Document ID | EC-V2-SPEC-001 |
| Status | **V2_CORE_SPECS_1_TO_3_HARDENED** |
| Specs 4–6 | `V2_SPECIFICATIONS_4_TO_6_DRAFTED` + correction pass applied |
| Gate | `BASELINE_APPROVAL_PENDING_CORRECTION_PASS` / pending final sign-off |
| Depends on | Phase 1A/1C contracts in tree; freeze tag `v1.0.0-phase1c` when authoritative |
| Next | Final baseline sign-off → `AUTHORIZED_FOR_IR_0001_EXECUTION` |

## 1. Mission Statement

Elektron Capture v2 is a multi-sensor, calibrated evidence instrument designed to **record, measure, organize, validate, synchronize, and verify** physical vehicle evidence.

## 2. Governing Rule

Capture v2 records, measures, organizes, validates, synchronizes, and verifies physical evidence.

It does **NOT**:

- infer component identity via learned models, heuristics, or neural nets
- diagnose vehicle condition or assess damage via ML / Core ML
- make automated pass/fail conclusions from computer vision
- alter capture parameters dynamically based on learned classification

**Prohibition on learned interpretation:** No Core ML model, heuristic classifier, or neural net inside Capture v2 production paths may infer component identity, assess damage, or change capture parameters from learned labels. ML / YOLO / automated interpretation live only under `Research/Deferred/` with **no production interfaces**.

**Semantic mattes:** Platform may expose semantic segmentation matte capability (`SEMANTIC_MATTE_CAPABILITY_DETECTED_BUT_PRODUCTION_USE_PROHIBITED`). Production workflows must not request, consume, package, or use semantic mattes while this prohibition remains active (Spec 4).

## 3. Explicit Compatibility Clause (Phase 1)

Capture v2 may extend Phase 1 packages **only** through versioned, backward-compatible contracts.

It may **not** silently:

- reinterpret Phase 1A/1C field meanings
- rename or remove Phase 1A/1C fields
- mutate frozen RAW bytes or inventory self-hash omit policy
- break Canonical Identity path keys

Any intentional contract change requires a versioned ADR and package-format bump.

## 4. Scope Boundaries

### In scope

- Professional optics controls and hardware capability discovery
- Inspection session & guided sequence workflows
- Non-destructive evidence supersession (retakes)
- Layered quality outcomes (capture / point / session / export — Spec 6)
- Multi-sensor telemetry sync on a precision timebase taxonomy (see Sensor Framework)
- Depth maps, \(K\)-matrix intrinsics, 6DoF camera poses as **reconstruction inputs**
- Verifiable evidence packaging extending Phase 1 `.edts-pkg` without silent drift

### Out of scope (deferred)

- Core ML inference, YOLO, component recognition
- Defect diagnosis / learned capture decisions
- Production on-device 3D **mesh** generation or dense surface reconstruction in-process

### Reconstruction-input boundary

Capture v2 is strictly an evidence **capture and validation** engine. It may output structured point clouds, poses, and depth images as **raw, structured reconstruction inputs**. It **never** generates production 3D meshes or executes dense surface reconstructions in-process.

## 5. Master Architecture

```text
                    CAPTURE SESSION COORDINATOR
                               │
          ┌────────────────────┴────────────────────┐
          ▼                                         ▼
   SENSOR FRAMEWORK                          WORKFLOW ENGINE
   (EvidenceSensor / actors)                 (InspectionSession)
          │                                         │
          └────────────────────┬────────────────────┘
                               ▼
                    EVIDENCE PACKAGING ENGINE
                    • Precision timebase + clockAnchor
                    • Quality & calibration checks
                    • Processing class + lineage (SENSOR_REPORTED / FUSED / DERIVED)
                    • Session & artifact hashing
                               ▼
                      VERIFIED .edts-pkg
```

## 6. Pillar Architecture

1. **Professional Camera** — capability discovery, manual locks, interruption handling  
2. **Engineering Capture** — session/vehicle hierarchy, guided sequences, retakes  
3. **Evidence Quality & Telemetry** — deterministic checks, CoreMotion & sensor telemetry  
4. **Spatial Capture Foundation** — depth, intrinsics, poses (no production mesh)

External thermal hardware uses `ThermalDeviceAdapter` / `EvidenceSensor` — never mixed into AVFoundation capture internals. Thermal staging in **v2.0E** is the approved roadmap side-track.

## 7. Evidence Processing Classes

Do **not** assume framework-delivered sensor values are “uncalibrated RAW.” Classify every stream:

| Class | Meaning |
|---|---|
| **`SENSOR_REPORTED`** | Values as reported by the sensor/API at the declared `sourceAPI`, with processing declaration recorded |
| **`FRAMEWORK_FUSED`** | OS/framework-fused outputs (e.g. device-motion attitude) |
| **`CAPTURE_DERIVED`** | Computed inside Capture from declared inputs + pipeline version |
| **`EXTERNAL_DERIVED`** | Computed by an external tool/pipeline from Capture outputs |

Immutable package payloads (JPEG bytes, depth buffers, telemetry files) remain write-once and hashed. Derived/fused classes **must** preserve input lineage, `sourceAPI`, and processor/pipeline version. They are never a substitute identity for their inputs.

Legacy labels `RAW_EVIDENCE` / `DERIVED_EVIDENCE` map to: immutable hashed payloads vs regenerable derived products — refined by the processing class above.

## 8. Quality Outcome Layers (authoritative detail: Spec 6)

Capture decisions, point completeness, session completeness, and export policy are **distinct**:

| Layer | Outcomes (summary) | Owner |
|---|---|---|
| Capture-level | `PASS` · `WARN` · `BLOCK_CAPTURE` | Spec 6 §3.1 |
| Capture-point completeness | `POINT_COMPLETE` · `POINT_COMPLETE_WITH_WARNINGS` · `POINT_INCOMPLETE` | Spec 6 §3.2 |
| Session-level | `COMPLETE` · `COMPLETE_WITH_WARNINGS` · `INCOMPLETE` | Spec 6 §3.3 |
| Export-level | `EXPORT_ALLOWED` · `EXPORT_ALLOWED_WITH_WARNINGS` · `BLOCK_EXPORT` | Spec 6 §3.4 |

`BLOCK_EXPORT` is an **export-policy decision**, not a session lifecycle state.

### Rollout ladder (enforcement maturity)

`OBSERVE_ONLY` → `WARN_ONLY` → `BLOCK_ELIGIBLE` → `BLOCK_ACTIVE`

Sharpness and related scores are **versioned, resolution-normalized deterministic metrics** — not learned scores. Learned models must not produce enforcement decisions.

## 9. Implementation Stages

| Stage | Focus |
|---|---|
| **v2.0A** | Camera controls, capability discovery, core telemetry |
| **v2.0B** | Inspection sessions and guided workflows |
| **v2.0C** | Deterministic quality metrics and staged policy enforcement |
| **v2.0D** | Spatial evidence (depth, poses, intrinsics) as reconstruction inputs |
| **v2.0E** | External sensor adapter architecture (thermal side-track) |

Thermal impact remains **`UNMEASURED`** until profiled in Integration Reports. Do not claim reduced thermal load or “direct hardware register locking” without measured IR evidence.

## 10. Phase 1 Freeze Compatibility

Phase 1A package layout, canonical JSON, hashing, inventory self-hash omit, and Canonical Identity path keys remain authoritative until a versioned ADR changes them. Declaring Phase 1 **frozen** still requires the checklist in `Docs/Capture/PHASE_1C_FINAL_VALIDATION.md`.

Production v2 actor/camera modules must not land until Specs 1–6 are `BASELINE_APPROVED`, IR-0001 is executed as an isolated spike with measured results, and an implementation directive is issued. **Do not** treat drafts as baseline-approved while `BASELINE_APPROVAL_PENDING_CORRECTION_PASS` remains.

## 11. Acceptance Gates (v2 stages)

Each stage requires: approved Integration Report(s), spec sections marked READY, unit tests for new contracts, and Mac/device evidence where hardware-dependent.

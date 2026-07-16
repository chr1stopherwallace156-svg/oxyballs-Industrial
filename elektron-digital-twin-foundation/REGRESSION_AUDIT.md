# REGRESSION_AUDIT.md — Executable-Validation Audit

## Status

**COMPLETE (specification layer) — Runtime execution PENDING**

Addresses prior iteration errors, corrects mathematics, and restores modular data structures without fabricating executed test results.

---

## 1. Transform Quaternion Refactoring

Resolved axis-mapping error **TF-FAIL-001** by correcting the ISO-to-glTF quaternion from `[0.5, 0.5, 0.5, 0.5]` to `[-0.5, 0.5, 0.5, 0.5]`.

Artifacts:

- `TRANSFORM_QUATERNION_CORRECTION_REPORT.md`
- `verification/known_failures/TF-FAIL-001_QUATERNION_MATRIX_MISMATCH.md`
- `registries/TRANSFORM_REGISTRY_V4_PROPOSAL.json`

---

## 2. Uncoupling Three.js Presentation

Split runtime presentation from canonical physical coordinates:

- `THREE_WORLD_FRAME` preserves glTF asset coordinates (identity edge)
- Camera posing uses `CAMERA_VIEW_PRESET_REGISTRY.json`
- `THREE_CAMERA_AND_WORLD_STANDARD.md` supersedes corrective root-transform approach

---

## 3. Restoring Modular Claim Schemas

Restored metadata, provenance, uncertainty, and related properties as modular `$ref` schemas under `schemas/claim/`, rooted at `schemas/CLAIM_SCHEMA_ROOT_V6_PROPOSAL.json`.

---

## 4. Restoring Physical Intake Records

Restored field-ingestion detail in `schemas/PHYSICAL_ASSET_INTAKE_SCHEMA_V4_PROPOSAL.json`:

- Instrument calibration and uncertainty
- Ambient temperature
- Six DRW tire pressure stages (placard / as-found / adjusted)

---

## 5. Measurement Tolerances as Provisional

Measurement class limits are reclassified as **provisional targets** pending equipment-specific uncertainty budgets (`PROVISIONAL_TARGET_A` through `D` in claim uncertainty schema).

---

## 6. Non-Fabrication Rule

Transform validation status remains `NOT_EXECUTED` until a real test runner produces results. Offline quaternion-matrix checks are recorded separately and do not constitute runtime certification.

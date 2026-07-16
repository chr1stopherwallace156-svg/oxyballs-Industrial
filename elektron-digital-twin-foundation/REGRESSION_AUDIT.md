# REGRESSION_AUDIT.md — Executable-Validation Audit

## Status

**COMPLETE (specification layer) — Runtime execution PENDING**

Addresses past structural regressions without fabricating executable proof.

---

## 1. Transform Quaternion Correction

Closed historical debug trace `TF-FAIL-001`. Established matrix equivalence using verified quaternion `[-0.5, 0.5, 0.5, 0.5]`. Incorrect derivation archived only in known-failures history.

---

## 2. Dynamic Camera View Preset Restructuring

Replaced absolute viewport coordinates with parametric distance scaling relative to bounding dimensions (`CAMERA_VIEW_PRESET_REGISTRY.json` v1.1.0).

---

## 3. Restoring Claim Types and Value Formats

Re-established scalable claim types (`schemas/claim/claim-types.schema.json`) and extended value formats (`schemas/claim/value.schema.json`) via `$ref`.

---

## 4. Conditional Ingestion Schema Rules

Structured conditional VIN availability using JSON Schema `oneOf` blocks in intake V4.

---

## 5. Reconstituting Safety Certification Metadata

Re-inserted axle loads, spring codes, and related fields as evidence-bound objects mapped to photo attachments.

---

## 6. SI Base Dimensions

Unit registry V3 Core uses SI base dimensions with **electric current (A)**, not electrical charge as a base dimension. Charge is a derived dimension (`A * s`).

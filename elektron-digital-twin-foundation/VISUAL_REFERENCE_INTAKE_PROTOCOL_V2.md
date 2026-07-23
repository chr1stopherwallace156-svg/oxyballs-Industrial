# VISUAL_REFERENCE_INTAKE_PROTOCOL_V2.md — Layer 1 Visual Capture Guidelines

## Status

**AUTHORIZED — Supersedes `VISUAL_REFERENCE_INTAKE_PROTOCOL.md` for operational guidance**

Establishes general guidelines to collect high-quality external visual assets (Layer 1) without imposing rigid hardware specifications that may conflict with manufacturer runtime requirements.

**Readiness:** `L00_VISUAL_INTAKE_ONLY_READY`

---

## 1. Optical Capture Guidelines

- **Equipment recommendations:** A digital SLR or mirrorless camera with prime lenses (such as 35 mm or 50 mm focal lengths) is recommended as a baseline starting point to simplify radial and tangential optical distortion corrections.
- **Perspective distortions:** Perspective scaling remains a function of spatial distance and camera position relative to the subject. Standard lens calibration profiles must be applied during downstream photogrammetry processing to isolate and correct lens-specific aberrations.

---

## 2. Handheld Scanning Guidelines

- **Averaging target parameters:** A handheld structured-light or laser scanner targeting a maximum permitted measurement uncertainty of +/- 1.0 mm is recommended to map exterior sheet-metal contours.
- **Operational tolerances:** Scanning overlaps, working distances, target distribution, and ambient light sensitivities must adapt to the equipment manufacturer's specifications. A nominal 60% frame overlap and 400 mm distance may serve as general guidelines, but must be overridden by sensor-specific runtime requirements.

---

## 3. Coordinate Export

Visual assets authored for packaging must use `GLTF_ASSET_FRAME` via `TF-ISO-TO-GLTF-ASSET`. Three.js scene placement uses `TF-ISO-TO-THREE-SCENE`. See:

- `GLTF_FRAME_CORRECTION.md`
- `THREE_RUNTIME_FRAME_STANDARD_PROPOSAL.md`
- `registries/TRANSFORM_REGISTRY_V3_PROPOSAL.json`

---

## 4. Related Documents

- `VIN_AND_LABEL_CAPTURE_PROTOCOL.md` — label and VIN capture
- `schemas/PHYSICAL_ASSET_INTAKE_SCHEMA_V3_PROPOSAL.json` — intake record with DRW tire pressures
- `DATUM_STATE_MODEL_PROPOSAL.md` — DTM-SUP-001 as-supported datum

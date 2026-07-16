# VISUAL_REFERENCE_INTAKE_PROTOCOL.md — Layer 1 Visual Capture

## Status

**AUTHORIZED — Low-cost target gate for Layer 1 exterior model**

The visual-reference protocol defines the lower-cost, rapid data capture path used to build external visual models (Layer 1) without requiring aerospace-grade metrology.

**Readiness gate:** `L00_READY_FOR_VISUAL_REFERENCE_INTAKE`

Conformance class: MAC-C / Class C (see `MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md`).

---

## 1. Equipment Requirements

| Equipment | Specification |
|---|---|
| Scanner | Commercial handheld structured-light scanner (precision greater than or equal to +/- 1.0 mm over a 5.0 m bounding volume) |
| Camera | DSLR or mirrorless camera (minimum 24 megapixels) with prime lens (35 mm or 50 mm) to minimize barrel distortion |
| Targets | Adhesive photogrammetry and scanning targets |

---

## 2. Operational Procedure

### Step 1: Prepare Environment and Target Setup

**Duration:** 10 minutes

Park the vehicle in a clean, indoor bay with diffuse lighting to avoid harsh reflections on paint and glass. Apply high-contrast physical target dots on non-reflective areas of the body panels, cab, and rear frame to provide tracking markers for the scanner.

### Step 2: Perform External Geometry Scan

**Duration:** 25 minutes

Begin scanning at the front fascia, maintaining a consistent working distance of approximately 400 millimeters. Scan in continuous loops to capture the grille, hood, cab panels, glass surfaces, door gaps, side mirrors, and wheels. Ensure a minimum 60% scan frame overlap.

### Step 3: Capture Photographic Color Calibration

**Duration:** 15 minutes

Take a standard 360-degree series of color-neutral photos around the truck. Include an 18% neutral-gray card in reference shots to calibrate white balance and lighting intensity during texture processing. Capture detailed close-ups of all trim interfaces, lights, and step-bars.

---

## Related Documents

- `DATUM_STATE_MODEL_PROPOSAL.md` — DTM-SUP-001 as-supported datum
- `schemas/PHYSICAL_ASSET_INTAKE_SCHEMA_V2_PROPOSAL.json` — intake record with evidence attachments
- `VIN_AND_LABEL_CAPTURE_PROTOCOL.md` — label and VIN capture (execute before or in parallel)

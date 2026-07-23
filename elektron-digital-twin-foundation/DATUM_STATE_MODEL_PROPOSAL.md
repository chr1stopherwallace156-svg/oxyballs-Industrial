# DATUM_STATE_MODEL_PROPOSAL.md — Datum Class Hierarchy

## Status

**PROPOSAL**

This model resolves physical state conflicts by establishing distinct, mathematically related coordinate datums for different measurement conditions.

See also: [DATUM_CONSTRUCTION_STANDARD.md](DATUM_CONSTRUCTION_STANDARD.md), [registries/COORDINATE_FRAME_REGISTRY.json](registries/COORDINATE_FRAME_REGISTRY.json).

---

## Datum Class Hierarchy

```
       [DESIGN_DATUM] (DTM-DSN)
              |
              v (Deflections and loading models)
      [AS-SUPPORTED_DATUM] (DTM-SUP) <--- (Transformation) ---> [METROLOGY_FIXTURE_DATUM] (DTM-FIX)
              |
              v (Spindle rotations and kinematic constraints)
     [KINEMATIC_AXLE_DATUM] (DTM-KIN)
```

---

## DTM-DSN-001: Design Datum

| Field | Value |
|---|---|
| Physical state | Vehicle mathematically perfect; nominal CAD coordinates; unladen design state; infinite rigidity assumptions |
| Application | Primary CAD assembly layout and clearance analysis |
| Frame reference | `EDTS_ISO_ALIGNED_VEHICLE_FRAME` |

---

## DTM-SUP-001: As-Supported Intake Datum

| Field | Value |
|---|---|
| Physical state | Vehicle parked on flat surface plates; supported by inflated tires under static loading |
| Application | Standard external visual scans, ground clearance measurements, label documentation |
| Frame reference | `GLTF_RUNTIME_FRAME`, `UNREAL_FRAME` (runtime export origins) |
| Protocol | `VISUAL_REFERENCE_INTAKE_PROTOCOL.md`, `VIN_AND_LABEL_CAPTURE_PROTOCOL.md` |

---

## DTM-FIX-001: Metrology Fixture Datum

| Field | Value |
|---|---|
| Physical state | Vehicle hoisted on rigid frame jacks; wheels removed; chassis rails clamped to leveling jacks |
| Application | High-accuracy chassis hardpoint metrology; scan-to-CAD alignment of frame elements |
| Protocol | `ENGINEERING_METROLOGY_INTAKE_PROTOCOL.md` |

---

## DTM-KIN-001: Kinematic Axle Datum

| Field | Value |
|---|---|
| Physical state | Wheel spindle centers measured dynamically across suspension travel range (bump to rebound) |
| Application | Suspension geometry verification; dynamic wheel clearance packaging calculations |

---

## Legacy Datum ID Mapping

| Legacy ID | New ID | Notes |
|---|---|---|
| DTM-001 | DTM-DSN-001 | Design primary origin |
| DTM-002 | DTM-KIN-001 | Front axle centerline (kinematic) |
| DTM-003 | DTM-FIX-001 | Frame baseline (fixture state) |
| DTM-004 | Per-session | Metrology control point in `SCAN_RAW_FRAME` |

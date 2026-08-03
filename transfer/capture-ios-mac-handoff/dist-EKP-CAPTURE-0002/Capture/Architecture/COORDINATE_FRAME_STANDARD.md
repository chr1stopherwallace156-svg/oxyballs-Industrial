# COORDINATE_FRAME_STANDARD.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | All poses and transforms |
| Supersedes | (none) |

## Frames (minimum)

| Frame ID | Description |
|---|---|
| `arkit_world` | ARKit world tracking frame |
| `camera` | Optical camera frame at capture |
| `device` | Device/body frame |
| `vehicle` | Vehicle body frame (EDTS-aligned when known) |
| `component` | Component instance frame |
| `measurement` | Measurement instrument frame |
| `cad` | Design CAD frame |
| `reconstruction` | Photogrammetry / recon frame |
| `edts_canonical` | EDTS system canonical |

## Transform record requirements

Every pose/vector must specify: `source_frame`, `target_frame`, transform convention, `matrix_layout` (`column_major` | `row_major`), unit, axis orientation, `handedness`, timestamp + clock domain, confidence/uncertainty.

Never store an anonymous 4×4 without frame semantics.

```json
{
  "transform_id": "TRN-001",
  "source_frame": "camera",
  "target_frame": "arkit_world",
  "matrix_layout": "column_major",
  "handedness": "right_handed",
  "translation_unit": "meter",
  "timestamp": { "value": 123456.789, "clock_domain": "arkit_frame" },
  "authority": "GUIDANCE_ESTIMATE",
  "values": []
}
```

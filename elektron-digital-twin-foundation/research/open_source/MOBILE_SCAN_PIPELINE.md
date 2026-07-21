# MOBILE_SCAN_PIPELINE.md

**Pack:** EDTS Open-Source Maximum-Leverage Research Mission  
**Config lock:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Decision:** DT-D064  
**Scope:** Research architecture for iOS ARKit / LiDAR capture → `.edts-scan` package. **Not implemented this pass.**

---

## Capture data flow

```
[iPad Pro LiDAR / ARKit] ──► Synchronized Stream Capture
                                 ├── RGB Frame (.jpg, target 1920×1080)
                                 ├── Depth Map (.png, 16-bit mm)
                                 ├── Intrinsics Matrix K (3×3)
                                 └── Camera Pose T_world (4×4 SE(3))
                                         │
                                         ▼
                            [Local Calibration Filter]
                                 ├── AprilTag Scale Lock
                                 └── SOR Outlier Removal
                                         │
                                         ▼
                            [Export Package: .edts-scan]
```

---

## 1. Session archive schema

Every capture session is a self-contained archive:

```
scan_session_YYYYMMDD_NNN/
├── manifest.json
├── calibration.json
├── rgb/
│   ├── frame_00001.jpg
│   └── …
├── depth/
│   ├── frame_00001.png       # 16-bit grayscale, millimeters
│   └── …
├── poses/
│   ├── frame_00001.json      # 4×4 row-major SE(3)
│   └── …
└── pointcloud_raw.ply
```

### `manifest.json` (required keys)

| Key | Type | Notes |
|---|---|---|
| `session_id` | string | Unique per capture |
| `locked_configuration_target` | string | Must equal `CFG-2019-F450-REG-CAB-4X2-60CA-DRW` or quarantine |
| `vin` | string \| null | Present only after resolver pass |
| `device_model` | string | |
| `started_at_utc` | ISO-8601 | |
| `frame_count` | int | |
| `tracking_loss_events` | int | Soft gate input |
| `evidence_class_default` | string | `PROVISIONAL_ESTIMATE` until scale QA |

### `calibration.json` schema (illustrative)

```json
{
  "device_model": "iPad Pro 11-inch (4th Gen)",
  "sensor_type": "LiDAR + Wide Camera",
  "camera_intrinsics": {
    "fx": null,
    "fy": null,
    "cx": null,
    "cy": null,
    "distortion_coefficients": [0.0, 0.0, 0.0, 0.0, 0.0]
  },
  "fiducial_scale_targets": [
    {
      "tag_id": "AprilTag_36h11_ID01",
      "known_width_mm": 150.0,
      "tolerance_mm": 0.05,
      "location_description": "Front-Left Frame Rail Web"
    }
  ],
  "honesty": "Intrinsics/example numeric fields MUST be filled from device calibration — do not invent fx/fy."
}
```

**Honesty:** Example `fx=1452.18` style numbers in briefing materials are **not** locked device calibrations. Populate from ARKit/device calibration at capture time.

---

## 2. AprilTag scale-lock protocol

To constrain drift over the locked **145.3 in (3.69062 m)** wheelbase:

1. Print AprilTag **36h11** targets at **150.0 mm ± 0.05 mm** known width on stable substrate (prefer aluminum or calibrated board).
2. Place anchors per [`VEHICLE_SCAN_CAPTURE_PROTOCOL.md`](VEHICLE_SCAN_CAPTURE_PROTOCOL.md).
3. Detect corners via OpenCV `cv2.aruco` or `pupil_apriltags`.
4. Compute scale \( S = D_{\mathrm{true}} / D_{\mathrm{measured}} \) from tag width and/or inter-tag laser-tape benchmarks.
5. Apply uniform scale to cloud **before** Tier-2 ingest.
6. Record \( S \), residuals, and variances into evidence ledger (`PROVISIONAL_ESTIMATE` → promote only after QA).

### Suggested anchor roles (coordinate intent)

| Anchor | Intent |
|---|---|
| A — FL frame rail web | Origin / scale near front axle midline (aligns with SPEC-3D-001 front-axle CRS) |
| B — Rear axle leaf-spring hanger | WB-scale check toward rear axle |

**Do not** claim millimeter-accurate world origin until ICP + caliper QA pass ([`SCAN_REGISTRATION_AND_QA_SPEC.md`](SCAN_REGISTRATION_AND_QA_SPEC.md)).

---

## 3. Evidence authority

| Stage | Class |
|---|---|
| Raw ARKit cloud | `PROVISIONAL_ESTIMATE` |
| After AprilTag scale | `INSPECTION_GEOMETRY` (still unregistered) |
| After ICP + RMS gates | `METRIC_VERIFICATION` candidate |
| NeRF/splat derived from same RGB | `VISUALIZATION_ONLY` (parallel track only) |

---

## 4. Non-goals (this research pass)

- No iOS app code in-repo
- No `.edts-scan` binary samples
- No invented device intrinsics or measured scale factors for VEH-000001

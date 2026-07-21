# VEHICLE_SCAN_CAPTURE_PROTOCOL.md

**Pack:** EDTS Open-Source Maximum-Leverage Research Mission  
**SOP target:** Physical scanning of `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Decision:** DT-D064  
**Status:** Research SOP — field execution not claimed.

---

## Sweep path topology

```
Front Bumper [Marker 1] ───► Left Cab / Door [Marker 2]
       ▲                              │
       │                              ▼
Right Frame Rail ◄────────── Rear Axle DRW [Marker 3]
```

---

## 1. Environmental & vehicle preparation

| Step | Requirement |
|---|---|
| Staging | Flat, level concrete (≤ 0.5° slope target) |
| Safety | Disconnect battery ground strap per shop SOP before deep-bay work |
| Body state | Doors/cab closed for Loop 1; bare cab-and-chassis (no upfit body) |
| Lighting | Indirect diffuse ambient ~400–600 lux; avoid direct sun (LiDAR IR saturation) |
| Gloss prep | Temporary dulling spray on high-gloss Al/chrome (e.g. AESUB Transparent class — sublimates); matte contrast on black C-channel edges as needed |

Cross-check config before scan: VIN resolver + door jamb ([`VIN_CONFIGURATION_RESOLVER_SPEC.md`](VIN_CONFIGURATION_RESOLVER_SPEC.md)). **Quarantine** if not exact match.

---

## 2. Scale target deployment

Affix AprilTag **36h11** markers (IDs 01–06) along chassis:

| Tag ID | Placement |
|---|---|
| 01 | Front-left frame horn |
| 02 | Left B-pillar sill |
| 03 | Rear axle centerline reference |
| 04 | Rear frame crossmember |
| 05–06 | Optional rail mid-span / RH symmetry checks |

Known tag width: **150.0 mm ± 0.05 mm** (print QA required).

---

## 3. Capture loop sequence

### Loop 1 — Macro vehicle loop

Begin at Tag 01 → left cab → **60 in CA** zone → Dana M300-class rear DRW envelope → right frame rail → return to Tag 01 (close loop).

### Loop 2 — Chassis & frame rail focus

Hold device ~**0.75 m** from left rail. Sweep open C-channel web front bumper → rear overhang.

### Loop 3 — Front-left door aperture slice

Open FL door **90°**. Serpentine: outer skin → inner stamping → hinge pillar → lock striker interface.

---

## 4. Field quality gates

| Gate | Reject if |
|---|---|
| Tracking loss | ARKit tracking failure **> 2** times in a loop |
| Scale error | Tag 01↔Tag 03 distance vs caliper/laser tape deviation **> 5.0 mm** |
| Config | VIN/label not locked to target CFG |
| Completeness | Missing depth/pose sync for >N frames (define N in session manifest; default reject if >2% frames) |

Failed sessions: do **not** upload as `METRIC_VERIFICATION`. May retain as `VISUALIZATION_ONLY` RGB if useful.

---

## 5. Alignment with EDTS CRS (intent)

Post-process registration should target SPEC-3D-001 / LHD frame:

- +X forward, +Y up, +Z right  
- Front axle midline → world origin intent  
- Rear axle X ≈ −3.69062 m  

Field SOP does not invent that origin until registration QA passes.

---

## 6. Related

- Package schema: [`MOBILE_SCAN_PIPELINE.md`](MOBILE_SCAN_PIPELINE.md)
- Registration QA: [`SCAN_REGISTRATION_AND_QA_SPEC.md`](SCAN_REGISTRATION_AND_QA_SPEC.md)
- Existing label capture notes: `../../VIN_AND_LABEL_CAPTURE_PROTOCOL.md`

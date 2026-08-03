# VEHICLE_001_REFERENCE_PILOT

**Classification:** Reference pilot — **not** a Complete Engineering Digital Twin.  
**Verdict:**

```text
READY_FOR_ONE_VEHICLE_REFERENCE_PILOT  = YES   [Proceed — Stage 1]
READY_FOR_COMPLETE_DIGITAL_TWIN        = NO    [Build stages deliberately]
```

Reclassifying the first vehicle run as **VEHICLE_001_REFERENCE_PILOT** is intentional: it lets the organization harden evidence doctrine on a physical vehicle **today** without over-promising phone-LiDAR metrology or mesh completeness.

---

## Staged ladder (do not skip labels)

```text
[ Stage 1 ] Evidence-Only Pilot
            Photos + Metadata + SHA-256 hashes
     │
[ Stage 2 ] Spatial Metadata Pilot
            Camera intrinsics + pose + ARKit status
     │
[ Stage 3 ] LiDAR Capture Pilot
            Depth frames + motion + clock sync
     │
[ Stage 4 ] Derived Reconstruction
            Point cloud + initial mesh  (still derived — not BOM truth)
     │
[ Stage 5 ] Engineering Digital Twin
            Component graph + interfaces + BOM  (only after prior stages hold)
```

**Current authorized ask:** execute and document **Stage 1**.  
Stages 2–5 require their own gates; Phase 3 spatial coding remains separately gated (Sprint 2.3 Mac `xcodebuild` + charter/ADRs).

---

## Multi-source metrology matrix

Phone LiDAR is useful for layout, technician guidance, and rough envelopes. It is **not** a CMM.

| Data source | Operational role | Tolerance / authority |
|---|---|---|
| Phone LiDAR / ARKit | Envelope estimation, spatial layout, AR overlays | ≈ ±10 mm — **provisional / visual** |
| Guided photography | Condition evidence, component presence, damage logs | **High** — immutable evidence (with digests) |
| Manual metrology | Caliper/tape for critical rails & bolt patterns | **High** — engineering fact when recorded |
| OEM & supplier docs | Factory chassis specs, mount patterns | **Authoritative baseline** |

**Rule:** when LiDAR and caliper disagree on a critical dimension, **caliper (or OEM)** wins — record the delta and the authority action.

---

## Stage 1 exit criteria (Evidence-Only)

Minimum to call Stage 1 **executed** (not “twin complete”):

1. Vehicle identity recorded (VIN / fleet id) without invented fields.  
2. Guided photo set captured per inspection checklist.  
3. Each evidence blob has SHA-256; manifest lists path → digest.  
4. Package / folder layout verified (Capture handoff layout script when using Capture exports).  
5. Explicit statement in the pilot log: **`STAGE_1_COMPLETE` / `TWIN_COMPLETE = false`**.  

Missing dimensions → missing-data registers — **not** guessed numbers.

---

## What Stage 1 feeds

- Capture / evidence library doctrine  
- EAE / XREPO digest validation paths  
- Future report generators (when present) consuming canonical JSON  
- Honest inputs toward Build Engine open-data requirements  

It does **not** unlock procurement, fabrication, energization, or “engineering twin” marketing.

---

## Operator checklist (Stage 1)

- [ ] Read [`CURRENT_STATE.md`](../../CURRENT_STATE.md)  
- [ ] Select one physical vehicle; assign pilot id `VEHICLE_001_REFERENCE_PILOT`  
- [ ] Capture guided photos + metadata only  
- [ ] Compute and archive SHA-256 manifests  
- [ ] Store under an evidence folder / Capture export with digests  
- [ ] File open items for anything not measured  
- [ ] Refuse Stage 2+ language until Stage 1 exit criteria are checked  

---

## Related

- System map: [`SYSTEM_MAP.md`](../../SYSTEM_MAP.md)  
- Phase 3 spatial charter (docs; coding gated): `PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md`  
- Build Engine non-claims: `docs/status/PLATFORM_001_STATUS.md`

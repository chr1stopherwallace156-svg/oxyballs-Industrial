# VEHICLE_REFERENCE_PILOT (Stage 1 doctrine)

**Classification:** `VEHICLE_REFERENCE_PILOT` — **not** a Complete Engineering Digital Twin.

### Identities (do not collapse)

```text
vehicle_id             = VEH-000001
pilot_id               = PILOT-000001
pilot_classification   = VEHICLE_REFERENCE_PILOT
current_stage          = STAGE_1_EVIDENCE_ONLY
```

### Split readiness

```text
MANUAL_STAGE_1_EVIDENCE_PILOT              = AUTHORIZED
CAPTURE_APP_VALIDATED_STAGE_1_EXECUTION    = PENDING_MAC_XCODEBUILD_AND_DEVICE_GATE
READY_FOR_COMPLETE_DIGITAL_TWIN            = NO
```

Running `PILOT-000001` on `VEH-000001` as a **reference pilot** is intentional: harden evidence doctrine on a physical vehicle **today** without over-promising phone-LiDAR metrology, signatures, or mesh completeness.

---

## Staged ladder (do not skip labels)

```text
[ Stage 1 ] Evidence-Only Pilot
            Photos + Metadata + content digests (SHA-256)
            under repository/custody controls
     │
[ Stage 2 ] Spatial Metadata Pilot
            Camera intrinsics + pose + ARKit status
            (still PROVISIONAL_SPATIAL_EVIDENCE)
     │
[ Stage 3 ] LiDAR Capture Pilot
            Depth frames + motion + clock sync
            (NO_SYSTEM_TOLERANCE_ASSIGNED until characterized)
     │
[ Stage 4 ] Derived Reconstruction
            Point cloud + initial mesh  (still derived — not BOM truth)
     │
[ Stage 5 ] Engineering Digital Twin
            Component graph + interfaces + BOM  (only after prior stages hold)
```

**Current authorized ask:** execute and document **manual Stage 1**.  
Capture-app–validated Stage 1 execution waits on Mac `xcodebuild` + device gates.  
Stages 2–5 require their own gates; Phase 3 spatial coding remains separately gated.

---

## Multi-source metrology matrix

Phone LiDAR is useful for layout, technician guidance, and rough envelopes. It is **not** a CMM. **No universal millimetre tolerance is assigned** in this doctrine.

| Data source | Operational role | Authority class |
|---|---|---|
| Phone LiDAR / ARKit | Envelope estimation, spatial layout, AR overlays | `PROVISIONAL_SPATIAL_EVIDENCE` · `NO_SYSTEM_TOLERANCE_ASSIGNED` · `PENDING_CHARACTERIZATION` |
| Guided photography | Condition evidence, component presence, damage logs | High for presence/condition when sealed hash-bound + custodied |
| Manual metrology | Critical rails & bolt patterns | Engineering evidence **only if** instrument, datum, method, units, calibration status, operator, and uncertainty are recorded |
| OEM & supplier docs | Factory chassis specs, mount patterns | Authoritative baseline **when** applicability to the exact vehicle is established |

### Discrepancy rule

Resolve LiDAR / manual / OEM disagreements by **applicability**, **vehicle specificity**, **instrument suitability**, and **uncertainty**.  
**Preserve every observation.** Never silently overwrite one observation with another.

---

## Digests vs immutability

- **SHA-256** (or equivalent) verifies **content identity** of bytes.  
- **Immutability** is enforced by repository and custody controls (no silent overwrite, quarantine, append-only ledgers) — not by the hash function alone.  
- Capture outputs are **sealed, hash-bound evidence packages**. Do not imply signatures, attestations, authorship proofs, or non-repudiation.

---

## Stage 1 exit criteria (Evidence-Only) — expanded

Minimum to call Stage 1 **executed** (not “twin complete”):

1. Identities recorded: `vehicle_id=VEH-000001`, `pilot_id=PILOT-000001`, `current_stage=STAGE_1_EVIDENCE_ONLY` (no invented fields).  
2. Guided photo set captured per inspection checklist.  
3. Every evidence item has: **evidence id**, **byte length**, **content digest (SHA-256)**, **source device**, **operator**, and **timestamp**.  
4. Manifest declares **schema name/version** and lists path → digest → byte length.  
5. **Post-transfer hash verification** succeeds against the sealed package.  
6. Package/folder **reopens cleanly** (layout verify / reopen check without mutation).  
7. Explicit statement in the pilot log: **`STAGE_1_COMPLETE` / `TWIN_COMPLETE = false`**.  

Missing dimensions → missing-data registers — **not** guessed numbers.

---

## What Stage 1 feeds

- Capture / evidence library doctrine  
- EAE / XREPO digest validation paths  
- Future report generators (when present) consuming canonical JSON  
- Honest inputs toward Build Engine open-data requirements  

It does **not** unlock procurement, fabrication, energization, Capture-app validated Stage 1 closure, or “engineering twin” marketing.

---

## Operator checklist (manual Stage 1)

- [ ] Read [`CURRENT_STATE.md`](../../CURRENT_STATE.md)  
- [ ] Confirm identities: `VEH-000001` / `PILOT-000001` / `STAGE_1_EVIDENCE_ONLY`  
- [ ] Capture guided photos + metadata only  
- [ ] Record evidence ids, byte lengths, device, operator, timestamps, digests  
- [ ] Write manifest with schema/version; verify hashes post-transfer; confirm clean reopen  
- [ ] File open items for anything not measured  
- [ ] Refuse Stage 2+ language and twin-complete claims until Stage 1 exit criteria are checked  
- [ ] Keep Capture-app validated execution marked pending until Mac/`xcodebuild` + device gates close  

---

## Related

- System map: [`SYSTEM_MAP.md`](../../SYSTEM_MAP.md)  
- Phase 3 spatial charter (docs; coding gated): `PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md`  
- Build Engine non-claims: `docs/status/PLATFORM_001_STATUS.md`  
- EDTS status: `elektron-digital-twin-foundation/STATUS.json` (`active_layer=L01`, kernel validated/frozen)

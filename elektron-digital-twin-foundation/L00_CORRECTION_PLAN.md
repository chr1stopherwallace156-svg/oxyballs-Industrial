# L00_CORRECTION_PLAN.md — Layer 0 Recovery Plan

## Status

**UNDER_REVIEW — Awaiting owner feedback before re-attempting closure**

To recover Layer 0 and achieve a state where closure is authorized with corrections, the following physical and digital reconciliation steps must be taken.

---

## Step 1: Replace Powertrain Nominal Benchmarks

- **Action:** Purge all 450 hp / 935 lb-ft references from CAD and metadata registries.
- **Correction:** Institute the vocational rating **330 hp** and **750 lb-ft**. Update torque tables to reflect the heavy-duty calibration curve (peak torque achieved at a lower 2,000 rpm compared to the pickup version).
- **Claim:** CHASSIS-001
- **Target document:** `REFERENCE_CONFIGURATION.md`, propulsion claim registry entries

---

## Step 2: Establish the Coordinate Transformation Pipeline

Instead of claiming a single unified coordinate system, declare the relationships explicitly in our transformation tree:

- Let **F_ISO** be the right-handed vehicle-fixed coordinate system: +X_ISO (Forward), +Y_ISO (Left), +Z_ISO (Up).
- Let **F_EDTS** be the local modeling system used for packaging layout: +X_EDTS (Rearward), +Y_EDTS (Right), +Z_EDTS (Up).
- Define the rigid transform matrix **T_ISO→EDTS**:

```
T_ISO→EDTS = [ -1   0   0   0 ]
             [  0  -1   0   0 ]
             [  0   0   1   0 ]
             [  0   0   0   1 ]
```

This matrix is a 180° rotation around the Z-axis. It mathematically preserves right-handedness while converting the coordinate axes.

For asset export to **UNREAL_FRAME** (F_UE), the transformation requires mapping from right-handed to left-handed (see `COORDINATE_SYSTEM_CORRECTION_PROPOSAL.md`).

- **Claim:** COORD-001
- **Supersedes:** `COORDINATE_SYSTEM_STANDARD.md` (deprecated — see deprecation notice in that file)

---

## Step 3: Implement Metrology Accuracy Grading

Establish four Measurement Accuracy Classes (MAC). Every CAD point or mesh node must be tagged with its corresponding MAC:

| Class | Scope | Target | Instruments |
|---|---|---|---|
| **MAC-A** (Critical Mounting) | Suspension brackets, cab mounts | ± 0.5 mm | Structured-light or laser tracking |
| **MAC-B** (Exterior Envelopes) | Door panels, hood surface | ± 2.0 mm | Handheld scanners |
| **MAC-C** (Auxiliary Routing & Wiring) | Harness runs, brake lines | ± 5.0 mm | Terrestrial LiDAR / photogrammetry |
| **MAC-D** (Visual Assets) | Non-authoritative visual capture | No dimensional authority | DSLR photogrammetry (untracked) |

- **Claim:** METRO-001
- **Target documents:** `EVIDENCE_STANDARD.md`, `MEASUREMENT_ACCURACY_CLASS_PROPOSAL.md`, `CLAIM_REGISTRY_SCHEMA_V2_PROPOSAL.json`

---

## Step 4: Revise Source Gating

- **Action:** Demote SRC-005 to **PLANNED** status.
- **Rule:** No telemetry, mesh, or parameter record may reference SRC-005 as "Verified" or "Approved" until a cryptographic hash of the point cloud file is submitted to the project registry.
- **Claim:** EVID-005
- **Target document:** `SOURCE_REGISTRY.md`

---

## Step 5: Revise IP and Licensing Language

- **Action:** Replace "Unrestricted Own IP" with explicit provenance and redistribution status per schema v2.
- **Correction:** `data_provenance: EDTS_CAPTURE`; `redistribution_status: NOT_EVALUATED` until counsel review.
- **Claim:** IP-001
- **Target documents:** `GEOMETRY_ACQUISITION_STRATEGY.md`, `layers/L00/LEGAL_LICENSES.md`

---

## Step 6: Fix Nominal Dimension Formatting

- **Action:** Use nominal OEM precision for chassis dimensions (e.g., 145.3 in → 3690.6 mm), not false decimal precision.
- **Claim:** UNIT-001
- **Target documents:** `UNITS_AND_TOLERANCES.md`, `layers/L00/DIMENSION_DATABASE.md`

---

## Closure Re-Authorization Criteria

Layer 0 closure may be re-attempted only when:

1. All BLOCKING claims in `L00_CLAIM_ERROR_REGISTER.json` are resolved or explicitly accepted with owner sign-off.
2. `CLAIM_REGISTRY_SCHEMA_V2_PROPOSAL.json` is adopted (or v1 claims are migrated).
3. Coordinate transform pipeline is documented and validated against Unreal import test.
4. MAC classes are referenced in evidence and acquisition standards.
5. Owner provides explicit feedback on this correction plan.

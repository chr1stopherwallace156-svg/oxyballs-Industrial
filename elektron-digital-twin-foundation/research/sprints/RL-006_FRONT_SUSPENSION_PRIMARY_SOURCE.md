# RL-006 — Front Suspension Architecture Research Sprint

**Date:** 2026-07-16  
**Layer:** L00 / L01 (exact-vehicle isolation)  
**Decision:** `DT-D037` → **`PRIMARY_SOURCE_REQUIRED`**  
**Final posture:** No architectural decision. No `VERIFIED_EVIDENCE`.

## Locked configuration (only)

| Field | Value |
|---|---|
| Vehicle | 2019 Ford F-450 Super Duty Chassis Cab |
| Cab | Regular Cab |
| Drive | 4x2 |
| Axle | DRW |
| Wheelbase | 145.3 in |
| CA | 60.0 in |
| Kernel IDs | `VEH-000001` / `CFG-000001` |
| CFG fingerprint | `sha256:dde6a6251b97900dc192587903ce30a236de18f311996231a3f488ef0429d943` |

Similarity to other Super Duty / 4x4 / 169.3 in WB configurations is **not** evidence for this silo (HR-EVI).

## Research findings (honest)

| Topic | Status |
|---|---|
| Target configuration lock | **LOCKED** (kernel silo above) |
| Front suspension architecture (Beam / Monobeam vs Twin-I-Beam) | **`CANDIDATE_ASSERTION` only — no decision** |
| Uploaded “F-450 Suspension Geometry Research” file review | **`NOT_EXECUTED` / `NOT_CONFIRMED`** |
| Any claim at `VERIFIED_EVIDENCE` | **None** |
| Knowledge hierarchy | All technical assertions = `CANDIDATE` or `RESEARCH_REQUIRED` |

### File review retraction

The claim that the uploaded **F-450 Suspension Geometry Research** file was reviewed as authoritative is **retracted**.

- No successful extract/verification via File Fetcher (or equivalent) was executed in this sprint.
- Repo audit: no file by that name is present under `elektron-digital-twin-foundation/`.
- Status: **`NOT_EXECUTED`**. Do not cite that file for geometry, architecture, or dimensions.

## Candidate records (documents — NOT_ACQUIRED)

| Candidate ID | Title | Source type | Configuration claimed | Status |
|---|---|---|---|---|
| `CAND-FORD-BBAS-2019` | 2019 Ford Super Duty Chassis Cab Specifications (BBAS) | OEM BBAS | 145.3 in WB / 60 in CA | **`NOT_ACQUIRED`** |
| `CAND-FORD-SM-2019` | 2019 Ford F-Super Duty Service Manual | OEM Service | 4x2 / 4x4 (must isolate 4x2) | **`NOT_ACQUIRED`** |

Machine forms: `research/candidates/CAND-FORD-BBAS-2019.json`, `research/candidates/CAND-FORD-SM-2019.json`.  
Related registry stubs (still absent bytes): `SRC-L1-001`, `SRC-L1-003` in `layers/L01/L1_SOURCE_ARTIFACT_REGISTRY.json`.

## Contradictions and risks

1. **Cross-contamination (HIGH):** Importing 4x4 driven solid-beam geometry into the 4x2 silo (Twin-I-Beam **or** non-driving solid beam — both still candidates) invalidates the exact-vehicle model.
2. **Dimensional (HIGH):** Importing 169.3 in WB frame geometry invalidates CG and suspension mount locations for the **145.3 in** target.
3. **False authority (HIGH):** Treating third-party “Twin-I-Beam” aggregator text or unverified BBAS page quotes as OEM proof without hashed local bytes.

## Missing evidence

- Acquired/hashed 2019 BBAS (or equivalent OEM) pages confirming **F-450 4x2 Chassis Cab** front suspension architecture for this exact config.
- Component-level topology: steering linkage / axle mount diagrams or CAD for **F-450 4x2** only.
- Verified contents of any suspension geometry research upload (currently `NOT_EXECUTED`).

## Recommended decision

**`PRIMARY_SOURCE_REQUIRED`**

Do **not**:
- Decide Beam/Monobeam vs Twin-I-Beam
- Promote any suspension claim to `VERIFIED_EVIDENCE`
- Freeze front suspension geometry
- Inherit 4x4 or alternate-WB mounts

Do:
- Acquire `CAND-FORD-BBAS-2019` and/or `CAND-FORD-SM-2019` as local bytes
- Hash, page-cite, and bind claims to `(VEH-000001, CFG-000001)` only
- Keep CNF-001 / Q3 **OPEN** until then

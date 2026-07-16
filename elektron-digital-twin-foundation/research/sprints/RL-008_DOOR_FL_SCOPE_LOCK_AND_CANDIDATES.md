# RL-008 — FL Door Assembly research sprint (Pass 1–6)

**Date:** 2026-07-16  
**Decision:** `DT-D039` → **`CANDIDATE_ACQUISITION_RECOMMENDED`** (+ `PHYSICAL_VERIFICATION_REQUIRED`)  
**Assembly focus:** Front-Left door (`CMPINST-VEH000001-DOOR-FL`)  
**Downstream intent:** component twin, structural separation animation, procedural removal logic  
**Hard rules:** HR-EVI · Hard Rule 6 · Hard Rule 11 · Hard Rule 13 · Hard Rule 14 · Hard Rule 15  
**Decisions:** `DT-D039`, `DT-D040`

---

## Pass 1 — Scope lock (contamination boundary)

| Field | Locked value |
|---|---|
| Manufacturer | Ford Motor Company |
| Model | F-450 Chassis Cab |
| Model year | **2019** |
| Vehicle type | Class 4 medium duty |
| Cab | Regular Cab (2-door) |
| Drivetrain | **4x2** |
| Rear wheels | **DRW** |
| Wheelbase | **145.3 in** |
| CA | **60 in** |
| Kernel IDs | `VEH-000001` / `CFG-000001` |
| Fingerprint | `sha256:dde6a6251b97900dc192587903ce30a236de18f311996231a3f488ef0429d943` |
| Exact assembly | Front-Left (driver) door + inner subcomponents |

**Outside this boundary** → `CANDIDATE_EVIDENCE` or `COMPARISON_REFERENCE` only.  
Not verified engineering truth without explicit model-year / vehicle-line **crossover verification**.

### Contamination vectors (must not auto-inherit)

| Vector | Risk |
|---|---|
| MY 2017–2019 vs **2020+ facelift** | Harness / connector / routing divergence (e.g. door pigtails) |
| Regular Cab vs SuperCab / Crew Cab | Rear structure distinct; front outer skin may match while interior harness/trim/speakers diverge |
| Mirror option (manual/standard vs power telescoping tow) | Harness pinouts (e.g. ~8-pin vs ~22-pin power/heat/camera/BLIS) diverge |

---

## Pass 2 — Search strategy (executed lanes)

| Lane | Action |
|---|---|
| OEM specs | Hunt 2019 Body / chassis application materials for 145.3 / 60 layout |
| OEM parts | Ford parts catalogs (Tasca / FordPartsGiant / Blue Springs class) — Regular Cab door group |
| 3D/CAD | GreatCatalog, GetOutlines, Hum3D, TurboSquid — 4th-gen Super Duty cabin band |

---

## Pass 3 — Discovery (cataloged candidates)

### EDTS-CAND-001 → `SRC-CAND-000004` (Outlines vector)

| Field | Value |
|---|---|
| Title | 2017–2022 Ford F-450 Super Duty Chassis Cab Regular Cab CA 60 DRW blueprint (listing covers band) |
| URL | https://getoutlines.com/vector-drawings/30637/2017-2022-ford-f-450-super-duty-drawings |
| Type | Vector 2D reference (EPS/SVG/AI/CDR) |
| Cost | $24.00 USD (reported) |
| Status | **`DISCOVERED` / `URL_RECORDED` / `AWAITING_PURCHASE`** — not acquired; not hashed |
| Classification | **`2D_DIMENSIONAL_REFERENCE` / `PROFILE_REFERENCE`** — **not** OEM engineering geometry; **not** “ground-truth geometry” |
| Why relevant | Exterior profile / WB / CA proportion reference for cabin shell band |
| Risks | 2D only; no thickness, cavities, or door-internal separation; MY band includes 2020+ |

### EDTS-CAND-002 → `CAND-000042-EOG` (CGTrader / EOG)

| Field | Value |
|---|---|
| Title | Ford F350–F550 Super Duty Dually EOG — Complete Model (reported) |
| URL recorded | https://www.cgtrader.com/3d-models/f450 *(category/search surface — **SKU-specific listing URL not isolated**)* |
| Type | Polygonal 3D (FBX/OBJ/BLEND reported) |
| Cost | $55.30 USD (reported sale price) |
| Status | **`DISCOVERED` / `CONFIGURATION_EVALUATED`** — visual candidate; CAD-grade accuracy **unverified** |
| Why relevant | Shared Super Duty cab exterior sheet-metal starting point |
| Risks | Render mesh; latch/harness/inner structure absent; F-350–F-550 band ≠ automatic F-450 4x2 match |

---

## Pass 4 — Evidence evaluation (Hard Rule 15 claim record)

Authoritative machine form: `research/claims/CL-001_DOOR_SHELL_INTERCHANGE.json`

| Field | Value |
|---|---|
| Claim ID | `CL-001` |
| Claim | Outer door shell shared with F-150 (same design generation panel family FL3Z-1520125-A/B) |
| Evidence Level | Tier A OEM Parts Catalog (**claimed** — not locally hashed) |
| Configuration | `VEH-000001` / `CFG-000001` / `CMPINST-VEH000001-DOOR-FL` |
| Supporting Sources | Ford Parts Catalog interchange (reported) |
| Conflicting Sources | None yet identified |
| Status | **`CANDIDATE`** |
| Next Verification Step | OEM body repair manual; OEM engineering drawing; physical comparison |

HR-EVI: F-150 shell scans remain **comparison baselines** only until Hard Rule 4 crossover proof. Do not promote buried prose “CROSS_VERIFIED” into Evidence Graph status.

---

## Pass 5 — Component coverage (FL door)

| Subcomponent | Reported OEM ID | Presence in public CAD |
|---|---|---|
| Outer door skin / shell | FL3Z-1520125-A / -B | Claimed visible on EDTS-CAND-002 — **unverified until ingest** |
| Hinge assembly | HC3Z-2826800-A | Missing/merged — independent parse required |
| Door latch cable (outer/inner) | HC3Z-15221A00-F / HC3Z-15221A01-G | Not in public assets |
| Window regulator & motor | FL3Z-1523200 series | Missing; connector pinout unverified |
| Door trim panel | HC3Z-2823943-MA (power/gray — trim-dependent) | Trim-level match required |
| Door latch bracket | HC3Z-2543350 series | Missing in standard assets |

All PN rows = **research claims**, `NOT_LOCALLY_VERIFIED`.

---

## Pass 6 — Gap analysis

| Resolvable by | Gap |
|---|---|
| Public OEM docs (when acquired) | Hinge torque / clearance (e.g. HC3Z-2826800-A) via workshop manuals |
| Parts catalogs | Switch / mirror pigtail pinouts |
| **Physical inspection / scan only** | Harness routing inside aluminum inner panel cavity |
| **Blocking** | No public CAD splits shell into stampings / reinforcement / deadening layers |

---

## Recommended decision

**`CANDIDATE_ACQUISITION_RECOMMENDED`** (efficient path)

1. **Acquire** EDTS-CAND-001 / `SRC-CAND-000004` — **2D dimensional / profile reference** (vector).  
2. **Acquire** EDTS-CAND-002 / `CAND-000042-EOG` — **visual model** (after SKU URL isolation).  
3. **Eventually** — **`PHYSICAL_VERIFICATION_REQUIRED`** teardown/scan for internals, harness, latch geometry.  
4. Do **not** freeze door geometry; passport geometry remains `ABSENT`.  
5. Never label the vector blueprint as ground-truth / OEM engineering geometry (Hard Rule 14).

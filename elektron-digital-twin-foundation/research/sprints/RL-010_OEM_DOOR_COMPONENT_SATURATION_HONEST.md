# RL-010 — OEM / door-component sprint (honesty gate)

**Date:** 2026-07-16  
**Decisions:** `DT-D041`  
**Locked silo:** 2019 F-450 Chassis Cab Regular Cab 4x2 DRW 145.3 WB / 60 CA (`VEH-000001` / `CFG-000001`)  
**Assembly:** Front-Left door (`CMPINST-VEH000001-DOOR-FL`)

## Honesty gate (mandatory)

Sprint narrative labels such as `VERIFIED_EVIDENCE`, `CROSS_VERIFIED`, `DOCUMENT_SUPPORTED`, `SPECIFICATION_READY`, or “90% complete geometry” are **rejected as project verification statuses** unless:

1. Local bytes exist under the silo / research incoming path, **and**
2. Full SHA-256 is recorded, **and**
3. Hard Rule 4 lifecycle has progressed for that edge.

**Indexed URL alone ≠ VERIFIED_EVIDENCE.**  
**Specification-ready hunt metadata ≠ acquired evidence.**  
Cross-model inferences remain banned without explicit crossover verification (HR-EVI). Coverage % cells in matrices are **research draft estimates**, not engineering confidence scores (Hard Rule 5).

---

## Sprint 1 — OEM Evidence Acquisition (hunt registry)

Authoritative machine IDs are immutable `SRC-CAND-*`. Legacy `EDTS-OEM-*` labels are aliases only.

| Alias | SRC-CAND | Title (reported) | Project status | Narrative claim (rejected) |
|---|---|---|---|---|
| EDTS-OEM-001 | `SRC-CAND-000001` | 2019 Ford Body Application Guide / BBAS class | **`NOT_ACQUIRED`** | VERIFIED_EVIDENCE / SPECIFICATION_READY |
| EDTS-OEM-002 | `SRC-CAND-000005` | Ford General Body Builder Layout Book (reported Rev 1 Oct 21 2019) | **`NOT_ACQUIRED`** | DOCUMENT_SUPPORTED |
| EDTS-OEM-003 | `SRC-CAND-000002` | 2019 F-250–F-550 Workshop Manual (Helm/Motorcraft class) | **`NOT_ACQUIRED`** | VERIFIED_EVIDENCE |
| EDTS-OEM-004 | `SRC-CAND-000006` | 2019 Super Duty Electrical Wiring Diagram (EWD) | **`NOT_ACQUIRED`** | VERIFIED_EVIDENCE |
| EDTS-OEM-005 | `SRC-CAND-000007` | Ford OEM Parts Catalog — Front Door Components | **`NOT_ACQUIRED`** / `IMPLEMENTATION_PENDING` API | CROSS_VERIFIED |

No public PDF URL strings were supplied in the sprint payload for BBAS/BAG downloads → do **not** invent URLs (Hard Rule 6).

---

## Sprint 2 — Component inventory (research draft)

Hierarchy is a **research draft**, not activated kernel passports:

```text
[2019 F-450 Cab Assembly]
 └── [FL Door Assembly — reported HC3Z-2520125-A]
       ├── Outer Door Skin — FL3Z-1520125-A/B          → draft EDTS-COMP-FL-SHELL
       ├── Window Regulator — FL3Z-1523201-A           → draft EDTS-COMP-FL-REGULATOR
       ├── Glass Run Weatherstrip — FL3Z-1521597-A
       ├── Inner Door Latch — HC3Z-15221A01-G
       ├── Driver Door Wire Harness — HC3Z-14631-A     → draft EDTS-COMP-FL-HARNESS
       └── Power Telescoping Tow Mirror — HC3Z-17683-BA  (OPTION-DEPENDENT — not assumed on base XL)
```

Draft passport notes: `research/component_passports/`.  
Active kernel passport `PP-VEH000001-DOOR-FL-001` geometry remains **`ABSENT`**.

**Mirror contamination:** Power telescoping tow mirror (22-pin) must not be assumed for every Regular Cab; base/manual options differ.

---

## Sprint 3 — Public asset discovery

| Alias | Catalog ID | Reported source | Project status |
|---|---|---|---|
| EDTS-COMP-CAD-001 | `CAND-000043-GRAB` | GrabCAD “2015 F-150 Front Door” STEP/SLDPRT (user reported) | **`DISCOVERED` / `NOT_ACQUIRED`** — no verified listing URL in payload |
| EDTS-COMP-CAD-002 | `CAND-000044-TS` | TurboSquid ID **1598273** tow mirror STEP/IGES (reported $39) | **`DISCOVERED` / `CONFIGURATION_EVALUATED`** — visual/exterior only |

Risks retained: F-150 interior weld-nut / trim fastener mismatch; mirror mesh lacks mounts/conduits.

---

## Sprint 4 — Evidence graph

Illustrative wiring only: `research/graphs/DOOR_FL_EVIDENCE_GRAPH_ILLUSTRATIVE.md`  
**`authority_status: ILLUSTRATIVE_ONLY`** — torque 45 Nm, YouTube `d89G-f_mS01`, and procedure steps are **not** admitted as verified until workshop bytes + hash exist. Unconfirmed media IDs are flagged `NOT_CONFIRMED`.

---

## Sprint 5 — Coverage matrix (demoted)

| Passport draft | Visual* | Eng* | Evidence* | Geometry* | Project status |
|---|---|---|---|---|---|
| COMP-FL-SHELL | draft high | draft | draft | draft | **`CANDIDATE`** — not CROSS_VERIFIED |
| COMP-FL-REG | low | low | draft | **0 (no bytes)** | **`CANDIDATE`** |
| COMP-FL-HARN | ~0 | low | draft | **0** | **`RESEARCH_REQUIRED`** |
| COMP-FL-HNG | draft | draft | draft | draft | **`DOCUMENT_HUNT`** |

\*Cells are qualitative research estimates, not Hard Rule 5 confidence engines.

---

## Sprint 6 — Saturation (honest)

Public channels: **searched / partially identified** — not “90% saturated with verified evidence.”

| Channel | Honest state |
|---|---|
| OEM workshop / BAG / EWD | Hunt targets — **NOT_ACQUIRED** |
| Parts catalog | Hunt / API pending — **NOT_ACQUIRED** |
| GrabCAD door shell | Identified claim — **NOT_ACQUIRED** |
| Marketplace mesh | Identified — **NOT_ACQUIRED** |
| Teardown videos | Reported IDs **NOT_CONFIRMED** |
| Supplier drawings | NOT FOUND |
| Photogrammetry / laser scan | NOT ACQUIRED |

**Physical scan remains required** for inner cavity + harness routing.

---

## Sprint 7 — Physical acquisition planner

See `research/plans/FL_DOOR_INTERNAL_SCAN_PROTOCOL.md` (trim removal → vapor barrier → cavity → harness clips).

---

## Sprint 8 — Build priority (post-bytes)

1. Outer shell — HIGH (after STEP ingest + hinge clearance check vs workshop)  
2. Hinges — MEDIUM  
3. Tow mirror visual — MEDIUM (option-gated)  
4. Harness — LOW / blocked on physical scan  

---

## Recommended decision

**`CANDIDATE_ACQUISITION_RECOMMENDED`**

1. Acquire **profile reference** `SRC-CAND-000004` / EDTS-CAND-001.  
2. Acquire **door shell CAD** `CAND-000043-GRAB` / EDTS-COMP-CAD-001 **after** real listing URL + license check.  
3. Schedule **targeted physical scan** (Sprint 7) for internals / harness.  
4. Keep OEM PDFs (`SRC-CAND-000001/2/5/6/7`) as parallel Hard Rule 13 lanes — still `PRIMARY_SOURCE_REQUIRED` until hashed.

# RESEARCH_LOG.md

Append-only log of research entries for the digital twin foundation.

---

## RL-001 — L00 reference vehicle dimension research

- **Date:** 2026-07-16
- **Layer:** L00
- **Agent:** Cursor Cloud Agent
- **Question:** What vehicle and configuration should anchor the digital twin?

### Findings

1. **Build Engine alignment:** Research map L1 targets Ford Super Duty F-450/F-550 with BBAS BBLB paths (CS-05, CS-07, CS-10 on docs branch). Frame alteration and fleet GVWR work assumes Class 4/5.

2. **F-450 Regular Cab 4x2 DRW (2019):** Wheelbase **141.6 in** from Ford Super Duty pickup dimension materials (2017–2019). Overall length ~231.8 in cited in third-party specs — requires OEM verification.

3. **F-150 alternative (2017 SuperCab 6.5 ft 4x2):** Wheelbase **145.0 in** per Ford 2020 F-150 Tech Specs. Matches Standard Conversion marketing tier but weaker Build Engine OEM path.

4. **Geometry sources:** Ford BBAS (https://www.fordpro.com/en-us/upfit/bbas/) is the canonical OEM path. Super Duty vehicle-specific BBLB not yet archived (DT-B003).

5. **Scanning:** Tiered strategy adopted in DT-D002 — OEM envelope first, targeted LiDAR for Tier A interfaces.

### Impact

- Provisional DT-D001: 2019 F-450 Super Duty Regular Cab 8 ft 4x2
- Variants DT-D001-A (4x4), DT-D001-B (F-150) documented

### Sources

| ID | Title | URL | Confidence |
|----|-------|-----|------------|
| S-001 | 2020 Ford F-150 Tech Specs | https://media.ford.com/content/dam/fordmedia/North%20America/US/product/2020/f150/2020-F150-TechSpecs.pdf | high (OEM) |
| S-002 | Ford Super Duty dimension guide (pickup) | BBAS / marketingassociates PDF | medium — verify token stability |
| S-003 | Build Engine RESEARCH_MAP L1 | branch `claude/docs-structure-large-projects-b6vxx5` | high (internal) |

### Status

Consolidated into [L00_REFERENCE_LOCK.md](../layers/L00_REFERENCE_LOCK.md) and DT-D001.

---

## RL-002 — Component-First Acquisition proposal evaluation (Lane A)

- **Date:** 2026-07-16
- **Layer:** L01
- **Agent:** Cursor Cloud Agent
- **Question:** Should a seven-file asset acquisition pack (search log, candidate DB, door/cab shortlists, exact-vs-related register, gaps, next actions) be added?

### Findings

1. **Principle accepted:** Component-First Acquisition improves rigor and matches Hard Rule 0 + HR-EVI + Hard Rule 10. Integrated as a Hard Rule 0 corollary in `EDTS_RESEARCH_PROTOCOL.md` v2.1.1 and `EDTS_OS.md`.
2. **Seven proposed files rejected as redundant:** homes already exist (see protocol table). Designated catalog `L1_LANE_A_ASSET_CATALOG.json` created instead of a parallel candidate database.
3. **Honesty gate:** Proposal example URLs (`cgtrader.com/example-…`, `grabcad.com/example-…`) and unverified GrabCAD “CAND-771” discovery claims are **not admitted**. Hard Rule 6 — no invented sources.
4. **ASSET-00031:** Remains the only catalogued candidate; availability audit still `CANDIDATE_NOT_ACQUIRED` (no mesh bytes).
5. **Exact vs related:** Use HR-EVI + catalog grade/match fields; formal comparisons use `schemas/cross-vehicle-comparison.schema.json` — no new register schema (schema freeze).

### Impact

- Catalog + queue Priority 1b own Lane A acquisition tracking.
- Door vertical slice status unchanged: `F450_DOOR_FL_VERTICAL_SLICE_BLOCKED_BY_MISSING_ASSET`.
- Decision: DT-D027.

### Status

Integrated; redundant proposal files not created.

---

## RL-003 — Evidence acquisition efficiency + deferred graphs (Hard Rule 11)

- **Date:** 2026-07-16
- **Layer:** L01 / protocol
- **Agent:** Cursor Cloud Agent
- **Question:** Soften “never search complete vehicle”; add multi-axis scores, geometry roles, Dependency Graph; next build = Component Passport?

### Findings

1. **Hard Rule 11 accepted (soft):** search complete-vehicle **and** component levels; prefer exact complete assets (OEM CAD, scans, photogrammetry, supplier CAD) when they exist; otherwise component-by-component under HR-EVI.
2. **Multi-axis scores / first-class multi-role geometry / Dependency Graph:** deferred under kernel freeze — recorded as future architecture only; no Geometry A/B; no schema expansion.
3. **Next build:** Component Passport `PP-VEH000001-DOOR-FL-001` (existing schema) prioritized over OEM part-number chase alone.
4. Kernel tag `edts-kernel-v1.0.0-rc1` untouched.

### Status

DT-D029; protocol v2.1.2.

---

## RL-004 — Reject active passport schema mutation; proposal-only v1.1

- **Date:** 2026-07-16
- **Layer:** kernel governance / L01
- **Agent:** Cursor Cloud Agent
- **Question:** May the Component Passport schema be updated now for embedded registries, remove-lists, and scores?

### Findings

1. **No.** Active `schemas/component-passport.schema.json` remains byte-identical to `edts-kernel-v1.0.0-rc1`.
2. Corrected architecture recorded under `proposals/` only (valid ID-index schema + design doc).
3. Active door passport example corrected: exact instance; two candidates; geometry/interaction ABSENT; no GEO/INT links.
4. Embedding authoritative records, invented scores, and unverified procedure graphs rejected.

### Status

DT-D030.

---

## RL-005 — Evidence Acquisition Engine activated (empirical shift)

- **Date:** 2026-07-16
- **Layer:** L01 / tools
- **Agent:** Cursor Cloud Agent
- **Question:** Proceed with acquisition sprint for CAND-00031 / CAND-771?

### Findings

1. Built reusable **Evidence Acquisition Engine** (not a new kernel schema): Search→…→Runtime Ready with METADATA stage and PROMOTED_TO_REFERENCE_ONLY.
2. Executed against both candidates: both **`BLOCKED_BY_MISSING_SOURCE_URL`** (no URL, no bytes) — honest.
3. Passport **not** updated with invented hash/parse metadata.
4. Kernel remains `EDTS_EXACT_VEHICLE_KERNEL_VALIDATED` / frozen.
5. Posture: `EVIDENCE_ACQUISITION_IN_PROGRESS`.

### Status

DT-D032.

---

## RL-006 — Front suspension architecture: PRIMARY_SOURCE_REQUIRED

- **Date:** 2026-07-16
- **Layer:** L00 / L01 (exact-vehicle isolation)
- **Agent:** Cursor Cloud Agent
- **Question:** What is the front suspension architecture for locked 2019 F-450 Chassis Cab Regular Cab 4x2 DRW 145.3/60?

### Findings

1. **Configuration lock only:** `VEH-000001` / `CFG-000001` — no cross-config inheritance.
2. **Architecture:** Beam/Monobeam vs Twin-I-Beam remains **`CANDIDATE_ASSERTION`** — **no decision**.
3. **File review retracted:** “F-450 Suspension Geometry Research” upload review = **`NOT_EXECUTED` / `NOT_CONFIRMED`**. Not present/verified in repo.
4. **Document candidates NOT_ACQUIRED:** `CAND-FORD-BBAS-2019`, `CAND-FORD-SM-2019`.
5. **No `VERIFIED_EVIDENCE`.** Knowledge hierarchy: CANDIDATE / RESEARCH_REQUIRED only.
6. **Risks:** 4x4 driven-beam contamination; 169.3 in WB dimensional contamination.

### Impact

- CNF-001 → `OPEN_PRIMARY_SOURCE_REQUIRED`; preferred architecture cleared (`null`).
- Q3 updated; geometry freeze remains blocked for front suspension.
- Decision: **DT-D037 / `PRIMARY_SOURCE_REQUIRED`**.

### Status

Recorded under `research/sprints/RL-006_FRONT_SUSPENSION_PRIMARY_SOURCE.md`.

---

## RL-007 — Hard Rule 13 + immutable SRC-CAND + RC hunt scores

- **Date:** 2026-07-16
- **Layer:** protocol / L01 research
- **Agent:** Cursor Cloud Agent
- **Question:** How should research continue after discovering BBAS/service/parts candidates for front suspension?

### Findings

1. **Hard Rule 13 adopted:** one source discovery propagates parallel lanes; research does not stop.
2. **Immutable IDs:** `SRC-CAND-000001` (BBAS, RC 85), `000002` (WSM, RC 90), `000003` (Parts, RC 75) — all `NOT_ACQUIRED`.
3. **RC protocol:** 0–100 hunt prioritization + Reasoning Log; **not** engineering verification % (Hard Rule 5 still forbids that).
4. **Architecture:** remains `RESEARCH_REQUIRED`; decision remains **`PRIMARY_SOURCE_REQUIRED`**.
5. **Geometry extraction:** forbidden until `SRC-CAND-000001` (or equivalent Tier A) acquired and applicability verified.
6. Next Search Queue Priority 1 = locate/acquire `SRC-CAND-000001`.

### Status

DT-D038; protocol v2.2.0; register `research/src_candidates/SRC_CANDIDATE_REGISTER.json`.

---

## RL-008 — FL door scope lock, candidates, CL-001 interchange

- **Date:** 2026-07-16
- **Layer:** L01 / door assembly `CMPINST-VEH000001-DOOR-FL`
- **Agent:** Cursor Cloud Agent
- **Question:** What exact-config evidence exists for FL door shell + internals; what should be acquired next?

### Findings

1. **Scope lock** recorded with contamination vectors (2020+ facelift, cab type, mirror harness).
2. **EDTS-CAND-001 / SRC-CAND-000004** Outlines vector — real URL recorded; `NOT_ACQUIRED`; acquisition recommended.
3. **EDTS-CAND-002 / CAND-000042-EOG** — category URL only; visual candidate; facade/inner-structure gap.
4. **CL-001** shell interchange (FL3Z-1520125-A/B) kept as `DISCOVERED_NOT_LOCALLY_HASHED` / `COMPARISON_REFERENCE` — not Evidence Graph CROSS_VERIFIED; F-150 baseline use is comparison-only under HR-EVI.
5. Internals (hinge, latch cables, regulator, trim, bracket) missing from public CAD → **`PHYSICAL_VERIFICATION_REQUIRED`**.
6. Passport geometry remains `ABSENT`.

### Status

DT-D039 — `CANDIDATE_ACQUISITION_RECOMMENDED`.

---

## RL-009 — Hard Rule 14/15; CL-001 claim record; acquisition vocabulary

- **Date:** 2026-07-16
- **Layer:** protocol / door claims
- **Agent:** Cursor Cloud Agent
- **Question:** Correct vector “ground truth” language; require structured claim records?

### Findings

1. **Hard Rule 14:** vector blueprints = **2D dimensional / profile reference** — never ground-truth geometry.
2. **Hard Rule 15:** major claims require `CL-*` records (claim, evidence level, configuration, supporting/conflicting sources, status, next verification step).
3. **CL-001** rewritten; status **`CANDIDATE`**; next steps = OEM body repair manual, OEM engineering drawing, physical comparison.
4. Acquisition order affirmed: **vector → visual model → physical teardown**.

### Status

DT-D040; protocol v2.3.0.

---

## RL-010 — OEM / door-component saturation (honesty gate)

- **Date:** 2026-07-16
- **Layer:** L01 / door assembly `CMPINST-VEH000001-DOOR-FL`
- **Agent:** Cursor Cloud Agent
- **Question:** Can the operator OEM registry + component saturation sprint be admitted as verified evidence?

### Findings

1. **Honesty gate:** Indexed URL / narrative alone ≠ `VERIFIED_EVIDENCE`. All EDTS-OEM-001..005 mapped to `SRC-CAND-*` and remain **`NOT_ACQUIRED`**.
2. **New hunt IDs:** `SRC-CAND-000005` (General BBLB), `SRC-CAND-000006` (EWD), `SRC-CAND-000007` (parts catalog).
3. **Draft passports** `EDTS-COMP-FL-SHELL/REGULATOR/HARNESS/HINGE/MIRROR` — ILLUSTRATIVE_ONLY under `research/component_passports/`.
4. **CAD candidates:** `CAND-000043-GRAB` (GrabCAD shell — no listing URL), `CAND-000044-TS` (TurboSquid ID 1598273 — visual only).
5. **Coverage % / CROSS_VERIFIED** demoted to CANDIDATE / RESEARCH_REQUIRED / DOCUMENT_HUNT (Hard Rule 5).
6. **Physical scan protocol** planned: `research/plans/FL_DOOR_INTERNAL_SCAN_PROTOCOL.md`.
7. Passport geometry remains **`ABSENT`**.

### Status

DT-D041 — `CANDIDATE_ACQUISITION_RECOMMENDED` (with demoted verification labels).

---

## RL-011 — Asset Intelligence Database (Hard Rule 16)

- **Date:** 2026-07-16
- **Layer:** acquisition intelligence / L01 assets
- **Agent:** Cursor Cloud Agent
- **Question:** Pivot from “found the vehicle answer” to a structured Asset Intelligence Database?

### Findings

1. **Hard Rule 16** / **DT-D042:** every internet asset gets an `AID-*` passport under `research/asset_intelligence/`.
2. Direct URLs recorded as **inputs**: Outlines 30637 (`AID-000001`); CGTrader SKU `URL_FETCH_CONFIRMED` (`AID-000002`, publisher outlawtransport, model #6371726).
3. Related Outlines CA 108/120 (30638/30639) retained as related IDs only — full slugs **not invented**.
4. Seeded 8 AID passports covering prior CAND/SRC/ASSET discoveries with ordinal completeness + lifecycle fields.
5. DT-D027 shortlist rejection and DT-D029 scoring-engine deferral **stand**; AID ≠ numeric scoring engine.
6. Protocol bumped to **v2.4.0**. Geometry remains **`ABSENT`**.

### Status

DT-D042 — Asset Intelligence DB **ACTIVE**; still `CANDIDATE_ACQUISITION_RECOMMENDED` for bytes.

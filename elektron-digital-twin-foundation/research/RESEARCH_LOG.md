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

---

## RL-012 — Deconstructed sourcing, supplier-first, AJR

- **Date:** 2026-07-16
- **Layer:** acquisition intelligence / chassis + door hubs
- **Agent:** Cursor Cloud Agent
- **Question:** Pivot to modular Tier-1 component sourcing with purchase justification?

### Findings

1. **Hard Rule 17 / DT-D043:** Deconstructed Assembly Sourcing + Supplier-First Lane + AJR purchase gate.
2. Tier-1 matrix recorded as **hunt draft** (Dana, ZF/TRW, Bosch, Denso/BorgWarner) — not verified.
3. New AIDs: `AID-000009` (M300), `AID-000010` (TAS65), `AID-000011` (Hum3D door) — **no URLs**; narrative SPECIFICATION_READY / 0.9x scores demoted to RESEARCH_CLAIM.
4. **AJR-000001 / AJR-000002** drafted → **`NOT_CLEARED`** / `CONTINUE_RESEARCH` (URL + uniqueness + engineering-data gates incomplete).
5. Front axle architecture still **`PRIMARY_SOURCE_REQUIRED`**.
6. Protocol **v2.5.0**. Geometry remains **`ABSENT`**.

### Status

DT-D043 — **`CONTINUE_RESEARCH`** (AJR blocked until real supplier listing URLs).

---

## RL-013 — Component sourcing passports, KG register, Hum3D reject

- **Date:** 2026-07-19
- **Layer:** component maturity / door harness / axle
- **Agent:** Cursor Cloud Agent
- **Question:** Track per-component maturity + gaps; decide Hum3D purchase; honor M300 acquire claim?

### Findings

1. **CSP-000001..000003** created (aliases AID-COMP-01/02/03). Operator saturation % retained as draft estimates only.
2. **KG-001 CRITICAL** (harness routing) and **KG-002 HIGH** (M300 wall thickness) registered OPEN.
3. **AJR-000003 HOLD_REJECTED** — $79 Hum3D door shell is visual duplicate of free F-150 crossover path (CL-001 still CANDIDATE).
4. Operator **AID-COMP-02 ACQUIRED→PARSED** and Exact Match=Yes **rejected** — `AID-000009` remains `NOT_ACQUIRED`.
5. **MEDIA-000001** search-discovered Super Duty door-panel removal video candidate for KG-001 (confirm intended media).
6. Next focus: KG-001 via EWD + media/salvage before physical scan.

### Status

DT-D044 — **`CONTINUE_RESEARCH`** (KG-001).

---

## RL-014 — Mission queue, twin VIS/ENG, honest evidence counts

- **Date:** 2026-07-19
- **Layer:** orchestration / FL door / axle maturity honesty
- **Agent:** Cursor Cloud Agent
- **Question:** Formalize missions + twin domain split; migrate maturity to counts?

### Findings

1. **`MISN-000001`** created (`EDTS-MISN-001`) — `NOT_STARTED`; success via EWD **or** 2 Tier-1 layouts **or** physical scan.
2. Primary assignment: acquire **`SRC-CAND-000006`** (2019 Super Duty EWD) for KG-001.
3. Twin passports: **`TWIN-VIS-000001`** / **`TWIN-ENG-000001`** (AID-VIS-0104→`AID-000012`, AID-ENG-0082→`AID-000013`) — independent; speculative numerics = RESEARCH_CLAIM.
4. Evidence matrix + maturity counts: operator “verified/acquired” cells demoted; **wiring 0/2**; **Dana 8/8 rejected**.
5. **KG-003** (inner impact beam) OPEN HIGH.
6. Protocol **v2.7.0**.

### Status

DT-D045 — **`CONTINUE_RESEARCH`** (acquire EWD).

---

## RL-015 — EGS-v1 relationship graph

- **Date:** 2026-07-19
- **Layer:** dependency graph / FL door procedural demo
- **Agent:** Cursor Cloud Agent
- **Question:** Deploy typed relationship graph + hand off schema for migration?

### Findings

1. **EGS-v1** non-kernel schema + closed edge vocabulary deployed; frozen assembly-relationship **untouched**.
2. **REL-000001..000007** (REL-REG-01..06 + REL-FL-DOOR-0104) admitted as **ILLUSTRATIVE_ONLY** — operator VERIFIED_EVIDENCE demoted (WSM/EWD not hashed).
3. Regulator removal sequence = illustrative dependency demo — **not** workshop-validated.
4. Evidence matrix gains property confidence fields; false VERIFIED cells demoted.
5. **MISN-000002** (dashboard edges) + **KG-004** (hinge shims) registered.
6. Decision: **`IMPLEMENTATION_HANDOFF_READY`** for schema package only.

### Status

DT-D046 — schema handoff ready; parallel MISN-000001 still needs EWD bytes.

---

## RL-016 — EGS-v1 proposal module

- **Date:** 2026-07-20
- **Layer:** dependency graph / proposal implementation
- **Agent:** Cursor Cloud Agent
- **Question:** Implement EGS-v1 as a proposal module with CMPINST endpoints and graph queries without mutating frozen kernel schemas?

### Findings

1. **`proposals/egs-v1/`** delivered: proposal schema, validation rules, `RelationshipGraph` queries, synthetic fixtures, F-450 candidate sample.
2. Endpoints enforced as **`CMPINST-*`**; AID/EDTS-COMP/ASSET rejected.
3. Per-property evidence links + applicability + lifecycle; engineering props require `BOUND` evidence; `CANDIDATE_UNVERIFIED` forbids populated specs.
4. F-450 sample edges recorded as **`CANDIDATE_UNVERIFIED`** with null engineering properties (no invented torque/connectors/fasteners/removal procedures).
5. Unit tests (`tests/egs_v1/`) — **17 passed** on synthetic fixtures.
6. Frozen `assembly-relationship.schema.json` **untouched**; research `REL-00000N` retained as ILLUSTRATIVE history only.

### Status

DT-D047 — proposal module active; parallel MISN-000001 still needs EWD bytes.

---

## RL-017 — EGS-1.0.0-proposal.2 architecture

- **Date:** 2026-07-20
- **Layer:** relationship engine architecture
- **Agent:** Cursor Cloud Agent
- **Question:** Refine EGS to separate conceptual/config/physical nodes, interface entities, graph planes, and deterministic evidence lifecycle?

### Findings

1. Three-tier hierarchy **COMPDEF → CFGCOMP → CMPINST** implemented; reference edges use CFGCOMP/IFACE/OP.
2. IFACE layer (connector/grommet/mount-hole/flange/service-port) replaces direct harness→regulator shortcuts.
3. PHYSICAL / FUNCTIONAL / PROCEDURAL planes isolated; transient state forbidden on structural edges.
4. Exact-configuration scope lock forbids `model_year_range` on CONFIGURATION_REFERENCE.
5. Claim pipeline SOURCE_DISCOVERED→ASSERTION_VERIFIED with automated edge_status aggregation.
6. Cycle classifier reports HARD/CONDITIONAL/STATE_DEPENDENT/ALTERNATE_PATH — never auto-resolves.
7. REL-REG-01..06 locked **CANDIDATE_UNVERIFIED** / **PROCEDURE_GENERATION_NOT_AUTHORIZED**; tests **27 passed**.

### Status

DT-D048 — `EGS_V1_PROPOSAL_INFRASTRUCTURE_READY`; real F-450 promotion blocked pending WSM/EWD bytes.

---

## RL-018 — Research Execution Pipeline audit

- **Date:** 2026-07-20
- **Layer:** research execution / acquisition boundaries
- **Agent:** Cursor Cloud Agent
- **Question:** What can the research pipeline actually do across six honest dimensions — and where must humans/APIs/physical work take over?

### Findings

1. Acquisition = **PARTIALLY_AUTOMATED** (public OK; Helm/paywall/physical gated).
2. Extraction = **AUTOMATED_TEXT_ONLY** until OCR/token-anchor verification for drawings/EWDs.
3. Exact-vehicle isolation + contradiction logging = **FULLY_CAPABLE**.
4. Graph templating = schema-gated; unbounded LLM edges rejected at intake.
5. Assembly = **PROGRESSIVE_SYNTHESIS**; saturation estimates are not measured scores.
6. Sprint 7 Physical Acquisition Plan = **template only**.

### Status

DT-D049 — pipeline boundaries locked; recommended decision still `EGS_V1_PROPOSAL_INFRASTRUCTURE_READY`.

---

## RL-019 — FL Door vertical-slice mission

- **Date:** 2026-07-20
- **Layer:** FL door / exact-vehicle isolation
- **Agent:** Cursor Cloud Agent
- **Question:** Execute Front-Left Door vertical-slice research under locked 2019 F-450 Chassis Cab Regular Cab 4x2 DRW 145.3/60 without inheriting near-config truth?

### Findings

1. Scope lock confirmed; no pickup/Crew/4x4/2020+ inheritance as authoritative.
2. **SRC-CAND-000001** (BAG) + **SRC-CAND-000008** (NHTSA 17S33) bytes acquired + hashed; parse PENDING.
3. Brochure SRC-002 URL **HTTP 404** → **SRC-CAND-000009 NOT_ACQUIRED** (demoted from operator SOURCE_ACQUIRED).
4. WSM/EWD still SOURCE_DISCOVERED; **MISN-000003** commercial handoff + ingestion fixtures.
5. Candidate components/IFACE/edges recorded; C309 pin **CONTRADICTION**; operator KG-002 → **KG-005**.
6. Invented 12 V EVD claim rejected; all procedures BLOCKED.

### Status

DT-D050 — vertical slice package ready; real promotion blocked pending Helm/WSM/EWD bytes.

---

## RL-020 — Chassis frame Evidence Brief A/B

- **Date:** 2026-07-20
- **Layer:** chassis frame / global datums
- **Agent:** Cursor Cloud Agent
- **Question:** Register exact-config bumper datums, frame C-channel/upfitter constraints, and track packaging from acquired fleet/brochure sources?

### Findings

1. **SRC-CAND-000010** fleet specs acquired+hashed; F-450 Regular Cab tables support WB/CA/overhang/track/H=34.2 (not F-350 34.1).
2. Frame height curb **35.0/35.9** and loaded **28.7/28.6** (4x2) extracted from page 4 — dual values retained.
3. **SRC-CAND-000011** Skeeter brochure acquired (prior URL path was 404); C-channel/upfitter rules DOCUMENT_SUPPORTED pending token anchors.
4. Structural CFGCOMP/IFACE graph initialized; edges CANDIDATE_UNVERIFIED.
5. **Option A selected** → MISN-000004; Mission E deferred MISN-000005.

### Status

DT-D051 — frame brief locked; Mission D next (no invented suspension architecture).

---

## RL-021 — HV commissioning gates 05L-B / 05L-C cleanup + 05M staging

- **Date:** 2026-07-20
- **Layer:** Build Engine HV commissioning doctrine (EDTS mirror)
- **Agent:** Cursor Cloud Agent
- **Question:** Apply researcher/verdict cleanups to Gates 05L-B and 05L-C, and stage 05M-A/B/C without authorizing live HV or premature spin?

### Findings

1. **Ownership partition locked permanently:** VCU = request/monitor; BMS/PDU = contactor + pre-charge; hardwired safety loop = emergency coil-supply interrupt.
2. **05L-B corrections applied:** no absolute \(V_{caps}=0.0\,\mathrm{V}\); RC = first-order envelope model only; timeout = fail-to-reach-before-expiry; E-stop = measured dropout vs supplier target, no “instantly,” no auto-retry.
3. **05L-C corrections applied:** supplier-defined shutdown architecture (not universal Main+→Main−); IMD via approved current-limited fixture only; weld tests split **005A** (false positive) / **005B** (false negative).
4. **Global rule:** all numerics in 05L-B / 05L-C / 05M-A are **INITIAL_TARGET_PROFILE** until SUPPLIER_DATA + ENGINEERING_REVIEW + LIVE_HV_TEST_PLAN_APPROVAL + bench/chassis proof.
5. **05M-A draft:** inverter enable readiness / torque-disabled validation — no assumed 0% PWM, no intentional rotation, no vehicle movement, no driver torque authority.
6. **Staging:** after 05L-C → 05M-A → 05M-B → 05M-C; do not jump to spin before 05M-A. Live HV execution **not** authorized by doctrine alone.

### Status

DT-D052 — HV package at `build_engine/gates/hv_commissioning/`; recommended evidence path remains MISN-000004 / Helm WSM-EWD in parallel.

---

## RL-022 — Mission D front suspension honesty gate

- **Date:** 2026-07-20
- **Layer:** front suspension / steering (MISN-000004)
- **Agent:** Cursor Cloud Agent
- **Question:** Can the operator Mission D dump be admitted as exact-config truth for CFG-2019-F450-REG-CAB-4X2-60CA-DRW?

### Findings

1. **Architecture:** SRC-CAND-000010 *Front Axle Specifications — 4x2* states F-450/F-550 **Monobeam** (Dana, forged steel, 7000/7500 max @ ground). F-350 contrast = Twin I-beam (**cross-config only**).
2. **Track 74.8 in** re-affirmed (code I) — already ASSERTION_EXTRACTED in DT-D051.
3. **FGAWR correction:** Reg Cab 4x2 145.3 Max Std Front GAWR = **4800 (6.8L) / 5200 (6.7L)** — operator **5600 baseline REJECTED**. 7500 path is option-dependent (Extra-HD front package).
4. **Wheels/brakes:** 19.5×6 10-lug **225 mm** BCD, 225/70Rx19.5G, rotor **15.39/15.74**, dual-piston pin-slider — ASSERTION_EXTRACTED from fleet standard equipment / wheel specs.
5. **Torques / alignment EXACT_MATCH table REJECTED** — WSM not acquired.
6. **Next mission:** continue Mission D (BAG parse + WSM). Mission E stays deferred. Mission F not opened.

### Status

DT-D053 — `MISSION_D_IN_PROGRESS_PRIMARY_SOURCE_PARTIAL`; CNF-001 → partially resolved at series level.

---

## RL-023 — MEPQ + Option B LV gateway discovery

- **Date:** 2026-07-20
- **Layer:** evidence procurement / LV gateway / ICE boundary registry
- **Agent:** Cursor Cloud Agent
- **Question:** How should the Inversion Principle / MEPQ and operator Component Passport example be admitted without inventing values, and which next-step option to deploy?

### Findings

1. **MEPQ** admitted as sibling of KG/MISN/AJR — procure only non-inferable evidence.
2. **MEPQ-001/002** (ICE CG/mass, trans XMBR) registered **DEFERRED** with Mission E; **MEPQ-003** (LV firewall) **QUEUED**.
3. **Option B selected** → **MISN-000006** Mission F discovery open questions (C127 remains OPERATOR_CANDIDATE).
4. **Option A rejected for now** — Mission E stays deferred.
5. Operator radius-arm passport scrubbed: reject LEVEL_4, 301 N·m TTY, KU5Z as verified, BBLB §4 unverified cite.
6. MISN-000003 expanded to KG-008; commercial EWD still required before any pin ASSERTION_EXTRACTED.

### Status

DT-D054 — `MEPQ_ACTIVE_OPTION_B_MISSION_F_DISCOVERY`.

---

## RL-024 — EV-DECON-PHASE2 honesty gate + MEPQ checklist export

- **Date:** 2026-07-20
- **Layer:** ICE deconstruction boundary (deferred) / MEPQ consolidation
- **Agent:** Cursor Cloud Agent
- **Question:** Can EV-DECON-PHASE2 lower chassis/fluidic purge be admitted as executable teardown truth, and which next option to take?

### Findings

1. Phase 2 registered as **deferred conversion-intent** under Mission E — not authorized teardown.
2. **Rejected:** radiator bay 38.3×30×8 (overhang conflation); M8/M10/M12/torque/hanger counts without WSM; “knowledge graph complete.”
3. **Retained partial:** H=34.2 frame width; 40 gal aft-of-axle tank (SRC-CAND-000010 p.48).
4. New **MEPQ-004/005** (fuel strap holes; mid XMBR thickness) + KG-009/010.
5. **Option 2 selected** — checklist at `research/mepq/exports/MEPQ_ACTIVE_CHECKLIST.md` (1 QUEUED / 4 DEFERRED).
6. Option 1 skipped — Mission F already open (MISN-000006).

### Status

DT-D055 — `DECON_PHASE2_REGISTERED_DEFERRED_MEPQ_EXPORT`.

---

## RL-025 — Three-layer graph separation + Mission D L1 focus

- **Date:** 2026-07-20
- **Layer:** graph architecture / Mission D truth discipline
- **Agent:** Cursor Cloud Agent
- **Question:** How to lock L1/L2/L3 separation on ICE decon reprocessing, and which next target under those constraints?

### Findings

1. **Three-Layer Protocol** admitted — L2/L3 must not pollute L1.
2. ICE decon refiled: L1 truth (with UNKNOWNs), L2 estimates (38.3 box stays estimate), L3 battery proposal.
3. L1 scrub: radiator material/manufacturing rejected; fuel capacity restored to **ASSERTION_EXTRACTED** 40 gal aft-of-axle std.
4. **MEPQ-006/007** registered (metrology tolerances; frame loads).
5. **Option 2 selected** — Mission D L1 focus (spindle #, linkage, alignment UNKNOWN).
6. Option 1 already open — Mission F continues with L1 harness vs L3 VCU taps.

### Status

DT-D056 — `THREE_LAYER_PROTOCOL_ACTIVE_MISSION_D_L1_FOCUS`.

---

## RL-026 — Reject fabricated Layer-1 dump

- **Date:** 2026-07-20
- **Layer:** three-layer integrity enforcement
- **Agent:** Cursor Cloud Agent
- **Question:** Can the operator “Layer 1 Engineering Truth” mass/material/geometry/load sheet be admitted for CFG-2019-F450-REG-CAB-4X2-60CA-DRW?

### Findings

1. **Rejected entire L1 block** — fabricated precision contradicting SRC-CAND-000010 (curb/GAWR scale wrong; mid-ship “exact” box untokened).
2. **EPAS steering REJECTED** — L1 steering is hydraulic recirculating ball + damper.
3. MCS70 / 450 MPa / ±1.5 mm / 3.5g / 1850 Nm/deg — handbook/guess, not OEM tokens.
4. Dependent L2 mass-delta / CoG-shift and L3 IRS/CAD-by-Friday are non-authoritative.
5. Performance-target prompt (chemistry/kWh/voltage) **declined** until L1 honest.

### Status

DT-D057 — continue Mission D L1; do not invent truth to unblock conversion analysis.

---

## RL-027 — EDTS Visible Progress Release 1

- **Date:** 2026-07-21
- **Layer:** visual demonstrator (non-kernel parallel lane)
- **Agent:** Cursor Cloud Agent
- **Question:** Can EDTS ship an interactive 3D demonstrator before complete vehicle research without inventing engineering truth?

### Findings

1. **DT-D058** admits Visible Progress R1 as provisional visual only.
2. App at `edts-visible-progress/` — Factory ICE / Deconstruction / EV Proposal; select/hide/isolate/remove/explode; data-status badges; passport inspector with evidence ledger, KG, MEPQ.
3. Layout uses ASSERTION_EXTRACTED dims only; meshes are PLACEHOLDER_GEOMETRY / DESIGN_PROPOSAL / BLOCKED.
4. Handoff sample JSX that claimed VERIFIED frame/cab/axle and invented 110 kWh / 250 kW / 1,100 lb **rejected**; architecture (states, badges, scene tree, panel schema) **admitted**.
5. Does **not** authorize L10 demo, procedures, or geometry freeze. DT-D057 fabrication rejection unchanged.

### Status

DT-D058 — `VISIBLE_PROGRESS_R1_PROVISIONAL_VISUAL_ONLY`. Continue Mission D L1 + WSM/EWD in parallel.

---

## RL-028 — Five-store scale path + viewer modes

- **Date:** 2026-07-21
- **Layer:** visual demonstrator architecture
- **Agent:** Cursor Cloud Agent
- **Question:** How to scale past monolithic component blobs and add Timeline / Search / Heatmap / Simulation without inventing mass/CG?

### Findings

1. **Five stores** admitted (Component / Geometry / Evidence / Relationships / UI) via `edts-visible-progress/src/data/stores/`.
2. Timeline = visual surgery narrative only — **not** authorized procedure.
3. Search focuses camera + opens passport.
4. Heatmap colors by evidence maturity (green→red).
5. Simulation scaffold shows axle/CG as **UNKNOWN** — ±32 kg / 18 mm rejected until MEPQ-001.
6. Photoreal / final Apple chrome deferred.

### Status

DT-D059 — `FIVE_STORE_SCALE_PATH_PLUS_VIEWER_MODES`.

---

## RL-029 — Visible Progress R2 normalized architecture

- **Date:** 2026-07-21
- **Layer:** visual demonstrator R2
- **Agent:** Cursor Cloud Agent
- **Question:** How to deliver enterprise-grade normalized DBs + Apple-style hover UI + live mass engine without inventing physics?

### Findings

1. **COMP/GEO/EVD/EGS/SIM/UI** stores with foreign keys admitted.
2. Hover-first viewport: labels only on hover/select; selection dims unrelated.
3. Mass engine computes only when all active SIM masses are measured/verified — otherwise **BLOCKED**.
4. Sample V2 invented kg / axle formulas / VERIFIED badges **rejected**.
5. Surgery / Search / Heatmap retained from DT-D059.

### Status

DT-D060 — `R2_NORMALIZED_HOVER_FIRST_MASS_ENGINE_BLOCKED`.

---

## RL-030 — VPR-2 claim corrections

- **Date:** 2026-07-21
- **Layer:** honesty / prototype labeling
- **Agent:** Cursor Cloud Agent
- **Question:** Are VPR-2 production / 5-DB / shader / physics claims accurate?

### Findings

1. Operator assessment accepted — architecture strong; claims overstated.
2. Honest label: **Architecture and Interaction Prototype**.
3. Domains = tables not microservices; SQL schema drafted.
4. R3F procedural truck kept; camera Box3 framing improved; multi-maturity statuses added.
5. Mass/axle disabled; storyboard labeled; next milestone = real mesh/GLB mapping.

### Status

DT-D061 — `VPR2_PROTOTYPE_CLAIMS_CORRECTED_NEXT_IS_REAL_MESH`.

---

## RL-031 — VPR-2 corrected baseline accepted

- **Date:** 2026-07-21
- **Layer:** prototype baseline lock
- **Agent:** Cursor Cloud Agent
- **Question:** Accept corrected 6-domain / 3-tier / R3F audit as the project baseline?

### Findings

1. Audit locked in `PROTOTYPE_STATUS.md` (R3F/Box3/material overlay implemented; persistence/graph/axle/procedures not).
2. Assumption kg values quarantined — not SIM truth.
3. Orthogonal maturity matrix vocabulary aligned.
4. Next milestone unchanged: GLB/mesh mapping.

### Status

DT-D062 — `VPR2_BASELINE_ACCEPTED_NEXT_GLB_MAPPING`.

---

## RL-032 — GLB acquisition specification (EDTS-SPEC-3D-001)

- **Date:** 2026-07-21
- **Layer:** asset acquisition / VPR-2 Tier-2 gate
- **Agent:** Cursor Cloud Agent
- **Question:** What criteria gate purchasing or authoring the demonstrator GLB?

### Findings

1. Spec locked: config boundary, GLB metrics, CRS (front-axle origin), GEO_ separation, PBR/ORM.
2. Manifest + `verifyMeshMapping()` + QA checklist required before Tier-2 admit.
3. PROXY powertrain naming; no aluminum-in-name; no invented mass/freeze.
4. Object-store path reserved empty; procedural R3F remains visual.

### Status

DT-D063 — `SPEC_3D_001_ACCEPTED_GLB_NOT_YET_ACQUIRED`.

---

## RL-033 — Open-source maximum-leverage research pack

- **Date:** 2026-07-21
- **Layer:** research / toolchain / scan pipeline (non-invasive)
- **Agent:** Cursor Cloud Agent
- **Question:** Max-leverage open-source path for EDTS without production mutation?

### Findings

1. Eight-document pack under `research/open_source/` admitted.
2. REUSE_DIRECTLY: COLMAP, Open3D, RTAB-Map, R3F, vPIC; Nerfstudio viz-only; Quantum rejected from pipeline.
3. Metric isolation + config quarantine rules locked.
4. 90-day backlog proposed; **not executed**; no production code changes.

### Status

DT-D064 — `OPEN_SOURCE_RESEARCH_PACK_ACCEPTED_BACKLOG_NOT_EXECUTED`.

---

## RL-034 — Repository implementation audit

- **Date:** 2026-07-21
- **Layer:** honesty / traceability
- **Agent:** Cursor Cloud Agent
- **Question:** What exists in code vs what specs/decisions claim?

### Findings

1. Four audit artifacts: IMPLEMENTATION_AUDIT, MISSING_FEATURES, NEXT_IMPLEMENTATION_PRIORITY, TRACEABILITY_MATRIX.
2. VPR-2 R3F + JSON stores implemented; GLB/vPIC/scan/Open3D missing.
3. `verify:mesh` + `build` pass; no viewer unit tests.
4. Recommend P0 GLB slice or P2 vPIC before new features.

### Status

DT-D065 — `AUDIT_COMPLETE_PRIORITIZE_P0_GLB_OR_P2_VPIC`.

---

## RL-035 — Implementation evidence ledger & three-axis maturity

- **Date:** 2026-07-21
- **Layer:** honesty / process
- **Agent:** Cursor Cloud Agent
- **Question:** Separate Implemented vs Tested vs Verified; require proof for green checks?

### Findings

1. `IMPLEMENTATION_EVIDENCE.md` + audit axes + category % admitted.
2. Most VPR-2 features: ✅ Implemented, ✖ Tested, ✖ Verified.
3. Mesh smoke + build: ✅ 🧪 but not 📐 engineering AC.
4. P0 GLB remains highest-value unlock.

### Status

DT-D066 — `EVIDENCE_LEDGER_ACTIVE_P0_GLB_FIRST`.


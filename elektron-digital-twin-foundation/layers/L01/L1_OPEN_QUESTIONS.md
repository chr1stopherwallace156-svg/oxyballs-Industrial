# L1 Open Questions

**Status:** `OPEN`  
**Layer:** L01 exterior research  
**Rule:** unresolved items stay OPEN; do not invent answers to unblock geometry

---

## Q1 — Rear Transit Light Bracket

**Question:** Capture the temporary steel transit brackets / wire-tied lamps that Ford attaches to frame rail ends for shipping, or model frame ends completely clean for future custom beds?

**Impact:** object hierarchy (`REAR_BUMPER_TEMPORARY`), rear lighting dossier, CAP-REAR acceptance

**Status:** OPEN — needs owner decision

---

## Q2 — Exhaust Treatment Assembly / SCR Clearance

**Question:** On the 2019 4x2 model, does the Selective Catalytic Reduction (SCR) tank mount fully clear the rear cab wall, or does it extend into the 60-inch cab-to-axle clearance area?

**Impact:** CA usable length, underbody coverage plan, possible collision with future body mounts

**Status:** OPEN — needs Body Builder layout / physical inspection

---

## Q3 — F-450 4x2 Front Suspension Architecture

**Question:** Does this specific Regular Cab 4x2 chassis-cab use a monobeam / non-driving solid beam front axle structure, the classic twin-I-beam design, or another architecture?

**Exact config only:** 2019 F-450 Chassis Cab · Regular Cab · 4x2 · DRW · 145.3 in WB / 60 in CA (`VEH-000001` / `CFG-000001`).

**Sprint RL-006 / RL-007 · DT-D037 / DT-D038:**
- Architecture status = **`RESEARCH_REQUIRED`** — **no decision**
- Hard Rule 13 active: discovering one source opens parallel lanes (does not close research)
- Immutable candidates: `SRC-CAND-000001` (BBAS, RC 85), `SRC-CAND-000002` (WSM, RC 90), `SRC-CAND-000003` (Parts, RC 75) — all **`NOT_ACQUIRED`**
- Uploaded “F-450 Suspension Geometry Research” file review = **`NOT_EXECUTED`**
- No claims at `VERIFIED_EVIDENCE`
- Decision posture: **`PRIMARY_SOURCE_REQUIRED`**
- Geometry extraction: **forbidden** until `SRC-CAND-000001` (or equivalent Tier A) acquired + applicability verified

**Risks:** marketplace 4x2↔4x4 mislabel; 169.3 in WB contamination; F-350 4x2 ≠ F-450 4x2 inheritance

**Impact:** `FRONT_AXLE_*` object identity, landmark `LMK-AXLE-FRONT-CTR`, front suspension hierarchy

**Status:** OPEN — prioritize locate/acquire `SRC-CAND-000001`; keep parallel lanes tasked

---

## Q4 — Evidence Archive Completeness

**Question:** Which pages of the 2019 Ford Truck Body Builder Layout Book (SVE Bulletin) and Fleet Dimension Guide are archived and citable for front track, rear dual overall width, and frame width?

**Status:** OPEN — Pass 1 discovery incomplete until files are archived under evidence rules

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

**Sprint RL-022 · DT-D053 (supersedes open posture of DT-D037 for series type):**
- Series architecture = **`ASSERTION_EXTRACTED` Monobeam** (SRC-CAND-000010 Front Axle Specs — 4x2, F-450/F-550)
- F-350 Twin I-beam = **cross-configuration comparison only**
- Still **not** `ASSERTION_VERIFIED` for the physical VEH-000001 instance (BAG parse + label/WSM remain)
- WSM `SRC-CAND-000002` still **NOT_ACQUIRED** — torque/alignment blocked
- Geometry extraction: still **forbidden** until instance verification path closes
- Mission: `MISN-000004` **IN_PROGRESS**

**Impact:** `FRONT_AXLE_*` object identity, landmark `LMK-AXLE-FRONT-CTR`, front suspension hierarchy

**Status:** PARTIALLY_RESOLVED (series) — continue Mission D instance verification

---

## Q4 — Evidence Archive Completeness

**Question:** Which pages of the 2019 Ford Truck Body Builder Layout Book (SVE Bulletin) and Fleet Dimension Guide are archived and citable for front track, rear dual overall width, and frame width?

**Status:** OPEN — Pass 1 discovery incomplete until files are archived under evidence rules

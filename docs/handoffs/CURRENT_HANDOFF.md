# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 30 + review_27 — Gate 08 v0.1
  transition, FMEA framework started); awaiting the full Gate 08 FMEA
  registry batch or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `df2f4c3` — Archive raw RH batch 30 + review_27 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- New file: **`docs/status/FMEA_REGISTRY.md`** (the Gate 08 deliverable).
- Files changed (reconciliation commit):
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (RC-115..119;
  RC-114 extended; section 38 — no new CS),
  `docs/status/AXLE_CG_CALCULATOR.md` (park-status extended; Gate 08
  prerequisite note), `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-20),
  `docs/research/RESEARCH_MAP.md` ("next" → full Gate 08 FMEA registry),
  `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (Gate 08 FMEA_FRAMEWORK_STARTED +
  15-mode prompt), `docs/CHANGELOG.md`, handoff files.
  (Raw archives `batch_30_gate08_failure_modes.md`,
  `review_27_batch_30_verdict.md`, PROVENANCE committed separately as
  `df2f4c3`.)
- Summary: the transition into **Gate 08 (Failure Modes + Test
  Procedures)**. **Two safety-critical defects caught:** (1) a
  **fabricated 200 ms HVIL disconnect-latency limit** → `NeedsExactSource`
  (RC-116, BQ-20) — the Constitution's never-invent-values rule; (2)
  **unsafe live-HV fault-test wording** → **staged testing** (bench/HIL →
  HV-isolated component → supervised integrated only after safety plan +
  LOTO + PPE + emergency shutdown) — RC-117. Also: weight/CG checks belong
  to Gate 07C (Gate 08 references them as prerequisites, RC-119);
  regen/ABS/ESC test staging (RC-118); `GATE_08_OPEN` →
  `FMEA_FRAMEWORK_STARTED`; Gate 08 must be a proper FMEA registry
  (RC-115). Gate 07C parked (CALCULATOR_FRAMEWORK_READY /
  PHYSICAL_SCALE_DATA_REQUIRED / VERTICAL_CG_TEST_REQUIRED /
  NO_ROAD_TEST_CLEARANCE). **Nothing ingested; nothing Confirmed; no
  compliance claim; no invented thresholds; no live-HV/track testing
  approved; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_30/review_27 archives are 1:1 against the
  owner's chat ("30:30"); the 200 ms limit is fenced (not a rule); live-HV
  testing is prohibited pending staged approval; Gate 08 is
  framework-started, not open; nothing marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-20).
- Gate-state snapshot: 04B/04C/05/06 first pass (batch_25); 07 v0.1; 07B
  v0.2 (`MASS_LEDGER.md`); 07C v0.4 PARKED (`AXLE_CG_CALCULATOR.md`); **08
  FMEA_FRAMEWORK_STARTED (`FMEA_REGISTRY.md`) — NO_LIVE_HV_TESTING_APPROVED
  / NO_TRACK_TESTING_APPROVED / SUPPLIER_TIMING_LIMITS_REQUIRED.** Order
  after 08: 05 deep dive → 06 deep dive → 09 → 10 → 11.
- Build artifacts: `MASS_LEDGER.md`, `AXLE_CG_CALCULATOR.md`,
  `FMEA_REGISTRY.md`.
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner
  (recurring items: PATS, ZF-CAN, gas/diesel, compliance-label/naive-CGv);
  (9)(10)(11) approve/send Dana / ZF / Ford-Lee letters; (12) supplier
  reminder; (13) official Ford BBLB copy + IVM statement + **FMVSS 305a
  exact text** (for any HVIL timing limit); (14) brake engineer for FMVSS
  105; (15) confirm donor is 7.3L gas (001A) + provide VIN / door label /
  four-corner scale / track widths / 001A gas removal weights;
  (16) inverter/BMS firmware timing data (BQ-20) and an engineering safety
  plan + LOTO/PPE before any HV testing.

## Next exact action

Expected next inputs, in any order: (a) the **full Gate 08 FMEA registry
batch** — the 15 failure modes with the full FMEA columns (verbatim prompt
in `GATE_RESEARCH_QUEUE.md`; framework in `docs/status/FMEA_REGISTRY.md`).
Reconcile with the hard rules: **no live HV tests; nothing Confirmed; no
compliance claim; no invented timing thresholds — every limit
`NeedsExactSource`;** simulation pass ≠ physical pass; HIL pass ≠ road-test
approval. (b) Gate 07A/07C field data if the owner has the donor. (c) A
supplier reply — archive 1:1, reconcile, move the matching BQ to the
Resolution log. (d) The owner approves/sends a letter — record Sent +
date, start that BQ's 7/14/21-day clock. Enforce throughout: nothing
Confirmed; no compliance/"safe" claim; NEVER "PATS bypass"; **NEVER invent
a timing/threshold value**; keep diesel data out of the 001A gas model
(D-006); official Ford source beats Scribd.

## Forbidden actions

- Do not edit `index.html` without explicit owner instruction.
- Do not edit any file under `docs/research/raw/` — immutable evidence
  (incl. `owner_directives/`).
- Do not create rev07 modules 13/14/15 without owner approval.
- Do not ingest candidate rows into rev07; nothing gets marked
  Confirmed; no SourceClaims.md promotion before locator verification
  + owner approval.
- Do not use held rows or fenced values (RC-19/20; RC-22..26; J1673
  4×/6×; ZF RC-83/84/85; FMVSS 400 ft/150 lb RC-88; BenchForce/FS1Inc
  RC-92/93; BBLB-via-ODI-URL RC-91/94/96/97; GVWR bands RC-99; any
  NominalAssumption weight as a donor value; CGv ~22–24 in BQ-16;
  **the 200 ms HVIL limit RC-116** or any invented timing threshold).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- Do not recommend or run live-HV fault testing; no track testing;
  staged testing only (RC-117) with LOTO/PPE/engineering signoff.
- Do not let the Build Engine claim compliance or mark anything safe.
- Do not let quantum-inspired material gate or approve anything.
- Do not implement M10, M11, or any production code; do not resolve
  ODR-001..ODR-003.

## Receiving-agent checklist (complete BEFORE modifying any file)

- [ ] **Agent owner field names ME** — if not, do not edit
- [ ] `git status` — clean tree, expected branch
- [ ] `git log -1` — HEAD matches end commit above
- [ ] Active spec checked (`docs/specifications/Revision_07.md`,
      `rev07/00_BASELINE_INDEX.md`)
- [ ] Claimed tests re-run and results compared (or absence of a test
      suite verified explicitly)
- [ ] `docs/status/CURRENT_PHASE.md`, `docs/status/BLOCKERS.md`,
      `docs/status/BLOCKED_QUESTIONS_LEDGER.md`, `docs/status/MASS_LEDGER.md`,
      `docs/status/AXLE_CG_CALCULATOR.md`, and `docs/status/FMEA_REGISTRY.md`
      read

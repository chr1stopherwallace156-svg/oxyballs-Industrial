# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 28 + review_25 — Gate 07C v0.3,
  Axle Moment + CG Calculator); awaiting the next research batch (Gate 08)
  or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `12491b7` — Archive raw RH batch 28 + review_25 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- New file: **`docs/status/AXLE_CG_CALCULATOR.md`** (the Gate 07C
  deliverable).
- Files changed (reconciliation commit):
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (CS-62;
  RC-107..112; RC-105 refined; section 36), `docs/status/MASS_LEDGER.md`
  (001A gas removal figures populated), `docs/status/BLOCKED_QUESTIONS_LEDGER.md`
  (BQ-16/BQ-17), `docs/research/RESEARCH_MAP.md` ("next" → Gate 08),
  `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (07C first-pass-done; Gate 08
  promoted to NEXT; removed the duplicate Gate 08 placeholder),
  `docs/CHANGELOG.md`, handoff files.
  (Raw archives `batch_28_gate07c_axle_moment_cg.md`,
  `review_25_batch_28_verdict.md`, PROVENANCE committed separately as
  `12491b7`.)
- Summary: Gate 07C delivered the **axle-moment + CG calculator** — a
  simulation architecture, explicitly **not** a verified CG system or a
  compliance determination. Owner's corrections applied: explicit
  equations (W/F/R, CGh=(R×WB)/W, ΔR/ΔF, transverse CGt — RC-107/108);
  **vertical CG BLOCKED** pending an approved CG-height procedure (Transit
  BEMM/BBAS, certified facility) — RC-109; **IVM CGv Min/Max equations**
  replace the naive single max-height threshold — RC-110; **honest status
  labels** (`Weight_CG_Gate_Status`; `NOMINAL_CALCULATION_PASS /
  PHYSICAL_VERIFICATION_REQUIRED`) so the engine cannot claim compliance —
  RC-112; the **500 lb** figure is the FMVSS-105 **lightly-loaded
  allowance**, not fleet payload — RC-111 (refines RC-105). **The
  gas/diesel split (D-006) is now resolved in-payload** — both branches
  populated; 001A gas removal figures (engine ~540 lb, exhaust ~65 lb,
  NominalAssumption) added to `MASS_LEDGER.md`. **Nothing ingested;
  nothing Confirmed; no compliance claim; no weight/CG marked safe; ODRs
  untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_28/review_25 archives are 1:1 against the
  owner's chat ("28:75"); every equation is a simulation framework; CGv
  and IVM limits are OpenGaps; the engine's output field is a
  gate-status, not a compliance verdict; nothing marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-17).
- Gate-state snapshot: 04B REGULATORY_TEST_SOURCE_FOUND/NEEDS_BRAKE_
  ENGINEER_MAPPING; 04C OEM_ELECTRICAL_RULE_SOURCE_FOUND/DC_DC_SIZING_
  OPEN; 05 STARTED/NEEDS_OFFICIAL_FORD_SUPER_DUTY_SOURCE; 06 OFFICIAL_
  FRAME_RULE_CANDIDATES_FOUND/…; 07 v0.1; 07B v0.2 (`MASS_LEDGER.md`);
  07C v0.3 (`AXLE_CG_CALCULATOR.md`); **Gate 08 next**.
- Physical-build artifacts: `docs/status/MASS_LEDGER.md` (mass +
  scale procedure + release gate) and `docs/status/AXLE_CG_CALCULATOR.md`
  (equations + pass/block logic).
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner
  (3 recurrences: PATS, ZF-CAN, gas/diesel); (9)(10)(11) approve/send
  Dana / ZF / Ford-Lee letters; (12) supplier reminder; (13) official Ford
  BBLB copy + IVM statement-of-conformity (lifts NeedsOfficialFordCopy /
  NeedsIVMSource on RC-91/94..104/108/109/110); (14) brake engineer for
  FMVSS 105; (15) confirm donor is 7.3L gas (001A) + provide VIN /
  door label / baseline four-corner scale + the 001A gas removal weights.

## Next exact action

Expected next inputs, in any order: (a) the **Gate 08 research batch** —
Failure Modes + Test Procedures (owner named it next in review_25; capture
the verbatim prompt into `GATE_RESEARCH_QUEUE.md` when it arrives, then
reconcile as a normal batch — impact limited to Test / NoGoCondition /
OpenGap / Rule; no compliance claim, no "vehicle is safe," no final
pass/fail unless the source is primary regulation / OEM / accepted test
standard). (b) Gate 07A/07C field data if the owner has the donor (VIN,
door label, four-corner baseline scale, 001A gas removal weights,
CG-height test) — advances `MASS_LEDGER.md` + `AXLE_CG_CALCULATOR.md`
toward closure. (c) A supplier reply — archive 1:1 under
`docs/research/raw/supplier_replies/`, reconcile, move the matching BQ to
the Resolution log. (d) The owner approves/sends a letter — record Sent +
date, start that BQ's 7/14/21-day clock. Enforce throughout: nothing
Confirmed; no compliance/"safe" claim; NEVER "PATS bypass"; keep diesel
data out of the 001A gas model (D-006); official Ford source beats Scribd.

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
  RC-92/93; BBLB-via-ODI-URL RC-91/94/96/97; GVWR bands RC-99; any RM/AM
  or removed-ICE NominalAssumption weight as a donor value; CGv ~22–24 in
  BQ-16 as verified).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- Do not let the Build Engine claim compliance or mark any weight/CG safe;
  vertical CG stays blocked pending an official method / physical test.
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
      and `docs/status/AXLE_CG_CALCULATOR.md` read

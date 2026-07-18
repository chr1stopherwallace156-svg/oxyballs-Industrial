# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 29 + review_26 — Gate 07C v0.4
  refinement, parked); awaiting the next research batch (Gate 08) or a
  supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `75523c8` — Archive raw RH batch 29 + review_26 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed (reconciliation commit):
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (RC-113/114;
  recurrence markers on RC-110/112; section 37 — no new CS),
  `docs/status/AXLE_CG_CALCULATOR.md` (v0.4 park-status; refined
  WARNING/SIMULATION lists; recurrence note),
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-18 track widths; BQ-19
  Gate 08 regen fault), `docs/research/RESEARCH_MAP.md` (already points to
  Gate 08), `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (07C parked v0.4;
  confirmed post-08 order), `docs/CHANGELOG.md`, handoff files.
  (Raw archives `batch_29_gate07c_v04_refinement.md`,
  `review_26_batch_29_verdict.md`, PROVENANCE committed separately as
  `75523c8`.)
- Summary: a Gate 07C **v0.4 refinement** — the Hunter re-delivered the
  calculator with the explicit equations shown, and the owner did a final
  cleanup and parked the gate. **Two recurrences** (the payload re-used
  `Final_Safety_Compliance_Status`/`OPERATIONAL_ALPHA` and the naive
  `CG_v > Max_Allowable_Height` block, both corrected in review_25) were
  re-corrected; the calculator already held the honest labels + IVM logic,
  so **nothing regressed in the register**. Genuine refinements: track
  widths → **NeedsOfficialFordSource OR PhysicalMeasurement** (RC-113,
  BQ-18), not supplier-only; the regen/ABS/ESC dynamic fault-injection
  item **moved to Gate 08** (BQ-19). Gate 07C parked:
  **CALCULATOR_FRAMEWORK_READY / PHYSICAL_DATA_REQUIRED /
  NO_ROAD_TEST_CLEARANCE** (RC-114). **Nothing ingested; nothing
  Confirmed; no compliance claim; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_29/review_26 archives are 1:1 against the
  owner's chat ("29:75"); the two recurrences are recorded, not silently
  dropped; the deliverable keeps the corrected labels + IVM logic; nothing
  marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-19).
- Gate-state snapshot: 04B REGULATORY_TEST_SOURCE_FOUND/…; 04C
  OEM_ELECTRICAL_RULE_SOURCE_FOUND/DC_DC_SIZING_OPEN; 05 STARTED/…; 06
  OFFICIAL_FRAME_RULE_CANDIDATES_FOUND/…; 07 v0.1; 07B v0.2
  (`MASS_LEDGER.md`); 07C v0.4 PARKED (`AXLE_CG_CALCULATOR.md`); **Gate 08
  next**. Confirmed order after 08: 05 deep dive → 06 deep dive → 09 → 10
  → 11.
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner
  (**four recurring items now: PATS, ZF-CAN, gas/diesel, compliance-label
  + naive-CGv**); (9)(10)(11) approve/send Dana / ZF / Ford-Lee letters;
  (12) supplier reminder; (13) official Ford BBLB copy + IVM
  statement-of-conformity; (14) brake engineer for FMVSS 105; (15) confirm
  donor is 7.3L gas (001A) + provide VIN / door label / four-corner
  baseline scale / track widths / 001A gas removal weights.

## Next exact action

Expected next inputs, in any order: (a) the **Gate 08 research batch** —
Failure Modes + Test Procedures (owner-named next; capture the verbatim
prompt into `GATE_RESEARCH_QUEUE.md` when it arrives, then reconcile as a
normal batch — impact limited to Test / NoGoCondition / OpenGap / Rule; no
compliance claim, no "vehicle is safe," no final pass/fail unless the
source is primary regulation / OEM / accepted test standard). Gate 08 ties
together HV, powertrain, cooling, brake/steering, and weight/CG (what can
fail, how to detect it, how to test it, what blocks the build) — BQ-19
(regen/ABS/ESC fault-injection) already parked there. (b) Gate 07A/07C
field data if the owner has the donor (VIN, door label, four-corner
baseline scale, track widths, 001A gas removal weights, CG-height test) —
advances the mass ledger + calculator toward closure. (c) A supplier reply
— archive 1:1, reconcile, move the matching BQ to the Resolution log.
(d) The owner approves/sends a letter — record Sent + date, start that
BQ's 7/14/21-day clock. Enforce throughout: nothing Confirmed; no
compliance/"safe" claim; NEVER "PATS bypass"; keep diesel data out of the
001A gas model (D-006); official Ford source beats Scribd; **watch for the
compliance-label and naive-CGv items recurring again**.

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
  BQ-16; generic track widths as measured).
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

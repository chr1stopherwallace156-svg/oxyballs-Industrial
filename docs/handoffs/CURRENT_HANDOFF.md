# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 36 + review_33 — Gate 05B
  Controls Dependency Map); awaiting the Gate 05C Controls State Machine
  batch or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `ef1f337` — Archive raw RH batch 36 + review_33 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- New file: **`docs/status/GATE05B_CONTROLS_DEPENDENCY_MAP.md`**.
- Files changed (reconciliation commit):
  `docs/status/GATE05A_SIGNAL_REGISTRY.md` (S7–S11 EV-side signals;
  transmit-config re-correction; status + NO_PROPRIETARY_DBC_ASSUMPTIONS),
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (RC-148..153;
  section 44 — no new CS), `docs/status/BLOCKED_QUESTIONS_LEDGER.md`
  (BQ-27 pre-charge/HV-shutdown authority),
  `docs/research/RESEARCH_MAP.md` ("next" → Gate 05C),
  `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (Gate 05B started; Gate 05C →
  NEXT), `docs/CHANGELOG.md`, handoff files.
  (Raw archives `batch_36_gate05b_controls_dependency_map.md`,
  `review_33_batch_36_verdict.md`, PROVENANCE committed separately as
  `ef1f337`.)
- Summary: Gate 05B Controls Dependency Map started (owner: "very strong
  now"). The corrections are all about **where control authority lives**:
  **VCU decisions = SimulationOnly (RC-150)** — torque arbitration,
  pre-charge, thermal derating carry authority conditions, and
  **pre-charge / contactor / final HV-shutdown authority may belong to the
  BMS/PDU safety controller, not the VCU** (BQ-27); **driver warnings →
  EV-side display / service-laptop / prototype dashboard only, factory
  cluster BLOCKED_PENDING_AUTHORIZED_FORD_INTERFACE (RC-151)**; **Fault
  Level 3 emergency shutdown routes through the authorized BMS-PDU safety
  architecture (RC-152)**. Directionality held (Ford receive-only; EV
  transmit isolated; no CAN_1→CAN_2 routing of unverified data; no
  factory-safety-bus injection). The Gate 05A "custom VCU transmit
  configs" line recurred and was re-corrected (RC-148). **Nothing
  ingested; nothing Confirmed; no confirmed Ford signal; no VCU-owned HV
  shutdown; no factory-cluster injection; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_36/review_33 archives are 1:1 against the
  owner's chat ("36:36"); VCU decisions carry no physical authority;
  pre-charge/HV-shutdown ownership is unconfirmed (BQ-27); no
  factory-cluster injection; nothing marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-27).
- Gate-state snapshot: 04B/04C/06 first pass; **05 STARTED — 05A
  SIGNAL_REGISTRY_STARTED; 05B CONTROL_DEPENDENCY_MAP_STARTED
  (`GATE05B_CONTROLS_DEPENDENCY_MAP.md`); 05C Controls State Machine
  NEXT**; 07 v0.1 / 07B (`MASS_LEDGER.md`) / 07C v0.4 PARKED
  (`AXLE_CG_CALCULATOR.md`); 08 FMEA_REGISTRY_CREATED (15 modes); 08B
  SOURCE_CANDIDATES_MAPPED PARKED; **08C SIMULATION_SWEEP_MATRIX_CREATED —
  PARKED_FOR_SUPPLIER_DATA**. Order after 05: 06 deep dive → 09 → 10 → 11.
- Build artifacts: `MASS_LEDGER.md`, `AXLE_CG_CALCULATOR.md`,
  `FMEA_REGISTRY.md`, `DRAFT_VALIDATION_08C.md`, `GATE05_CONTROLS.md`,
  `GATE05A_SIGNAL_REGISTRY.md`, `GATE05B_CONTROLS_DEPENDENCY_MAP.md`.
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner
  (recurring items now incl. the Gate 05 transmit-config line); (9)(10)(11)
  approve/send Dana / ZF / Ford-Lee letters; (12) supplier reminder;
  (13) official Ford BBLB + IVM + FMVSS 305a/105 + paid Gate 08B standards
  + official Ford UIM/BBAS/J1939 docs + supplier BMS/inverter/VCU/DC-DC/
  charger DBCs; (14) brake engineer for FMVSS 105; (15) confirm donor is
  7.3L gas (001A) + donor data; (16) inverter/BMS firmware timing + HV
  safety plan; (17) firmware signoff (BQ-26); (18) **BMS/PDU pre-charge +
  contactor + HV-shutdown ownership** (BQ-27).

## Next exact action

Expected next inputs, in any order: (a) the **Gate 05C Controls State
Machine batch** (scope in `GATE_RESEARCH_QUEUE.md`; dependency map in
`GATE05B_CONTROLS_DEPENDENCY_MAP.md`) — 11 states, each with required
inputs, allowed EV-side outputs, blocked Ford-side outputs, fault
transitions, proof artifact, verification status. **Ford-side receive-only;
EV-side isolated; pre-charge/contactor/HV-shutdown authority UNCONFIRMED
(BQ-27) — do not assume the VCU owns it; no factory-cluster injection;
NEVER "PATS bypass"; nothing Confirmed; no compliance claim.** (b) A Gate
08C reopen if supplier thresholds land. (c) Gate 08B reopen if official
standard PDFs arrive. (d) Gate 07A/07C field data. (e) A supplier reply —
archive 1:1, reconcile, move the matching BQ to the Resolution log. (f)
The owner approves/sends a letter — record Sent + date, start that BQ's
7/14/21-day clock. Enforce throughout: nothing Confirmed; no
compliance/"safe" claim; NEVER "PATS bypass" or bus spoofing; NEVER invent
a threshold / grant a placeholder pass-block; no Ford signal is confirmed
until an official source proves it; the VCU does not own HV shutdown until
supplier architecture confirms it; keep diesel data out of the 001A gas
model (D-006).

## Forbidden actions

- Do not edit `index.html` without explicit owner instruction.
- Do not edit any file under `docs/research/raw/` — immutable evidence
  (incl. `owner_directives/`).
- Do not create rev07 modules 13/14/15 without owner approval.
- Do not ingest candidate rows into rev07; nothing gets marked
  Confirmed; no SourceClaims.md promotion before locator verification
  + owner approval; no standard quote is a rule until ExactQuoteVerified
  (RC-127); no Ford PGN/byte/rate is a rule until proven (RC-140/145).
- Do not use held rows or fenced values (RC-19/20; RC-22..26; J1673
  4×/6×; ZF RC-83/84/85; FMVSS 400 ft/150 lb RC-88; BenchForce/FS1Inc
  RC-92/93; BBLB-via-ODI-URL RC-91/94/96/97; GVWR bands RC-99; any
  NominalAssumption weight/CGv as a donor value; the 200 ms HVIL limit
  RC-116; draft driver-warning strings RC-121; Gate 08B standard "quotes";
  any Gate 08C placeholder value as a pass/block RC-133; unverified
  Ford-side CAN IDs/rates/PGNs RC-137/140/145).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- **Gate 05: authorized/listen-only only — no anti-theft bypass, no
  fake/spoofed ABS/ESC messages, no transmit onto factory Ford safety
  buses without approval (RC-136/142/148); accel-pedal never drives
  inverter torque directly (RC-141/146); no factory-cluster warning
  injection (RC-151); the VCU does not own pre-charge/HV shutdown until
  the BMS/PDU architecture confirms it (RC-150/152).**
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
      `docs/status/AXLE_CG_CALCULATOR.md`, `docs/status/FMEA_REGISTRY.md`,
      `docs/status/DRAFT_VALIDATION_08C.md`, `docs/status/GATE05_CONTROLS.md`,
      `docs/status/GATE05A_SIGNAL_REGISTRY.md`, and
      `docs/status/GATE05B_CONTROLS_DEPENDENCY_MAP.md` read

# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 42 + review_39 — Gate 05H HIL /
  Bench Test Protocol); awaiting the owner's next batch (a further Gate 05
  proof step or the Gate 06 deep dive) or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `1b06fcb` — Archive raw RH batch 42 + review_39 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- New file: **`docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md`** (HIL
  harness architecture, fault-injection matrix HIL-05G-001..006, two
  illustrative Python scripts, per-run proof-artifact package).
- Files changed (reconciliation commit):
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (RC-180..184;
  section 50 — no new CS), `docs/research/RESEARCH_MAP.md` ("next" →
  owner's call), `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (Gate 05H drafted;
  NEXT = owner's call / Gate 06 deep dive), `docs/CHANGELOG.md`, handoff
  files. (Raw archives `batch_42_gate05h_hil_bench_test_protocol.md`,
  `review_39_batch_42_verdict.md`, PROVENANCE committed separately as
  `1b06fcb`.)
- Summary: Gate 05H HIL/bench proof protocol drafted (owner: "strong first
  draft … the right Gate 05H direction"). Low-voltage bench only, no live
  HV, no vehicle: HIL simulator + simulated CAN nodes + analog/digital IO +
  fault-injection unit + VCU as DUT. **Recurrence caught, fourth gate
  (RC-180): the 10/20/50/100/2 ms + 3-cycle HIL timings were written like
  real pass/fail limits** — same defect family as the 200 ms HVIL
  fabrication (RC-116), Gate 08C placeholder-authority (RC-133), Gate 05F
  (RC-169/173), Gate 05G (RC-174); downgraded to SimulationSweepOnly /
  SupplierDataPending; matrix header "Pass Criteria Metric" → "HIL
  Observation Metric / Candidate Pass Criteria" + Authority Status. Other
  corrections: `[HIL_OBSERVED]` not `[PASS]`, return
  `HIL_OBSERVED_NO_GATE_AUTHORITY` (RC-181); CAN_1 short test simulated /
  bench-replica only, forbidden on a live Ford bus (RC-182); power-loss
  safe-state measured not assumed (RC-183); per-HIL-run proof-artifact
  package + configurable script timeout (RC-184). Scripts stay illustrative
  pseudocode — no firmware exists. **Nothing ingested; nothing Confirmed;
  no placeholder timing has gate authority; no factory-bus transmission; no
  vehicle/live-HV clearance; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_42/review_39 archives are 1:1 against the
  owner's chat ("42:75"); every HIL timing is SimulationSweepOnly; no
  script reports PASS; the CAN_1 short test is bench-only; nothing marked
  Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-27).
- Gate-state snapshot: 04B/04C/06 first pass; **05 STARTED — 05A/05B done;
  05C STATE_MACHINE_DRAFTED; 05D STATE_OWNERSHIP_MATRIX_CREATED; 05E
  ICD_SIGNAL_BOUNDARIES_MAPPED; 05F NETWORK_BOUNDARY_RULES_CREATED; 05G
  FAILSAFE_MATRIX_MAPPED; 05H HIL_TEST_PROTOCOL_DRAFTED /
  BENCH_EXECUTION_NOT_STARTED (`GATE05H_HIL_BENCH_TEST_PROTOCOL.md`); Gate
  05I or Gate 06 deep dive NEXT (owner's call)**; 07 v0.1 / 07B
  (`MASS_LEDGER.md`) / 07C v0.4 PARKED (`AXLE_CG_CALCULATOR.md`); 08
  FMEA_REGISTRY_CREATED (15 modes); 08B SOURCE_CANDIDATES_MAPPED PARKED;
  **08C SIMULATION_SWEEP_MATRIX_CREATED — PARKED_FOR_SUPPLIER_DATA**. Order
  after 05: 06 deep dive → 09 → 10 → 11.
- Build artifacts: `MASS_LEDGER.md`, `AXLE_CG_CALCULATOR.md`,
  `FMEA_REGISTRY.md`, `DRAFT_VALIDATION_08C.md`, `GATE05_CONTROLS.md`,
  `GATE05A_SIGNAL_REGISTRY.md`, `GATE05B_CONTROLS_DEPENDENCY_MAP.md`,
  `GATE05C_STATE_MACHINE.md`, `GATE05D_OWNERSHIP_MATRIX.md`,
  `GATE05E_ICD_SIGNAL_AUTHORITY.md`, `GATE05F_NETWORK_BOUNDARY.md`,
  `GATE05G_FAILSAFE_MATRIX.md`, `GATE05H_HIL_BENCH_TEST_PROTOCOL.md`.
- Doctrine: **D-007** (controls-authority) + RC-168 (signal-decomposition)
  + RC-173/179/180 (no unproven timing as gate logic; faults default safe;
  HIL timings are sweep-only) bind all Gate 05x + downstream controls work.
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner (now
  covers PATS bypass, ZF-CAN/duty, gas/diesel, compliance-labels,
  transmit-config, and the invented-timing family RC-116/133/169/174/180 —
  five artifacts; strongest scanner case); (9)(10)(11) approve/send Dana /
  ZF / Ford-Lee letters; (12) supplier reminder; (13) official Ford BBLB +
  IVM + FMVSS 305a/105 + paid Gate 08B standards + official Ford UIM/BBAS/
  J1939 docs + supplier BMS/inverter/VCU/DC-DC/charger DBCs; (14) brake
  engineer for FMVSS 105; (15) confirm donor is 7.3L gas (001A) + donor
  data; (16) inverter/BMS firmware timing + HV safety plan; (17) firmware
  signoff (BQ-26); (18) BMS/PDU pre-charge + contactor + HV-shutdown
  ownership (BQ-27).

## Next exact action

Expected next inputs, in any order: (a) the owner's **next batch** — a
further Gate 05 proof step (e.g. Gate 05I) if the controls-proof series
continues, or the **Gate 06 deep dive** (Mechanical Mounting / Battery
Enclosure) per the standing order after Gate 05 (06 → 09 → 10 → 11). Archive
1:1, reconcile, apply owner corrections verbatim, commit + push. **Enforce
D-007 + RC-168 + RC-173/179/180: every proof is bench/HIL, no vehicle, no
live-HV without a staged safety plan + LOTO/PPE (RC-117); no timeout /
threshold / HIL timing gains physical authority until a source/HIL-approved
requirement upgrades it from SimulationSweepOnly to SupplierConfirmed /
BenchVerified; report HIL-observed, never PASS; the VCU coordinates but owns
nothing safety-critical (contactors / pre-charge / HV shutdown / torque)
until the BMS/PDU supplier architecture proves it (BQ-27); CAN_1 stays
listen-only; EV-side outputs stay isolated; no factory-bus transmission;
NEVER "PATS bypass"; nothing Confirmed; no compliance claim.** (b) A Gate
08C reopen if supplier thresholds land. (c) Gate 08B reopen if official
standard PDFs arrive. (d) Gate 07A/07C field data. (e) A supplier reply —
archive 1:1, reconcile, move the matching BQ to the Resolution log. (f) The
owner approves/sends a letter — record Sent + date, start that BQ's
7/14/21-day clock. Enforce throughout: nothing Confirmed; no
compliance/"safe" claim; NEVER "PATS bypass" or bus spoofing; NEVER invent a
threshold / timeout / grant a placeholder pass-block; no Ford signal is
confirmed until an official source proves it; the VCU does not own HV
shutdown until supplier architecture confirms it; keep diesel data out of
the 001A gas model (D-006).

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
  Ford-side CAN IDs/rates/PGNs RC-137/140/145; the pre-charge >95% number
  RC-156; the 50 ms / 100 ms gateway timeouts RC-169/173; the 50 ms /
  100 ms / 2 ms failsafe timeouts RC-174/179; the 10/20/50/100/2 ms +
  3-cycle HIL timings RC-180).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- **Gate 05 (D-007 + RC-168 + RC-173/179/180 bind): authorized/listen-only
  only — no anti-theft bypass, no fake/spoofed ABS/ESC messages, no transmit
  onto factory Ford safety buses without approval (RC-136/142/148);
  accel-pedal never drives inverter torque directly (RC-141/146); no
  factory-cluster warning injection (RC-151); the VCU does not own
  pre-charge / HV shutdown / contactors until the BMS/PDU architecture
  confirms it (RC-150/152/157/158/164/165/171; BQ-27); Ford signals don't
  gate real state transitions (RC-155); torque command stays strictly in
  DRIVE_ENABLED (RC-160); SERVICE_MODE requires HV de-energized / LOTO /
  absence-of-voltage (RC-163); a signal cannot be both a request and a
  hardware actuation unless the source says so (RC-168); Ford source
  controllers stay generic until proven (RC-166); CAN_1 stays listen-only
  (selected/wired/configured, not "modified", RC-172; simulated/bench only
  for fault injection, RC-182) with the RC-167 proof pack; no timeout /
  heartbeat / alive-counter / torque-zero / shutdown / contactor-open / HIL
  timing becomes physical gate logic until supplier docs or HIL/bench proof
  (RC-173/174/179/180); no "instant" mechanical/E-stop contactor action —
  supplier-defined + bench/HIL-verified (RC-175); power-loss safe-state is
  measured not assumed (RC-183); HIL scripts report HIL-observed not PASS
  (RC-181); every HIL run produces the proof-artifact package (RC-184);
  every torque / contactor / BMS-discharge / HVIL / isolation / e-stop
  fault defaults toward torque inhibit + restart lockout + engineering
  review (RC-179).**
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
      `docs/status/BLOCKED_QUESTIONS_LEDGER.md`, and the build artifacts
      (`MASS_LEDGER.md`, `AXLE_CG_CALCULATOR.md`, `FMEA_REGISTRY.md`,
      `DRAFT_VALIDATION_08C.md`, `GATE05_CONTROLS.md`,
      `GATE05A_SIGNAL_REGISTRY.md`, `GATE05B_CONTROLS_DEPENDENCY_MAP.md`,
      `GATE05C_STATE_MACHINE.md`, `GATE05D_OWNERSHIP_MATRIX.md`,
      `GATE05E_ICD_SIGNAL_AUTHORITY.md`, `GATE05F_NETWORK_BOUNDARY.md`,
      `GATE05G_FAILSAFE_MATRIX.md`, `GATE05H_HIL_BENCH_TEST_PROTOCOL.md`)
      read

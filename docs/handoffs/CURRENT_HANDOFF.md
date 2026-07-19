# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 43 + review_40 — Gate 05H v2 HIL
  refinement + the 05H-A/05H-B/05I sub-gate split); awaiting the Gate 05I
  Physical Bench Proof batch or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `c075641` — Archive raw RH batch 43 + review_40 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- **Updated** file: **`docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md`** —
  now the v2 protocol (05H-A/05H-B/05I sub-gate split, tighter ACK/TXD
  proof, Timing Authority field, bench-profile labels, corrected script
  language).
- Files changed (reconciliation commit):
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (RC-185..189;
  section 51 — no new CS), `docs/research/RESEARCH_MAP.md` ("next" → Gate
  05I), `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (Gate 05H refined + split;
  Gate 05I → NEXT), `docs/CHANGELOG.md`, handoff files. (Raw archives
  `batch_43_gate05h_v2_hil_refinement.md`, `review_40_batch_43_verdict.md`,
  PROVENANCE committed separately as `c075641`.)
- Summary: Gate 05H refined (owner: "strong Gate 05H draft … the right
  direction"). **Main structural upgrade (RC-185): 05H is not "simulation
  only"** — a real VCU DUT + transceivers + supply + oscilloscope + FIU is
  bench/HIL evidence → split into **05H-A** (simulation script draft),
  **05H-B** (low-voltage HIL bench execution with a real VCU →
  `HIL_BENCH_OBSERVED / NO_VEHICLE_CLEARANCE`), **05I** (physical bench
  proof, NOT STARTED); a real run returns `HIL_OBSERVED_VALID / NO_LIVE_HV /
  NO_VEHICLE_CLEARANCE / NO_COMPLIANCE_AUTHORITY`. Other corrections:
  ACK/listen-only proof must watch the VCU TX/TXD line, not the decoded CAN
  log (RC-186); CAN-H/CAN-L short bench-only, forbidden on a live Ford
  network (RC-187); Timing Authority field + `…_NO_GATE_AUTHORITY` script
  returns — fourth-gate recurrence of the invented-timing family labeled
  (RC-188); LV rail profiles = TestBenchProfileCandidate /
  NotFinalVehicleRequirement / NeedsComponentSpec (RC-189). **Nothing
  ingested; nothing Confirmed; no placeholder timing has gate authority;
  scripts are pseudocode not production code; no vehicle / live-HV
  clearance; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_43/review_40 archives are 1:1 against the
  owner's chat ("43:75"); the 05H-A/05H-B/05I split + statuses match the
  owner's verdict; the ACK proof now specifies the TXD-line method; every
  HIL timing carries a Timing Authority label; nothing marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-27).
- Gate-state snapshot: 04B/04C/06 first pass; **05 STARTED — 05A/05B done;
  05C STATE_MACHINE_DRAFTED; 05D STATE_OWNERSHIP_MATRIX_CREATED; 05E
  ICD_SIGNAL_BOUNDARIES_MAPPED; 05F NETWORK_BOUNDARY_RULES_CREATED; 05G
  FAILSAFE_MATRIX_MAPPED; 05H HIL_TEST_PROTOCOL_DRAFTED (split 05H-A /
  05H-B / 05I), BENCH_EXECUTION_PENDING (`GATE05H_HIL_BENCH_TEST_
  PROTOCOL.md`); 05I Physical Bench Proof NEXT**; 07 v0.1 / 07B
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
  + RC-173/179/180/188 (no unproven timing as gate logic; faults default
  safe; HIL timings are sweep/observed-only) bind all Gate 05x + downstream
  controls work.
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner (now
  covers PATS bypass, ZF-CAN/duty, gas/diesel, compliance-labels,
  transmit-config, and the invented-timing family RC-116/133/169/174/180/188
  — five artifacts; strongest scanner case); (9)(10)(11) approve/send Dana /
  ZF / Ford-Lee letters; (12) supplier reminder; (13) official Ford BBLB +
  IVM + FMVSS 305a/105 + paid Gate 08B standards + official Ford UIM/BBAS/
  J1939 docs + supplier BMS/inverter/VCU/DC-DC/charger DBCs; (14) brake
  engineer for FMVSS 105; (15) confirm donor is 7.3L gas (001A) + donor
  data; (16) inverter/BMS firmware timing + HV safety plan; (17) firmware
  signoff (BQ-26); (18) BMS/PDU pre-charge + contactor + HV-shutdown
  ownership (BQ-27).

## Next exact action

Expected next inputs, in any order: (a) the **Gate 05I Physical Bench Proof
batch** (scope in `GATE_RESEARCH_QUEUE.md`; HIL protocol in
`GATE05H_HIL_BENCH_TEST_PROTOCOL.md`) — physical bench proof with
production-like wiring / harness / components, running only after Gate 05H-B
HIL bench observation + engineering review; still no vehicle and no live HV
without a staged safety plan + LOTO/PPE (RC-117). **Enforce D-007 + RC-168 +
RC-173/179/180/188: no timeout / threshold / HIL timing gains physical
authority until a source/HIL-approved requirement upgrades it from
SimulationSweepOnly / HILObservedOnly to SupplierConfirmed / BenchVerified;
report HIL-observed, never PASS; CAN_1 stays listen-only with the TXD-line
proof (RC-186), bench-only fault injection (RC-187); the VCU coordinates but
owns nothing safety-critical (contactors / pre-charge / HV shutdown /
torque) until the BMS/PDU supplier architecture proves it (BQ-27); EV-side
outputs stay isolated; no factory-bus transmission; NEVER "PATS bypass";
nothing Confirmed; no compliance claim.** (b) The **Gate 06 deep dive**
(Mechanical Mounting / Battery Enclosure) per the standing order after Gate
05 (06 → 09 → 10 → 11). (c) A Gate 08C reopen if supplier thresholds land.
(d) Gate 08B reopen if official standard PDFs arrive. (e) Gate 07A/07C field
data. (f) A supplier reply — archive 1:1, reconcile, move the matching BQ to
the Resolution log. (g) The owner approves/sends a letter — record Sent +
date, start that BQ's 7/14/21-day clock. Enforce throughout: nothing
Confirmed; no compliance/"safe" claim; NEVER "PATS bypass" or bus spoofing;
NEVER invent a threshold / timeout / grant a placeholder pass-block; no Ford
signal is confirmed until an official source proves it; the VCU does not own
HV shutdown until supplier architecture confirms it; keep diesel data out of
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
  3-cycle HIL timings RC-180/188; the 11.8–14.2 V / 20 V/ms / 0–5 V bench
  profiles as vehicle requirements RC-189).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- **Gate 05 (D-007 + RC-168 + RC-173/179/180/188 bind): authorized/
  listen-only only — no anti-theft bypass, no fake/spoofed ABS/ESC
  messages, no transmit onto factory Ford safety buses without approval
  (RC-136/142/148); accel-pedal never drives inverter torque directly
  (RC-141/146); no factory-cluster warning injection (RC-151); the VCU does
  not own pre-charge / HV shutdown / contactors until the BMS/PDU
  architecture confirms it (RC-150/152/157/158/164/165/171; BQ-27); Ford
  signals don't gate real state transitions (RC-155); torque command stays
  strictly in DRIVE_ENABLED (RC-160); SERVICE_MODE requires HV de-energized
  / LOTO / absence-of-voltage (RC-163); a signal cannot be both a request
  and a hardware actuation unless the source says so (RC-168); Ford source
  controllers stay generic until proven (RC-166); CAN_1 stays listen-only
  (selected/wired/configured, not "modified", RC-172; simulated/bench only
  for fault injection, RC-182/187; TXD-line ACK proof, RC-186) with the
  RC-167 proof pack; no timeout / heartbeat / alive-counter / torque-zero /
  shutdown / contactor-open / HIL timing becomes physical gate logic until
  supplier docs or HIL/bench proof (RC-173/174/179/180/188); no "instant"
  mechanical/E-stop contactor action — supplier-defined + bench/HIL-verified
  (RC-175); power-loss safe-state is measured not assumed (RC-183); HIL
  scripts report HIL-observed not PASS (RC-181/188); every HIL run produces
  the proof-artifact package (RC-184); Gate 05H is bench/HIL evidence not
  simulation-only, split 05H-A/05H-B/05I (RC-185); every torque / contactor
  / BMS-discharge / HVIL / isolation / e-stop fault defaults toward torque
  inhibit + restart lockout + engineering review (RC-179).**
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

# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 47 + review_44 — Gate 05I-A
  revised + Gate 05I-B Mechanical Interlocks); awaiting the Gate 05I-C
  Low-Voltage Communications Integration batch or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `595bbbe` — Archive raw RH batch 47 + review_44 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- New file: **`docs/status/GATE05I_B_MECHANICAL_INTERLOCKS.md`** (12-row
  mechanical-interlock matrix + bench-run traceability package). Updated:
  **`docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md`** (added
  `SERVICE_CLEAR_RULES_DEFINED / ROOT_CAUSE_FLOW_DEFINED`; RC-208 note).
- Files changed (reconciliation commit): those two deliverables,
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (RC-208..209;
  section 55 — no new CS), `docs/research/RESEARCH_MAP.md` ("next" → Gate
  05I-C), `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (05I-A revised; 05I-B
  created; 05I-C → NEXT with verbatim scope), `docs/CHANGELOG.md`, handoff
  files. (Raw archives `batch_47_gate05ia_revised_gate05ib_interlocks.md`,
  `review_44_batch_47_verdict.md`, PROVENANCE committed separately as
  `595bbbe`.)
- Summary: the Hunter re-emitted 05I-A with the review_43 fixes realized
  (HVIL ownership RC-205, the **Service Clear Operational Law** RC-206, the
  RCA flow RC-207 — owner: "the Service Clear Operational Law is
  excellent"), and added **Gate 05I-B** (physical safety-loop verification:
  E-stop circuit, HVIL connectors, service-disconnect LOTO, charge-port
  interlock, contactor-simulator coil path, safety-relay dropout, fuse/PDB,
  strain relief, connector keying, ground/shield continuity, bench LOTO).
  **Recurrence caught, eighth artifact (RC-208):** the re-emitted 05I-A
  matrix STILL carried hard timing/percentages + the mis-used
  "Blocked Outputs" column (RC-202/203 not applied by the Hunter), and 05I-B
  added new numeric criteria (<0.1 Ω / <0.02 Ω / ≤20 ms / 5 A-10 A) — all
  labeled `BENCH_TARGET_PROFILE` / `TARGET_BENCH_CRITERIA /
  NEEDS_COMPONENT_DATASHEET / NEEDS_ENGINEERING_REVIEW`; the torque-zero
  response is an expected safe output, not a blocked output; "direct
  contactor control by VCU" added to blocked outputs. 05I-B breach logic
  uses `approved_ground_limit` / `approved_datasheet_limit` variables, not
  hard-coded 0.02 Ω / 20 ms (RC-209). **Nothing ingested; nothing Confirmed;
  scripts are pseudocode not production code; the VCU requests but does not
  own HV isolation; Gate 05J NOT YET; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_47/review_44 archives are 1:1 against the
  owner's chat ("47:75"); the 05I-A status additions + the 05I-B matrix +
  the RC-208/209 corrections + Gate 05I-C scope match the owner's verdict;
  nothing marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-27).
- Gate-state snapshot: 04B/04C/06 first pass; **05 STARTED — 05A/05B done;
  05C..05G done; 05H HIL_VALIDATION_PROTOCOL_CREATED (v3); 05I
  LOW_VOLTAGE_BENCH_INTEGRATION_STARTED; 05I-A BENCH_TEST_MATRIX_CREATED
  (+SERVICE_CLEAR_RULES_DEFINED/ROOT_CAUSE_FLOW_DEFINED); 05I-B
  MECHANICAL_INTERLOCK_MATRIX_CREATED (`GATE05I_B_MECHANICAL_INTERLOCKS.md`);
  05I-C Low-Voltage Communications Integration NEXT; Gate 05J / live vehicle
  commissioning NOT YET**; 07 v0.1 / 07B (`MASS_LEDGER.md`) / 07C v0.4
  PARKED (`AXLE_CG_CALCULATOR.md`); 08 FMEA_REGISTRY_CREATED (15 modes); 08B
  SOURCE_CANDIDATES_MAPPED PARKED; **08C SIMULATION_SWEEP_MATRIX_CREATED —
  PARKED_FOR_SUPPLIER_DATA**. Order after 05: 06 deep dive → 09 → 10 → 11.
- Build artifacts: all `docs/status/GATE05*` files (through
  `GATE05I_A_DRIVER_SAFETY_LOGIC.md`, `GATE05I_B_MECHANICAL_INTERLOCKS.md`),
  `MASS_LEDGER.md`, `AXLE_CG_CALCULATOR.md`, `FMEA_REGISTRY.md`,
  `DRAFT_VALIDATION_08C.md`.
- Doctrine: **D-007** (controls-authority) + RC-168 (signal-decomposition)
  + RC-173/179/180/188/202/208 (no unproven timing/percentage/criterion as
  gate logic) + RC-190/191/197 (HIL/bench is evidence, not vehicle
  authority) + RC-205 (VCU requests, does not own HV isolation) + RC-206
  (service-clear never clears active safety faults) bind all Gate 05x +
  downstream controls work.
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner (now
  covers PATS bypass, ZF-CAN/duty, gas/diesel, compliance-labels,
  transmit-config, the invented-values family RC-116/133/169/174/180/188/
  202/208 — eight artifacts — and the "instant/immediate" mechanical-timing
  pattern RC-175/198/204; strongest scanner case); (9)(10)(11) approve/send
  Dana / ZF / Ford-Lee letters; (12) supplier reminder; (13) official Ford
  BBLB + IVM + FMVSS 305a/105 + paid Gate 08B standards + official Ford
  UIM/BBAS/J1939 docs + supplier BMS/inverter/VCU/DC-DC/charger DBCs; (14)
  brake engineer for FMVSS 105; (15) confirm donor is 7.3L gas (001A) +
  donor data; (16) inverter/BMS firmware timing + HV safety plan; (17)
  firmware signoff (BQ-26); (18) BMS/PDU pre-charge + contactor +
  HV-shutdown ownership (BQ-27).

## Next exact action

Expected next inputs, in any order: (a) the **Gate 05I-C Low-Voltage
Communications Integration batch** (scope in `GATE_RESEARCH_QUEUE.md`; 05I-A
logic in `GATE05I_A_DRIVER_SAFETY_LOGIC.md`, 05I-B interlocks in
`GATE05I_B_MECHANICAL_INTERLOCKS.md`) — bench-only comms verification: CAN_2
VCU↔inverter, CAN_3 VCU↔BMS/PDU, display-node comm, diagnostic-tool comm,
heartbeat, message filtering, DBC version matching, wrong-DTC/wrong-ID
rejection, bus load under max frame density, **no CAN_1 leakage during all
comm tests**. **Enforce: bench-only — no live HV, no vehicle motion, no Ford
factory-bus transmission; CAN_1 listen-only with the TXD-line proof
(RC-186/200), no leakage; the VCU requests but does not own HV isolation
(RC-205; BQ-27); no timing/threshold/bus-load number becomes a rule until
controls review + supplier/DBC confirmation upgrades it (RC-202/208); BENCH
result categories + HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW (RC-197/207/209);
NEVER "PATS bypass"; nothing Confirmed; no compliance claim; Gate 05J / live
vehicle commissioning NOT YET.** (b) The **Gate 06 deep dive** (Mechanical
Mounting / Battery Enclosure) per the standing order after Gate 05 (06 → 09
→ 10 → 11). (c) A Gate 08C reopen if supplier thresholds land. (d) Gate 08B
reopen if official standard PDFs arrive. (e) Gate 07A/07C field data. (f) A
supplier reply — archive 1:1, reconcile, move the matching BQ to the
Resolution log. (g) The owner approves/sends a letter — record Sent + date,
start that BQ's 7/14/21-day clock. Enforce throughout: nothing Confirmed; no
compliance/"safe" claim; NEVER "PATS bypass" or bus spoofing; NEVER invent a
threshold / timeout / percentage / criterion / grant a placeholder
pass-block; no Ford signal is confirmed until an official source proves it;
the VCU does not own HV shutdown until supplier architecture confirms it;
keep diesel data out of the 001A gas model (D-006).

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
  RC-156; the gateway/failsafe/HIL timeouts RC-169/173/174/179/180/188; the
  bench profiles RC-189; the Gate 05I-A timing/percentages RC-202; the
  Gate 05I-A/05I-B bench criteria RC-208).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- **Gate 05 (D-007 + RC-168 + RC-173/179/180/188/202/208 + RC-190/191/197 +
  RC-205/206 bind): authorized/listen-only only — no anti-theft bypass, no
  fake/spoofed ABS/ESC messages, no transmit onto factory Ford safety buses
  without approval (RC-136/142/148); accel-pedal never drives inverter
  torque directly (RC-141/146); no factory-cluster warning injection
  (RC-151); the VCU requests but does not own pre-charge / HV shutdown /
  contactors / HV isolation until the BMS/PDU architecture confirms it
  (RC-150/152/157/158/164/165/171/205; BQ-27); Ford signals don't gate real
  state transitions (RC-155); torque command stays strictly in DRIVE_ENABLED
  (RC-160); SERVICE_MODE + UDS service-clear require safe/neutral + LOTO /
  absence-of-voltage and must never clear active hardwired/HVIL/E-stop/BMS/
  isolation faults or a live latch (RC-163/206); a signal cannot be both a
  request and a hardware actuation unless the source says so (RC-168); Ford
  source controllers stay generic until proven (RC-166); CAN_1 stays
  listen-only (not "modified", RC-172; simulated/bench + non-destructive
  fault injection only, RC-182/187/192/193/200; TXD-line ACK proof, RC-186;
  no leakage during comm tests) with the RC-167 proof pack; no timeout /
  heartbeat / alive-counter / torque-zero / shutdown / contactor-open / HIL
  timing / bench percentage / mechanical criterion becomes physical gate
  logic until supplier docs / datasheet or HIL/bench proof + controls review
  (RC-173/174/179/180/188/202/208); no "instant"/"immediate"
  mechanical/E-stop/torque action — measured latency vs schematic +
  datasheets (RC-175/198/204); power-loss safe-state measured not assumed
  (RC-183); HIL scripts report `…_NO_VEHICLE_AUTHORITY` / `HIL_HARD_BLOCK`,
  Gate 05I/05I-A/05I-B report BENCH categories, never PASS
  (RC-181/188/191/197); HIL/bench results are not vehicle/live-HV/compliance
  authority (RC-190); every run produces the proof-artifact package +
  calibration records (RC-184/194) + pre-test safety checklist (RC-195);
  expected-safe-output ≠ blocked-output (RC-203/208); a hard block is
  `HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW` with RCA recovery, not permanent
  (RC-207); breach limits are variables not hard-coded constants (RC-209);
  Gate 05H is bench/HIL evidence split 05H-A/05H-B/05I (RC-185); Gate 05I is
  low-voltage only, harness production-intent (RC-196/199); Gate 05I-A/05I-B
  driver-safety + interlocks are bench-only (RC-201); Gate 05J / live vehicle
  commissioning is NOT YET; every torque / contactor / BMS-discharge / HVIL /
  isolation / e-stop fault defaults toward torque inhibit + restart lockout +
  engineering review (RC-179).**
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
      (all `docs/status/GATE05*` files, `MASS_LEDGER.md`,
      `AXLE_CG_CALCULATOR.md`, `FMEA_REGISTRY.md`, `DRAFT_VALIDATION_08C.md`)
      read

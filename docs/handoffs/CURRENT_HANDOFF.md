# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 49 + review_46 — Gate 05I-C full
  comms + sleep/wake matrix, delivered as "48:75 B follow-up"); awaiting the
  Gate 05I-D Integrated Fault Sequence batch or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `bffed4d` — Archive raw RH batch 49 + review_46 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- **Updated** file: **`docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md`** — now the
  full 8-row comms + sleep/wake matrix (05I-C1 + 05I-C2), stress profiles,
  DBC version control, isolation-resolution IF logic.
- Files changed (reconciliation commit): that deliverable,
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (RC-215..219;
  section 57 — no new CS), `docs/research/RESEARCH_MAP.md` ("next" → Gate
  05I-D), `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (05I-C1/C2 matrix created;
  05I-D → NEXT with verbatim scope), `docs/CHANGELOG.md`, handoff files.
  (Raw archives `batch_49_gate05ic_comms_matrix.md`,
  `review_46_batch_49_verdict.md`, PROVENANCE committed separately as
  `bffed4d`.)
- Summary: the Gate 05I-C full matrix landed (owner: "exactly the right next
  gate … the real hidden-failure layer") — CAN_1 silent mode, bus loading &
  error integrity, DBC schema/scale mismatch, wrong-ID/corrupted-packet
  rejection, loss-of-heartbeat timeout, diagnostic/UDS, sleep/wake &
  quiescent current, network-induced wakeup + stress profiles + DBC version
  control. **Recurrence caught, tenth artifact (RC-215):** all the
  timings/percentages/currents (>15 ms, 100 ms, 50 ms, ≤2.0 s, ≤1.0 mA,
  ≤200 ms, 75-90%, 10 m, 110 turns/m, >4.5 V, >150 °C) → BENCH_TARGET_PROFILE;
  sleep current split per-node + total-system; IF logic made variable. Other
  corrections: CAN_1 ACK proof via the VCU TXD path (RC-216); frame-fault
  layering — controller-level bad-CRC/DLC vs app-level wrong-ID/DBC/counter
  (RC-217); DBC version hash stored/declared/logged, mismatch =
  BENCH_HARD_BLOCK_PENDING_REVIEW (RC-218); CAN_1 bench interface simulated
  OEM / protected only, no live Ford network (RC-219). **Nothing ingested;
  nothing Confirmed; scripts are pseudocode not production code; the VCU
  requests but does not own HV isolation; Gate 05J NOT YET; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_49/review_46 archives are 1:1 against the
  owner's chat ("48:75 B follow up"); the Gate 05I-C status + the RC-215..219
  corrections + Gate 05I-D scope match the owner's verdict; nothing marked
  Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-27).
- Gate-state snapshot: 04B/04C/06 first pass; **05 STARTED — 05A/05B done;
  05C..05G done; 05H HIL_VALIDATION_PROTOCOL_CREATED (v3); 05I
  LOW_VOLTAGE_BENCH_INTEGRATION_STARTED; 05I-A FINAL_BASELINE_MATRIX_CREATED;
  05I-B MECHANICAL_INTERLOCK_MATRIX_CREATED; 05I-C
  NETWORK_INTEGRITY_MATRIX_CREATED / SLEEP_WAKE_VALIDATION_INCLUDED
  (`GATE05I_C_COMMS_SLEEP_WAKE.md`); 05I-D Integrated Fault Sequence NEXT;
  Gate 05J / live vehicle commissioning NOT YET**; 07 v0.1 / 07B / 07C v0.4
  PARKED; 08 FMEA_REGISTRY_CREATED (15 modes); 08B PARKED; **08C
  SIMULATION_SWEEP_MATRIX_CREATED — PARKED_FOR_SUPPLIER_DATA**. Order after
  05: 06 deep dive → 09 → 10 → 11.
- Build artifacts: all `docs/status/GATE05*` files (through
  `GATE05I_C_COMMS_SLEEP_WAKE.md`), `MASS_LEDGER.md`,
  `AXLE_CG_CALCULATOR.md`, `FMEA_REGISTRY.md`, `DRAFT_VALIDATION_08C.md`.
- Doctrine: **D-007** + RC-168 + RC-173/179/180/188/202/208/212/215 (no
  unproven timing/percentage/criterion/bus-load/current as gate logic) +
  RC-190/191/197 (HIL/bench is evidence, not vehicle authority) + RC-205
  (VCU requests, does not own HV isolation) + RC-206 (service-clear never
  clears active safety faults) + RC-213 (a DBC is a database not a packet) +
  RC-218 (DBC version hash enforced) bind all Gate 05x + downstream controls
  work.
- Open owner decisions (accumulated): (1) elektron-os-clean; (2) index.html;
  (3) L2; (4) L4; (5) L6; (6) L9 lane name; (7) Artifact Intake Form; (8)
  M10 forbidden-phrase + regression scanner (now covers PATS bypass,
  ZF-CAN/duty, gas/diesel, compliance-labels, transmit-config, the
  invented-values family RC-116/133/169/174/180/188/202/208/212/215 — ten
  artifacts — and the "instant/immediate" pattern RC-175/198/204/211;
  strongest scanner case); (9)(10)(11) Dana / ZF / Ford-Lee letters; (12)
  supplier reminder; (13) official Ford BBLB + IVM + FMVSS 305a/105 + paid
  Gate 08B standards + official Ford UIM/BBAS/J1939 docs + supplier BMS/
  inverter/VCU/DC-DC/charger DBCs; (14) brake engineer for FMVSS 105; (15)
  confirm donor is 7.3L gas (001A) + donor data; (16) inverter/BMS firmware
  timing + HV safety plan; (17) firmware signoff (BQ-26); (18) BMS/PDU
  pre-charge + contactor + HV-shutdown ownership (BQ-27).

## Next exact action

Expected next inputs, in any order: (a) the **Gate 05I-D Low-Voltage
End-to-End Bench Run / Integrated Fault Sequence batch** (scope in
`GATE_RESEARCH_QUEUE.md`; 05I-C matrix in `GATE05I_C_COMMS_SLEEP_WAKE.md`) —
test everything together as a **combined sequence** (driver input, brake
override, E-stop, HVIL open, BMS no-discharge, inverter fault, CAN heartbeat
loss, display warning, diagnostic lockout, sleep/wake recovery, CAN_1
silence), not isolated tests. **Enforce: bench-only — no live HV, no vehicle
motion, no Ford factory-bus transmission; CAN_1 listen-only + no leakage
(TXD-line proof, RC-186/216/219); a DBC is a database not a packet +
version-hash enforced (RC-213/218); no timing/threshold/bus-load/current
becomes a rule until controls review + supplier/DBC confirmation upgrades it
(RC-202/208/212/215); no "immediate" — measured window (RC-211); the VCU
requests but does not own HV isolation (RC-205; BQ-27); BENCH result
categories + HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW (RC-197/207/209); NEVER
"PATS bypass"; nothing Confirmed; no compliance claim; Gate 05J NOT YET.**
(b) The **Gate 06 deep dive** (Mechanical Mounting / Battery Enclosure) per
the standing order after Gate 05 (06 → 09 → 10 → 11). (c) A Gate 08C reopen
if supplier thresholds land. (d) Gate 08B reopen if official standard PDFs
arrive. (e) Gate 07A/07C field data. (f) A supplier reply — archive 1:1,
reconcile, move the matching BQ to the Resolution log. (g) The owner
approves/sends a letter — record Sent + date, start that BQ's 7/14/21-day
clock. Enforce throughout: nothing Confirmed; no compliance/"safe" claim;
NEVER "PATS bypass" or bus spoofing; NEVER invent a threshold / timeout /
percentage / criterion / bus-load / current / grant a placeholder
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
  bench profiles RC-189; the Gate 05I-A/05I-B/05I-C bench
  values/criteria/percentages/bus-loads/currents RC-202/208/212/215).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- **Gate 05 (D-007 + RC-168 + RC-173/179/180/188/202/208/212/215 +
  RC-190/191/197 + RC-205/206/213/218 bind): authorized/listen-only only —
  no anti-theft bypass, no fake/spoofed ABS/ESC messages, no transmit onto
  factory Ford safety buses without approval (RC-136/142/148); accel-pedal
  never drives inverter torque directly (RC-141/146); no factory-cluster
  warning injection (RC-151); the VCU requests but does not own pre-charge /
  HV shutdown / contactors / HV isolation until the BMS/PDU architecture
  confirms it (RC-150/152/157/158/164/165/171/205; BQ-27); Ford signals
  don't gate real state transitions (RC-155); torque command stays strictly
  in DRIVE_ENABLED (RC-160); SERVICE_MODE + UDS service-clear require
  safe/neutral + LOTO / absence-of-voltage and must never clear active
  hardwired/HVIL/E-stop/BMS/isolation faults or a live latch (RC-163/206); a
  signal cannot be both a request and a hardware actuation unless the source
  says so (RC-168); a DBC is a database not a packet + version-hash enforced,
  mismatch hard-blocks (RC-213/218); frame-fault layering — controller-level
  bad-CRC/DLC vs app-level wrong-ID/DBC/counter (RC-217); Ford source
  controllers stay generic until proven (RC-166); CAN_1 stays listen-only
  (not "modified", RC-172; simulated/bench + non-destructive fault injection
  only, RC-182/187/192/193/200/219; TXD-line ACK proof, RC-186/216; no
  leakage during comm/sleep tests) with the RC-167 proof pack; no timeout /
  heartbeat / alive-counter / torque-zero / shutdown / contactor-open / HIL
  timing / bench percentage / mechanical criterion / bus-load / sleep-current
  becomes physical gate logic until supplier docs / datasheet / DBC or
  HIL/bench proof + controls review
  (RC-173/174/179/180/188/202/208/212/215); no "instant"/"immediate"
  mechanical/E-stop/torque action — measured latency vs schematic +
  datasheets (RC-175/198/204/211); power-loss safe-state measured not
  assumed (RC-183); HIL scripts report `…_NO_VEHICLE_AUTHORITY` /
  `HIL_HARD_BLOCK`, Gate 05I/05I-A/05I-B/05I-C report BENCH categories, never
  PASS (RC-181/188/191/197); HIL/bench results are not
  vehicle/live-HV/compliance authority (RC-190); every run produces the
  proof-artifact package + calibration records (RC-184/194) + pre-test
  safety checklist (RC-195); expected-safe-output ≠ blocked-output
  (RC-203/208); a hard block is `HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW` with
  RCA recovery, not permanent (RC-207); breach limits are variables not
  hard-coded constants (RC-209/215); Gate 05H split 05H-A/05H-B/05I
  (RC-185); Gate 05I low-voltage only, harness production-intent
  (RC-196/199); Gate 05I-A/05I-B/05I-C/05I-D driver-safety + interlocks +
  comms + integration are bench-only (RC-201/214); Gate 05J / live vehicle
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

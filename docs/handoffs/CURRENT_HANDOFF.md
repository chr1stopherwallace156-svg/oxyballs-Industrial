# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 61 "59A" + review_58 — Gate 05M-C1
  re-emit + Gate 05M-C2 Restricted Creep Torque Validation, the first powered
  ground-contact movement gate); awaiting the Gate 05M-C3 Controlled Closed-Area
  Low-Speed Movement batch or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `54aa6d8` — Archive raw RH batch 61 + review_58 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- New file: **`docs/status/GATE05M_C2_RESTRICTED_CREEP.md`** — the **first
  powered ground-contact movement gate** (tires touch the ground under live
  traction, restricted creep only), **split 05M-C2A (Flat-Ground Restricted
  Creep, 12-row matrix 05M-C2A-001..012) / 05M-C2B (Controlled Incline /
  Rollback Hold) / 05M-C2C (Faulted Creep Recovery)**. Numeric Threshold
  Authority Rule, the test-surface rule (predictable traction, not
  low-friction), the Ground Movement Precondition (RC-285), the torque
  ramp-rate/clamp doctrine (`dT_command/dt`), and exit criteria permitting Gate
  05M-C3 only.
- Files changed (reconciliation commit): that deliverable,
  `docs/DECISION_REGISTER.md` (**D-008 amended** — 05M-C2 created + A/B/C
  split), `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (RC-284..288;
  section 69 — no new CS), `docs/research/RESEARCH_MAP.md` ("next" → Gate
  05M-C3), `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (05M-C2
  FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE; 05M-C3 → NEXT),
  `docs/CHANGELOG.md`, handoff files. (Raw archives
  `batch_61_gate05mc1_reemit_gate05mc2_creep.md`,
  `review_58_batch_61_verdict.md`, PROVENANCE committed separately as
  `54aa6d8`.)
- Summary: Gate 05M-C2 introduced — the first time the vehicle can physically
  roll under power. Six owner corrections applied verbatim: **predictable-
  traction surface, not low-friction (RC-283 re-emphasized)**; **`dT/dt` not
  `dQ/dt` (RC-284)**; **all numbers INITIAL_TARGET_PROFILE (RC-267)**; **the
  Ground Movement Precondition — brake/brake-assist/steering-assist verified,
  E-stop armed + remote active, spotters + runout clear, clamp + ramp active,
  engineer/test-lead explicit start authorization (RC-285)**; **split
  05M-C2A/B/C, rollback/incline deferred (RC-286)**; **breakaway → NEEDS_REVIEW
  not auto-diagnosis (RC-287)**; **no "absolute 0 Nm"/"instantly" wording
  (RC-288)**. **CRITICAL regression watch:** the Hunter re-emitted the
  05M-C1-005 "hand-lock one lifted wheel" line (RC-279 — the deliverable already
  holds the corrected rated-fixture wording). **Nothing ingested; nothing
  Confirmed; no normal driving; no public road; no customer operation; no
  "certified safe"/compliance claim; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_61/review_58 archives are 1:1 against the owner's
  chat ("59A"); the Gate 05M-C2 status + the six RC-284..288 corrections + the
  05M-C2A/B/C split + the D-008 amendment match the owner's verdict; nothing
  marked Confirmed; no movement authorized (05M-C2 is defined, engineer-gated)

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-27).
- Gate-state snapshot: 04B/04C/06 first pass; **05 STARTED — 05A/05B done;
  05C..05G done; 05H (v3); 05I..05I-D matrices; 05J
  CONTROLLED_VEHICLE_FITMENT_DEFINED; 05K
  LOW_VOLTAGE_VEHICLE_POWER_ON_DEFINED / NO_REAL_HV_CONTACTOR_CLOSURE; 05L-A
  HV_AUTHORIZATION_GATE_CREATED; 05L-B
  CONTROLLED_HV_PRECHARGE_OBSERVATION_READY; 05L-C
  HV_SHUTDOWN_DISCHARGE_REPEATABILITY_READY; 05M-A
  INVERTER_READY_ZERO_TORQUE_VALIDATION_READY; 05M-B
  NO_LOAD_MOTOR_SPIN_VALIDATION_DEFINED; 05M-C1
  COUPLED_DRIVELINE_LIFTED_WHEEL_READINESS_DEFINED / NO_GROUND_CONTACT; 05M-C2
  FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE / GROUND_CONTACT_PRESENT /
  RESTRICTED_CREEP_ONLY (`GATE05M_C2_RESTRICTED_CREEP.md`, split 05M-C2A/B/C);
  Gate 05M-C3 (controlled closed-area low-speed movement) NEXT per D-008
  (amended review_58)**; 07 v0.1 / 07B / 07C v0.4 PARKED; 08
  FMEA_REGISTRY_CREATED (15 modes); 08B PARKED; **08C
  SIMULATION_SWEEP_MATRIX_CREATED — PARKED_FOR_SUPPLIER_DATA**. Order after
  05: 06 deep dive → 09 → 10 → 11.
- Build artifacts: all `docs/status/GATE05*` files (through
  `GATE05M_C2_RESTRICTED_CREEP.md`), `MASS_LEDGER.md`,
  `AXLE_CG_CALCULATOR.md`, `FMEA_REGISTRY.md`, `DRAFT_VALIDATION_08C.md`.
- Doctrine: **D-007** (controls-authority) + **D-008** (staged post-bench
  gate ladder to HV; never "certified safe"; amended — 05J → 05K → 05L-A →
  05L-B → 05L-C → 05M-A → 05M-B → 05M-C1 → 05M-C2 (05M-C2A → 05M-C2B → 05M-C2C)
  → 05M-C3; each engineer-approved) + the **Numeric Threshold Authority Rule**
  (RC-267) + RC-168 + the invented-values family through RC-267 + RC-190/191/197
  (HIL/bench is evidence, not vehicle authority) + RC-205/227/247/265 (VCU
  requests/monitors; BMS/PDU owns contactor/pre-charge; the inverter owns its
  gating; hardwired loop + service brakes own the stopping/interruption path) +
  RC-206 (service-clear never clears active safety faults) + RC-213/218 (a DBC
  is a database, version hash enforced) + RC-224 (never "certified safe") + the
  Gate 05x chain RC-229..288 (incl. **RC-279 no manual restraint of rotating
  parts, RC-280 lifted-chassis safety, RC-282 wheel-speed read-only, RC-285
  Ground Movement Precondition, RC-286 05M-C2A/B/C split**) bind all Gate 05x +
  downstream controls work.
- Open owner decisions (accumulated): (1) elektron-os-clean; (2) index.html;
  (3) L2; (4) L4; (5) L6; (6) L9 lane name; (7) Artifact Intake Form; (8)
  M10 forbidden-phrase + regression scanner (invented-values family through
  RC-267 — nineteen artifacts — the "instant/immediate" pattern
  RC-175/198/204/211/225/255/274/281/288, "certified safe" RC-224, and the
  **RC-257→263→268, RC-256→264, RC-261→269, RC-271→275, RC-277, RC-279 (safety-
  critical), RC-283 recurrences** — the strongest scanner cases); (9)(10)(11)
  Dana / ZF / Ford-Lee letters; (12) supplier reminder; (13) official Ford BBLB
  + IVM + FMVSS 305a/305/105 + OSHA electrical/LOTO + NHTSA EV + ISO 6469-3 +
  rated-lift/rotating-machinery sources (RC-237..288, NeedsExactSource) + paid
  Gate 08B standards + Ford UIM/BBAS/J1939 docs + **Ford ABS/ESC wheel-speed
  authorization (RC-282)** + supplier BMS/inverter/VCU/DC-DC/charger DBCs + IMD
  supplier manual + pre-charge/contactor datasheets + inverter/motor +
  driveline (gear ratio, axle/GAWR, wheel-speed, brake-override response window,
  steering/brake assist, creep torque/ramp/breakaway) data for 05L-B/C/05M
  (RC-242..288; BQ-27); (14) brake engineer for FMVSS 105; (15) confirm donor
  is 7.3L gas (001A) + donor data; (16) inverter/BMS firmware timing + HV safety
  plan; (17) firmware signoff (BQ-26); (18) BMS/PDU pre-charge + contactor +
  HV-shutdown ownership (BQ-27).

## Next exact action

Expected next inputs, in any order: (a) the **Gate 05M-C3 Controlled Closed-Area
Low-Speed Movement batch** (scope in `GATE_RESEARCH_QUEUE.md`; 05M-C2 in
`GATE05M_C2_RESTRICTED_CREEP.md`; ladder in D-008) — the last rung of the split
05M-C phase, only after Gate 05M-C2 (05M-C2A flat-ground creep → 05M-C2B
incline/rollback → 05M-C2C faulted-creep recovery). **Enforce: engineer-gated,
live-HV, CLOSED CONTROLLED AREA ONLY, NO public road / NO customer operation /
NO normal-driving authority; the Hunter's "up to 15 km/h" is
INITIAL_TARGET_PROFILE pending supplier + engineering approval (RC-267); the
Ground Movement Precondition (RC-285) + predictable-traction surface (RC-283) +
spotters + remote E-stop hold; wheel-speed stays read-only, not traction-control
authority (RC-282); CAN_1 listen-only (RC-172/230); the inverter owns its
gating, the BMS/PDU owns contactors/pre-charge, the hardwired loop + service
brakes own the stopping path, the VCU requests/monitors + enforces the clamp
(RC-247/265/205/227; BQ-27); no manual restraint of rotating parts (RC-279); no
automatic retry after an E-stop (RC-262); torque ramp-rate is `dT_command/dt`
(RC-284); breakaway anomalies → NEEDS_REVIEW not auto-diagnosis (RC-287); no
absolute-zero/instant wording (RC-288); never "certified safe" / compliance
claim (RC-224); OSHA/NHTSA/FMVSS/ISO citations are NeedsExactSource; NEVER "PATS
bypass"; nothing Confirmed.** (b) A detailed **05M-C2A/05M-C2B/05M-C2C** pass if
the owner sends one. (c) The **Gate 06 deep dive** (Mechanical Mounting /
Battery Enclosure) per the standing order after Gate 05 (06 → 09 → 10 → 11).
(d) A Gate 08C reopen if supplier thresholds land. (e) Gate 08B reopen if
official standard PDFs arrive. (f) Gate 07A/07C field data. (g) A supplier
reply — archive 1:1, reconcile, move the matching BQ to the Resolution log.
(h) The owner approves/sends a letter — record Sent + date, start that BQ's
7/14/21-day clock. Enforce throughout: nothing Confirmed; no
compliance/"safe"/"certified" claim; NEVER "PATS bypass" or bus spoofing;
NEVER invent a threshold / timeout / percentage / criterion / current /
clearance / AVV / pre-charge / discharge / inverter / spin / creep / dT/dt /
breakaway threshold or grant a placeholder pass-block; no Ford signal is
confirmed until an official source proves it; wheel-speed/ABS/ESC data never
becomes traction-control authority without Ford authorization; the VCU does not
own HV shutdown or inverter gating until supplier architecture confirms it;
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
  RC-156/245/252/260/267; the gateway/failsafe/HIL timeouts RC-169/173/174/
  179/180/188; the bench profiles RC-189; the Gate 05I bench values RC-202/
  208/212/215/220/225; the Gate 05J fitment target profiles RC-232; the Gate
  05K power-on target profiles RC-235; the Gate 05L-A safety-readiness + AVV
  threshold RC-241; the Gate 05L-B/05L-C pre-charge/contactor/discharge/retry
  targets RC-245/252; the Gate 05M-A/05M-B inverter/spin targets RC-260/267;
  the Gate 05M-C1 lifted targets RC-267; the Gate 05M-C2 creep targets — 0–5%
  dead-band / ≤20 Nm/sec `dT_command/dt` / ≤30 Nm clamp / 15–25 Nm breakaway /
  ≤5% parity / <2° incline / 15 km/h RC-267/284; the IMD 100/500 Ω/V candidates
  RC-251; the OSHA/NHTSA/FMVSS-305/ISO-6469-3 + rated-lift/rotating-machinery
  paraphrase RC-237..288).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- **Gate 05 (D-007 + D-008 + the Numeric Threshold Authority Rule + RC-168 +
  the invented-values family through RC-267 + RC-190/191/197 + RC-205/206/213/
  218/224/227/229/230/231/236/237..288 bind): authorized/listen-only only — no
  anti-theft bypass, no fake/spoofed ABS/ESC messages, no transmit onto factory
  Ford safety buses without approval (RC-136/142/148); **wheel-speed/ABS/ESC
  data is read-only / verification only and never becomes traction-control
  authority without Ford-authorized documentation + engineering review
  (RC-282)**; accel-pedal never drives inverter torque directly (RC-141/146),
  stays masked through 05M-A/05M-B (RC-271/272/275), and in 05M-C2 the pedal is
  a heavily clamped (≤30 Nm target) + ramp-limited (`dT_command/dt` ≤20 Nm/sec,
  RC-284) controlled test input under the Ground Movement Precondition (RC-285);
  no factory-cluster warning injection (RC-151); the VCU requests/monitors but
  does not own pre-charge / HV shutdown / contactors / HV isolation / inverter
  gating — the BMS/PDU owns contactor/pre-charge execution, the inverter owns
  its gating per its supplier state machine, and the hardwired loop + service
  brakes own the physical interruption / stopping path (RC-150/152/157/158/164/
  165/171/205/227/247/265; BQ-27); no real HV contactor closure at Gate 05K
  (RC-236); Gate 05L-A does not energize (RC-244); Gate 05L-B is live-HV but
  observational only (RC-245..250); the pre-charge/shutdown sequence is
  supplier-specific (RC-246/257/263/268) with a command↔aux-contact
  feedback-mismatch block (RC-268); no "absolute 0 Nm/V"/"immediately"/"instant"
  wording — supplier OFF state / zero-torque threshold + supplier response
  windows (RC-273/274/281/288), latency measured (RC-175/255); "current-limited"
  needs a real current-limit definition (RC-248); V_caps matches supplier
  topology not exact 0.0 V (RC-253) and the pre-charge rise is judged against a
  supplier envelope not a perfect RC curve (RC-261/269); timeout logic is
  elapsed-exceeds-limit (RC-254); the E-stop dropout is measured, allows no
  automatic retry ever (RC-255/262/249); 05L-C IMD fault injection uses an
  approved current-limited fixture only — never an ad-hoc resistor on a live
  rail (RC-256/264); weld detection splits false-positive vs false-negative
  (RC-258); Gate 05M-A is inverter-enable READINESS not spin — supplier-defined
  ready/torque-disabled state (never "Ready-to-Drive", RC-271/275), tolerance
  thresholds not perfect zero (RC-270), no assumed 0% PWM (RC-265/266); Gate
  05M-B is the first physical rotation with the motor UNCOUPLED + GUARDED
  (RC-272), coasting is not the watchdog failure (RC-276), over-speed via a
  supplier-supported test mode (RC-277); Gate 05M-C is split 05M-C1 (coupled,
  wheels lifted) → 05M-C2 (first ground contact; 05M-C2A/B/C) → 05M-C3 (RC-278/
  286); **Gate 05M-C1 forbids manual restraint of rotating parts — rated
  fixtures only, no hands near rotating parts ever (RC-279); it runs only on a
  rated lift / rated heavy-duty stands per GVWR/axle load, guarded, no personnel
  inline, no one under the vehicle during energized rotation (RC-280)**; **Gate
  05M-C2 is the first powered ground-contact gate — a flat/controlled/closed
  predictable-traction surface (never low-friction, RC-283), the Ground Movement
  Precondition gates every creep command (RC-285), torque is clamped + ramp-
  limited `dT_command/dt` (RC-284), rollback/incline is deferred to 05M-C2B
  (RC-286), breakaway anomalies → NEEDS_REVIEW not auto-diagnosis (RC-287),
  spotters + remote E-stop + runout, no public road / no customer / no
  normal-driving authority**; all numeric values across 05L-B..05M-C2 are
  INITIAL_TARGET_PROFILE with no gate authority until tied to supplier docs +
  engineering review + calibrated measurement method + raw proof + signed
  approval (RC-267); Ford signals don't gate real state transitions (RC-155);
  torque command stays strictly in DRIVE_ENABLED (RC-160); SERVICE_MODE + UDS
  service-clear require safe/neutral + LOTO / absence-of-voltage and must never
  clear active hardwired/HVIL/E-stop/BMS/isolation faults or a live latch
  (RC-163/206); a signal cannot be both a request and a hardware actuation
  unless the source says so (RC-168); a DBC is a database not a packet +
  version-hash enforced (RC-213/218); frame-fault layering (RC-217/222);
  charger-plug during drive = detect + reject (RC-226); Ford source controllers
  stay generic until proven (RC-166); CAN_1 stays listen-only (RC-172;
  simulated/bench + non-destructive fault injection only, RC-182/187/192/193/
  200/219/221; TXD-pin ACK proof, RC-186/216) with the RC-167 proof pack; the
  first connection to the live OEM Ford CAN_1 network (Gate 05J) is passive
  listen-only only, after the Gate 05H/05I-C proofs, via a Ford baseline scan →
  connect → post scan → compare (RC-230); parasitic draw measured/logged as
  OEM_baseline / conversion_added / total_vehicle (RC-231/234); the stored-
  energy discharge-wait rule guards DC-link caps (RC-242); PPE/tools/meters are
  voltage-matched, the gate blocks above rating (RC-239); personnel are
  qualified/authorized not "certified" (RC-238); fire assets are
  AHJ/supplier-ERG-selected (RC-240); Live-Dead-Live uses an approved proving
  source + resolution-aware threshold (RC-241); HIL scripts report
  `…_NO_VEHICLE_AUTHORITY` / `HIL_HARD_BLOCK`, Gate 05I* report BENCH
  categories, never PASS (RC-181/188/191/197); HIL/bench results are not
  vehicle/live-HV/compliance authority and **never "certified safe"**
  (RC-190/224); every run produces the proof-artifact package + calibration
  records (RC-184/194) + pre-test safety checklist (RC-195);
  expected-safe-output ≠ blocked-output (RC-203/208); a hard block is
  `HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW` (RC-207); breach limits are variables
  not hard-coded constants (RC-209/215); the post-bench ladder is staged +
  engineer-gated — 05J/05K no-HV, 05L-A authorization, 05L-B first-energization
  (observational), 05L-C shutdown/discharge/repeatability, 05M-A (inverter
  enable / zero-torque readiness) → 05M-B (no-load spin, uncoupled/guarded) →
  05M-C1 (coupled, wheels lifted) → 05M-C2 (first ground contact; 05M-C2A/B/C) →
  05M-C3 (closed-area low-speed movement) (D-008; RC-237..288); every torque /
  contactor / BMS-discharge / HVIL / isolation / e-stop fault defaults toward
  torque inhibit + restart lockout + engineering review (RC-179).**
- Do not recommend or run live-HV fault testing beyond the staged,
  engineer-gated scope; no ground contact / wheel torque path before Gate
  05M-C2 (05M-C1 is wheels-lifted only); no normal driving / open-floor / track
  / public road before the later engineer-gated road phases; staged testing only
  (RC-117) with LOTO/PPE/engineering signoff; no manual restraint of rotating
  parts (RC-279).
- Do not let the Build Engine claim compliance or mark anything safe /
  "certified safe" (RC-224).
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

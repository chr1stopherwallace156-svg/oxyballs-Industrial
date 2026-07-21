# DECISION REGISTER

Record of engineering decisions with lasting consequences. Entries are
append-only: a decision is never edited or removed, only superseded by a
later entry that references it.

**Entry format:**

```
## D-NNN — <short title>
- Date: YYYY-MM-DD
- Status: Accepted | Superseded by D-NNN
- Context: why the decision was needed
- Decision: what was decided
- Consequences: what this binds or unblocks
```

---

## D-008 — Staged post-bench gate ladder to HV: no jump to live commissioning

- Date: 2026-07-16
- Status: Accepted
- Context: Through the Gate 05I low-voltage bench series (05I-A logic → 05I-B
  interlocks → 05I-C comms/sleep-wake → 05I-D integrated fault cascades), the
  Hunter's Gate 05I-D exit language read "the low-voltage bench assembly is
  certified safe for installation into the physical vehicle chassis,
  initiating the physical commissioning phases." In owner review_48 the owner
  rejected "certified safe" and the direct jump from bench to live
  commissioning, and defined a staged, gated path instead.
- Decision: The path from the low-voltage bench to high voltage is a
  **staged ladder, each stage engineer-gated**:
  1. **Gate 05I-D** completion permits **engineering review for controlled
     low-voltage vehicle fitment only** — never "certified safe," and it does
     not authorize live HV, vehicle movement, road testing, chassis-dyno
     testing, customer operation, factory Ford bus transmission, or
     compliance/certification claims.
  2. **Gate 05J — Controlled Vehicle Fitment / No-HV Installation
     Readiness:** install the VCU/harness physically; **no HV battery, no
     traction enable**; CAN_1 listen-only; verify grounds/shields, connector
     routing, no chafing, service access, LOTO, 12 V parasitic draw in the
     chassis, no Ford bus disturbance.
  3. **Gate 05K — Low-Voltage Vehicle Power-On / No-HV Commissioning** — no
     HV, and **no real HV contactor closure** (coils disconnected / dummy
     loads / mechanically blocked, RC-236).
  4. **Gate 05L — Controlled HV First-Energization** — engineer-approved
     only, after 05J + 05K, with a staged safety plan + LOTO/PPE (RC-117).
     Split into **05L-A** (authorization & safety readiness — no energization)
     → **05L-B** (controlled HV first-energization / current-limited pre-charge
     observation) per the review_50/51 amendment below.
- **Amendment (owner review_50, batch_53, RC-237): Gate 05L splits — the
  05L rung must not open with "exact HV pre-charge timing."** It begins with
  **Gate 05L-A — HV First-Energization Authorization & Safety Readiness**, a
  pre-energization authorization gate (qualified HV personnel · written test
  plan · LOTO · PPE + insulated tools · emergency-stop plan · rescue/emergency
  response plan · fire watch/exclusion zone · absence-of-voltage verification
  · HV connector/cable inspection · isolation-monitor readiness · pre-charge
  ownership confirmation · contactor ownership confirmation · test-instrument
  calibration · supplier documentation · hard-stop conditions · proof
  artifacts · signoff), with **no final pre-charge/voltage/insulation/
  contactor timing unless supplier docs or engineering review provide them**.
  Only after 05L-A does the actual energization sequence get detailed. Owner
  cited OSHA LOTO (authorized-employee lockout; circuits energized until
  LOTO/de-energize/ground; only qualified persons on energized parts) + NHTSA
  EV HV-hazard guidance (NeedsExactSource — owner-paraphrased, not archived).
- **Amendment (owner review_51, batch_54, RC-238..244): Gate 05L-A created
  (`GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md`) — authorization only, no
  energization; the energization step is Gate 05L-B.** 05L-A itself does not
  energize: personnel are qualified/authorized (not "certified", RC-238), PPE
  is voltage-matched and the gate blocks above rating (RC-239), fire assets are
  AHJ/supplier-ERG-selected (RC-240), Live-Dead-Live uses an approved proving
  source with a resolution-aware threshold (RC-241), a stored-energy discharge
  wait guards DC-link caps (RC-242), IMD thresholds are supplier-defined
  (RC-243), and the pre-charge test is low-voltage-only with no DC-link rise
  (RC-244). **Gate 05L-B — Controlled HV First-Energization / Current-Limited
  Pre-Charge Observation** is attempted only after a signed Gate 05L-A
  authorization; it starts with a supplier-defined pre-charge target/timeout +
  current-limited setup + remote observation, and no vehicle movement /
  wheels-on-ground drive / road test / traction command / customer operation.
- **Amendment (owner review_52, batch_55, RC-245..251): Gate 05L-B created
  (`GATE05L_B_HV_FIRST_ENERGIZATION.md`) — the first gate with LIVE HV PRESENT,
  observational only (no inverter switching, zero motor RPM); insert Gate 05L-C
  before any motor spin.** 05L-B thresholds (95%/500 ms/50 ms/60 V/5% ΔV) are
  initial bench targets pending supplier docs + engineering review (RC-245);
  the contactor sequence is supplier-specific (RC-246); the VCU is
  requester/monitor while the BMS/PDU owns contactor/pre-charge execution and
  the hardwired loop owns emergency interruption (RC-247); "current-limited"
  requires a real current-limit definition or 05L-B stays blocked (RC-248); a
  manual E-stop abort path must be proven (RC-249); IMD thresholds
  (candidate 100/500 Ω/V) pend the supplier manual + FMVSS 305/ISO 6469-3
  (RC-251). **The ladder gains Gate 05L-C — Controlled HV Shutdown, Discharge,
  and Re-Energization Repeatability** (normal + emergency shutdown,
  stored-energy discharge, restart lockout, pre-charge retry limits, IMD fault
  response, contactor-feedback consistency, no weld false negatives,
  repeat-cycle stability). **Gate 05M (Traction Inverter Control Loop /
  Low-Speed Spin) is deferred — NOT before 05L-C** (RC-250). Full ladder:
  05J → 05K → 05L-A → 05L-B → 05L-C → (later, engineer-approved) 05M.
- **Amendment (owner review_53, batch_56, RC-252..259): Gate 05L-C created
  (`GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md`) — live-HV, zero motor RPM; and the
  05M traction phase is STAGED.** 05L-B/05L-C thresholds are target profiles
  pending supplier docs + engineering review (RC-252); the E-stop dropout is
  measured not "instant" (RC-255); the V_caps=0.0 V and inverted-timeout
  wordings are fixed (RC-253/254); IMD fault injection uses an approved
  current-limited fixture only — never an ad-hoc resistor on a live rail
  (RC-256); the contactor shutdown sequence is supplier-specific (RC-257); weld
  detection splits into false-positive (005A) + false-negative (005B) checks
  (RC-258). **The 05M rung splits: 05M-A (Inverter Enable Readiness /
  Zero-Torque Validation) → 05M-B (No-Load Motor Spin Validation) → 05M-C
  (Controlled Low-Speed Traction Readiness); the first 05M gate proves inverter
  enable with ZERO torque and ZERO rotation before any spin — not "low-speed
  traction"** (RC-259). Full ladder: 05J → 05K → 05L-A → 05L-B → 05L-C → 05M-A
  → 05M-B → 05M-C (each engineer-approved).
- **Amendment (owner review_54, batch_57, RC-260..266): Gate 05M-A created
  (`GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md`) — inverter enable readiness /
  zero-torque, HV bus live but readiness NOT spin.** All 05L-B/05L-C/05M-A
  numbers are target profiles (RC-260); the pre-charge curve is judged against
  a supplier envelope, not a perfect RC curve (RC-261); the E-stop path allows
  no automatic retry ever (RC-262); the inverter enabled/ready/PWM-active state
  is supplier-specific with no assumed 0% PWM and no power-stage switching
  unless the supplier defines it safe + engineering approves (RC-265); 05M-A is
  readiness not spin, and 05M-B is the first controlled no-load spin (RC-266).
  Regression watch: the Hunter re-emitted the 05L-C shutdown-order (RC-257) and
  IMD-fixture (RC-256) wording unfixed — recorded as RC-263/264, the strongest
  M10 regression-scanner cases; the `GATE05L_C_*` deliverable already held the
  corrected wording.
- **Amendment (owner review_55, batch_58, RC-267..272): Gate 05M-B created
  (`GATE05M_B_NO_LOAD_MOTOR_SPIN.md`) — first physical rotation, motor
  uncoupled/guarded; global target-profile rule + strengthened spin boundary.**
  All 05L-B/05L-C/05M-A/05M-B numbers are INITIAL_TARGET_PROFILE, with no gate
  authority until tied to supplier docs + engineering review + test-instrument
  method + raw proof artifact + signed approval (RC-267); the 05L-C shutdown
  order is supplier-defined with a command↔aux-contact feedback-mismatch block
  (RC-268, third recurrence of RC-257); the pre-charge RC curve is a comparison
  model only (RC-269, second recurrence of RC-261); 05M-A uses supplier
  tolerance thresholds not perfect zero (RC-270) and never says "Ready-to-Drive"
  (RC-271); **Gate 05M-B requires a guarded rotating shaft, no driveline
  attachment, no wheel torque path, no vehicle-movement path, E-stop +
  exclusion zone active, a supplier-defined spin profile only, and no cabin
  driver pedal authority** (RC-272). Regression watch: the 05L-C shutdown-order
  rule has recurred THREE times (RC-257→263→268) and the RC curve TWICE
  (RC-261→269) — the strongest M10 regression-scanner cases; the deliverables
  already hold the corrected wording. Full ladder unchanged: 05J → 05K → 05L-A
  → 05L-B → 05L-C → 05M-A → 05M-B → 05M-C (each engineer-approved).
- **Amendment (owner review_56, batch_59, RC-273..278): the Numeric Threshold
  Authority Rule is formalized and Gate 05M-C is SPLIT into 05M-C1 → 05M-C2 →
  05M-C3.** All 05L-B/05L-C/05M-A/05M-B numbers are INITIAL_TARGET_PROFILE with
  no gate authority until tied to supplier documentation + engineering review +
  **calibrated measurement method** + raw proof artifact + signed approval
  (RC-267 formalized). No-absolute-zero/"immediate" wording is removed:
  05L-B-005 uses the supplier OFF state below the approved off-state leakage
  threshold (RC-273); 05L-C-004 uses the supplier-defined IMD/BMS/PDU response
  window (RC-274); 05M-A never says "Ready-to-Drive" (RC-275, a recurrence of
  RC-271); 05M-B watchdog treats coasting as acceptable and only "still
  powered" as the failure (RC-276); the 05M-B over-speed test uses a
  supplier-supported test mode / pre-approved calibration profile, never a live
  safety-limit edit during rotation (RC-277). **Gate 05M-C splits: 05M-C1
  (Coupled Driveline Static / Lifted-Wheel Readiness — wheels lifted; proves
  coupling, backlash, wheel-speed sensing, brake override, torque clamp) →
  05M-C2 (Restricted Creep Torque Validation) → 05M-C3 (Controlled Closed-Area
  Low-Speed Movement); no open-floor movement before 05M-C1 proves the coupled
  mechanical/sensing/safety layer with the wheels lifted** (RC-278). Full
  ladder: 05J → 05K → 05L-A → 05L-B → 05L-C → 05M-A → 05M-B → 05M-C1 → 05M-C2
  → 05M-C3 (each engineer-approved).
- **Amendment (owner review_57, batch_60, RC-279..283): Gate 05M-C1 created
  (`GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md`) — first coupled test, driven axle
  LIFTED with zero ground contact; hard rotating-machinery + lift safety
  rules.** **No manual restraint of rotating parts — rated mechanical wheel
  restraint / differential / hub-locking fixture only, no hands near rotating
  wheels/shafts/hubs/belts/couplers ever (RC-279).** The **Lifted Chassis
  Safety Rule (RC-280)** — 05M-C1 runs only on a rated chassis lift or rated
  heavy-duty stands approved for the vehicle GVWR/axle load, secured against
  roll, suspension droop accounted for, wheel-rotation zones guarded, no
  personnel inline with rotating tires/shafts/hubs, and **no person under the
  vehicle while energized rotation tests are active**. Brake override is within
  the approved response window, not "instantly" (RC-281); **wheel-speed data is
  read-only / verification only — factory ABS/ESC never becomes traction-control
  authority without Ford-authorized documentation + engineering review
  (RC-282)**; Gate 05M-C2 (first ground contact) uses a flat, controlled, closed
  surface with predictable traction, runout, chocks/barriers, spotters outside
  the path, and a remote E-stop — never a default low-friction surface (RC-283,
  a separate future gate if ever tested).
- **Amendment (owner review_58, batch_61 "59A", RC-284..288): Gate 05M-C2
  created (`GATE05M_C2_RESTRICTED_CREEP.md`) — the first powered ground-contact
  movement gate — and SPLIT into 05M-C2A/B/C.** Torque ramp rate is
  `dT_command/dt` (not `dQ/dt`), acting on VCU torque output not raw pedal slope
  (RC-284); a **Ground Movement Precondition** gates every creep command —
  service-brake + brake-assist + steering-assist verified, E-stop armed + remote
  active, spotters + runout clear, torque clamp + ramp-rate limit active, and
  the engineer/test-lead's explicit start authorization (RC-285); Gate 05M-C2
  splits **05M-C2A (Flat-Ground Restricted Creep) → 05M-C2B (Controlled Incline
  / Rollback Hold) → 05M-C2C (Faulted Creep Recovery)**, with rollback/incline
  deferred out of the first ground-contact gate (RC-286); breakaway torque above
  the clamp triggers `NEEDS_REVIEW` / `MECHANICAL_BINDING_CHECK`, not an
  automatic "binding" diagnosis (RC-287); "absolute 0 Nm" → the supplier-defined
  zero-torque threshold and "instantly" → the supplier-approved response window
  (RC-288). **Regression watch: the Hunter re-emitted the 05M-C1-005
  "hand-lock one lifted wheel" line (RC-279 — SAFETY-CRITICAL) and re-defaulted
  the low-friction surface (RC-283); the deliverables already hold the corrected
  wording.** Full ladder: 05J → 05K → 05L-A → 05L-B → 05L-C → 05M-A → 05M-B →
  05M-C1 → 05M-C2 (05M-C2A → 05M-C2B → 05M-C2C) → 05M-C3 (each engineer-approved).
- **Amendment (owner review_59, batch_62 "60:60", RC-289..291): Gate 05M-C2
  cleanups — evidence columns, fault recovery, and no auto speed-unlock.** The
  05M-C2 matrix carries Proof Artifact + Authority Status + Build Engine Status
  columns like earlier gates (RC-289); a failed-creep / motion-related fault
  stays blocked until diagnostic review + fault-source correction + approved
  service clear + engineering/test-lead authorization — a hard reset alone must
  not clear it (RC-290); Gate 05M-C2 completion does NOT automatically "unlock
  15 km/h" — it permits engineering review for Gate 05M-C3 only, and any speed
  ceiling stays INITIAL_TARGET_PROFILE until engineering-approved (RC-291).
  **Full-draft regression watch:** the batch_62 Hunter re-emit of Gate 05M-C2
  reverted EVERY review_58 correction at once (RC-279 safety-critical +
  RC-283/284/286/288) — the strongest M10 regression-scanner case; the
  `GATE05M_C2_*` + `GATE05M_C1_*` deliverables already hold the corrected
  wording and did NOT regress.
- **Amendment (owner review_61, batch_64 "62:75", RC-292..296): Gate
  05M-C2A/05M-C2B pre-baseline cleanups — regression cleared.** After three
  batches (batch_62/63) of re-emitting the same defects, the Hunter finally
  applied all eight prior fixes (hand-lock removed, `dT_command/dt`, zero-torque
  threshold, response-window E-stop/neutral, diagnostic-review fault latch,
  rollback split to a PROVISIONAL 05M-C2B, Proof/Authority/Build-Engine-Status
  columns, no auto-15-km/h). Five new cleanups baseline the split gate: the
  Authority Status column names a `Required Approver` with `SIGNOFF_REQUIRED /
  NOT_EXECUTED` + `Build Engine Status: PENDING_EXECUTION` — never "Approved by"
  (no test executed, RC-292); the Numeric Threshold Authority Rule governs every
  05M-C2A/C2B value (RC-293); 15–25 Nm breakaway is an EXPECTED range, not a
  pass envelope — out-of-range → NEEDS_REVIEW, not auto-fail (RC-294);
  measurable thresholds replace "absolute control"/"completely active" (RC-295);
  static brake-hold uses a displacement threshold, not "completely hold static"
  (RC-296). 05M-C2A status adds `REQUIRED_APPROVERS_DEFINED` +
  `PROOF_ARTIFACTS_DEFINED`; 05M-C2B status = `PROVISIONAL_LOCKED /
  UNLOCKS_ONLY_AFTER_05M_C2A_SIGNOFF / CONTROLLED_INCLINE_ONLY /
  ROLLBACK_LIMITS_SUPPLIER_OR_ENGINEERING_APPROVED / …`. Owner: 05M-C2A/C2B is
  "clean enough to baseline"; next = Gate 05M-C3 with speed/ramp
  `INITIAL_TARGET_PROFILE` only (RC-291/293).
- **Amendment (owner review_63, batch_66 "64:75", RC-297..306): Gate
  05M-C2A/05M-C2B reach baseline-candidate — record-integrity + measurement
  authority.** The Hunter applied the framing corrections (bounded fault
  injection RC-297; brake/steering pre-movement interlock RC-298) and the owner
  added eight verdict corrections: the approval record splits into four fields
  so procedure approval ≠ result signoff — `Required Approver` / `Procedure
  Approval Status` / `Execution Status` / `Result Signoff Status`, a GLOBAL
  Build Engine rule, and no `SIGNED_PASS` until `EXECUTED` (RC-299); the Numeric
  Threshold Authority Rule links every value to source/calc + config +
  calibrated method + uncertainty + proof + procedure revision + signed
  authorization (RC-300); the clamp is renamed the software "Restricted Creep
  Torque Clamp", not a "hard/absolute clamp" (RC-301); zero-torque needs
  dual-channel APPS plausibility (RC-302); torque-rate and phase-current-response
  are validated separately (RC-303); CAN_1 passivity is defined electrically
  (RC-304); 05M-C2B gains a Rollback Containment Rule and hill-hold ≠
  parking-hold (RC-305); and a new 05M-C2A-010B test proves the assistance
  interlock actually inhibits torque (RC-306). 05M-C2A status adds
  `BASELINE_CANDIDATE / PROCEDURE_REVIEW_REQUIRED / BRAKE_ASSIST_INTERLOCK_REQUIRED
  / STEERING_ASSIST_INTERLOCK_REQUIRED / NUMERIC_LIMITS_INITIAL_TARGET_PROFILE /
  CONTROLLED_FAULT_INJECTION_ONLY / NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`;
  05M-C2B adds `UNLOCKS_ONLY_AFTER_C2A_SIGNED_PASS / ROLLBACK_CONTAINMENT_PLAN_REQUIRED
  / SECONDARY_RESTRAINT_REQUIRED / TEMPORARY_HILL_HOLD_ONLY /
  PARKING_HOLD_AUTHORITY_NOT_GRANTED`. Post-edit label:
  `GATE_05M_C2A_C2B_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — a procedure
  baseline, NOT evidence the physical vehicle has passed (nothing Confirmed).
  Next = Gate 05M-C3 with speed/ramp under engineering manual + proof artifacts
  only (RC-291/293/300).
- **Amendment (owner review_64, batch_67 "65:75", RC-307..312): Gate
  05M-C2A/05M-C2B procedure baseline — final make-it-impossible-to-misread
  pass.** The Hunter converged on all of RC-297..306 (incl. the split
  05M-C2A-005A/005B rows); the owner added six corrections plus a new
  `INVALID_TEST` signoff value (RC-299 ext.): the APPS preconditions read "within
  their approved operating windows", not "completely valid" (RC-307);
  phase-current response is judged against the supplier tracking envelope with
  expected latency/filtering/bandwidth included, not "without lagging" (RC-308);
  the E-stop forces the supplier-defined torque-inhibit + HV-isolation response,
  contactor coil-supply interruption only where the architecture requires it —
  not a universal rule (RC-309); Neutral is defined by zero propulsion torque,
  not a universal ban on bridge switching (RC-310); 05M-C2B gains a rollback
  abort rule — exceed the approved distance/speed → latch `FAIL`/`NEEDS_REVIEW`,
  no automatic second attempt (RC-311); and the brake-hold uses the "approved
  test torque profile" (≤10 Nm), not "full torque application" (RC-312). 05M-C2A
  upgrades `PROCEDURE_REVIEW_REQUIRED` → `FORMAL_ENGINEERING_REVIEW_REQUIRED` and
  adds `DUAL_CHANNEL_APPS_PLAUSIBILITY_REQUIRED / CAN_1_ELECTRICALLY_PASSIVE_ONLY
  / PROCEDURE_APPROVAL_REQUIRED / EXECUTION_NOT_YET_PROVEN /
  RESULT_SIGNOFF_NOT_YET_ELIGIBLE`; 05M-C2B adds `ROLLBACK_ABORT_RULE_REQUIRED /
  PARKING_RESTRAINT_AUTHORITY_NOT_GRANTED`. Post-edit label:
  `GATE_05M_C2A_C2B_PROCEDURE_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — the
  procedure is ready to be reviewed and controlled, NOT evidence the physical
  vehicle has passed (nothing Confirmed). Next = Gate 05M-C3, speed/ramp under
  engineering manual + proof artifacts only (RC-291/293/300).
- **Amendment (owner review_65, batch_68 "66:75", RC-313..326): Gate 05M-C3
  (Closed-Area Low-Speed Movement) created as a modular subgate sequence.** The
  Hunter applied the batch_67 corrections (RC-307..312) globally and delivered
  Gate 05M-C3 as **five linear subgates** the owner recommended — **05M-C3A
  Straight-Line Low-Speed Tracking → 05M-C3B Coast-Down + Foundation Brakes →
  05M-C3C Restricted Regeneration → 05M-C3D Steering-Angle / Propulsion-Envelope
  Map → 05M-C3E Closed-Area Fault + Abort Sequences** — with strictly linear
  progression (no unlock without the prior subgate's `SIGNED_PASS`), the
  Telemetry Synchronicity Packet, and the Critical Abort Hierarchy. Steering
  angle is an observation/derating input only, NOT torque-vectoring authority
  (`NO_TORQUE_VECTORING_AUTHORITY`); factory ABS/ESC stays authoritative
  (`NO_ACTIVE_ABS_ESC_AUTHORITY`); a path deviation / software fault must not
  auto-open HV contactors unless the approved architecture dictates. The owner
  added 14 corrections (RC-313..326): approved Runout Calculation Record not a
  hard-coded 50 m (RC-313); cell-by-cell envelope escalation (RC-314); governor
  proven first off-track (RC-315); split path-deviation observation vs
  torque-inhibit (RC-316); C3B-004 rewritten so brakes never fight sustained
  torque, SAFETY-CRITICAL (RC-317); contact thermocouples over IR (RC-318);
  ABS/ESC two-lane rule (RC-319); no "instant/immediate" regen (RC-320); brake
  blend continuity/jerk envelope not "linear" (RC-321); remove premature C3D
  numbers (RC-322); road-wheel geometry not SWA alone (RC-323); C3E cell-based
  fault escalation (RC-324); Test Configuration Lock Rule (RC-325); telemetry
  time-synchronization proof (RC-326). Post-edit label:
  `GATE_05M_C3_PROCEDURE_ARCHITECTURE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — the
  procedure architecture is ready for disciplined engineering review, NOT
  evidence the physical vehicle has passed (nothing Confirmed). New deliverable
  `docs/status/GATE05M_C3_CLOSED_AREA_MOVEMENT.md`. Full ladder: 05J → 05K →
  05L-A → 05L-B → 05L-C → 05M-A → 05M-B → 05M-C1 → 05M-C2 (05M-C2A → 05M-C2B →
  05M-C2C) → 05M-C3 (05M-C3A → 05M-C3B → 05M-C3C → 05M-C3D → 05M-C3E); each
  engineer-approved, never "certified safe" (RC-224).
- Consequences: Redefines the earlier "Gate 05J = live vehicle
  commissioning" placeholder — HV first-energization is pushed to **Gate
  05L**, engineer-approved, behind two no-HV fitment/power-on gates **and the
  05L-A authorization gate**. Binds the roadmap after Gate 05I-D. The Build
  Engine never marks a bench assembly "certified safe" (RC-224). Recorded in
  `docs/status/GATE05I_D_INTEGRATED_FAULT_CASCADES.md`,
  `docs/status/GATE05K_VEHICLE_POWER_ON.md`,
  `docs/status/GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md`,
  `docs/status/GATE05L_B_HV_FIRST_ENERGIZATION.md`,
  `docs/status/GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md`,
  `docs/status/GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md`,
  `docs/status/GATE05M_B_NO_LOAD_MOTOR_SPIN.md`,
  `docs/status/GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md`,
  `docs/status/GATE05M_C2_RESTRICTED_CREEP.md`,
  `docs/status/GATE05M_C3_CLOSED_AREA_MOVEMENT.md`. Supersedes nothing.

## D-007 — Controls-authority doctrine: Coordinator ≠ Owner + Build Engine Authority Law

- Date: 2026-07-16
- Status: Accepted
- Context: Through the Gate 05 controls work (05A–05D), a recurring risk
  appeared of the VCU quietly being treated as the owner of every
  safety-critical action (pre-charge, main contactors, HV shutdown, torque,
  Ford cluster/ABS-ESC), simply because it can see the signals or
  coordinate the state machine. In owner review_35 (batch_38, Gate 05D) the
  owner elevated the coordination principle to "a permanent Build Engine
  doctrine line."
- Decision: Adopt as permanent Build Engine doctrine —
  **Coordinator ≠ Owner · Requesting ≠ Commanding · Monitoring ≠ Approving ·
  Seeing a signal ≠ having authority to act on it** — paired with the
  **Build Engine Authority Law:** *No state transition may become
  physical-control authority until every action inside that transition has
  an assigned owner, an allowed requester, a blocked-controller list, and a
  proof artifact. If ownership is unknown, the VCU may simulate, monitor, or
  request only — it may not directly control.* A state may be **simulated**
  while ownership is pending; it may **not control physical hardware** until
  every action inside it has owner · requester · monitor · blocked
  controllers · proof artifact · verified source · test status.
- Consequences: Binds all controls gates (Gate 05x and downstream). Every
  state/action must carry an ownership label; the VCU coordinates but owns
  nothing safety-critical without documentation (contactor / pre-charge /
  HV-shutdown / torque ownership remain PENDING supplier architecture,
  BQ-27). Ford-side factory networks stay listen-only unless officially
  authorized; EV-side outputs stay isolated. Recorded in
  `docs/status/GATE05D_OWNERSHIP_MATRIX.md`. Supersedes nothing.

## D-006 — Split the donor platform: 001A (7.3L gas) vs 001B (6.7L diesel)

- Date: 2026-07-16
- Status: Accepted
- Context: The batch_26 Gate 07 payload introduced factory-component CG
  and weight data for a **6.7L Power Stroke diesel + 10R140**
  transmission, but the active build direction is the **7.3L gas**
  F-450/F-550 chassis cab. Diesel and gas powertrains differ in mass and
  CG, so mixing them would corrupt the weight/axle/CG model.
- Decision: Formalize two donor platforms — **Platform 001A =
  F-450/F-550 7.3L gas** (the active direction) and **Platform 001B =
  F-450/F-550 6.7L diesel** (separate, only if the donor is actually
  diesel). Removed-component weight and CG data must be tagged to the
  correct platform; diesel data may not enter the 001A model unless the
  donor truck is diesel.
- Consequences: Gate 07 (and the removed-mass ledger, Gate 07B) tracks
  component weights per platform; the engine/trans CG blocker (BQ-13) is
  a 001A gas value, not a diesel one. Binds which weight/CG figures are
  valid inputs; supersedes nothing.

## D-005 — Park supplier-only questions; proceed with supplier-independent research

- Date: 2026-07-16
- Status: Accepted
- Context: Gate 04 (and the powertrain gates) reached
  BLOCKED_PENDING_SUPPLIER_RESPONSE / BLOCKED_PENDING_SUPPLIER_DATA. The
  supplier letters are drafted but not yet sent (sending is an owner
  action), so the final numbers could be days or weeks away. Waiting
  idle wastes the interval; guessing the values would violate the
  Constitution.
- Decision: (1) Adopt a **park-and-proceed** operating rule — a gate
  that is blocked only on a supplier value is marked
  BLOCKED_PENDING_SUPPLIER_RESPONSE, its open question is logged in the
  new **Blocked Questions Ledger** (`docs/status/BLOCKED_QUESTIONS_LEDGER.md`,
  owner-specified 8-field structure), and research continues on the
  supplier-*independent* work: test plans, failure-mode logic, controls,
  mechanical mounting, and weight. (2) Adopt the owner's ordered,
  supplier-independent research plan — **Gate 04B → 04C → 05 → 06 →
  07 → 08** — captured with verbatim prompts in
  `docs/roadmaps/GATE_RESEARCH_QUEUE.md`. (3) Supplier data closes final
  numbers only; nothing researched in the interim may be marked
  Confirmed, claim compliance, or state the vehicle is safe.
- Consequences: the project is never idle on supplier latency; every
  parked value has a home, a follow-up date, and an explicit
  "alternative research allowed" path, so no blocked question is lost;
  the 7-day follow-up clock starts on each letter's actual send date.
  Supersedes nothing; extends the review_16 gate roadmap ordering.

## D-004 — Handoff fallback triggers, branch single-writer rule, deferred validity hashes

- Date: 2026-07-15
- Status: Accepted
- Context: "Nearing usage/context limits" is not reliably
  self-detectable by an agent, so continuity could fail on a missed
  prediction; and the protocol could still fail if two agents edited
  the same branch simultaneously.
- Decision: (1) Operational fallback triggers — a handoff is also
  mandatory after every completed source-ingestion batch, every
  meaningful commit, every two hours of uninterrupted work, any
  unresolved contradiction recorded, and any dirty working tree before
  switching agents. (2) Branch single-writer rule — only one agent may
  own and modify an active branch at a time; ownership lives in the
  handoff's `Agent owner` field; transfer requires commit-or-document,
  push, END_COMMIT, and owner reassignment; receivers must not edit
  until ownership names them. (3) Handoff validity hashes
  (handoff_file_hash, active_spec_hash, implementation_ledger_hash,
  blockers_file_hash) are deferred to M10 start — an enhancement, not
  a blocker; source ingestion is not delayed for it.
- Consequences: Continuity no longer depends on usage prediction;
  concurrent-edit conflicts are a protocol violation with a defined
  transfer procedure; the hash enhancement is tracked in the M10
  roadmap so it cannot be silently forgotten.

## D-003 — Install the Elektron cross-agent handoff protocol

- Date: 2026-07-15
- Status: Accepted
- Context: Multiple AI agents (Claude Code, Cursor) work in this
  repository across sessions with practical context limits. Without a
  shared handoff format, state is lost between agents and completion
  claims go unverified.
- Decision: One handoff format for all agents, defined in `AGENTS.md`
  (mirrored for Cursor in `.cursor/rules/elektron-build-engine.mdc`)
  with the template in `docs/handoffs/templates/`. Handoffs are
  mandatory before stopping, nearing usage/context limits, switching
  agents, or completing a milestone, and must include branch, start/end
  commit, files changed, tests run, test results, blockers, next exact
  action, and forbidden actions. Receiving agents verify git status,
  commit hash, active spec, and tests before modifying files. Work is
  never marked complete on agent statements alone — verification
  evidence goes in `docs/status/IMPLEMENTATION_LEDGER.md`. Phase truth
  lives in `docs/status/CURRENT_PHASE.md`; blockers in
  `docs/status/BLOCKERS.md`. `HANDOFF_LOG.md` is append-only evidence.
- Consequences: Any agent can resume from a cold start by reading
  `CURRENT_HANDOFF.md` and re-verifying. Unverified completion claims
  are structurally visible as `Claimed` ledger entries.

## D-002 — Modularize Revision 07; add source-ingestion phase before M10

- Date: 2026-07-15
- Status: Accepted
- Context: A single enormous Revision_07.md would be hard to review,
  version, and supersede. The approved Revision 07 doctrine exists as
  ~75 raw research exchanges that must be consolidated, not pasted in
  as-is.
- Decision: Revision 07 is constituted by modules 00–12 under
  `docs/specifications/rev07/`, indexed by `Revision_07.md` and
  `00_BASELINE_INDEX.md`; no module may override the Engineering
  Constitution. A dedicated phase — Revision 07 Source Ingestion and
  Consolidation (`roadmaps/REV07_SOURCE_INGESTION.md`) — precedes M10:
  raw batches are archived immutably under `docs/research/raw/`, then
  consolidated per module with full traceability. ODR-001..ODR-003 may
  not be resolved until all batches are processed, contradictions
  reviewed, the Baseline Index is complete, and the owner explicitly
  approves. No production code during ingestion.
- Consequences: M10 entry conditions now depend on the ingestion phase.
  Raw research is evidence (immutable); consolidated modules are the
  only path from research to active doctrine.

## D-001 — Adopt entry-point documentation structure

- Date: 2026-07-15
- Status: Accepted
- Context: Engineering doctrine will grow to hundreds of pages; a single
  README cannot hold it and remain maintainable.
- Decision: The README is the entry point only. Doctrine is split into
  the Engineering Constitution (stable rules), AI Instructions
  (operating manual), versioned specifications (one active), roadmaps
  (per milestone), and research registers, all under `/docs`.
- Consequences: Exactly one specification is marked
  `ACTIVE_SPECIFICATION` at a time; superseded revisions are archived in
  place. README baseline updates are made by proposal at milestone
  boundaries, never silently.

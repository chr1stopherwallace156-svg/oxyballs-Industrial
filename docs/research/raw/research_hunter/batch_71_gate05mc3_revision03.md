# Research Hunter — batch 71 (owner label "69:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). This is the raw external Research Hunter
> payload. Quotes, equations, and numeric values are Hunter-supplied and
> UNVERIFIED against source documents. Owner framing and the owner verdict are
> archived separately at `../owner_reviews/review_67_batch_71_verdict.md`.
>
> Context: **Gate 05M-C3 Revision 03.** The Hunter APPLIED the 13 batch_70
> corrections (RC-327..339) — the full RunoutCalculations_ID field tree, the
> Test Result Validity & Configuration Lock Rule, the Regenerative Command
> Baseline, the stepped-cell pipeline, the C3A-005 command-envelope wording, the
> split C3A-006 BOS/foundation-brake result, C3A-009B marked LOCKED (but with a
> contradictory PAS field), the C3C coexistence/blending lanes, the C3C-004 BMS
> authority, the no-arbitrary-injection C3C-005, the C3C-007 driver/brake
> response, the steering-signal state matrix, and the listed C3E fault
> hierarchy. The owner's verdict ("Revision 03 is the strongest version so far …
> a formal engineering baseline candidate") adds 11 further corrections before
> baseline lock (reconciled as RC-340..350; the C3A-009B contradiction fix is
> already applied in the deliverable via RC-328).

---

## Owner framing (chat, label "69:75") — QUESTION TOLD

The owner re-issued the batch_70 correction set (complete RunoutCalculation_ID
field list + `L_min` equation; keep C3A-009B locked; command envelope not
"linear"; separate BOS torque removal from foundation-brake stopping;
regen-disabled a command state; separate coexistence from true brake blending;
BMS charge permission not generic high SOC; ban arbitrary internal-bus
fault-message injection; driver/brake response after regen loss; steering-signal
validity states; complete the C3E single/paired/compound hierarchy; Test Result
Validity Rule). Full framing text preserved in the owner chat; the substantive
content is reproduced in the RESEARCH RESPOND below and in the review_67 verdict.

---

## RESEARCH RESPOND — Global Engineering Safety Amendments (Revision 03)

The following core revisions are permanently injected into the Build Engine governance rules, overriding all previous structural definitions for Gate 05M-C3.

1. Formally Quantified Runout Calculations & Evidence Record
The active RunoutCalculations_ID artifact must mathematically compile, map, and document the following required parameters before any dynamic tracking or track movement is authorized:
RunoutCalculations_ID Required Fields:
- Physical Inputs: Vehicle test mass (kg); Front and rear axle loading (kg); Tire size, pressure, condition, and temperature; Surface grade, condition, and estimated friction range (mu).
- Operational Targets: Authorized test-cell speed (m/s); Authorized traction torque (Nm); Authorized torque ramp rate (Nm/s).
- Dynamic Response Profiles: Maximum expected acceleration (m/s^2); Driver response allowance (s); Software/control response allowance (s); Torque-removal coast distance (m); Foundation-brake stopping distance (m).
- Environmental Envelopes: Wind and ambient conditions (where relevant).
- Measurement Uncertainty Vectors: Position-measurement uncertainty (m); Braking-distance measurement uncertainty (m).
- Run Execution Track Blueprint: Acceleration zone length (m); Stabilization zone length (m); Braking target zone (m); Post-target runout (m); Required containment margin (m); Physical restraint/barrier plan; Engineering calculation revision number; Required approver and signed authorization record.
The minimum absolute physical track length (L_min) required to authorize a test cell run is calculated via the following structural model:
L_min = acceleration zone + stabilization zone + planned braking distance + worst-case coast/stop allowance + uncertainty allowance + approved containment margin

2. Test Result Validity & Configuration Lock Rule
A signed test result applies strictly to the archived data state logged immediately prior to track execution.
Configuration Boundary Rule: Every archived configuration packet seals the vehicle state: [hardware_configuration, firmware/software_hashes, calibration_hashes, active_DBC_version, test-cell_limits, vehicle_mass/loading, tire_configuration, instrumentation_set, environmental_window]. Any change to these parameters immediately flags an automated IMPACT_REVIEW_REQUIRED state, classifying the previous tracking results into one of four states:
REUSABLE (No impact on verified safety logic).
PARTIALLY_REUSABLE (Selected boundary tests must be re-run).
REPEAT_TEST_REQUIRED (Complete subgate verification loop regression required).
INVALIDATED (Data cleared due to direct architectural variance).

3. Regenerative Command Baseline
All references to "regenerative braking disabled" specify a software command state where the VCU outputs a zero-torque command profile (0 Nm). The validation logs must tolerate trace electrical zero-torque tracking residuals (+/- 2 Nm) naturally occurring during real-world inverter bridge-switching or active field-weakening states without flagging an execution failure.

Gate 05M-C3 — Closed-Area Low-Speed Movement Sequence
Stepped Operating-Envelope Escalation Pipeline
No subgate may initialize at maximum provisional parameters. Progression follows a strict multi-tiered authorization cell structure:
Envelope Cell 1 [Minimal authorized speed/torque] -> Envelope Cell 2 [Expanded straight-line cell] -> Envelope Cell 3 [Higher approved cell parameters]
Each cell expansion requires an independent, signed TestCellAuthorization record. Passing a lower performance cell provides evidence but does not automatically unlock or authorize downstream cells.

Subgate 05M-C3A — Straight-Line Low-Speed Tracking
Legend: PAS | ES | RSS. All rows PAS=APPROVED_FOR_CONTROLLED_EXECUTION / ES=PENDING_EXECUTION / RSS=NOT_ELIGIBLE except C3A-009B (ES=LOCKED / UNDER REVIEW).
- C3A-001 Pre-Run Controls & Route — verify track clearance against the active RunoutCalculations_ID; pre-flight VCU diagnostic sweep. Target: clear linear runway meeting or exceeding calculated L_min. Test Lead.
- C3A-002 Straight-Line Forward — commanded forward path up to the active TestCellAuthorization limit, steering centred; track drift via external camera/survey markers vs VCU coordinates. Chassis Dynamics Lead.
- C3A-003 Straight-Line Reverse — commanded reverse path up to the active TestCellAuthorization limit; verify reverse-direction register + tracking. Test Lead.
- C3A-004 Speed Ceiling Enforcement — issue a commanded-speed/torque request exceeding the currently authorized software ceiling from below; prove first via HIL/SIL, lifted-wheel/dyno, or lowered thresholds. Safe: attenuation begins before physical speed crosses the authorized limit. Systems Safety Lead.
- C3A-005 Torque Ramp & Accel — step pedal 0% to the active cell threshold; check command slope against the approved envelope. Track [T_command, dT_command/dt, d²T_command/dt², reported_torque, phase_current, longitudinal_accel, jerk]. Safe: commanded torque remains within the approved time-domain command envelope, including torque-rate and jerk limits. Systems Engineer.
- C3A-006 Brake Override (Straight) — while maintaining a forward tracking command within the active cell, firmly apply the service brake; verify VCU-side BOS priority logic + physical master-cylinder tracking pressure. Safe: BOS Result — traction request removed within the approved response window; Foundation-Brake Result — vehicle decelerates within the approved C3B-derived envelope. Controls Director.
- C3A-007 Neutral Interruption — at straight-line forward crawl, shift PRND -> Neutral; monitor inverter torque-producing current registers. Safe: torque-producing current drops within the window; propulsion torque falls to zero. Test Lead.
- C3A-008 E-Stop / Torque Removal — at steady forward speed, actuate the remote/hardwired E-stop. Safe: hardwired loop forces the supplier-defined emergency torque-inhibit + isolation response. Safety Director.
- C3A-009A Path-Deviation Observation — straight-line runs while external instrumentation logs lateral offset; survey/camera/independent positioning act as evidence logs. Safe: external tracking matches VCU path models; provides human test-team abort indication. Blocked: attempting open/closed-loop automated correction using unvalidated data. Systems Safety Lead. (PAS=APPROVED_FOR_CONTROLLED_EXECUTION / ES=PENDING_EXECUTION / RSS=NOT_ELIGIBLE)
- C3A-009B Path-Deviation Torque-Inhibit Integration — STRICTLY BLOCKED. Closed-loop VCU torque-inhibit control authority driven by external tracking inputs is unapproved; remains locked pending formal approval of the external system interface, latency, and failure modes. Blocked: any real-time automated VCU authority driven by unvalidated tracking telemetry. Controls Director. (PAS=APPROVED_FOR_CONTROLLED_EXECUTION / ES=LOCKED / UNDER REVIEW / RSS=NOT_ELIGIBLE)  <-- CONTRADICTORY PAS FIELD (owner review_67 issue 4)
- C3A-010 Repeated-Run Consistency — 5 consecutive straight-line accel/decel sequences; evaluate variability across phase current + torque tracking logs. Calibration Engineer.

Subgate 05M-C3B — Coast-Down and Foundation Brakes
Regenerative braking remains in a commanded zero-torque state (0 Nm) throughout this entire subgate.
- C3B-001 Zero-Torque Coast-Down; C3B-002 Foundation-Brake Stop; C3B-003 Brake-Assist Stability under Repeated Stops; C3B-004 Brake Override with Minimal Authorized Propulsion Request (lowest approved request -> service brake -> BOS removes torque within the approved response window -> after removal, independently measure foundation-brake stopping; BOS-latency fault only in HIL/bounded, never on a moving vehicle; brakes must not fight sustained motor torque); C3B-005 Stopping-Distance Repeatability; C3B-006 Brake Temperature Observation (calibrated contact thermocouples / approved embedded sensors primary, IR supplemental).

Subgate 05M-C3C — Restricted Regeneration
Only after 05M-C3B SIGNED_PASS. Regeneration Dominance Rule: regen supplemental only; foundation brakes primary. During all evaluation steps independently track: requested regen torque, actual regen torque, hydraulic brake pressure, vehicle deceleration, deceleration jerk, pedal position, wheel-speed disagreement, active BMS charge-current limit.
Brake Blending Operational Lanes: Lane 1 (Independent Regen Coexistence Observation) — observe coexistence only; transition within the approved deceleration continuity/pedal/pressure/jerk envelope. Lane 2 (Coordinated Brake Blending) — STRICTLY BLOCKED until the pedal model, hydraulic pressure tracking model, deceleration target, failure modes, and control ownership are formally engineered and approved.
- C3C-001 Minimum Regenerative Request (<=5 Nm) — inverter handles phase-current inversion smoothly without torque ripples.
- C3C-002 Pedal-Lift Regenerative Response — map the negative-torque deceleration envelope; verify commands respect the tracking cap within the artifact-defined or engineering-approved regen-inhibit response window.
- C3C-003 Brake/Regeneration Coexistence Observation — execute Lane 1 to log the crossover region where master-cylinder pressure overlaps with inverter braking torque under manual driver application.
- C3C-004 Regen Bound Verification (BMS Authority) — regen availability is directly bounded by the active BMS charge-power/current permissions, pack voltage thresholds, cell-voltage ceilings, temperature states, contactor states, and supplier-defined operating limits, not a generic SOC percentage.
- C3C-005 Regen Inhibit during BMS Restriction — use an engineering-supported test mode, an approved signal-substitution fixture, a HIL interface, or a bounded conversion-side simulation to assert a charge-acceptance restriction; the VCU pulls back regen within the artifact-defined or engineering-approved response window. Arbitrary or unauthorized internal-bus message injection is strictly banned.
- C3C-006 Regen Removal during ABS/ESC-Related Conditions — Lane A (Factory Status Path): blocked unless Ford-specific documentation + formal interface approvals are engineering-established. Lane B (Conversion-Side Independent Wheel-Slip Plausibility): approved independent sensors or bounded simulation inhibit regen within the response window.
- C3C-007 Regen Fault Transition & Driver/Brake Response Rule — force a simulated inverter communication fault during active regeneration. Expected: regen request removed within the approved window with no lingering torque-producing or braking current outside the approved decay envelope; a driver warning asserts; full foundation-brake authority remains available; the driver applies the mechanical service brake manually per the test plan; the fault latches natively and blocks automatic regeneration restoration.  <-- "latches natively" ambiguous (owner review_67 issue 7)

Subgate 05M-C3D — Steering-Angle / Propulsion-Envelope Map
Steering input is an observation and derating envelope input only; not active stability control; factory ABS/ESC remains authoritative over wheel slip. To map inner/outer wheel-speed relationships: steering-wheel angle, steering ratio, measured or derived road-wheel angle, wheelbase, front/rear track width, tire rolling radius, axle ratio, differential type, expected inner/outer wheel-speed ratio, vehicle yaw rate (if independently measured), body/upfit load distributions.
Steering Signal State Matrix & Authority Rules:
VALID: operates normally within the approved active test cell boundaries.
DEGRADED: forces immediate further derating of active limits and inhibits envelope progression.  <-- "immediate" (owner review_67 issue 5)
IMPLAUSIBLE: VCU commands an immediate torque-inhibit request and logs a non-volatile fault latch.  <-- "immediate" (owner review_67 issue 5)
UNAVAILABLE: locks active tracking parameters and blocks all steering-dependent envelope expansion.
STALE: if a steering telemetry value remains unchanged beyond the approved timeout window, it is treated as invalid; the VCU drops propulsion authority to zero.  <-- "unchanged value" definition (owner review_67 issue 6)

Subgate 05M-C3E — Closed-Area Fault and Abort Sequences
All fault sequences must originate at the lowest signed operating-envelope cell. No fault test may be repeated at a higher cell until the lower cell has a complete SIGNED_PASS, fault containment is physically proven, runout remains valid, thermal state is acceptable, and the test lead separately authorizes escalation in writing. Every combined pair requires an approved engineering safety rationale; faults must not be combined randomly.
C3E Fault Escalation Hierarchy:
- Level 1 Single Fault Verification: APPS plausibility fault; steering signal invalid/stale; wheel-speed disagreement injection; inverter heartbeat communication loss; BMS charge-permission removal; brake-assist-not-ready; steering-assist-not-ready; auxiliary-voltage low threshold event; test-boundary alert; E-stop activation.
- Level 2 Repeated Single Fault Validation: repeat each approved Level 1 fault across permitted cells; verify latch consistency, zero auto-retry, thermal recovery.
- Level 3 Approved Paired Fault Sequences: signal fault + communication loss; assist-system fault + active torque request; regen request + charge-permission removal; steering plausibility fault + wheel-speed disagreement; low-voltage event + active propulsion request.
- Level 4 Compound Fault Integration: authorized only after Level 1-3 signed passes and formal hazard review.
The system passes only if faults cleanly latch into NVM, traction torque is removed via the designated abort hierarchy, and all automated retry / unvalidated re-power routines are blocked pending engineering diagnostic clearance.

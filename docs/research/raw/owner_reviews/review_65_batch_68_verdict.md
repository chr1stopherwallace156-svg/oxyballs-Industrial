# Owner review_65 — verdict on batch 68 (Research Hunter "66:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I). Owner
> framing ("QUESTION ASKED") + the owner verdict ("MY responds"). The raw
> Research Hunter payload is archived at
> `../research_hunter/batch_68_gate05mc3_modular_sequence.md`.

---

## Owner framing (chat, label "66:75") — QUESTION ASKED

The owner re-issued the review_64 items (1 four-field approval; 2 Numeric
Threshold Authority Rule — note the owner's paste garbled "Artifact
needed_DEFINED"/"ARTIFACT_DEFINED"; 3 remove "completely valid"; 4 current-loop
latency envelope; 5 architecture-dependent E-stop; 6 Neutral by zero propulsion
torque; 7 rollback abort rule; 8 "full torque" -> "approved test torque
profile") and then gave the Gate 05M-C3 build recommendation:

> Yes — proceed to Gate 05M-C3, but build it in smaller subgates rather than one
> large "track movement" gate.
>
> Recommended structure:
> 05M-C3A — Straight-Line Low-Speed Tracking
> 05M-C3B — Foundation-Brake and Coast-Down Validation
> 05M-C3C — Restricted Regenerative Deceleration
> 05M-C3D — Low-Speed Steering and Turning Validation
> 05M-C3E — Closed-Area Fault and Abort Sequences
>
> The first gate should be C3A — not steering maps yet. Before multi-turn
> steering or regeneration, prove: straight travel, predictable acceleration,
> speed-limit enforcement, pedal tracking, forward/reverse direction, path
> deviation, brake override, neutral interrupt, remote E-stop, assist-system
> stability, no unexpected wheel-speed disagreement. Only after a signed C3A
> pass should steering and cornering work unlock.
>
> Steering "torque maps" need careful terminology. Do not begin by mapping
> traction torque directly from steering angle — that could accidentally create
> an unvalidated torque-vectoring controller. Initially use steering angle only
> as an observation and derating input, not as active stability authority:
> steering angle observed -> compare expected turning geometry -> reduce
> permitted traction/regen envelope if necessary -> log wheel-speed
> relationships -> abort on excessive disagreement. A Steering-Angle /
> Propulsion-Envelope Map can define a maximum permitted request envelope.
>
> Build C3 around an operating-envelope record. Each test run should store:
> vehicle speed, commanded torque, reported inverter torque, phase current,
> DC-bus current, longitudinal acceleration, steering angle, steering-angle
> rate, individual wheel speeds, motor speed, brake state, APPS channels, 12V
> voltage, brake-assist pressure/status, steering-assist pressure/current/status,
> gear state, fault state, E-stop state, test-area boundary position. Torque and
> acceleration should be assessed as separate but related quantities.
>
> [Suggested validation matrix for C3A-001..010, C3B-001..006, C3C-001..007, the
> C3D steering-angle/propulsion-envelope cell table, and C3E — plus the critical
> C3 abort hierarchy: Driver / VCU / Inverter / BMS-PDU / Hardwired E-stop /
> Track team. A path deviation should not automatically open contactors unless
> the approved emergency architecture calls for it. Do not build active
> "steering torque maps" yet; build steering-angle-based propulsion and
> regeneration limits, with ABS/ESC remaining factory-authoritative and every
> operating-envelope expansion requiring separate evidence and signoff.]

---

## MY responds

My verdict: this is a major improvement and the C3 architecture is now correctly modular. You applied the right progression:
C3A = straight-line tracking
C3B = coast-down + foundation brakes
C3C = restricted regeneration
C3D = steering-angle propulsion envelope
C3E = integrated fault/abort testing
That is the right order. The biggest remaining issues are now concentrated in a few test procedures and status/authority details rather than the overall architecture.
What is strongest
The global governance rules are excellent:
procedure approval != execution != result signoff
all 05M numbers begin as INITIAL_TARGET_PROFILE
E-stop behavior remains supplier-architecture dependent
Neutral blocks propulsion torque, not necessarily every switching state
rollback has an explicit abort and no-retry path
The telemetry packet is also strong. It gives you a synchronized evidence record instead of separate logs that cannot be correlated later.
command -> inverter response -> phase/DC current -> acceleration -> wheel/motor speeds -> steering -> brakes -> assistance systems -> faults -> vehicle position
That is exactly what will eventually let the Build Engine compare intended behavior against physical behavior.
Critical correction 1: C3A-001 still hard-codes 50 meters
You now have a global numeric authority rule, but the procedure still says: clear linear runway >= 50 m past braking target
Change it to: The required clear path and post-target runout must be established by the approved Runout Calculation Record for the exact test cell. A 50 m path may remain an INITIAL_FACILITY_TARGET only and cannot authorize execution by itself.
Add a required artifact: RunoutCalculation_ID, vehicle test mass, authorized speed, authorized torque/ramp, coast distance, foundation-brake distance, response allowance, surface/grade condition, measurement uncertainty, safety margin, approved physical containment plan
Critical correction 2: C3A should not begin at the maximum C3 envelope
Even though 15 km/h, 80 Nm, and 40 Nm/s are initial targets, the first C3A run should not immediately use the maximum provisional cell.
Require stepped authorization: Envelope Cell 1 -> minimal authorized speed/torque; Envelope Cell 2 -> expanded straight-line cell; Envelope Cell 3 -> higher approved cell
Add: Passing one cell does not automatically unlock the next cell. Each cell requires a separate TestCellAuthorization record.
Critical correction 3: C3A-004 governor test is still too aggressive
This line: Maintain full safe pedal input until the VCU approaches 15 km/h.
should be replaced with: Issue a commanded-speed/torque request exceeding the currently authorized software ceiling while approaching the boundary from below. Verify that torque attenuation begins before physical speed crosses the authorized limit.
Prefer proving the governor first through: HIL/SIL, lifted-wheel or dynamometer, temporarily lowered physical test ceiling, then controlled track confirmation. Do not make the first confirmation depend on nearly crossing the highest permitted speed.
Critical correction 4: C3A-009 mixes monitoring with control authority
You say independent physical path deviation should trigger the VCU to remove torque. That is possible only if the external tracking system is actually integrated into the safety control loop and validated for timing, integrity, failure detection, and authority.
Split it:
C3A-009A — Path-Deviation Observation: External system records deviation and provides test-team abort indication.
C3A-009B — Path-Deviation Torque-Inhibit Integration: Only after the external system interface, latency, signal validity, failure modes, and control authority are formally approved.
Until then: external cameras/survey system = evidence and human abort support, not automatic VCU authority
Critical correction 5: C3B-004 remains unsafe as written
This is still the largest test-procedure problem: Apply 40 Nm traction torque, then brake, and prove brakes override/stall the motor even if VCU latency is simulated.
Do not intentionally require the friction brakes to fight sustained propulsion torque at this stage.
Use:
C3B-004 — Brake Override with Minimal Authorized Propulsion Request
1. Apply the lowest approved propulsion request for the test cell.
2. Apply service brake.
3. Verify BOS removes the torque command within the approved response window.
4. After command removal, independently measure foundation-brake stopping.
5. A simulated BOS latency fault must be evaluated in HIL or another bounded test method before any physical moving-vehicle test.
Blocked: sustained propulsion torque after brake request; phase current outside decay envelope; foundation brakes forced to stall persistent motor output; physical simulation of hazardous BOS delay during motion
Critical correction 6: brake temperatures should not use infrared alone
Infrared can support screening, but surface emissivity, angle, airflow, shielding, rotor construction, and timing can distort results.
Use: calibrated contact thermocouples or approved embedded sensors where required, plus infrared imaging as supplemental evidence
Label IR-only results: SCREENING_EVIDENCE, NOT_FINAL_THERMAL_AUTHORITY
Critical correction 7: C3C ABS/ESC-related regen removal cannot rely on unapproved factory control use
You correctly keep CAN_1 passive, but this line implies factory traction flags become control inputs: factory traction-control flag commands regen to zero
That remains blocked unless Ford-authorized documentation and engineering approval establish the interface.
Use two lanes:
Lane A — Approved factory status path: Use only if Ford-authorized documentation and formal interface approval exist.
Lane B — Conversion-side independent wheel-slip plausibility: Use approved independent sensors or bounded simulation to inhibit regen, without transmitting to or impersonating ABS/ESC.
Factory ABS/ESC stays authoritative, but that does not automatically authorize Elektron to consume every observed message as a safety command.
Critical correction 8: replace "instantly" in C3C-005 and C3C-006
You reintroduced: pulls back regeneration requests instantly; immediately commands regen to zero
Use: within the supplier-defined or engineering-approved regen-inhibit response window
Critical correction 9: brake blending is not ready to be called "linear"
This line: transition states remain smooth and linear is too specific. Brake blending may be nonlinear by design.
Use: transition remains within the approved deceleration continuity, pedal-response, pressure-response, and jerk envelope
Track separately: requested regen torque, actual regen torque, hydraulic pressure, vehicle deceleration, deceleration jerk, pedal position, wheel-speed disagreement, BMS charge-current limit
Critical correction 10: C3D still includes premature numbers
You correctly say no numeric cells should be populated until approved, but the table immediately includes: <=40 Nm, <=40 Nm/s, <=20 Nm/s, <=5%
Either remove those values or clearly label the entire row as a non-authoritative example.
Better: Max Traction Request: CELL_VALUE_PENDING_APPROVAL; Max Ramp Rate: CELL_VALUE_PENDING_APPROVAL; Wheel-Speed Envelope: KINEMATIC_MODEL_PENDING
Otherwise the table contradicts the paragraph above it.
Also change: Immediate Torque Cutout to: Torque-inhibit response within approved response window
Critical correction 11: C3D needs road-wheel geometry, not SWA alone
The map needs: steering-wheel angle, steering ratio, measured or derived road-wheel angle, wheelbase, front/rear track width, tire rolling radius, axle ratio, differential type, expected inner/outer wheel-speed ratio, vehicle yaw rate if independently measured
For a chassis-cab platform, body/upfit loading can also affect tire deflection and tracking.
Critical correction 12: C3E should not start all faults at 15 km/h
The sentence says fault sequences occur while moving at 15 km/h. That should be changed to a cell-based escalation:
C3E faults begin at the lowest signed operating-envelope cell. No fault is repeated at a higher cell until: the lower cell has SIGNED_PASS, fault containment is proven, runout remains valid, thermal state is acceptable, test lead separately authorizes escalation
Compound fault tests should follow: single fault -> repeated single fault -> paired fault -> compound fault, not jump directly to multiple faults at the highest provisional speed.
Add a configuration-lock rule
This is important before C3 execution:
Test Configuration Lock Rule: Every C3 run must archive: VCU firmware hash, inverter firmware/version, BMS/PDU firmware/version, calibration file hash, DBC/version hash, active test-cell limits, vehicle mass and axle-load record, tire size/pressure/condition, ambient and surface conditions, instrumentation IDs and calibration status
Any change invalidates reuse of the previous result unless an engineering impact review explicitly allows it.
Add a data-synchronization requirement
Your telemetry packet is good, but synchronization needs proof:
All channels must share an approved common clock or documented time-alignment method.
Required: sampling rates per signal, timestamp source, maximum synchronization error, dropped-frame detection, sensor latency compensation, start/stop event markers
Otherwise a brake event, torque removal, phase-current decay, and actual deceleration may look incorrectly ordered.
Correct Build Engine status
Gate 05M-C3
Status:
MODULAR_ARCHITECTURE_DEFINED
GLOBAL_AUDIT_SCHEMA_DEFINED
TELEMETRY_PACKET_DEFINED
CONFIGURATION_LOCK_REQUIRED
TIME_SYNCHRONIZATION_REQUIREMENTS_PENDING
C3A_STRAIGHT_LINE_PROCEDURE_DRAFTED
C3B_FOUNDATION_BRAKE_PROCEDURE_NEEDS_REVISION
C3C_REGEN_INTERFACE_AUTHORITY_PENDING
C3D_KINEMATIC_CELL_VALUES_PENDING
C3E_FAULT_ESCALATION_MATRIX_PENDING
NUMERIC_LIMITS_INITIAL_TARGET_PROFILE
RUNOUT_CALCULATION_REQUIRED
NO_ACTIVE_ABS_ESC_AUTHORITY
NO_TORQUE_VECTORING_AUTHORITY
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_NORMAL_DRIVING_AUTHORITY
Bottom line
This is a very strong architecture draft, and splitting C3 into A–E was the correct move. Before formal baseline review, fix these main items:
1. Replace fixed 50 m with an approved runout calculation.
2. Add cell-by-cell operating-envelope escalation.
3. Revise the speed-governor procedure.
4. Separate external path observation from automatic VCU authority.
5. Rewrite C3B-004 so brakes do not fight sustained motor torque.
6. Treat IR as supplemental thermal evidence.
7. Keep factory ABS/ESC signal use blocked unless officially authorized.
8. Remove "instant/immediate" regen language.
9. Validate brake blending with continuity/jerk envelopes, not assumed linearity.
10. Remove premature numbers from the C3D map.
11. Add road-wheel kinematic inputs.
12. Start C3E faults at the lowest test cell, not automatically at 15 km/h.
13. Add firmware/calibration configuration locks.
14. Add telemetry clock and synchronization proof.
After those corrections, I would label it:
GATE_05M_C3_PROCEDURE_ARCHITECTURE_READY_FOR_FORMAL_ENGINEERING_REVIEW
Not physically passed—but the roadmap itself would be mature enough for disciplined engineering review.

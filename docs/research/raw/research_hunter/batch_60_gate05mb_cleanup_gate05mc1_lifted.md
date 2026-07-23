# Research Hunter — batch 60 ("59:75")

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). Quoted text, ASCII diagrams, equations, and numeric
values are Hunter-supplied and unverified against any source document. The
owner framing that preceded this payload and the owner's verdict that followed
it are archived at `../owner_reviews/review_57_batch_60_verdict.md`.

---

## Architectural Safety Amendments & Engineering Rules

The following structural corrections and explicit safety rules are incorporated into the Build Engine to govern the boundaries between no-load dynamic motor rotation and initial coupled-driveline testing phases.

### 1. Watchdog Loss and Dynamic Coasting Behavior (Gate 05M-B)

Watchdog Fault Assessment Mandate: During high-speed or low-speed rotation, the physical coasting of an uncoupled motor shaft due to pure mechanical inertia must not be interpreted as a safety loop failure when torque is pulled. The failure condition is strictly defined as the persistence of electromagnetic excitation or power-stage switching. The blocked states must isolate active drive commands, non-decaying phase currents, and failure to assume the designated safe-state geometry.

### 2. Staged Driveline Integration Sequencing (Gate 05M-C)

Driveline Coupling Phase Gate Rule: The coupling of the traction motor to the vehicle's secondary mechanical elements must be segmented into progressive risk layers. The system is strictly blocked from executing ground-level open-floor operations until it completes static lift testing, backlash profiling, sensor direction validation, and brake override verification.

---

## Gate 05M-B — No-Load Motor Spin Validation

Every test scenario in this gate operates under strict global constraints: GUARDED ROTATING SHAFT, NO DRIVELINE ATTACHMENT, NO WHEEL TORQUE PATH, NO VEHICLE MOVEMENT PATH, EMERGENCY STOP ACTIVE, EXCLUSION ZONE ACTIVE, SUPPLIER-DEFINED SPIN PROFILE ONLY, NO CABIN DRIVER PEDAL AUTHORITY.

### Verification Matrix: Gate 05M-B

| Test ID | Scenario Description | Evaluation & Testing Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|
| 05M-B-001 | Physical Phase Rotation Check | Command a minimal torque request (≤ 2% of nominal max via supplier profile). Observe shaft direction. | Physical rotation vector must strictly match the commanded software direction flag. | The guarded, uncoupled motor shaft turns smoothly in the designated direction without hesitation. | • Shaft spinning backwards relative to command • High-current shuddering or locking | Video recording of shaft rotation; CAN command/feedback sync log. |
| 05M-B-002 | Resolver Angle Offset Burn-In | Execute the inverter's automatic resolver alignment routine via service diagnostic command. | Calculated resolver alignment offset must fall within ± 1.0° electrical across 3 consecutive iterations. | Alignment value stabilizes; calibration parameter writes to non-volatile memory successfully. | Inconsistent or wandering offset readings across sequential alignment routines. | Diagnostic tool confirmation capture; parameter memory dump file. |
| 05M-B-003 | Balanced Phase Sine Wave Audit | Spin the motor shaft at a constant low speed (500 RPM). Scope active phase current lines. | Phase current amplitudes across U, V, W must balance within ≤ 3% of each other. THD must remain within supplier specs. | Clean, symmetrical sinusoidal current waves are captured on the scope traces. | • Severely distorted or clipped phase current waves • Single-phase current dropouts | High-bandwidth oscilloscope screen capture of phase current probes. |
| 05M-B-004 | Dynamic Over-Speed Protection | Spin the motor up slowly. Temporarily lower the software over-speed limit threshold below current RPM. | The inverter control card must immediately trip on an over-speed fault, shut down gating, and drop to safe state. | Torque command drops to zero; motor shaft coasts freely to a stop without active braking resistance. | Inverter failing to cross-check real-world RPM against safety limit boundaries. | CAN log tracking motor RPM vs. inverter state bits during trip sequence. |
| 05M-B-005 | Watchdog Loss Under Rotation | While the uncoupled shaft is spinning at 500 RPM, disconnect the CAN_2 bus link. | The inverter power stage must drop out gating and disable torque output within ≤ 50 ms of frame loss. | Motor transitions to unpowered coast mode. Inverter flags critical communication loss error. | • Inverter continues actively driving the motor • Phase current persists beyond approved decay window • Torque command remains active after watchdog loss • Inverter fails to enter supplier-defined safe state | Time-stamped scope trace of bus drop vs. phase current decay. |

### Gate 05M-B Exit Criteria

- The uncoupled, guarded motor shaft rotates smoothly in direct mechanical alignment with software direction commands.
- The resolver alignment offset parameter is calibrated, stable, and successfully written to non-volatile memory.
- Active phase currents form balanced three-phase sine waves with matching amplitudes and no severe distortion signatures.
- Dynamic safety limits successfully interrupt power-stage gating within specification thresholds, permitting standard unpowered inertial coasting.
- All raw data logs, high-bandwidth current scope traces, calibration parameter printouts, and engineer validation signoffs are permanently archived in the Build Engine.

Crucial Milestone Authorization: Successful Gate 05M-B completion permits engineering review for Gate 05M-C1 (Coupled Driveline Static / Lifted-Wheel Readiness).

---

## Gate 05M-C1 — Coupled Driveline Static / Lifted-Wheel Readiness

This gate governs the initial physical integration of the traction motor with the vehicle's secondary mechanical elements (gearbox, half-shafts, hubs, and wheels) under a zero-ground-contact profile. The entire driven axle of the vehicle must be lifted and securely locked on heavy-duty jack stands or a chassis lift, ensuring that the vehicle wheels can spin freely with zero road friction and zero traction-propulsion authority.

This phase focuses on mapping initial backlash profiles, verifying wheel-speed sensor tracking parity, enforcing a micro-scale torque clamp, and validating the brake-override subsystem before any tires touch the ground.

```
                    [GATE 05M-C1 LIFTED CHASSIS BOUNDARY]
            (Vehicle Securely Suspended - Driven Wheels Elevated)
                                      │
       ┌──────────────────────────────┼──────────────────────────────┐
       ▼                              ▼                              ▼
[Backlash & Drag Mapping]    [Sensor Parity Audit]          [Brake Override Check]
- Low torque bump sequence   - Cross-verify encoder/resolver- Confirm torque pull when
- Audit mechanical play      - Validate individual wheel    brake pedal is pressed
- Map cold rotational drag     speed sensor direction codes  - Clamp active current loops
```

### 1. Mechanical Play and Drag Domain Profiling

- Backlash Audit Sequence: With the driven wheels elevated, the VCU commands micro-pulses of torque (≤ 1% of max capacity) in alternating positive and negative directions. Engineers track and record the mechanical play (backlash) throughout the gear reduction and half-shaft assemblies.
- Cold Rotational Drag Baseline: The motor is commanded to spin the lifted assembly at a restricted calibration speed (100 RPM). Phase current and bus power draw are logged to chart a baseline drag profile of the unladen mechanical system, helping identify binding or alignment faults across hubs and brakes.

### 2. Speed Sensor Parity & Safety Mappings

- Direction and Velocity Cross-Checks: As the lifted wheels rotate, the VCU pulls speed data independently from the motor internal position sensor (resolver/encoder) and the individual wheel speed sensors (ABS/wheel encoders). The rotational velocity and direction codes must match across all sensors within an engineering-approved tolerance.
- Brake Override System (BOS) Interlock: While a low-level traction request is maintained on the elevated assembly, the physical service brake pedal must be manually depressed. The VCU and inverter must immediately drop commanded torque to zero, proving that mechanical braking authority overrides software torque tracking.
- Micro-Scale Torque Clamp: The maximum allowable torque limit register in the VCU firmware is clamped at a defensive boundary (Initial Lift Target: ≤ 5% of total system output) to prevent runaway acceleration of the unladen wheels.

### Verification Matrix: Gate 05M-C1

| Test ID | Scenario Description | Evaluation & Testing Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|
| 05M-C1-001 | Mechanical Driveline Backlash Mapping | Deliver alternating, low-amplitude (≤ 1%) forward/reverse torque steps to the lifted drivetrain. | Record CAN position metrics and physical angular displacement at the wheel hub to chart mechanical play boundaries. | The drivetrain transitions smoothly between gears without loud impact or excessive slop. | High-current spikes or harsh mechanical binding during torque direction shifts. | CAN data log tracing torque command vs. resolver position transitions. |
| 05M-C1-002 | Elevated Wheel Speed Parity Audit | Spin the lifted assembly up to a steady calibration speed (100 RPM). Log all speed loops. | Individual wheel speed sensors must align in direction and match the motor shaft velocity within ≤ 5%. | All sensor tracks update uniformly. Calculated vehicle speed correlates correctly with motor RPM. | • Left/right wheel speed direction inversion • Discrepancies exceeding the tracking tolerance | Unified CAN data chart plotting resolver velocity vs. wheel sensor signals. |
| 05M-C1-003 | Brake Override System (BOS) Validation | While maintaining a steady torque request (≤ 5% micro-clamp limit), tap the vehicle service brake pedal. | VCU must instantly clear traction torque commands. Inverter must pull bridge excitation current. | Active phase current drops to zero-point thresholds; wheels are brought to a stop by mechanical friction. | Inverter continues to drive phase currents or fight the service brakes. | High-speed log showing brake switch transition vs. phase current decay. |
| 05M-C1-004 | Micro-Scale Torque Clamp Enforcement | Apply full travel to the driver pedal position sensor. Monitor VCU torque output registers over CAN. | VCU torque requests must clamp tightly at the defensive software limit threshold (≤ 5%). | Inverter respects the clamped torque boundary; phase currents remain structurally limited. | Torque requests or active inverter scaling breaking past the 5% guardrail. | Diagnostic snapshot file of VCU internal control parameters. |
| 05M-C1-005 | Lifted Asymmetry & Differential Scan | Hand-lock one lifted wheel safely. Inject a minimal torque pulse (≤ 2%) to check open differential operation. | Opposite elevated wheel must rotate smoothly at differential speed. Torque tracking remains stable. | Power transfers as intended across the differential assembly without severe vibrations or binding. | Mechanical lock-up of the differential gear matrix or abnormal phase current spikes. | Engineering run data log sheet tracking individual hub speed metrics. |

### Gate 05M-C1 Exit Criteria

- The mechanical backlash and rotational drag profiles of the lifted driveline are fully mapped, analyzed, and approved by engineering.
- Wheel speed sensors and motor position sensors demonstrate strict tracking parity across all velocity and directional registers.
- The Brake Override System (BOS) confirms that mechanical service brake activation immediately overrides and drops active torque command loops.
- The micro-scale software torque clamp (≤ 5%) is proven to restrict motor power output during wide-open pedal test requests.
- All elevated test run data logs, sensor parity charts, override timestamps, and engineering signoffs are permanently archived in the Build Engine.

Crucial Engineering Authorization: Successful Gate 05M-C1 completion permits engineering review for Gate 05M-C2 (Restricted Creep Torque Validation) under live ground contact.

### Next Gate: Gate 05M-C2 — Restricted Creep Torque Validation (Hunter preview)

Following the successful completion of lifted static and dynamic readiness tracking (Gate 05M-C1), the vehicle tires are placed on the ground for the first time to validate low-speed, high-inertia creep profiles:

```
  ┌──────────────────────────────────────────────────┐
  │ Gate 05M-C2 — Restricted Creep Torque Validation │
  └────────────────────────┬─────────────────────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
[Initial Ground Contact Profiles]     [Aggressive Rate Limiting]
- Low friction surface selection       - Enforce stringent dI/dt phase limits
- Roll-out friction mapping            - Verify low-speed torque control
- Measure breakaway torque baselines   - Active roll-back prevention checks
```

In Gate 05M-C2, the vehicle is positioned on a flat, unobstructed testing surface with a low-friction profile. This gate governs the analysis of structural breakaway torque limits under tire load, evaluates anti-rollback logic, and enforces highly restrictive torque ramp-rate limits (dI/dt) to manage power development during the vehicle's initial ground-level movements.

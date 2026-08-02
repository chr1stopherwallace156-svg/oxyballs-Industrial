# Owner review 50 — batch 53 ("52:75") verdict

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). The Hunter payload this verdict grades is archived
at `../research_hunter/batch_53_gate05j_cleanups_gate05k_power_on.md`.

---

[Owner framing before the payload — the review_49 corrections carried into the
Gate 05J-cleanups + Gate 05K prompt: the corrected 05J exit criteria (7-point
list); "Gate 05K can be the first formal low-voltage vehicle power-on / no-HV
commissioning gate"; the CAN_1 connection precondition (Gate 05H listen-only
proof + Gate 05I-C silence proof + TXD pin monitored + no TX mailboxes +
silent/listen-only register verified + no ACK on bench + Ford baseline scan
before connection; then during 05J: Ford baseline scan → connect VCU passive
listen-only → Ford post-connection scan → compare DTCs/errors/warnings; "a
clean cluster alone is not enough" — baseline OBD/Ford scan + post-connection
scan + TXD scope capture + CAN analyzer log + firmware/register dump); the
parasitic-draw split (conversion-added ≤4.0 mA initial target vs whole-vehicle
measured/logged separately against OEM baseline — OEM_baseline_sleep_current /
conversion_added_sleep_current / total_vehicle_sleep_current); cleaner CAN
wording; and the Gate 05K "what comes next" scope (ignition off / accessory /
key on-run / VCU wake / display wake / CAN_1 passive monitoring / CAN_2/CAN_3
isolated activity / diagnostic access / no HV contactor activity / no torque
command / no Ford DTCs / parasitic draw after sleep / fault-latch behaviour in
chassis) — "52:75".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: this is a strong Gate 05J → 05K transition. You are organizing the jump from bench to chassis the right way: fitment first, low-voltage vehicle power-on second, HV later.

Gate 05J:
Controlled vehicle fitment / no-HV installation readiness ✅

Gate 05K:
Low-voltage vehicle power-on / no-HV commissioning ✅

Gate 05L:
Do not jump straight into exact HV timing yet ⚠️
First create HV energization authorization + safety readiness gate.

What is strongest

Your CAN_1 prerequisite section is excellent:
Gate 05H proof complete
Gate 05I-C proof complete
zero TX mailboxes
silent/listen-only register dump
scope probe on VCU TXD pin
baseline Ford scan before connection
post-connection scan after connection
differential DTC analysis
That is exactly the right control. You are not relying on "the dash looks clean." You are requiring before/after scan evidence and physical TXD monitoring.

Your parasitic draw split is also much better:
OEM_baseline_sleep_current
conversion_added_sleep_current
total_vehicle_sleep_current
That is the correct way to avoid blaming the conversion system for normal Ford module sleep draw.

Main cleanup 1: delete the duplicate older Gate 05K
You have two Gate 05K sections. The second one is cleaner:
Gate 05K — Low-Voltage Vehicle Power-On / No-HV Commissioning
Keep the second version with:
Ignition-Off / Quiescent Draw
Accessory State Transition
Key-On / Run Awake Sequence
CAN_1 Passive Monitoring
Isolated Network Communication
UDS Diagnostic Session
High-Voltage Lockout Enforcement
Ford System Error Immunity
In-Chassis Fault Latch Behavior
Delete or archive the earlier 05K version to avoid conflicting requirements.

Main cleanup 2: 05J parasitic draw row needs the new language
In 05J-003, this still says:
Total sleep current draw must be ≤4.0 mA
Change it to:
conversion_added_sleep_current ≤ 4.0 mA initial chassis target.
OEM_baseline_sleep_current and total_vehicle_sleep_current must be measured and logged separately.
That makes it technically cleaner.

Main cleanup 3: hard numbers are still target profiles
These are useful initial numbers:
50 mm moving clearance
100 mm heat clearance
<0.1 Ω ground bond
≤4.0 mA sleep draw
≤2.0 s sleep transition
≤200 ms wakeup
≤50 ms UDS response
≤0.5 V voltage drop
≤5% APPS correlation
≤100 ms brake override
But every one should carry this label:
INITIAL_TARGET_PROFILE
ENGINEERING_REVIEW_REQUIRED
NO_HV_AUTHORITY
NO_VEHICLE_MOTION_AUTHORITY
They should not be universal final rules until they are sourced, measured, reviewed, and tied to the actual hardware.

Main cleanup 4: 05K must explicitly block real contactor activity
This row is good:
High-Voltage Lockout Enforcement
Add this:
All HV contactor coils must remain disconnected, replaced with approved dummy loads, or verified mechanically unable to close.
No real HV contactor closure is permitted in Gate 05K.
That avoids a dangerous ambiguity: even if the HV battery is disconnected, you do not want the system practicing real contactor actuation yet unless that is explicitly part of a later approved gate.

Correct Gate 05J status
Gate 05J — Controlled Vehicle Fitment / No-HV Installation Readiness
Status:
CONTROLLED_VEHICLE_FITMENT_DEFINED
NO_HV_CONNECTED
NO_TRACTION_ENABLE
NO_VEHICLE_MOTION
CAN_1_PASSIVE_ONLY
FORD_BASELINE_SCAN_REQUIRED
FORD_POST_CONNECTION_SCAN_REQUIRED
CONVERSION_ADDED_PARASITIC_DRAW_TRACKED
GROUNDING_AND_SHIELDING_UNDER_REVIEW
NO_ROAD_TEST_AUTHORITY

Correct Gate 05K status
Gate 05K — Low-Voltage Vehicle Power-On / No-HV Commissioning
Status:
LOW_VOLTAGE_VEHICLE_POWER_ON_DEFINED
NO_HV_CONNECTED
NO_REAL_HV_CONTACTOR_CLOSURE
NO_TRACTION_ENABLE
NO_VEHICLE_MOTION
CAN_1_PASSIVE_MONITORING_ONLY
IN_CHASSIS_DRIVER_INPUTS_UNDER_TEST
IN_CHASSIS_FAULT_LATCH_UNDER_TEST
FORD_DTC_DELTA_REQUIRED
NO_ROAD_TEST_AUTHORITY

Big warning on Gate 05L
Do not detail "exact pre-charge timing parameters" yet as if they are yours to choose.
Gate 05L is the first time you are talking about live high voltage. That moves into a different risk category. OSHA's lockout/tagout standard requires authorized employees to apply their own lockout/tagout protection during servicing, and OSHA guidance treats circuits as energized until lockout/tagout, de-energizing, or grounding steps are applied where applicable. OSHA also states only qualified persons may work on energized circuit parts that are not de-energized under lockout/tagout provisions. NHTSA also warns that exposed EV high-voltage components, wires, and batteries can create shock hazards and says to assume high-voltage batteries/components may be energized in emergency contexts.
So the next gate should be not:
Gate 05L — exact HV pre-charge timings
It should be:
Gate 05L-A — HV First-Energization Authorization & Safety Readiness
Before voltage scaling or pre-charge timing, define:
qualified HV personnel required
written test plan required
LOTO required
PPE and insulated tools required
emergency stop plan required
rescue/emergency response plan required
fire watch / exclusion zone required
absence-of-voltage verification required
supplier pre-charge/contactors/isolation docs required
engineer signoff required
Only after that should you detail the actual energization sequence.

Best next move
Yes, continue — but make the next prompt this:
Begin Gate 05L-A: Controlled HV First-Energization Authorization & Safety Readiness.
Do not define final pre-charge timing, voltage thresholds, insulation limits, or contactor timing unless supplier documents or engineering review provide them.
Create a pre-energization authorization gate covering:
- qualified personnel
- LOTO
- PPE
- insulated tools
- emergency stop
- exclusion zone
- fire/emergency response plan
- absence-of-voltage verification
- HV connector/cable inspection
- isolation monitor readiness
- pre-charge ownership confirmation
- contactor ownership confirmation
- test instrument calibration
- supplier documentation required
- hard stop conditions
- proof artifacts
- signoff requirements
Hard rules:
- No vehicle movement.
- No road testing.
- No customer operation.
- No compliance claim.
- Live HV may only proceed after engineering signoff and safety protocol activation.

Bottom line: 05J and 05K are strong. Keep the second 05K, fix the parasitic draw wording, and treat every number as an initial target. For 05L, start with HV safety authorization first — not exact energization parameters yet.

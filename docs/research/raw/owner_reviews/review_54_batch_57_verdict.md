# Owner review 54 — batch 57 ("56:75") verdict

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). The Hunter payload this verdict grades is archived
at `../research_hunter/batch_57_gate05lbc_cleanups_gate05ma_inverter_enable.md`.

---

[Owner framing before the payload — the review_53 corrections carried into the
Gate 05L-B/05L-C-cleanups + Gate 05M-A prompt: the staged 05M sub-ladder
(05M-A Inverter Enable Readiness / Zero-Torque Validation → 05M-B No-Load Motor
Spin Validation → 05M-C Controlled Low-Speed Traction Readiness); correction 2
(05L-B-001 should not require V_caps = 0.0 V — no unintended DC-link rise beyond
approved leakage/noise threshold, match supplier topology, unless approved by
research); correction 3 (05L-B-004 timeout wording is backwards — a timeout is
when elapsed time exceeds the limit); correction 4 (E-stop should not say
"instantly"); correction 7 (05L-C-005 title is mixed up — split into 05L-C-005A
false-positive + 05L-C-005B false-negative) — "56:75".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: this is the best version so far. The architecture is now much cleaner because you fixed the biggest issue: VCU requests/monitors; BMS/PDU owns contactor and pre-charge execution; hardwired safety loop owns emergency interruption.

05L-B:
Controlled first HV pre-charge observation ✅

05L-C:
Shutdown / discharge / repeatability before spin ✅

05M-A:
Correct next concept after 05L-C ✅
But needs wording cleanup before it becomes baseline ⚠️

This is the correct chain:
05L-A = HV authorization / safety readiness
05L-B = first live HV pre-charge observation
05L-C = shutdown / discharge / repeatability
05M-A = inverter enable readiness / zero-torque validation
05M-B = no-load motor spin
OSHA's lockout/tagout rule is about controlling hazardous energy during servicing/maintenance, and OSHA electrical work-practice rules limit energized electrical work to qualified persons familiar with PPE, insulating materials, and insulated tools. NHTSA also warns to assume EV high-voltage batteries and associated components may be energized. So keeping 05L-B/05L-C as qualified-personnel, controlled-HV-only gates is the right move.

What is strongest
Your control ownership partition is excellent:
VCU = requester / monitor
BMS/PDU = contactor + pre-charge owner
Hardwired safety loop = emergency interruption owner
Keep that permanently. That prevents a dangerous software assumption where the VCU thinks it directly owns high-voltage hardware.
Your pre-charge prerequisite block is also strong:
R_pre
E_pulse
C_link
V_batt_max
I_peak
thermal recovery interval
retry limit
That is exactly what must exist before live pre-charge.

Main cleanup 1: keep all hard values as target profiles
These still need the label:
≤50 ms contactor feedback
ΔV ≤5%
≥95% Vbatt
500 ms pre-charge timeout
>60V discharge threshold
≤20 ms E-stop dropout
≤2 retry attempts
10 repeated cycles
50 ms inverter watchdog
0A phase current
0% PWM
zero resolver drift
Use this global note:
All numeric thresholds in Gates 05L-B, 05L-C, and 05M-A are INITIAL_TARGET_PROFILE values only.
Final limits require:
SUPPLIER_DATA
ENGINEERING_REVIEW
LIVE_HV_TEST_PLAN_APPROVAL
BENCH/CHASSIS PROOF

Main cleanup 2: RC curve wording is too perfect
This line is directionally good:
Vcaps(t) = Vbatt × (1 - e^(-t/RC))
But don't require a perfect mathematical curve. Real systems may show pack sag, sensor filtering, capacitance tolerance, leakage, bleeders, and BMS/PDU measurement delays.
Better:
Vcaps rise must fall within the supplier-approved expected pre-charge envelope based on R_pre, C_link, V_batt, measurement tolerance, leakage paths, and BMS/PDU sampling delay.
A simple RC curve may be used as the first-order comparison model only.

Main cleanup 3: 05L-B-007 failure wording
You wrote:
Automatic retries are executed.
That is listed as a failure, but phrase it clearer:
Blocked / Failure Condition:
- automatic retry occurs after manual E-stop
- dropout timing exceeds supplier-approved target
- contactor/pre-charge coil supply remains energized after E-stop
No automatic retry after E-stop. Ever.

Main cleanup 4: 05L-C shutdown order is still too specific
You still have:
Main Positive contactor must open first, followed by Main Negative.
That may be correct for one architecture, but not universal. Use:
Normal shutdown contactor sequence must follow the BMS/PDU supplier-defined shutdown architecture.
Blocked:
any shutdown sequence that violates supplier documentation, leaves an unintended energized path, or prevents verified DC-link discharge.

Main cleanup 5: IMD fault injection still needs safer wording
This line is still too physically casual:
inject a resistance path between DC+ and chassis ground
Replace it with:
Isolation fault injection may only be performed using an approved, rated, current-limited HV isolation-test fixture or IMD supplier-supported test method.
Manual ad-hoc resistance insertion onto live HV rails is forbidden.
That should be a hard rule.

Main cleanup 6: 05M-A must not enable real inverter switching yet
Your 05M-A concept is right, but this part is risky:
Enable inverter state to active.
PWM duty cycles at null.
0% PWM modulation.
actual phase current 0.0A.
Different inverters define "enabled," "ready," "gate enabled," "torque enabled," and "PWM active" differently. Some may use switching even at zero torque. So don't assume 0% PWM is the correct safe state.
Use this instead:
Gate 05M-A validates supplier-defined inverter ready / torque-disabled state.
No traction torque command.
No intentional motor rotation.
No vehicle movement.
No driver torque authority.
No power-stage switching unless supplier documentation explicitly defines it as part of a safe zero-torque readiness state and engineering approves it.
For 05M-A, the cleaner status is:
Gate 05M-A — Inverter Enable Readiness / Zero-Torque Validation
Status:
DRAFT_CREATED
LIVE_HV_PRESENT
INVERTER_READY_STATE_UNDER_TEST
TORQUE_DISABLED_STATE_REQUIRED
NO_INTENTIONAL_MOTOR_ROTATION
NO_VEHICLE_MOVEMENT
NO_DRIVER_TORQUE_AUTHORITY
SUPPLIER_INVERTER_STATE_DEFINITIONS_REQUIRED
WATCHDOG_TARGETS_PENDING_SUPPLIER_DATA
PHASE_CURRENT_OFFSET_CHECK_REQUIRED
RESOLVER_BASELINE_CHECK_REQUIRED
NO_ROAD_TEST_AUTHORITY

Corrected 05M-A gate intent
Make 05M-A about readiness, not spin:
05M-A proves:
- inverter boots correctly with live DC bus
- VCU/inverter handshake is aligned
- inverter remains torque-disabled
- phase current sensors read within supplier offset limits
- resolver feedback is plausible
- watchdog loss causes supplier-defined safe state
- no unintended torque, rotation, or current generation occurs
Then 05M-B can be the first controlled no-load spin gate.

Bottom line
Yes — this is the right direction. I would mark it:
05L-B:
READY WITH MINOR WORDING CLEANUP
05L-C:
CORRECT NEXT HV GATE
NEEDS SUPPLIER-SPECIFIC SHUTDOWN + IMD FIXTURE LANGUAGE
05M-A:
GOOD NEXT GATE AFTER 05L-C
BUT MUST BE ZERO-TORQUE / TORQUE-DISABLED READINESS
NOT REAL SPIN OR TRACTION
Do not jump to 05M-B until 05M-A proves the inverter can be live, synchronized, torque-disabled, and fault-responsive without unintended current or rotation.

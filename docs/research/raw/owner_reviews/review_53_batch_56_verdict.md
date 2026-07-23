# Owner review 53 — batch 56 ("55:75") verdict

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). The Hunter payload this verdict grades is archived
at `../research_hunter/batch_56_gate05lb_ownership_gate05lc_repeatability.md`.

---

[Owner framing before the payload — the review_52 corrections carried into the
Gate 05L-B-ownership + Gate 05L-C prompt: correction 3 (VCU should not own
contactor closure unless assigned — VCU = REQUESTER/MONITOR, BMS/PDU likely
owner of contactor/pre-charge execution, hardwired loop owner of the emergency
interruption path; split each 05L-B test into request signal / actual owner /
feedback signal / measured HV response / abort condition); the current-limit
definition (SUPPLIER_DEFINED/ENGINEERING_APPROVED: pre-charge resistor
resistance, resistor pulse energy rating, DC-link capacitance, pack max
voltage, expected peak pre-charge current, resistor thermal-recovery interval,
pre-charge retry limit — without those 05L-B stays blocked); correction 5 (add
the 05L-B-007 Manual Abort During Pre-Charge row); correction 6 (do not jump to
Gate 05M — next is Gate 05L-C — Controlled HV Shutdown, Discharge, and
Re-Energization Repeatability); corrected exit language — "55:75".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: this is a big improvement. You corrected the ownership problem, fixed the jump from 05L-B to 05L-C, and now the HV section is much more professional.

05L-B:
CONTROL OWNERSHIP FIXED ✅
VCU REQUESTER / MONITOR ONLY ✅
BMS/PDU OWNS CONTACTOR + PRE-CHARGE ✅
HARDWIRED LOOP OWNS EMERGENCY INTERRUPTION ✅

05L-C:
CORRECT NEXT GATE ✅
SHUTDOWN / DISCHARGE / REPEATABILITY BEFORE MOTOR SPIN ✅

But there are still a few important cleanups before this becomes baseline.

Main correction 1: keep every timing and voltage number as a target
These values are still written too final:
≤50 ms contactor feedback
ΔV ≤5%
≥95% Vbatt
≤500 ms pre-charge timeout
>60V discharge threshold
≤20 ms E-stop dropout
≤2 retry attempts
10 repeated cycles
Keep them, but label them:
INITIAL_TARGET_PROFILE
SUPPLIER_DATA_REQUIRED
ENGINEERING_REVIEW_REQUIRED
LIVE_HV_AUTHORITY_PENDING
Your rule should say:
Final thresholds are supplier-defined and engineering-approved.
Initial target values may be used for observation and test planning only.
That matters because OSHA lockout/tagout exists specifically to control hazardous energy during servicing where unexpected energization or stored energy release could injure workers, and electrical work around energized or potentially energized circuits requires safety-related work practices appropriate to the hazard.

Main correction 2: 05L-B-001 should not require
Vcaps = 0.0V
You wrote:
Main Negative contactor mechanically closes. Inverter DC-link voltage remains at 0.0V.
Depending on the inverter/PDU topology, sensing, leakage paths, or measurement reference, that may not be exactly true. Use:
No unintended DC-link rise beyond approved leakage/noise threshold.
Vcaps behavior must match supplier-defined topology expectations.
That is safer than demanding exactly zero.

Main correction 3: 05L-B-004 timeout wording is backwards
You wrote:
Time counter crosses ≤500 ms timeout limit.
A timeout happens when elapsed time exceeds the limit.
Use:
If Vcaps fails to reach the supplier-defined pre-charge completion threshold before the supplier-defined timeout expires, BMS/PDU aborts the sequence, opens contactor/pre-charge outputs, logs pre-charge timeout DTC, and blocks retry according to approved retry policy.
Initial observation target: 500 ms.
Final timeout: supplier-defined.

Main correction 4: E-stop should not say "instantly"
You still have:
All contactors drop out instantly.
Change to:
Hardwired safety loop interrupts contactor/pre-charge coil supply.
Dropout timing is measured and compared against supplier-approved dropout target.
No automatic retry is permitted.
"Instant" is never a clean engineering word.

Main correction 5: 05L-C IMD fault injection needs strict fixture language
This part is conceptually correct but physically dangerous:
inject a resistance path between DC+ and chassis ground
Do not let that read like someone is manually attaching a resistor to a live HV rail.
Use:
Isolation fault injection may only be performed using an approved, rated, current-limited HV isolation-test fixture or IMD supplier-supported test method.
Manual ad-hoc resistance insertion onto live HV rails is forbidden.
NHTSA guidance says to assume EV high-voltage batteries and associated components may be energized and that exposed HV components/wires can create shock hazards, so this needs to stay extremely controlled.

Main correction 6: 05L-C-001 shutdown order may be supplier-specific
You wrote:
Main Positive contactor must open first, followed by Main Negative.
That may be correct for your final BMS/PDU, but don't universalize it yet.
Use:
Contactor opening sequence must follow the BMS/PDU supplier-defined shutdown architecture.
Initial expected sequence:
supplier-defined.
Blocked:
any sequence that violates supplier contactor/PDU documentation, creates unintended DC-link persistence, or leaves an unsafe energized path.

Main correction 7: 05L-C-005 title is mixed up
You named it:
No Weld Detection False Negatives
But the criteria says:
zero false weld detections
Those are different.
Use two tests:
05L-C-005A — Weld Detection False Positive Check
Goal: normal contactor bounce does not falsely trigger weld fault.
05L-C-005B — Weld Detection False Negative Check
Goal: simulated welded feedback state is always detected and blocks re-energization.
That makes the logic much sharper.

Corrected 05L-B status
Gate 05L-B — Controlled HV First-Energization / Current-Limited Pre-Charge Observation
Status:
DRAFT_READY_WITH_REVISIONS
LIVE_HV_PRESENT
QUALIFIED_PERSONNEL_REQUIRED
BMS_PDU_CONTACTOR_OWNER_DEFINED
VCU_REQUESTER_MONITOR_ONLY
HARDWIRED_SAFETY_LOOP_OWNER_DEFINED
SUPPLIER_PRECHARGE_DATA_REQUIRED
PRECHARGE_CURRENT_LIMIT_REQUIRED
TIMING_THRESHOLDS_TARGET_ONLY
NO_INVERTER_SWITCHING
ZERO_MOTOR_RPM
NO_VEHICLE_MOVEMENT
NO_TRACTION_COMMAND
NO_ROAD_TEST_AUTHORITY

Corrected 05L-C status
Gate 05L-C — Controlled HV Shutdown, Discharge, and Re-Energization Repeatability
Status:
CORRECT_NEXT_GATE
LIVE_HV_PRESENT
ZERO_MOTOR_RPM
NO_INVERTER_SWITCHING
SHUTDOWN_SEQUENCE_PENDING_SUPPLIER_ARCHITECTURE
DISCHARGE_WINDOW_PENDING_SUPPLIER_DATA
IMD_FAULT_INJECTION_FIXTURE_REQUIRED
RETRY_LIMIT_TARGET_ONLY
THERMAL_RECOVERY_TIMER_REQUIRED
NO_TRACTION_COMMAND
NO_VEHICLE_MOVEMENT
NO_ROAD_TEST_AUTHORITY

Bottom line
Yes — this is the right path now.
But do not proceed to Gate 05M yet until 05L-C is fully cleaned and defined. After 05L-C, the next step should still be staged:
05M-A — Inverter Enable Readiness / Zero-Torque Validation
05M-B — No-Load Motor Spin Validation
05M-C — Controlled Low-Speed Traction Readiness
Do not call the first 05M gate "low-speed traction" yet. The first traction inverter gate should prove inverter enable with zero torque and zero rotation before any spin.

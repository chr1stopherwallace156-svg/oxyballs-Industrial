# Owner review 52 — batch 55 ("54:75") verdict

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). The Hunter payload this verdict grades is archived
at `../research_hunter/batch_55_gate05lb_hv_first_energization.md`.

---

[Owner framing before the payload — the "Best next move" prompt carried into
the Gate 05L-B request: "after this cleanup, proceed to Gate 05L-B, but define
it carefully: Gate 05L-B — Controlled HV First-Energization / Current-Limited
Pre-Charge Observation; add stored-energy rule." Plus the review_51 recap of
the stored-energy discharge rule ("after any HV exposure or failed energization
attempt, wait the supplier-defined discharge interval before touching or
measuring internal HV nodes; verify bus voltage with Live-Dead-Live before
access; inverter DC-link capacitors can remain charged even after the battery
is isolated") and the IMD threshold-source correction ("IMD reports no internal
error and measured isolation status within supplier-defined acceptable range;
final insulation thresholds pending IMD supplier manual, system voltage,
engineering review, and applicable safety standard mapping") — "54:75".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: Gate 05L-B is the right next direction, but this draft is too aggressive in a few spots. You correctly moved from "HV authorization" to "controlled first energization," but you are starting to hard-code timing, voltage thresholds, and contactor sequence authority before supplier docs and engineer signoff prove them.

Gate 05L-A:
HV AUTHORIZATION ✅

Gate 05L-B:
CONTROLLED HV FIRST-ENERGIZATION DRAFTED ✅
BUT NEEDS SAFETY/TIMING/AUTHORITY CLEANUP ⚠️

Do not proceed to 05M yet.
Add a shutdown/discharge verification gate after 05L-B.
OSHA treats lockout/tagout as the control of hazardous energy during servicing/maintenance, and OSHA's electrical work-practice rules limit work on energized parts to qualified persons using proper PPE, insulated tools, and safe techniques. High-voltage EV systems should also be treated as energized until proven otherwise; NHTSA emergency guidance says to assume HV batteries/components may be energized.

What is strong
The direction is correct:
No inverter switching
Zero motor RPM
No vehicle movement
Pre-charge observation only
DC-link voltage tracking
Contactor feedback monitoring
Stored-energy discharge tracking
Weld-detection check
That is the right first-HV logic. You are not jumping into torque or spin yet, which is good.
The stored-energy rule is also excellent:
After any HV exposure, wait supplier-defined discharge interval.
Then verify absence of voltage with Live-Dead-Live.
Keep that permanently.

Main correction 1: do not hard-code 95%, 500 ms, 50 ms, or 60 V yet
These values appear in the draft:
Vcaps ≥ 95% of Vbatt
timeout ≤ 500 ms
feedback within ≤ 50 ms
discharge below ≤ 60 V
They are useful candidate targets, but they cannot be final gate logic yet.
Use this language:
Initial bench target only.
Final threshold pending supplier pre-charge documentation, contactor datasheet, inverter DC-link capacitance, BMS/PDU control manual, and engineering review.
So this:
Vcaps ≥ 95% of Vbatt within ≤500 ms
should become:
Vcaps reaches supplier-defined pre-charge completion threshold within supplier-defined timeout.
Initial observation target:
Vcaps near pack voltage with acceptable ΔV before main positive closure.
Authority status:
SUPPLIER_DATA_PENDING / ENGINEERING_REVIEW_REQUIRED

Main correction 2: contactor sequence may be supplier-specific
You wrote:
Main Negative closes first.
Pre-charge closes second.
Main Positive closes after ΔV target.
That may be correct for one architecture, but do not make it universal.
Change to:
Contactor sequence must follow the BMS/PDU supplier-defined architecture.
The Build Engine may model:
- negative-first sequence
- positive-first sequence
- pre-charge-first topology
- integrated BDU/PDU-managed sequence
Final sequence requires supplier wiring diagram and controls engineer approval.
This protects you from designing around the wrong BDU/PDU behavior.

Main correction 3: VCU should not own contactor closure unless assigned
Several lines say:
VCU commands main negative
VCU commands main positive
VCU commands pre-charge relay
That may be wrong. Earlier we established ownership rules. Keep them here.
Use:
VCU Role:
REQUESTER / MONITOR unless supplier architecture assigns direct control authority.
BMS/PDU Role:
Likely owner of contactor/pre-charge execution.
Hardwired Safety Loop:
Owner of emergency interruption path.
For each 05L-B test, split:
Request signal
Actual owner
Feedback signal
Measured HV response
Abort condition

Main correction 4: "current-limited" needs a real current-limit definition
The title says:
Current-Limited Pre-Charge Observation
Good, but the current limit is not actually defined.
Add:
Current limit source:
SUPPLIER_DEFINED / ENGINEERING_APPROVED
Required before 05L-B:
- pre-charge resistor resistance
- resistor pulse energy rating
- DC-link capacitance
- pack max voltage
- expected peak pre-charge current
- resistor temperature/thermal recovery interval
- pre-charge retry limit
Without those, 05L-B should remain blocked.

Main correction 5: add a hard abort / emergency shutdown row
You have timeout and weld simulation, but add a dedicated abort test:
05L-B-007 — Manual Abort During Pre-Charge
Trigger:
Press E-stop during pre-charge observation.
Expected:
Hardwired safety loop interrupts contactor/pre-charge control path.
VCU logs abort if still powered.
BMS/PDU transitions to supplier-defined safe state.
No automatic retry.
Proof:
scope trace of control-line drop
CAN log
HV bus decay trace
E-stop event timestamp
This is important because the first live-HV gate must prove the human abort path.

Main correction 6: do not jump to Gate 05M after 05L-B
You wrote:
Successful Gate 05L-B completion permits progression to Gate 05M Traction Inverter Control Loop & Low-Speed Spin Validation.
I would not jump there yet.
After first energization, the next gate should be:
Gate 05L-C — Controlled HV Shutdown, Discharge, and Re-Energization Repeatability
That gate proves:
normal shutdown
emergency shutdown
stored-energy discharge
restart lockout
pre-charge retry limits
IMD fault response
contactor feedback consistency
no weld detection false negatives
repeat cycle stability
Only after 05L-C should you even think about inverter enable/spin.

Correct Gate 05L-B status
Use this:
Gate 05L-B — Controlled HV First-Energization / Current-Limited Pre-Charge Observation
Status:
DRAFT_CREATED
LIVE_HV_PRESENT
QUALIFIED_PERSONNEL_REQUIRED
SUPPLIER_PRECHARGE_DATA_REQUIRED
CONTACTOR_SEQUENCE_PENDING_SUPPLIER_ARCHITECTURE
VCU_AUTHORITY_REQUESTER_ONLY_UNLESS_DOCUMENTED
NO_INVERTER_SWITCHING
ZERO_MOTOR_RPM
NO_VEHICLE_MOVEMENT
NO_ROAD_TEST
NO_TRACTION_COMMAND
TIMING_THRESHOLDS_TARGET_ONLY
ENGINEERING_REVIEW_REQUIRED

Corrected exit language
Replace the exit authorization with:
Successful Gate 05L-B completion permits Gate 05L-C only:
Controlled HV Shutdown, Discharge, and Re-Energization Repeatability.
It does not authorize:
- motor spin
- inverter switching
- traction command
- vehicle movement
- chassis dyno
- road testing
- customer operation

Bottom line
This is a strong 05L-B draft, but tighten it before moving on.
Keep:
pre-charge observation
DC-link voltage tracking
weld detection
stored-energy discharge
no inverter switching
zero motor RPM
Fix:
hard-coded timing/voltage thresholds
VCU contactor ownership assumptions
universal contactor sequence
missing current-limit definition
jumping to motor spin too early
Next should be 05L-C, not 05M.

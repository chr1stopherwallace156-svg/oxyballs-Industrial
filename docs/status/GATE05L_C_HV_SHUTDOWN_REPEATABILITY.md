# CONTROLLED HV SHUTDOWN, DISCHARGE, AND RE-ENERGIZATION REPEATABILITY (Gate 05L-C)

The repeatability rung of the split Gate 05L in the staged post-bench gate
ladder (Decision Register D-008, amended review_52/53) for the F-450/F-550 EV
conversion (Gate 05L-C, batch_56 + owner review_53). Gate 05L-C validates the
**stability, cycle repeatability, and off-nominal fault-handling** of the HV
power-sequencing loop — proving the BMS/PDU can cycle between active states,
normal shutdowns, emergency breaks, and active fault lockdowns reliably
**before any traction rotation**. It is **live-HV** but still **ZERO motor RPM ·
no inverter switching · no vehicle movement.**

**Status (owner review_55): `HV_SHUTDOWN_DISCHARGE_REPEATABILITY_DEFINED` /
`SUPPLIER_SHUTDOWN_SEQUENCE_REQUIRED` / `RATED_IMD_FIXTURE_REQUIRED` /
`THERMAL_RECOVERY_REQUIRED` / `NO_INVERTER_SWITCHING` / `ZERO_MOTOR_RPM` /
`NO_VEHICLE_MOVEMENT` / `NO_ROAD_TEST_AUTHORITY`.** Ladder: **05J → 05K → 05L-A
→ 05L-B → 05L-C (THIS GATE) → 05M-A (inverter enable / zero-torque) → 05M-B
(no-load spin) → 05M-C (controlled low-speed traction)** (D-008, amended
review_55). (The shutdown contactor sequence is supplier-defined — "main-
positive first" is a candidate, not a rule, RC-257/263/268; the Hunter has
re-emitted the fixed order THREE times — regression watch.)

## Value doctrine (owner review_53, RC-252) — read first

Every threshold here is an **`INITIAL_TARGET_PROFILE / SUPPLIER_DATA_REQUIRED /
ENGINEERING_REVIEW_REQUIRED / LIVE_HV_AUTHORITY_PENDING`** input, **not final
gate logic** (seventeenth artifact of the invented-values family): ≤50 ms
shutdown contactor stagger, ≤2 pre-charge retry attempts, the 10-cycle
repeatability count, the thermal-recovery timer, and the IMD isolation trip
threshold. **Final thresholds are supplier-defined and engineering-approved;
initial target values may be used for observation and test planning only.** The
contactor shutdown sequence and the discharge window are supplier-defined
(RC-257); the IMD trip threshold is supplier/standard-pending (RC-243/251).

## Authority (carried from Gate 05L-B, RC-247)

The **BMS/PDU owns** the contactor + pre-charge execution state machines and
the retry/thermal/isolation logic; the **VCU requests/monitors** only; the
**hardwired safety loop owns** the emergency-interruption path (RC-247/205/227;
BQ-27).

## IMD fault injection — approved fixture only (owner review_53, RC-256)

Isolation-fault injection may be performed **only** using an **approved, rated,
current-limited HV isolation-test fixture or the IMD supplier-supported test
method.** **Manual ad-hoc resistance insertion onto live HV rails is
forbidden.** (NHTSA: assume EV HV components may be energized; exposed HV
components/wires present shock hazards — NeedsExactSource.)

## Shutdown sequence & thermal/retry rules

- **Contactor opening sequence is supplier-specific (RC-257):** it must follow
  the BMS/PDU supplier-defined shutdown architecture — "main-positive-first
  then main-negative" is **one candidate**, not a universal rule. Blocked: any
  sequence that violates the supplier contactor/PDU documentation, creates
  unintended DC-link persistence, or leaves an unsafe energized path.
- **Pre-charge resistor thermal protection:** the BMS/PDU enforces a mandatory
  cooling delay between cycles per the supplier thermal-recovery spec
  (rapid consecutive cycling is a fire/component-breakdown hazard).
- **Pre-charge retry lockout:** on repeated pre-charge failure (≤2 attempts
  target, RC-252) the BMS/PDU locks out further power-on requests; the lockout
  persists across LV ignition cycles and requires an explicit diagnostic
  service-tool clear (which must not clear an active physical fault, RC-163/206).

---

## Gate 05L-C verification matrix (live-HV, ZERO motor RPM)

All thresholds are `INITIAL_TARGET_PROFILE / SUPPLIER_DATA_REQUIRED` (RC-252).
BMS/PDU owns execution (RC-247). No inverter switching; no motor rotation.

| Test | Scenario | Procedure | Target (INITIAL_TARGET_PROFILE) | Expected safe output | Blocked (MUST NEVER OCCUR) | Proof |
|---|---|---|---|---|---|---|
| 05L-C-001 | normal coordinated shutdown | ignition-off power-down; monitor contactor drop sequence | contactor opening per the **supplier-defined BMS/PDU shutdown architecture** (candidate: main-positive then main-negative within ≤50 ms target) — RC-257/263/268 | bus decays cleanly via bleeders; no error codes on normal shutdown | any sequence that violates supplier docs / leaves an unintended energized path / prevents verified DC-link discharge / **shows a command↔auxiliary-contact feedback mismatch (RC-268)** | timestamped CAN transaction trace |
| 05L-C-002 | pre-charge retry-limit lockout | force pre-charge failure twice consecutively (temporary bleed path) | on the next attempt past the supplier/target limit (≤2), BMS/PDU refuses to drive pre-charge/negative coils | hard "pre-charge attempt lockout"; coils unpowered; persists across LV cycles; service-tool clear only | infinite consecutive pre-charge cycles allowed | VCU/BMS diagnostic status-register printout |
| 05L-C-003 | thermal cool-down enforcement | successful pre-charge + shutdown, then immediate re-power request | BMS/PDU delays coil engagement until the **supplier** thermal-recovery timer expires | power-up pauses automatically until the cooling window is met | pre-charge relay closing before the thermal timer clears | microcontroller internal-variable timing log |
| 05L-C-004 | live IMD fault isolation | inject an isolation fault DC+/DC− → chassis **only via an approved, rated, current-limited HV isolation-test fixture / IMD supplier method** (RC-256) — no ad-hoc resistor | IMD flags the isolation fault over CAN within the supplier-defined detection window | BMS/PDU acts on the IMD fault, opens contactor channels, latches an isolation-fault state | system ignoring active isolation faults / shutdown delayed past the safety limit | CAN trace: IMD fault flag vs contactor-open events |
| 05L-C-005A | **weld-detection false positive (owner review_53, RC-258)** | 10 consecutive nominal power-on/off cycles with cooling delays; evaluate aux-contact consistency + bounce | normal contactor mechanical bounce must **not** falsely trigger a weld fault (target 0/10 false alarms) | 10/10 clean cycles; no false weld detections or timing hiccups | intermittent false weld alarms from normal contactor bounce | statistical test-run data-log summary |
| 05L-C-005B | **weld-detection false negative (owner review_53, RC-258)** | assert a simulated welded feedback state (via approved fixture) across cycles | a simulated welded feedback state is **always** detected and **blocks re-energization** | weld fault always latched; power-up blocked; drive lines 0.0 V | a real/simulated weld ever missed (false negative) allowing re-energization | UDS fault-register printout + cycle log |

## Gate 05L-C exit criteria (owner review_53)

The system cannot exit Gate 05L-C unless:

1. Normal coordinated shutdowns follow the **supplier-defined** contactor
   opening sequence under all standard key-off cycles, with no unintended
   DC-link persistence (RC-257).
2. Pre-charge retry limits (≤2 target) and thermal cool-down timers are
   strictly enforced by the BMS/PDU firmware (targets only, RC-252).
3. Active IMD fault injection — **via the approved current-limited fixture
   only** (RC-256) — produces a reliable, timely isolation shutdown when an
   isolation leak is introduced.
4. **Both** weld-detection checks pass: zero false positives from normal bounce
   **and** zero false negatives on a simulated weld (RC-258).
5. The passive discharge window is mapped and scope-verified against the
   supplier-defined parameters (RC-242/252).
6. All cycle run-data logs, thermal metrics, IMD response captures, and
   engineer validation signoffs are archived.

**Successful Gate 05L-C completion permits engineering review for Gate 05M-A
only** (Inverter Enable Readiness / Zero-Torque Validation). It does **not**
authorize motor spin · inverter switching · traction command · vehicle
movement · road testing · customer operation. (Never "certified safe," RC-224.)

## Standing checks

- **Live HV, ZERO motor RPM, no inverter switching, no vehicle movement**
  (owner review_53). No threshold (shutdown stagger, retry limit, thermal
  timer, discharge window, IMD trip) is final gate logic until supplier docs +
  engineering review upgrade it (RC-252); the contactor shutdown sequence is
  supplier-specific (RC-257); IMD fault injection uses an approved
  current-limited fixture only, never an ad-hoc resistor on a live rail
  (RC-256); weld detection is split into false-positive + false-negative checks
  (RC-258); the BMS/PDU owns execution, the VCU requests/monitors, the
  hardwired loop owns emergency interruption (RC-247/205/227; BQ-27); the
  stored-energy discharge-wait rule applies before any access (RC-242); a
  service-tool clear never clears an active physical fault (RC-163/206). Never
  "certified safe" (RC-224). OSHA/NHTSA/IMD citations NeedsExactSource.
- **Nothing ingested; nothing Confirmed; no motor spin; no "certified safe"/
  compliance claim; ODRs untouched.**

## Next — Gate 05M-A (Inverter Enable Readiness / Zero-Torque Validation)

Owner review_53: do **not** proceed to Gate 05M until 05L-C is fully defined,
and then the 05M phase is **staged**: **05M-A** (Inverter Enable Readiness /
Zero-Torque Validation) → **05M-B** (No-Load Motor Spin Validation) → **05M-C**
(Controlled Low-Speed Traction Readiness). **Do not call the first 05M gate
"low-speed traction"** — the first traction-inverter gate proves **inverter
enable with ZERO torque and ZERO rotation** before any spin (RC-259). 05M-A is
engineer-gated, live-HV, still no rotation.

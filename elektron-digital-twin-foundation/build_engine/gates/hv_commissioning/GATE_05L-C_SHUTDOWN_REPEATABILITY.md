# Gate 05L-C — Controlled HV Shutdown, Discharge, and Re-Energization Repeatability

**Status:** `CLEANED_AND_DEFINED` — must be complete before any 05M execution  
**Prerequisite:** Gate 05L-B exit criteria met  
**Next (only after exit):** Engineering review for **Gate 05M-A** (draft readiness) — **not** 05M-B/C  

See [`GLOBAL_INITIAL_TARGET_PROFILE.md`](GLOBAL_INITIAL_TARGET_PROFILE.md).

## Purpose

Prove shutdown order (supplier-defined), discharge, cycle repeatability, thermal/retry lockouts, IMD response, and weld detection **false-positive** and **false-negative** behavior **before** inverter enable / spin gates.

## Thermal recovery & retry rules

1. **Pre-charge resistor thermal protection:** BMS/PDU enforces mandatory cooling delay between cycles per **supplier thermal recovery specification**.
2. **Retry limits:** After **INITIAL_TARGET_PROFILE ≤ 2** consecutive pre-charge failures, BMS/PDU hard-lockouts further power-on requests across LV ignition cycles until **explicit diagnostic clear**.

## IMD fault injection — hard rule

Isolation fault injection may **only** be performed using an **approved, rated, current-limited HV isolation-test fixture** or **IMD supplier-supported test method**.

**Forbidden:** Manual ad-hoc resistance insertion onto live HV rails.

## Contactor shutdown order

**Corrected:** Normal shutdown contactor sequence must follow the **BMS/PDU supplier-defined shutdown architecture**.

**Blocked:** Any sequence that violates supplier documentation, leaves an unintended energized path, or prevents verified DC-link discharge.

Do **not** hard-code “Main Positive always opens first” unless supplier documentation for the installed PDU affirms it (may be recorded as INITIAL_TARGET_PROFILE observation only when supplier confirms).

## Verification matrix

### 05L-C-001 — Normal Coordinated Shutdown

| Field | Content |
|---|---|
| Procedure | Power-down via ignition off; monitor contactor sequence |
| Criteria | Sequence matches **supplier-defined shutdown architecture**; DC-link discharge verified |
| Expected | Bus decays via bleeders; no fault codes on normal shutdown |
| Blocked | Sequence violating supplier docs; unintended energized path; discharge not verified |
| Proof | Time-stamped CAN trace |

*If supplier documents Main-Positive-then-Main-Negative with INITIAL_TARGET_PROFILE ≤ 50 ms between events, record that as the approved profile for this vehicle build — do not universalize without supplier data.*

### 05L-C-002 — Pre-Charge Retry Limit Lockout

| Field | Content |
|---|---|
| Procedure | Force pre-charge failure twice consecutively |
| Criteria | On third power-on request, BMS/PDU refuses pre-charge / negative coil drive |
| Expected | Hard “Pre-Charge Attempt Lockout”; coils unpowered |
| Blocked | Infinite consecutive pre-charge cycles |
| Proof | VCU/BMS diagnostic status printout |

### 05L-C-003 — Thermal Cool-Down Enforcement

| Field | Content |
|---|---|
| Procedure | Successful pre-charge + shutdown; immediate re-power attempt |
| Criteria | Coil engagement delayed until supplier thermal recovery timer expires |
| Expected | Automatic pause until cooling window met |
| Blocked | Pre-charge relay closing before thermal delay clears |
| Proof | MCU / BMS timing log |

### 05L-C-004 — Live IMD Fault Isolation

| Field | Content |
|---|---|
| Procedure | With HV bus active, inject isolation fault **only** via approved current-limited fixture / IMD supplier method (DC+/− to chassis per fixture design) |
| Criteria | IMD flags isolation fault on CAN within specified detection window |
| Expected | BMS/PDU opens contactors; latched isolation fault state |
| Blocked | Ignoring isolation fault; delayed shutdown beyond safety limits; ad-hoc live resistor insertion |
| Proof | CAN IMD flag vs contactor open events |

### 05L-C-005A — Weld Detection False Positive Check

| Field | Content |
|---|---|
| Goal | Normal contactor bounce does **not** falsely trigger weld fault |
| Procedure | Execute **INITIAL_TARGET_PROFILE 10** consecutive nominal power-on/off cycles with required cooling delays |
| Criteria | Evaluate aux feedback for bounce; **zero false weld detections** from normal bounce |
| Expected | 10/10 cycles without spurious weld alarms |
| Blocked | Spurious weld alarms from mechanical bounce |
| Proof | Statistical run summary |

### 05L-C-005B — Weld Detection False Negative Check

| Field | Content |
|---|---|
| Goal | Simulated welded feedback is **always** detected and blocks re-energization |
| Procedure | While unpowered, jumper mirror feedback closed; attempt HV power-on |
| Criteria | Pre-flight always detects simulated weld; coil drive blocked |
| Expected | Power-up blocked; weld fault latched |
| Blocked | Power-up proceeding; failing to catch forced aux mismatch |
| Proof | UDS weld fault register capture |

## Exit criteria (all required)

1. Normal shutdown follows **supplier-defined** contactor architecture; discharge verified.
2. Retry limit (≤ 2 INITIAL_TARGET_PROFILE) and thermal cool-down enforced.
3. IMD fault via **approved fixture** causes reliable isolation shutdown.
4. **05L-C-005A:** zero false-positive weld faults across 10 cooled cycles.
5. **05L-C-005B:** simulated weld caught 100%; re-energization blocked.
6. Cycle logs, thermal metrics, IMD captures, and signoffs archived.

## Crucial engineering authorization

Successful Gate **05L-C** completion satisfies HV distribution verification milestones and permits **engineering review** for **Gate 05M-A** (Inverter Enable Readiness / Zero-Torque Validation) only.

**Do not** jump to 05M-B or 05M-C until 05M-A proves live, synchronized, **torque-disabled**, fault-responsive inverter behavior without unintended current or rotation.

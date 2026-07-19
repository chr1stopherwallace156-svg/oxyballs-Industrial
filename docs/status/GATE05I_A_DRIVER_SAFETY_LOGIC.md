# LOW-VOLTAGE DRIVER SAFETY LOGIC VERIFICATION (Gate 05I-A)

The driver-input safety-logic verification layer for the F-450/F-550 EV
conversion controls (Gate 05I-A, batch_46 + owner review_43). A sub-gate of
Gate 05I: it verifies the driver-safety logic on the **low-voltage bench**
before any vehicle or HV step. Bench evidence only; no vehicle authority.

**Status (owner review_43/44/45): `FINAL_BASELINE_MATRIX_CREATED` /
`BENCH_TEST_MATRIX_CREATED` / `LOW_VOLTAGE_BENCH_ONLY` /
`DRIVER_INPUT_LOGIC_UNDER_TEST` / `SERVICE_CLEAR_RULES_DEFINED` /
`ROOT_CAUSE_FLOW_DEFINED` / `NO_LIVE_HV` / `NO_VEHICLE_MOTION` /
`NO_LIVE_FORD_CAN_TRANSMISSION` / `TIMING_VALUES_TARGET_PROFILE_ONLY` /
`BENCH_EVIDENCE_PENDING` / `NO_VEHICLE_CLEARANCE`.** In batch_48 the Hunter
finally applied the **Expected-Safe-Output vs Blocked-Outputs (MUST NEVER
OCCUR)** column split (RC-203/208 realized — owner: "the table structure is
now the right Build Engine format"); the still-recurring "immediate" wording
(RC-211) and bench-value labels (RC-212) stay applied here. After successful runs: `BENCH_RUN_OBSERVED /
RAW_LOGS_CAPTURED / ARTIFACT_PACKAGE_COMPLETE / ENGINEERING_REVIEW_PENDING /
NO_VEHICLE_CLEARANCE`. Owner (review_43): "the correct next subgate … very
strong." Owner (review_44): "a very strong 05I-A + 05I-B package … the
Service Clear Operational Law is excellent." The batch_47 re-emit realized
the HVIL-ownership (RC-205), Service-Clear-Law (RC-206), and RCA-flow
(RC-207) fixes; the timing/percentage labels (RC-202) and the
expected-safe-output-vs-blocked-outputs split (RC-203) recurred in the
Hunter re-emit and stay applied here (RC-208), with **"direct contactor
control by VCU"** added to the blocked-outputs set.

## Three CRITICAL_RESTRICTIONs

- **Zero vehicle motion** — wheels-on-ground / chassis dyno / real Ford
  factory-bus (CAN_1) transmission completely forbidden.
- **Zero live high-voltage testing** — supplier controllers on LV aux
  (12 V nominal); HV rails unpowered.
- **Zero road-test approval** — validates LV software + hardware logic paths
  only; does not approve real driving or driver operation.

---

## Timing / percentage doctrine (owner review_43, RC-202) — read first

Every bench value is a **`BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING /
CONTROLS_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY`** sweep input, not a rule —
sixth+ recurrence of the invented-timing family (RC-116/133/169/174/180/188):

| Value | Batch (bench target) | Status |
|---|---|---|
| APPS tracking skew | >10% | configurable sweep; final threshold pending controls review + APPS source verification + supplier docs |
| accelerator request | >25% | BENCH_TARGET_PROFILE |
| APPS input (shift inhibit) | >5% | BENCH_TARGET_PROFILE |
| brownout slew | 13.5→8.5 V, ≥20 V/ms | BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING |
| APPS fault / brake window | 50 ms | BENCH_TARGET_PROFILE (configurable) |
| coil delay / relay drop-out | 15 / 10 ms | pending relay datasheet + measurement |

## The bench-logic run rule (owner review_43, RC-207)

```
IF vehicle_motion_detected == "TRUE" OR can_1_leakage_detected == "TRUE":
    VEHICLE_COMMISSIONING_APPROVAL = "HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW"
    SYSTEM_EXECUTION_MODE          = "SAFETY_CONFLATION_HALT"
```

Recovery requires: root-cause analysis · corrective action · repeat bench
test · engineering signoff · versioned record. (Owner: "permanently blocked"
is too permanent — use hard-blocked-pending-review.)

## Result categories (owner review_43, RC-197)

`BENCH_OBSERVED_VALID_NO_VEHICLE_AUTHORITY` /
`BENCH_NEEDS_REVIEW_NO_VEHICLE_AUTHORITY` / `BENCH_HARD_BLOCK` (e.g. CAN_1
leakage) / `BENCH_INVALID_RUN` / `BENCH_SETUP_ERROR`.

## Boundary rules

- **CAN_1 fault injection** — protected bench harness or simulated OEM
  network only; **no direct short-circuiting of production chassis interface
  pins** (RC-200).
- **E-stop** — removes the LV control path through the approved hardwired
  safety loop; **coil-voltage decay + relay drop-out time + output behaviour
  measured vs the verified schematic + component datasheets** (physical
  induction + mechanical lag), not "instant" (RC-198/204).

---

## Driver-safety verification matrix (bench-only)

Each row: fault/input · expected VCU behaviour · **expected safe output** ·
**blocked outputs** · expected hardwired behaviour · measurement · proof
artifact. All rows `BENCH_EVIDENCE_PENDING / BENCH_ONLY_RESTRICTED`.

| # | Function | Fault/input (target profile) | Expected VCU behaviour | Expected **safe output** (RC-203) | **Blocked outputs** (RC-203) |
|---|---|---|---|---|---|
| 001 | APPS plausibility | >10% APPS Ch1↔Ch2 skew (sweep) | flag APPS correlation fault; drop torque target to zero | CAN_2 torque request → zero | non-zero torque / CAN_1 transmit / cluster injection / auto-clear of active fault |
| 002 | Brake override | brake pressed + >25% accel | prioritize braking; **command zero-torque within the configured bench target window; final timing pending controls review** (RC-204) | CAN_2 torque request → zero | non-zero torque / CAN_1 transmit / cluster injection / auto-clear |
| 003 | Shift-state inhibit | request D/R while APPS >5% | reject shift; hold state machine in Neutral | inverter drive commands remain blocked | active drive command / non-neutral transition |
| 004 | Charger-plug drive lockout | proximity ground while in Drive | shift to Neutral/Safe; inhibit torque processing **within the configured window (RC-204)** | drive-state → safe; torque target inhibited | drive-state transition / non-zero torque |
| 005 | E-stop hardwired interrupt | actuate physical E-stop mushroom | detect loss of safety-loop feedback; log critical safety-loop fault | **hardwired loop removes LV control path; coil decay + relay drop-out measured vs datasheet (RC-198/204)** | software override of the hardwired loop |
| 006 | HVIL open detection | break physical HVIL loop at bench connector | transition to Fault; **VCU requests shutdown / torque inhibit / fault latch — BMS/PDU/hardwired safety loop owns physical contactor / isolation execution (RC-205)** | BMS isolates internal LV driving lines | VCU-owned contactor/isolation drive; non-zero torque |
| 007 | BMS no-discharge | inject BMS over-temp / undervoltage frame | terminate drive state; ramp torque down | CAN_2 torque → zero | non-zero torque / inverter power-enable / auto-clear |
| 008 | Inverter fault | inject inverter over-current / fault flag | inhibit operation; state machine → isolated fault hold | torque + gate-drive enable inhibited | active torque / gate-drive enable / auto-clear |
| 009 | LV brownout | slew 13.5→8.5 V ≥20 V/ms (sweep) | save diagnostic logs; drivers → defined default states | outputs to defined safe default; UVLO reset | undefined/floating output states |
| 010 | Fault-latch persistence | brief (~50 ms) APPS fault then normal | keep torque locked at zero; hold fault active despite input recovery | torque remains zero; drive-state blocked | torque recovery / auto-clear on input recovery |
| 011 | Service-clear (UDS 0x14) | issue UDS Clear Diagnostic Information | **clear software diagnostic records only, and only if safe/neutral (RC-206)** | latched software faults cleared; torque still inhibited until cycle | clearing active hardwired/HVIL/E-stop/BMS-no-discharge/isolation faults or an unresolved latch; restoring drive readiness by command alone |
| 012 | Isolated EV-display warning | inject fault codes into diagnostic tracker | transmit error codes + warning text to isolated EV display | isolated EV-display warning frames | factory-cluster injection / Ford-bus transmit |
| 013 | CAN_1 listen-only during driver-input tests | full-range APPS/brake/shift/charge sweeps | process inputs internally; maintain passive silent listening on CAN_1 | CAN_1 TXD idle | any TX frame / retry loop / ACK-slot drive on CAN_1 |

**Service-clear gate (RC-206):** UDS clear requires **no active fault input
· zero torque command · charger disconnected · safe/neutral state ·
technician authorization · fault source reviewed.**

## Validation script (RC-197/202/204)

Illustrative bench-automation pseudocode (Hunter-supplied, **not runnable
production code**): **brake-override verification** establishes an active
torque baseline, injects the physical brake signal, and measures torque-zero
latency on the isolated CAN_2. The monitoring window is **configurable**
(`bench.get_config("BRAKE_OVERRIDE_TARGET_WINDOW_MS")`), and results return
`BENCH_OBSERVED_VALID_NO_VEHICLE_AUTHORITY` /
`BENCH_NEEDS_REVIEW_NO_VEHICLE_AUTHORITY` / `BENCH_HARD_BLOCK`, never
`HIL_OBSERVED_VALID` / `MODEL_STRESS_FAILURE`.

## Instrument traceability & calibration record (RC-194)

Every run binds: instrument validation (scope / CAN-interface / DC-supply
S/N + cal dates + FIU chassis rev) · component-under-test specifics (DUT VCU
S/N, supplier inverter + BMS board S/N) · test-specific component-datasheet
manifest (safety-loop pilot-relay datasheet ref + expected coil / mechanical
drop-out delays — measured, not asserted).

---

## Owner corrections applied (review_43)

1. **Timing/percentage authority labels (RC-202)** — all bench values are
   `BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING / CONTROLS_REVIEW_REQUIRED`.
2. **Expected-safe-output vs blocked-outputs split (RC-203)** — a torque-zero
   response is the safe output, not a blocked output (tests 001/002/004/
   007/008/010).
3. **"immediate" removed (RC-204)** — zero-torque within the configured
   window; measured latency, not "instant."
4. **HVIL ownership (RC-205)** — VCU requests; BMS/PDU/hardwired loop owns
   isolation execution.
5. **Service-clear rule (RC-206)** — software records only, never active
   hardwired/HVIL/E-stop/BMS/isolation faults or a live latch.
6. **HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW (RC-207)** — not "permanently
   blocked"; recovery via root-cause + corrective action + re-test +
   signoff + versioned record.

## Standing checks

- Low-voltage bench only; no live HV; no vehicle motion; no live Ford-bus
  transmission; CAN_1 listen-only (TXD-line proof); the VCU requests but
  does not own HV isolation (BQ-27); no bench timing/percentage becomes a
  rule until controls review + supplier confirmation upgrades it.
- **Nothing ingested; nothing Confirmed; scripts are illustrative
  pseudocode, not production code; Gate 05J / live vehicle commissioning
  NOT YET; ODRs untouched.**

## Next — Gate 05I-B (Mechanical Interlocks & Physical Safety Loop Verification)

Owner scope: E-stop circuit · HVIL connectors · service-disconnect state ·
charge-port interlock · contactor-simulator coil path · safety-relay
dropout · fuse/power-distribution behaviour · LV harness strain relief ·
connector keying · ground continuity · shield continuity · bench
lockout/tagout verification. Bench-only; no live HV, no vehicle motion, no
Ford-bus transmission.

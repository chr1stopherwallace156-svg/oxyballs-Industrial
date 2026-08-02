# PHYSICAL BENCH INTEGRATION & LOW-VOLTAGE LOOP VERIFICATION (Gate 05I)

The production-like **low-voltage bench integration** layer for the
F-450/F-550 EV conversion controls (Gate 05I, batch_45 + owner review_42).
Gate 05H proved the logic with a real VCU in HIL; Gate 05I asks whether the
**real harness + real VCU + supplier logic boards + E-stop + relays behave
correctly together on the bench** — with high voltage isolated and no
vehicle. Bench evidence only; no vehicle clearance.

**Status (owner review_42): `LOW_VOLTAGE_BENCH_INTEGRATION_STARTED` /
`PRODUCTION_INTENT_HARNESS_REQUIRED` / `REAL_VCU_REQUIRED` /
`SUPPLIER_LOGIC_NODES_REQUIRED` / `HARDWIRED_ESTOP_REQUIRED` /
`NO_HV_TRACTION_BATTERY` / `NO_VEHICLE_ROAD_TESTING` /
`NO_LIVE_FORD_BUS_TRANSMISSION` / `NO_VEHICLE_CLEARANCE` /
`PENDING_ENGINEERING_REVIEW`.** Owner: "yes, begin Gate 05I — but keep it
low-voltage physical bench integration only; **do not move to Gate 05J /
live vehicle commissioning yet**."

## Three RESTRICTED constraints (forbidden at this stage)

- **HV traction-battery connection is completely forbidden** — all inverter
  and BMS/PDU logic runs on **low-voltage aux only (12 V nominal)**; HV
  rails unpowered + mechanically isolated.
- **Vehicle road testing / closed-course / wheels-on-ground is completely
  forbidden.**
- **Direct injection / physical transmission onto the live Ford factory bus
  (CAN_1) is completely forbidden.**

---

## The bench-integration run rule (kept)

```
IF hv_lockout_breached == "TRUE" OR result_category == "NEEDS_REVIEW":
    VEHICLE_INTEGRATION_APPROVAL = "BLOCKED"
    SYSTEM_EXECUTION_MODE        = "BENCH_RE-RUN_REQUIRED"
```

## Result categories — BENCH, not HIL (owner review_42, RC-197)

Gate 05H = HIL; Gate 05I = production-like low-voltage bench integration.
Runs report:

- `BENCH_OBSERVED_VALID_NO_VEHICLE_AUTHORITY`
- `BENCH_NEEDS_REVIEW_NO_VEHICLE_AUTHORITY`
- `BENCH_HARD_BLOCK` (e.g. HV-lockout breach, CAN_1 transmit leakage)
- `BENCH_INVALID_RUN` (missing/incomplete artifact package)

---

## 1. Production-like low-voltage integration environment

Moves from simulated HIL load cards to the physical control components that
will install in the chassis:

- **Real harness & PDU** — production connectors, real E-stop interlock.
- **Real VCU** — Rev C-3 base node, multi-bus interface.
- **Supplier controllers** — BMS/PDU logic board + inverter control unit,
  **low-voltage logic power only; HV rails unpowered + mechanically
  isolated.**

**Harness status (owner review_42, RC-199):** the wiring harness is a
**`PRODUCTION_INTENT` bench harness — `NOT_RELEASED_FOR_VEHICLE_INSTALL`**
(identical wire gauges / shield grounding / pin crimps / connector housings
per the master wiring diagram; upgrades to "production-released" only later).

**Hardwired safety interlock loop:** physical E-stop, panel switches,
dual-channel safety relays wired inline to verify LV dropouts before
integration.

## 2. Low-voltage bench fault-injection & driver-safety matrix

| Test ID | Target | Fault insertion | Observed response (record) | Bench-safety rule |
|---|---|---|---|---|
| BENCH-05I-001 | CAN_1 physical transceiver | **controlled stuck-dominant / stuck-TXD fault through a protected fault-injection path approved for the transceiver circuit** (RC-193) | local transceiver error tracking; register-lock duration; node → passive-error / bus-off, zero physical damage | **protected bench harness or simulated OEM network only — forbidden on a live Ford vehicle network (RC-200)** |
| BENCH-05I-002 | driver output stages | toggle power-rail states, monitor high-side/low-side pins | **measure driver-output behaviour after power loss — safe state depends on output-stage design / pull-ups-downs / relay topology / hardware fail-safe; timing + final state match the verified schematic (RC-183)** | current-limited supply, fused DUT |
| BENCH-05I-003 | hardwired E-stop interlock | actuate physical E-stop mushroom button inline with the LV control harness | **E-stop removes the LV control path through the approved hardwired safety loop; coil-voltage decay, relay drop-out time, and output behaviour must be measured and compared against the verified schematic + component datasheets — not "instant" (RC-198)** | hardwired loop bypasses software layers |
| BENCH-05I-004 | CAN_2 / CAN_3 cross-talk | inject max allowable frame density on both isolated loops concurrently | monitor frame dropouts / buffer overflow / cross-bus latency; verify zero message bleed | complete isolation between battery + inverter control planes |

## 3. Validation + calibration-proof script

Illustrative bench-automation pseudocode (Hunter-supplied, **not runnable
production code**): **Script A — physical transceiver-protection audit**
verifies HV lockout active, injects the protected stuck-TXD fault, and
checks the DTO + BUS_OFF register bits. Result reported as a **BENCH**
category (RC-197), never HIL/PASS.

## 4. Mandatory bench-integration proof-artifact dossier

Every run compiles + signs: **Bench Run ID · firmware version · VCU hardware
revision · test-script version · harness assembly part number · supplier BMS
logic hardware rev · supplier inverter logic board rev · HV isolation status
(`VERIFIED_DISCONNECTED`) · fault injected · instrument calibration records
(oscilloscope S/N + cal date · CAN-analyzer S/N + firmware ·
programmable-supply S/N + cal date · FIU hardware revision, RC-194) · raw CAN
log · oscilloscope capture · driver-pin multimeter data · metrics · result
category (BENCH) · authority status · engineer reviewer.**

---

## Owner corrections applied (review_42)

1. **BENCH result categories (RC-197)** — replace `HIL_OBSERVED_VALID` with
   the BENCH categories above.
2. **E-stop measured, not "instant" (RC-198)** — coil decay + relay
   drop-out time measured against schematic + datasheets.
3. **Production-intent harness (RC-199)** — not "production-spec/released."
4. **CAN_1 fault-injection protected-bench-only (RC-200)** — forbidden on a
   live Ford vehicle network.
5. **Gate 05I-A sub-gate (RC-201)** — driver-safety verification stays
   bench-level (see Next).

## Standing checks

- Low-voltage bench only; HV traction battery forbidden + isolated; no
  vehicle road testing; no live Ford-bus transmission; CAN_1 listen-only
  (protected/simulated fault injection only); non-destructive fault
  injection; no vehicle clearance; pending engineering review.
- **Nothing ingested; nothing Confirmed; scripts are illustrative
  pseudocode, not production code; Gate 05J / live vehicle commissioning
  explicitly NOT YET; ODRs untouched.**

## Next — Gate 05I-A (Low-Voltage Driver Safety Logic Verification)

A **bench-only** driver-safety verification matrix (owner review_42,
RC-201) — **not** vehicle road testing, **not** live HV, **not** real
driver-operation approval. Per the owner's verbatim prompt, each test
covers: accelerator-pedal plausibility · brake override · shift-state
inhibit · charger-plug drive lockout · E-stop hardwired interrupt · HVIL
open detection · BMS no-discharge response · inverter fault response ·
low-voltage brownout · fault-latch persistence · service-clear routine ·
isolated EV-display warning behaviour · CAN_1 listen-only maintained during
all driver-input tests — each with test ID / driver-safety function / bench
setup / fault-or-input injected / expected VCU behaviour / expected
hardwired behaviour / blocked outputs / measurement method / proof artifact
/ result category / authority status / Build Engine status. Hard rules: no
live HV; no vehicle motion; no real Ford factory-bus transmission; no
road-test approval; bench evidence only. **Blocked outputs:** real
propulsion, live HV, wheels-on-ground movement, Ford ABS/ESC intervention,
factory-cluster injection, road-test driver-safety claims.

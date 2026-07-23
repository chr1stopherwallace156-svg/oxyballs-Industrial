# FAULT CONTAINMENT + GATEWAY FAILSAFE MATRIX (Gate 05G)

The fault-containment layer for the F-450/F-550 EV conversion controls
(Gate 05G, batch_41 + owner review_38). Gate 05F said what may cross the
network boundary; Gate 05G says **what happens when something fails**. All
rows are simulation-only model assertions — nothing here has physical
authority until supplier docs or HIL/bench proof confirm it.

**Status (owner review_38): `FAILSAFE_MATRIX_MAPPED` / `SIMULATION_ONLY` /
`TIMEOUT_VALUES_PENDING_SUPPLIER_DATA` / `HIL_BENCH_PROOF_REQUIRED` /
`CAN_1_LISTEN_ONLY_PROOF_REQUIRED` / `NO_PHYSICAL_GATEWAY_DEPLOYMENT` /
`NO_FACTORY_BUS_TRANSMISSION` / `NO_PLACEHOLDER_TIMING_AUTHORITY`.** Owner:
"strong … architecture right, failsafe categories right."

---

## The failsafe gate rule (owner: "should stay permanently")

```
IF failsafe_timing_confirmed == "FALSE" OR hil_bench_proof == "MISSING":
    PHYSICAL_HARDWARE_INTEGRATION = "BLOCKED"
    SYSTEM_EXECUTION_MODE         = "SIMULATION_FAULTS_ONLY"
```

## Failsafe default-safe rule (owner review_38, RC-179)

- **No failsafe timing value may control physical hardware until it is
  upgraded from `SimulationSweepOnly` to `SupplierConfirmed` or
  `BenchVerified`.**
- **Any signal fault involving torque, contactors, BMS discharge
  permission, HVIL, isolation, or e-stop must default toward torque
  inhibit, restart lockout, and engineering review.**

## Timing doctrine (owner review_38, RC-174) — read first

Every timeout / instant-action number is a **`SimulationSweepOnly` /
`SupplierDataPending` placeholder with No Gate Authority** (third recurrence
of the invented-timing defect — cf. RC-116 200 ms HVIL, RC-133 Gate 08C
placeholder-authority, RC-169/173 Gate 05F 50/100 ms):

| Placeholder | Batch value (downgraded) | Status |
|---|---|---|
| `t_inverter_torque_zero` | ~50 ms | SupplierDataPending / SimulationSweepOnly — **No Gate Authority** |
| `t_can2_timeout` | ~100 ms | SupplierDataPending / SimulationSweepOnly — **No Gate Authority** |
| `t_can3_timeout` | ~100 ms | SupplierDataPending / SimulationSweepOnly — **No Gate Authority** |
| `t_dominant_timeout` (DTO) | ~2 ms | TransceiverSupplierDataPending / SimulationSweepOnly — **No Gate Authority** |

---

## Failsafe matrix (all rows SIMULATION_ONLY)

| # | Fault condition | Immediate reaction (simulation) | Downstream safe-state (supplier-defined) | Lockout level | Proof constraint |
|---|---|---|---|---|---|
| 1 | VCU crash / lockup | watchdog expires; transceivers → high-impedance | inverter transitions to **supplier-defined safe (zero-torque) behaviour after loss of the VCU cyclic frame — timeout pending inverter docs + HIL** (RC-174); BMS opens contactors on heartbeat loss under its own rules | permanent latch until LV cycle | HIL interrupt test proof |
| 2 | CAN_1 accidental transmit attempt | **software attempt rejected by firmware policy AND physically unable to drive the bus (listen-only / silent hardware)** (RC-176) | zero impact on OEM network; no ACK / dominant bits injected | VCU-internal shutdown request | silent-mode register + no TX mailbox + no ACK + no dominant-bit injection + protocol-analyzer capture |
| 3 | CAN_2 inverter loop silent | VCU flags timeout **after a supplier-defined interval (sweep-only)** → writes internal torque zero | inverter shuts down IGBT gates autonomously on loss of control frame | FAULT_LATCHED; manual service clear | HIL bus-disconnect log |
| 4 | CAN_3 BMS loop silent | VCU drops drive requests, commands torque zero to inverter | BMS handles independent contactor-open; VCU enters safe-state | FAULT_LATCHED; manual service clear | BMS heartbeat-dropout test |
| 5 | Gateway power loss | all VCU relays drop open; transceiver lines collapse to unbiased | inverter safe-coast; BMS opens main contactors on interlock/power collapse | total hardware dormancy until power restored | power-rail interrupt bench log |
| 6 | Gateway stuck dominant (TX grounded) | transceiver **dominant-timeout (DTO) circuit** activates **after a supplier-defined interval (sweep-only)** (RC-174) | isolates the faulty VCU node so it cannot stall the physical bus | permanent latch; replacement / inspection | bench scope trace mapping DTO cutoff |
| 7 | Gateway stuck recessive (TX open) | bus behaves as open circuit; node reads as disconnected | inverter + BMS detect cyclic-message loss, run individual safe shutdowns | FAULT_LATCHED; init loops blocked | open-circuit simulation logs |
| 8 | Bad checksum / alive-counter | **reject the corrupted frame; use last known value only if it is an explicit safe-fallback within a supplier-defined timeout, else move toward torque zero / FAULT_LATCHED** — bad data cannot preserve torque authority (RC-177) | on persistent mismatch (sweep-only cycle threshold) torque is zeroed | FAULT_LATCHED if threshold breached | bad-packet injection trace |
| 9 | Message replay interception | freshness/security counters reject duplicates | ignore outdated driver-intent commands; shift toward zero torque | temporary frame rejection → FAULT_LATCHED | packet-replay injection trace |
| 10 | Wrong source address injection | filter registers reject the unexpected node ID | **reject + log; escalate to FAULT_LATCHED only if repeated / safety-critical / matching a forbidden control-path pattern — threshold pending controls-security review** (RC-178) | conditional latch (not immediate) | ID-filtering test report |
| 11 | BMS says no-discharge | VCU clamps inverter torque request to exactly zero | prevents pack over-discharge / cell collapse under load | VCU → FAULT_LATCHED | BMS flag-response test (SupplierDataPending / HILProofRequired) |
| 12 | Inverter ignores torque-zero | **VCU detects current/torque feedback conflicting with the commanded torque-zero → escalates to shutdown request over CAN_3 to the BMS layer and FAULT_LATCHED** (RC-179 critical containment) | redundant emergency de-energization path request | redundant shutdown path | current-feedback-mismatch response trace |
| 13 | E-stop asserted | **hardwired loop removes / interrupts the contactor control path through the approved safety circuit** (RC-175) | contactor drop-out + HV isolation — **actual opening time is supplier-defined and must be verified by bench/HIL oscilloscope trace** (coil decay, spring travel, arc suppression, contact separation); **not "instant"** | hardwired mechanical isolation override (no software clear) | mechanical-loop continuity + opening-time oscilloscope trace |

---

## Owner corrections applied (review_38)

1. **Timeouts downgraded (RC-174)** — 50 ms / 100 ms / 2 ms → `SupplierData
   Pending / SimulationSweepOnly`; rows say "supplier-defined behaviour …
   timeout pending inverter documentation and HIL proof."
2. **No "instant" for mechanical / E-stop actions (RC-175)** — contactor
   opening time is supplier-defined and bench/HIL-verified, never "instant."
3. **CAN_1 transmit-attempt clarified (RC-176)** — rejected by firmware
   policy *and* physically unable to drive the bus; five-part proof pack.
4. **Bad-checksum caution (RC-177)** — bad data cannot preserve torque
   authority; stale value only as an explicit safe fallback within a
   supplier-defined timeout, else torque zero / FAULT_LATCHED.
5. **Wrong-source-address de-escalated (RC-178)** — reject + log, latch only
   on repeat / safety-critical / forbidden-pattern; threshold pending
   controls-security review.

## Standing checks

- CAN_1 listen-only (no transmit, proof required); CAN_2/CAN_3 isolated; no
  timeout has physical authority (RC-174/179); every torque / contactor /
  BMS-discharge / HVIL / isolation / e-stop fault defaults toward torque
  inhibit + restart lockout + engineering review.
- **Nothing ingested; nothing Confirmed; no placeholder timing has gate
  authority; no factory-bus transmission; no physical gateway deployment;
  ODRs untouched.**

## Next — Gate 05H (Gateway Proof Plan / HIL Bench Test Matrix)

Gate 05G says what should happen when faults occur; Gate 05H defines how to
**prove** it without putting it in a vehicle yet: CAN_1 silent-mode proof,
CAN_2 inverter-timeout test, CAN_3 BMS heartbeat-dropout test, bad-checksum
injection, wrong-source-address rejection, torque-zero command trace, BMS
no-discharge response, e-stop loop bench proof, gateway power-loss
behaviour, watchdog-reset behaviour.

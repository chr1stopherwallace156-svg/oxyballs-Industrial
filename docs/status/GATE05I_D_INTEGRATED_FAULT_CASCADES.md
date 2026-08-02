# LOW-VOLTAGE END-TO-END BENCH RUN / INTEGRATED FAULT CASCADES (Gate 05I-D)

The integration-test layer for the F-450/F-550 EV conversion controls (Gate
05I-D, batch_51 + owner review_48). The culmination of the isolated bench
phase: instead of testing isolated nodes, Gate 05I-D exercises the **entire
integrated low-voltage system as a system** (real VCU + supplier BMS/inverter
logic boards + display + simulator interfaces, running dynamically) under
coordinated off-nominal **fault cascades**. Bench-only; no vehicle authority.

**Status (owner review_48): `INTEGRATED_FAULT_SEQUENCE_MATRIX_CREATED` /
`LOW_VOLTAGE_BENCH_ONLY` / `REAL_VCU_DUT_REQUIRED` /
`SUPPLIER_LOGIC_BOARDS_REQUIRED` /
`CAN_1_SILENCE_REQUIRED_DURING_ALL_CASCADES` /
`TIMING_TARGETS_PENDING_SOURCE_REVIEW` / `NO_LIVE_HV` / `NO_VEHICLE_MOTION` /
`NO_LIVE_FORD_CAN_TRANSMISSION` / `NO_VEHICLE_CLEARANCE`.** Owner: "the
correct next gate … you are now testing the system as a system."

## Global constraint (every cascade)

**`CAN_1 Isolation = ACTIVE` — the VCU CAN_1 TXD pin stays at `Vcc`
recessive, 0 frames transmitted, 0 ACK, 0 active errors — logged
continuously at high speed on the physical TXD pin.** Any dominant
transition or active frame is an immediate Gate Failure.

## Timing / value doctrine (owner review_48, RC-225) — read first

Every value is a **`BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING /
ENGINEERING_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY`** input, not a rule
(twelfth artifact of the invented-values family): ≤100 ms, ≤50 ms, ≤20 ms,
<10 ms, ≤5.0 s, ≤1.0 mA. Rows read "…within the configured bench target
window; initial target ≤N ms; final threshold pending supplier docs +
controls review + bench evidence." **No "immediate/immediately"** — measured
by timestamped CAN/scope trace (RC-211). Test IDs are **`05I-D-###`** (gate-
naming consistency, RC-225).

---

## Integrated fault-cascade matrix (bench-only, `05I-D-###`)

| Test | Scenario | Trigger | Expected coordinated cascade | Display | CAN_1 | Verification (bench target) |
|---|---|---|---|---|---|---|
| 05I-D-001 | accel + brake override (APTO) | brake pressed while APPS ~50% | VCU overrides throttle, torque → 0 Nm, flags override (measured window) | "Brake Override Active" | silent | torque → 0 Nm within target (≤100 ms); no recovery until APPS <5% |
| 05I-D-002 | torque + HVIL open | open physical HVIL loop | torque → 0 Nm, safe-state lines open, Safe-Fault Lock | "HVIL Open Circuit" | silent | torque → 0 Nm within target (≤50 ms) |
| 05I-D-003 | torque + BMS no-discharge | BMS no-discharge frame on CAN_3 | reads flag, torque → 0 Nm, soft-shutdown | "BMS Fault – Discharge Inhibited" | silent | zero-torque within target (≤100 ms) |
| 05I-D-004 | torque + inverter fault | inverter fault flag on CAN_2 | halt control loop, Safe-Fault, request main contactor open | "Inverter System Fault" | silent | interlock request line low within target (≤20 ms) |
| 05I-D-005 | torque + CAN_2 heartbeat loss | disconnect CAN_2 / halt frames | detect comm loss, 0 Nm, Comm Fault, DTC | "Inverter Comm Lost" | silent | Comm Safe state within target (≤100 ms) |
| 05I-D-006 | charge-plug during drive | assert charge proximity/pilot | **VCU recognizes charger-plug active, declares illegal-state fault, torque → 0 Nm, blocks drive-enable + charge-path until safe (RC-226 — detect + reject, does not "ignore")** | "Drive Error: Charger Connected" | silent | torque → 0 Nm within target (≤50 ms); contactors blocked on charge port |
| 05I-D-007 | E-stop during active torque | press bench E-stop | **the hardwired E-stop loop owns the physical LV interruption; the VCU observes feedback loss, commands torque-zero on isolated CAN_2 if still powered, logs the E-stop fault, latches restart lockout (RC-227)** | "Emergency Stop Active" | silent | software torque matches hardware within target (≤50 ms) |
| 05I-D-008 | brownout during active fault latch | 12 V → 6.0 V (1 s) → 12 V | maintain the active fault latch through the dip; reboot to Safe-Fault Lock | "Fault Recovery: System Latched" | silent | latch not cleared on boot; contactor drives stay open/disabled |
| 05I-D-009 | service-clear during fault | UDS 0x14 while physical fault present | reject clear while the physical stimulus is active | "Clear Rejected – Active Fault Present" | silent | NRC 0x22 (Conditions Not Correct), or re-latches instantly within target (<10 ms) |
| 05I-D-010 | sleep with stuck-awake node | force sleep + babbling CAN_2 node | attempt sleep, detect stuck traffic, log "Stuck Awake" DTC, isolate local nets | "Entering Power Save – Stuck Node" | silent | reach the **VCU_sleep_current_target (≤1.0 mA node, not the ≤4.0 mA total, RC-228)** within the target window (≤5.0 s) |

---

## Owner corrections applied (review_48)

1. **No "certified safe" (RC-224)** — see exit criteria below.
2. **Test IDs + timing labels + no "immediate" (RC-225)** — `05I-D-###`,
   BENCH_TARGET_PROFILE, measured windows.
3. **Charger-plug detect + reject (RC-226)** — the VCU recognizes and
   rejects the illegal state, never "ignores" it.
4. **E-stop ownership (RC-227)** — the hardwired loop owns the physical
   interruption; the VCU observes/commands/logs/latches.
5. **Sleep-current node vs total (RC-228)** — VCU node ≤1.0 mA is separate
   from total-system ≤4.0 mA.

## Gate 05I-D exit criteria (owner review_48, RC-224)

The system cannot exit Gate 05I-D unless:

1. **CAN_1 silence is proven** across all integrated fault cascades.
2. Torque-zero behaviour is observed within configured bench target
   windows.
3. Fault latches survive brownout and power-cycle tests.
4. Service-clear commands cannot clear active physical or unresolved safety
   faults.
5. Display warnings match the active fault state.
6. All raw logs, scope captures, CAN traces, firmware hashes, harness
   revisions, and reviewer signoffs are archived.

**Successful Gate 05I-D completion permits engineering review for
controlled low-voltage vehicle fitment only.** It does **not** authorize:
live HV connection · vehicle movement · road testing · chassis-dyno testing
· customer operation · factory Ford bus transmission · compliance or
certification claims. (Never "certified safe.")

## Standing checks

- Bench-only; no live HV; no vehicle motion; no Ford factory-bus
  transmission; CAN_1 listen-only + silent (TXD-pin logged) during every
  cascade; the hardwired E-stop loop (not software) owns physical
  interruption; the VCU requests but does not own HV isolation (RC-205;
  BQ-27); no timing becomes a rule until controls review + supplier
  confirmation upgrades it.
- **Nothing ingested; nothing Confirmed; no "certified safe"/compliance
  claim; scripts are illustrative pseudocode, not production code; ODRs
  untouched.**

## Next — the post-bench gate ladder (Decision Register D-008)

Gate 05I-D does **not** jump to live vehicle commissioning. The owner
defined a staged, gated path:

- **Gate 05J — Controlled Vehicle Fitment / No-HV Installation Readiness**
  (NEXT): install the VCU/harness physically in the vehicle; **no HV battery
  connected; no traction enable**; CAN_1 remains listen-only; verify
  grounds/shields, connector routing, no chafing, service access, LOTO, 12 V
  parasitic draw in the chassis, no Ford bus disturbance.
- **Gate 05K — Low-Voltage Vehicle Power-On / No-HV Commissioning.**
- **Gate 05L — Controlled HV First-Energization** — engineer-approved only,
  after 05J + 05K, with a staged safety plan + LOTO/PPE (RC-117).

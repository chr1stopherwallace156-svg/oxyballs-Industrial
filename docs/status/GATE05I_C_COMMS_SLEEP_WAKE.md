# LOW-VOLTAGE COMMUNICATION NETWORK INTEGRITY & SLEEP/WAKE VALIDATION (Gate 05I-C)

The low-voltage network-interface verification layer for the F-450/F-550 EV
conversion controls (Gate 05I-C, batch_48 + owner review_45). After the
Gate 05I-A driver-safety-logic matrix and the Gate 05I-B mechanical-interlock
matrix are **defined and bench evidence is collected** (both are
`MATRIX_CREATED / BENCH_EVIDENCE_PENDING` — *not yet fully validated*,
RC-210), Gate 05I-C proves network-bus integrity, frame filtering, database
synchronization, and sleep/wake behaviour — **without ever exposing a live
wire to CAN_1 leakage**.

**Status (owner review_45): `STARTED` / `LOW_VOLTAGE_BENCH_ONLY` /
`NETWORK_INTEGRITY_MATRIX_PENDING` / `SLEEP_WAKE_MATRIX_PENDING` /
`DBC_VERSION_CONTROL_REQUIRED` / `HEARTBEAT_TARGETS_PENDING_SOURCE_REVIEW` /
`NO_LIVE_HV` / `NO_VEHICLE_MOTION` / `NO_LIVE_FORD_CAN_TRANSMISSION` /
`NO_VEHICLE_CLEARANCE`.** Owner: "Gate 05I-C is the correct next move …
should also include sleep/wake validation, not just communication." The
chain: **logic → interlocks → communications → sleep/wake → then later
physical bench integration review.**

## Sub-gate split (owner review_45, RC-214)

- **Gate 05I-C1 — Communication Network Integrity** (NEXT)
- **Gate 05I-C2 — Sleep / Wake / Parasitic Drain**

## Target-value doctrine (owner review_45, RC-212) — read first

Every value is a **`BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING /
ENGINEERING_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY`** input, not a rule
(invented-values family RC-116/133/169/174/180/188/202/208): the >75% bus
utilization stress target and the >100 ms heartbeat-loss window are
placeholders; breach limits are variables (`approved_ground_limit`,
`approved_datasheet_limit`, `approved_heartbeat_window`), not hard-coded
constants. **No "immediate" language (RC-211):** behaviour is measured within
a configured window vs the approved target profile.

---

## Gate 05I-C1 — Communication Network Integrity

Bench-only network verification:

- **CAN_2 performance** — VCU ↔ inverter logic board: data tracking,
  parsing, latency (measured, target-profile).
- **CAN_3 performance** — VCU ↔ BMS/PDU logic board: safety-parameter frame
  exchange.
- **Display-node communication** — serial/CAN packet routing, frame
  dropouts, error-warning screens.
- **Diagnostic-tool communication** — secure UDS session handling, PID
  reads, diagnostics routing.
- **Heartbeat behaviour** — VCU torque command **transitions toward zero
  after a configured heartbeat-loss target window; final timeout pending
  supplier documentation + controls review + bench evidence** (RC-211/213),
  not "drops to zero at >100 ms."
- **Message filtering & rejection (RC-213)** — a DBC is a *database/map*
  that explains how to decode packets, **not** a packet. Verify rejection
  of: **wrong arbitration ID · wrong PGN / source address · wrong DBC
  version · bad checksum · rolling-counter mismatch · out-of-range signal
  scaling · unexpected diagnostic request.**
- **DBC version matching** — message structures, scaling, offsets, bit
  positions match across all nodes.
- **Bus-load integrity** — network health + error-frame rate under
  simulated peak loading (>75% utilization, target-profile).
- **Strict CAN_1 isolation** — **zero frame leakage, ACK responses, or
  active transmissions onto CAN_1 during any communications exercise**
  (TXD-line proof, RC-186/200).

## Gate 05I-C2 — Sleep / Wake / Parasitic Drain

- key-off sleep entry · charger-plug wake · service-tool wake · fault-event
  wake · BMS/PDU sleep behaviour · inverter-logic sleep behaviour ·
  display sleep behaviour · stuck-awake detection · brownout recovery ·
  total sleep-current measurement · **no unauthorized CAN_1 wake or
  transmit.**

---

## Owner corrections applied (review_45)

1. **05I-C intro (RC-210)** — "With safety logic and physical interlocks
   validated…" → "After Gate 05I-A and 05I-B matrices are defined and bench
   evidence is collected…" (they are `MATRIX_CREATED / BENCH_EVIDENCE_
   PENDING`, not validated).
2. **No "immediate" (RC-211)** — measured within a configured window vs the
   approved target profile (05I-A/05I-B safe-output cells + the 05I-C
   heartbeat line).
3. **Bench values are target profiles (RC-212)** — incl. >75% bus
   utilization + >100 ms heartbeat; breach limits are variables.
4. **DBC terminology + rejection set (RC-213)** — a DBC is a database, not a
   packet; reject wrong-ID / wrong-PGN / wrong-DBC-version / bad-checksum /
   rolling-counter / out-of-range / unexpected-diagnostic-request.
5. **Sleep/wake sub-gate (RC-214)** — split 05I-C1 (comm integrity) / 05I-C2
   (sleep/wake/parasitic drain).

## Standing checks

- Bench-only; no live HV; no vehicle motion; no Ford factory-bus
  transmission; CAN_1 listen-only + no leakage during any comm test
  (TXD-line proof); no timing/threshold/bus-load number becomes a rule until
  controls review + supplier/DBC confirmation upgrades it; the VCU requests
  but does not own HV isolation (RC-205; BQ-27).
- **Nothing ingested; nothing Confirmed; Gate 05J / live vehicle
  commissioning NOT YET; ODRs untouched.**

## Next — Gate 05I-C1 (Communication Network Integrity matrix)

Build the bench-only per-signal comm-integrity matrix (CAN_2/CAN_3, display,
diagnostic/UDS, DBC version matching, heartbeat loss, wrong-ID rejection,
checksum/rolling-counter rejection, high bus-load stress, CAN_1 no-leakage
proof), then Gate 05I-C2 (sleep/wake/parasitic drain).

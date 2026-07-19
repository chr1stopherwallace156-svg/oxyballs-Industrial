# MECHANICAL INTERLOCKS & PHYSICAL SAFETY LOOP VERIFICATION (Gate 05I-B)

The physical-safety-loop verification layer for the F-450/F-550 EV
conversion controls (Gate 05I-B, batch_47 + owner review_44). A sub-gate of
Gate 05I: where 05I-A proved the driver-safety *logic*, 05I-B proves the
*physical* integrity, routing, safety lines, and mechanical build variables
of the low-voltage integration harness. Strictly isolated, non-powered-HV
bench; no vehicle.

**Status (owner review_44): `MECHANICAL_INTERLOCK_MATRIX_CREATED` /
`PHYSICAL_SAFETY_LOOP_TESTS_DEFINED` / `PRODUCTION_INTENT_HARNESS_REQUIRED` /
`BENCH_LOTO_REQUIRED` / `TARGET_CRITERIA_PENDING_SOURCE_REVIEW` /
`NO_LIVE_HV` / `NO_VEHICLE_CLEARANCE`.** Owner: "the correct 'real harness'
layer before anything touches the vehicle … still not vehicle/HV/road-test
approval."

## Target-criteria doctrine (owner review_44, RC-208) — read first

Every numeric criterion is a **`TARGET_BENCH_CRITERIA / NEEDS_COMPONENT_
DATASHEET / NEEDS_ENGINEERING_REVIEW`** value — an initial bench target, not
a universal rule; final value pending supplier datasheet + controls-engineer
review + bench evidence. (Same invented-values family as
RC-116/133/169/174/180/188/202.)

| Criterion | Batch target | Status |
|---|---|---|
| E-stop terminal contact resistance | <0.1 Ω | TARGET_BENCH_CRITERIA / NEEDS_COMPONENT_DATASHEET |
| ground continuity | <0.02 Ω | TARGET_BENCH_CRITERIA / NEEDS_ENGINEERING_REVIEW |
| safety-relay dropout | ≤20 ms | pending force-guided-relay datasheet |
| branch fuse ratings | 5 A / 10 A | pending electrical-load analysis + schematic |

## The interlock breach rule (owner review_44, RC-209)

Variables, not hard-coded limits:

```
IF ground_resistance_ohms >= approved_ground_limit
   OR safety_relay_dropout_ms > approved_datasheet_limit:
       VEHICLE_COMMISSIONING_APPROVAL = "HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW"
       SYSTEM_EXECUTION_MODE          = "SAFETY_CONFLATION_HALT"
```

Recovery = the Gate 05I-A RCA flow (root-cause · corrective action · repeat
bench test · engineering signoff · versioned record) (RC-207).

---

## Mechanical-interlock verification matrix (bench-only)

| Test ID | Interlock domain | Evaluation procedure | Target criteria (TARGET_BENCH_CRITERIA, RC-208) | Proof artifact |
|---|---|---|---|---|
| 05I-B-001 | E-stop circuit integrity | map hardwired E-stop loop; manual pull/stress on switch housing + terminal junctions | no insulation damage / loose pins / high-R junctions; terminal contact R <0.1 Ω (target) | milliohm log + routed-loop photo + harness print |
| 05I-B-002 | HVIL physical connectors | insert/extract interlock pins in HV dummy connector shell | continuity **made-last / broken-first** vs power pins; locking tabs positively lock | continuity sweep log during insert/extract cycle |
| 05I-B-003 | service-disconnect state | cycle service-disconnect plug: insert / lever-lock / LOTO | positive physical interruption of the loopback when unlocked/removed; mechanical alignment | toggle check sheet + locked-out disconnect photo |
| 05I-B-004 | charge-port interlock | insert charge-gun simulator; observe proximity + pilot micro-switch lines | correct feedback state change; plug lock engages + holds lockout profile | voltage-transition trace + micro-switch cycle record |
| 05I-B-005 | contactor-simulator coil path | drive simulator coils; measure coil voltage / current / decay on safety-loop interruption | drop-out time matches physical spec (target); suppression diode/varistor correct polarity | current/voltage oscilloscope plot during shutdown |
| 05I-B-006 | safety-relay dropout | interrupt safety-loop feed upstream; record dropout timing + contact change | both primary channels drop within the **datasheet** window (≤20 ms target, RC-208) | high-speed logger time-stamped contact-transition log |
| 05I-B-007 | fuse & power distribution | check wire routing, terminal torque, branch fuse ratings vs schematic | correct fuse ratings (5 A/10 A target); branch-circuit isolation maintained | PDB layout photo audit + torque-mark sheet + build sheet |
| 05I-B-008 | LV harness strain relief | pull-out / bend force adjacent to strain-relief boots | no wire pullout / pin backing / boot tearing / stress concentration | force-gauge pull records + pin back-out check log |
| 05I-B-009 | connector keying | blind physical mating trials across adjacent similarly-pinned groups | keying + shell color indexing completely block cross-mating | cross-mating interference verification sign-off |
| 05I-B-010 | ground continuity | micro-ohm from farthest structural/shield ground to master bus | R <0.02 Ω (target) to any safety-critical ground | milliohm ground-loop sweep report |
| 05I-B-011 | shield continuity | verify 360° shield termination; measure R to ground per design | termination continuity per design (single/dual-ended); zero shield breaks | shield ground-impedance sweep log |
| 05I-B-012 | bench LOTO | verify LOTO padlock brackets on power-isolation lines | bench activation points fully blocked when padlocks applied | signed LOTO audit sheet + tag ID + safety log |

## Mandatory bench-run traceability package

Instrument validation (micro-ohm meter / caliper / force-gauge S/N + cal
dates) · harness & mechanical substrates (harness assembly P/N, PDU
contactor-coil-simulator P/N, force-guided safety-relay S/N) · interlock
schematic manifest (system wiring-diagram version, LOTO tag identifier).

---

## Owner corrections applied (review_44)

1. **Target-criteria labels (RC-208)** — <0.1 Ω / <0.02 Ω / ≤20 ms / 5 A/10 A
   are `TARGET_BENCH_CRITERIA / NEEDS_COMPONENT_DATASHEET /
   NEEDS_ENGINEERING_REVIEW`, not universal rules.
2. **Variable breach logic (RC-209)** — `approved_ground_limit` /
   `approved_datasheet_limit`, not hard-coded 0.02 Ω / 20.0 ms.

## Standing checks

- Bench-only; no live HV; no vehicle motion; no Ford factory-bus
  transmission; production-intent harness; bench LOTO required; the VCU
  requests but does not own HV isolation — the BMS/PDU/hardwired safety loop
  owns it (RC-205; BQ-27); no bench criterion becomes a rule until component
  datasheet + engineering review confirms it.
- **Nothing ingested; nothing Confirmed; Gate 05J / live vehicle
  commissioning NOT YET; ODRs untouched.**

## Next — Gate 05I-C (Low-Voltage Communications Integration)

Owner scope: CAN_2 VCU↔inverter logic board · CAN_3 VCU↔BMS/PDU logic
board · display-node communication · diagnostic-tool communication ·
heartbeat behaviour · message filtering · DBC version matching ·
wrong-DTC/wrong-ID rejection · bus load under maximum frame density · **no
CAN_1 leakage during all communication tests**. Bench-only; no live HV, no
vehicle motion, no Ford-bus transmission.

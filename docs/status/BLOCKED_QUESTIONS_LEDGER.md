# BLOCKED QUESTIONS LEDGER

Every supplier-only value that would otherwise stall a gate is **parked
here** so research can keep moving on the parts that do not need a
supplier answer yet (owner directive, 2026-07-16 —
`docs/research/raw/owner_directives/directive_01_park_and_proceed.md`).

**Operating rule:** supplier data closes *final numbers*; research now
builds the *test plan, failure logic, and next gates*. When a batch hits
a supplier-only value, add an entry here and continue with the
"Alternative research allowed" line — do not wait, do not guess, do not
mark Confirmed.

**Entry structure (owner-specified):**

```
Gate:
Question:
Supplier needed:
Why it matters:
What calculation it unlocks:
Current status:
Follow-up date:
Alternative research allowed:
```

**Follow-up cadence (owner review_22 — real dates, not vague quarters
like "Q3 2026"):**

- **First follow-up:** 7 days after the letter is first sent.
- **Second follow-up:** 14 days after first send.
- **Escalation:** 21 days after first send — or contact the distributor /
  engineering rep.

The supplier letters (Webasto, Dana, ZF, Ford/Lee) are drafted under
`docs/research/outreach/`. Webasto is READY_TO_SEND; Dana, ZF, and
Ford/Lee are DRAFT awaiting owner approval. **The clock starts on the
actual send date** (an owner action) — until then follow-up fields read
"on send + 7/14/21d." Record the send date in the outreach file and here
when each letter goes out.

---

## Gate 04 — Brake / Steering Assist (ZF EPHS MPU 100-C)

### BQ-01
- **Gate:** 04 — Brake / Steering
- **Question:** Can the ZF MPU 100-C support hydroboost brake assist +
  steering gear simultaneously (including a rapid pedal-travel volume
  drop while steering)?
- **Supplier needed:** ZF Race Engineering
- **Why it matters:** determines whether the EHPS candidate is viable at
  all for this architecture
- **Unlocks:** EHPS candidate suitability, DC-DC sizing, brake/steering
  assist architecture
- **Current status:** BLOCKED_PENDING_SUPPLIER_RESPONSE (RC-82,
  NeedsHydroboostCompatibilityReview)
- **Follow-up date:** on send + 7/14/21d (`SUPPLIER_INQUIRY_ZF_01.md`, DRAFT)
- **Alternative research allowed:** Gate 04B FMVSS 105 test mapping +
  loaded low-speed steering test procedure

### BQ-02
- **Gate:** 04 — Brake / Steering
- **Question:** Current-vs-pressure/flow map; max continuous current; max
  peak current + allowed duration (ZF MPU 100-C).
- **Supplier needed:** ZF Race Engineering
- **Why it matters:** the 12 V load could be a hundreds-of-amps event;
  the current is the missing input to low-voltage sizing
- **Unlocks:** RC-85 (removes the EngineeringEstimate fence), Gate 04C
  DC-DC / buffer sizing
- **Current status:** BLOCKED_PENDING_SUPPLIER_RESPONSE (RC-85,
  NeedsZFCurrentMap — do NOT hard-code 250–300 A)
- **Follow-up date:** on send + 7/14/21d
- **Alternative research allowed:** Gate 04C DC-DC converter / buffering
  modeling (transient sag, fuse/relay sizing) without ZF's final numbers

### BQ-03
- **Gate:** 04 — Brake / Steering
- **Question:** Duty cycle at 12 L/min & 124.5 bar; thermal derating
  curve (ZF MPU 100-C).
- **Supplier needed:** ZF Race Engineering
- **Why it matters:** continuous-load survival and derating drive both
  suitability and the failure/warning logic
- **Unlocks:** commercial-duty suitability (RC-84), thermal fault logic
- **Current status:** BLOCKED_PENDING_SUPPLIER_RESPONSE (CS-53,
  NeedsThermalDeratingData / NeedsCommercialDutyReview)
- **Follow-up date:** on send + 7/14/21d
- **Alternative research allowed:** Gate 04B EHPS-pump-failure-response
  test methods

### BQ-04
- **Gate:** 04 — Brake / Steering
- **Question:** Control mode + fault/diagnostic outputs — **the factsheet
  says "No connection to the CAN bus required," so do NOT assume CAN/DBC**;
  ask what warning/diagnostic outputs exist and whether a CAN variant
  exists.
- **Supplier needed:** ZF Race Engineering
- **Why it matters:** warning-lamp and safe-shutdown logic depend on what
  the unit can actually signal
- **Unlocks:** Gate 04B/04C warning-lamp + safe-shutdown logic, Gate 05
  cluster/diagnostic integration
- **Current status:** BLOCKED_PENDING_SUPPLIER_RESPONSE (RC-83,
  NeedsSupplierData — CAN-control claim already caught twice)
- **Follow-up date:** on send + 7/14/21d
- **Alternative research allowed:** Gate 05 cluster/CAN integration
  research (authorized Ford-compatible framing only)

## Gate 04 — Brake / Steering Assist (Ford / Lee / steering specialist)

### BQ-05
- **Gate:** 04 — Brake / Steering
- **Question:** Exact 2020–2026 Ford F-450/F-550 factory power-steering
  pump flow-vs-RPM curve and maximum pressure-relief limit.
- **Supplier needed:** Ford Fleet / Lee Power Steering / steering
  specialist
- **Why it matters:** this is the *requirement* the EHPS must meet; the
  Lee 1750 psi / 3.25 GPM figure is only a Ford-**style** benchmark
- **Unlocks:** the real Gate 04 target curve; upgrades the Ford-side rows
  off NeedsFordExactSource
- **Current status:** BLOCKED_PENDING_SUPPLIER_RESPONSE (CS-51,
  NeedsFordExactSource)
- **Follow-up date:** on send + 7/14/21d
  (`SUPPLIER_INQUIRY_FORD_LEE_STEERING_01.md`, DRAFT)
- **Alternative research allowed:** Gate 04B loaded low-speed steering
  test procedure

### BQ-06
- **Gate:** 04 — Brake / Steering
- **Question:** F-450/F-550 steering-gear peak flow (GPM) and pressure
  (PSI) demand during low-speed maneuvering at max front GAWR.
- **Supplier needed:** Ford / steering-gear supplier
- **Why it matters:** worst-case steering demand sets the simultaneous
  brake+steering sizing floor
- **Unlocks:** the RC-74 combined-demand NoGo threshold
- **Current status:** BLOCKED_PENDING_SUPPLIER_RESPONSE
- **Follow-up date:** on send + 7/14/21d
- **Alternative research allowed:** Gate 04B loaded low-speed steering
  test method

### BQ-07
- **Gate:** 04 — Brake / Steering
- **Question:** Hydroboost accumulator internal volume + nitrogen
  pre-charge pressure (Class 4/5 factory unit).
- **Supplier needed:** Ford / hydroboost supplier
- **Why it matters:** determines how many power-off emergency stops
  remain if the electric pump fails
- **Unlocks:** power-off reserve-stop modeling (Gate 04B)
- **Current status:** BLOCKED_PENDING_SUPPLIER_RESPONSE (OpenGap)
- **Follow-up date:** on send + 7/14/21d
- **Alternative research allowed:** Gate 04B power-off brake-reserve test
  methods (test procedure can be researched before the number is known)

### BQ-08
- **Gate:** 04 — Brake / Steering
- **Question:** Hydroboost fluid-volume displacement during a fast panic
  brake; max allowable return-line backpressure before seal bypass.
- **Supplier needed:** Ford / hydroboost supplier
- **Why it matters:** transient volume + return-line limits size the pump
  reserve and plumbing
- **Unlocks:** transient flow-split modeling, plumbing spec
- **Current status:** BLOCKED_PENDING_SUPPLIER_RESPONSE
- **Follow-up date:** on send + 7/14/21d
- **Alternative research allowed:** Gate 04B partial-failure brake tests

### BQ-09
- **Gate:** 04 — Brake / Steering
- **Question:** Manual steering torque (Nm) with assist fully lost, at
  max front GAWR.
- **Supplier needed:** Ford spec **or** field measurement (may not be
  supplier-only — a loaded test can measure it)
- **Why it matters:** defines the loss-of-assist failure severity
- **Unlocks:** steering-assist-loss failure-behavior classification
- **Current status:** BLOCKED (spec) / researchable via test method
- **Follow-up date:** on send + 7/14/21d
- **Alternative research allowed:** Gate 04B loaded low-speed steering
  test procedure (defines how to measure it)

## Powertrain — HV / battery / motor (Webasto, Dana)

### BQ-10
- **Gate:** Powertrain (B-003)
- **Question:** Webasto Standard Battery Pro 40 continuous/peak discharge
  current capability vs Dana TM4 SUMO MD DC input demand — do they match?
- **Supplier needed:** Webasto
- **Why it matters:** the P=V×I check flagged a possible battery-current
  / motor-power mismatch
- **Unlocks:** powertrain compatibility (B-003), HV wiring current basis
- **Current status:** BLOCKED_PENDING_SUPPLIER_DATA (B-003)
- **Follow-up date:** on send + 7/14/21d (`SUPPLIER_INQUIRY_WEBASTO_01.md`,
  READY_TO_SEND)
- **Alternative research allowed:** cooling / loss modeling (already in
  progress); no final HV wiring gauge until this resolves

### BQ-11
- **Gate:** Powertrain (B-004)
- **Question:** Webasto VIB/VIG interface electrical + control data
  (contactor control, pre-charge, interlock, comms).
- **Supplier needed:** Webasto
- **Why it matters:** the interface defines HV connection + pre-charge
  handshake
- **Unlocks:** HV wiring interface (B-004), pre-charge sequencing
- **Current status:** BLOCKED_PENDING_SUPPLIER_DATA (B-004)
- **Follow-up date:** on send + 7/14/21d
- **Alternative research allowed:** HV wiring modeling frameworks (v0.1
  already candidate-level)

### BQ-12
- **Gate:** Powertrain (Dana)
- **Question:** SUMO MD inverter DC input voltage range, continuous/peak
  DC current, DC-link capacitance, pre-charge ownership.
- **Supplier needed:** Dana / TM4
- **Why it matters:** motor-side demand + pre-charge criteria drive HV
  architecture and contactor/fuse sizing
- **Unlocks:** powertrain compatibility, pre-charge circuit design
- **Current status:** BLOCKED_PENDING_SUPPLIER_DATA
- **Follow-up date:** on send + 7/14/21d (`SUPPLIER_INQUIRY_DANA_01.md`, DRAFT)
- **Alternative research allowed:** powertrain modeling; no final DC-link
  / contactor numbers until this resolves

## Gate 07 — Weight / Axle Load / CG (Ford / physical)

*Real follow-up dates for this gate (owner review_23): **first Jul 17,
2026 · second Jul 24, 2026 · escalation Jul 31, 2026.***

### BQ-13
- **Gate:** 07 — Weight / Axle / CG (Platform **001A gas**, per D-006)
- **Question:** Factory 7.3L gas engine + transmission assembly CG height
  and dressed weight.
- **Supplier needed:** Ford Fleet / Powertrain — **preferred, not
  mandatory**
- **Why it matters:** vertical CG shift when the ICE core is removed feeds
  rollover-threshold / pitch-moment modeling
- **Unlocks:** composite CG-height model (Gate 07C)
- **Current status:** **NominalAssumption allowed for simulation; physical
  removed-component weighing required before final layout** (demoted from
  supplier-only per owner review_23) — **do not treat as a hard blocker**
- **Follow-up date:** Jul 17 / Jul 24 / Jul 31, 2026
- **Alternative research allowed:** approximate from engine-block volume /
  uniform center-point, then replace with physical weigh
- **Note:** use **7.3L gas** data only — do NOT substitute 6.7L diesel /
  10R140 figures (D-006)

### BQ-14
- **Gate:** 07 — Weight / Axle / CG
- **Question:** Factory frame vertical section-modulus limit under
  concentrated mid-span battery-bracket loading.
- **Supplier needed:** Ford Body Builder Advisory Service — **preferred**
- **Why it matters:** prevents frame buckling / flange wrinkling / cross-
  member fatigue under the battery box
- **Unlocks:** max concentrated battery-box mass profile along the web
- **Current status:** BLOCKED (supplier-preferred); **nominal HSLA / ASTM
  A1011 modeling allowed** to keep moving
- **Follow-up date:** Jul 17 / Jul 24 / Jul 31, 2026
- **Alternative research allowed:** Gate 06 frame-rule constraints
  (RC-97/RC-22) + FEA at 3g vertical (NeedsEngineeringReview)

### BQ-15
- **Gate:** 07B — Weight / Axle / CG
- **Question:** Physical CG (X, Y, Z) coordinates of the HV battery
  cell-carrier frame.
- **Supplier needed:** pack structural fabricator — **engineering review,
  not a datasheet**
- **Why it matters:** the battery box is the dominant added mass; its CG
  drives side-rail moment, pitch-moment stability, and rollover tracking
- **Unlocks:** final composite CG (Gate 07C), side-to-side balance
- **Current status:** NeedsEngineeringReview; **CAD uniform-density
  approximation allowed for simulation** until the pack is built/measured
- **Follow-up date:** mid-build (before final bracket welding/bolting);
  supplier cadence 7/14/21d
- **Alternative research allowed:** Gate 07C CG-modeling method +
  tilt-table/lift CG-height procedure

### BQ-16
- **Gate:** 07C — Weight / Axle / CG
- **Question:** Vertical CG (CGv) of the bare, fluid-drained rolling
  chassis cab — and the **approved CG-height test procedure** (Ford
  Transit BEMM/BBAS).
- **Supplier needed:** Ford Body Builder Advisory Service / certified test
  facility
- **Why it matters:** CGv is the base coordinate for the composite 3D CG
  and the FMVSS-105 stability boundary
- **Unlocks:** vertical-CG calculation (Gate 07C), rollover/brake-bias
  review
- **Current status:** **BlockedPendingOfficialMethod / NeedsPhysicalTest**;
  interim **NominalAssumption ~22–24 in allowed for simulation** (BBLB
  standard models) — never verified
- **Follow-up date:** prior to frame integration; supplier cadence
  7/14/21d
- **Alternative research allowed:** Gate 07C CG-modeling method (RC-107..
  109); the "raise ≥10 in" lift is a candidate setup, not a rule

### BQ-17
- **Gate:** 07C — Weight / Axle / CG
- **Question:** Ford IVM statement-of-conformity **CGv Min/Max equations**
  (FMVSS-105-related, function of CGh + WB) and factory roll-stability /
  ESC pitch-moment constants.
- **Supplier needed:** Ford (IVM / Chassis Control / Active Safety)
- **Why it matters:** the CGv compliance window is a per-loading-condition
  check, not a single max-height number; ESC constants prevent
  mismatch/premature intervention
- **Unlocks:** the RC-110 vertical-CG compliance check (else
  NEEDS_IVM_OR_ENGINEERING_REVIEW)
- **Current status:** NeedsIVMSource / OpenGap
- **Follow-up date:** prior to track testing; supplier cadence 7/14/21d
- **Alternative research allowed:** none for the ESC parameters (absolute
  system values); the CGv logic can be structured now, left unresolved

### BQ-18
- **Gate:** 07C — Weight / Axle / CG
- **Question:** Exact front and rear track widths (Tf, Tr) for the target
  F-450/F-550 DRW chassis-cab config (Tr to the dual-wheel-pair center).
- **Supplier needed:** **NOT supplier-only** (owner review_26) — official
  Ford BBLB/BBAS, physical measurement, or the door/VIN-specific config
- **Why it matters:** track width sets the lateral moment arm for
  transverse CG (RC-108)
- **Unlocks:** CGt positional placement vs the frame centerline
- **Current status:** **NeedsOfficialFordSource OR PhysicalMeasurement**;
  interim NominalAssumption BBLB values allowed for simulation only
- **Follow-up date:** prior to module placement; official-copy / measure
- **Alternative research allowed:** Gate 07C CGt simulation with generic
  track widths (flagged SIMULATION ONLY)

*(Physical, non-supplier Gate 07 blockers — donor VIN/door-label capture,
baseline + stripped + final scale tickets, four-corner data,
removed/added component weighing — are field tasks tracked in
`docs/status/MASS_LEDGER.md` (3-phase scale procedure) and the Gate 07C
calculator `docs/status/AXLE_CG_CALCULATOR.md`, not supplier questions.)*

## Gate 08 — Failure Modes + Test Procedures

### BQ-19
- **Gate:** 08 — Failure Modes + Test Procedures *(moved from 07C, owner
  review_26)*
- **Question:** Dynamic fault-injection protocols for the Class 4/5
  electric-drive regenerative-braking handshake (ABS/ESC interaction under
  high-torque transitions).
- **Supplier needed:** traction motor / inverter software team
- **Why it matters:** deceleration pitch-moment load transfer during
  multi-system failures; FMVSS-105 behavior during severe ABS/ESC events
- **Unlocks:** Gate 08 regen/brake failure-mode + test coverage
- **Current status:** NeedsSupplierData (Gate 08 scope)
- **Follow-up date:** prior to test-track deployment; supplier cadence
  7/14/21d
- **Alternative research allowed:** desktop simulation of standard torque
  drop-outs / electronic freewheeling (NominalAssumption)

### BQ-20
- **Gate:** 08 — Failure Modes + Test Procedures
- **Question:** HV isolation-fault / HVIL detection control-loop latency
  and the **safe HV disconnect-timing limit** (the batch's 200 ms is
  fabricated — RC-116).
- **Supplier needed:** inverter / BMS firmware group (+ FMVSS 305a exact
  text for any regulatory limit)
- **Why it matters:** sets the safe HV shutdown window during an isolation
  / containment fault
- **Unlocks:** FM-01 HVIL detection→response timing (FMEA_REGISTRY)
- **Current status:** **`HVIL_LOOP_INTERRUPT_TIMING_LIMIT = NeedsExactSource`**
  — no timing threshold without a standard / supplier datasheet /
  engineering requirement; the 200 ms is fenced, never a rule
- **Follow-up date:** prior to commissioning; supplier cadence 7/14/21d
- **Alternative research allowed:** HIL bench simulation with digital
  fault-injection cards (Stage 1 only — no live HV)

---

## Resolution log

*(When a supplier reply arrives, archive it 1:1 under
`docs/research/raw/supplier_replies/`, reconcile it into the filter
register, then move the entry here with the answer + the commit that
recorded it. Nothing is marked Confirmed without locator verification +
owner approval.)*

- *(none yet — all entries open)*

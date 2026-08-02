# FAULT-RECORD & ERROR-LIBRARY ARCHITECTURE (doctrine)

Architecture requirement for how the Build Engine records faults and structures
its error library, from owner directive_02 (side-bar), Decision Register
**D-009**. This is **doctrine, not production code** — during the Revision 07
source-ingestion phase the Build Engine does **not** implement an M10 fault
library (CLAUDE.md: no production code / no M10 during ingestion). This file
defines the required *shape* so the eventual implementation is disciplined; every
numeric value, ID string, and similarity score here is an
**`INITIAL_TARGET_PROFILE` placeholder**, never a confirmed engineering value.

Source directive archived 1:1 at
`../research/raw/owner_directives/directive_02_fault_record_error_library_architecture.md`.

## 1. A fault is structured evidence, not a bare conclusion (RC-364)

The finished system must **never** emit a bare conclusion such as
`Error: torque too high`. Every fault is a **`FaultRecord_ID`** that binds the
observation to a full identity + configuration + synchronized telemetry + an
explicit applicability envelope:

```
FaultRecord_ID:            <opaque unique id, e.g. ELK-FLT-…>   (illustrative)
Vehicle platform:          platform IDs (below) — model year / engine / WB /
                           axle ratio / GVWR-GAWR configuration
Conversion configuration:  battery package rev · motor/inverter model ·
                           BMS/PDU rev · VCU firmware hash · calibration hash ·
                           tire configuration · vehicle test mass
Fault:                     the fault definition + human-readable event
Observed:                  the Telemetry Synchronicity Packet (RC-326) —
                           requested + reported torque · phase current ·
                           motor speed · wheel speeds · vehicle acceleration ·
                           gear state · APPS channels · brake state · 12V ·
                           timestamped trace
Applicable only to:        this platform/configuration envelope
NOT automatically to:      a different model year / inverter / axle ratio /
                           tire diameter / firmware / vehicle mass
```

A `FaultRecord_ID` is a **result that happened to be a failure**, so it inherits
the Test Configuration Lock Rule (RC-325) and the Test Result Validity Rule
(RC-339/353): it applies only to its archived `ConfigurationPacket_ID`, and any
configuration change routes it through `IMPACT_REVIEW_REQUIRED` +
`INVALIDATED_FOR_CURRENT_CONFIGURATION` (evidence preserved, never deleted).

## 2. Multi-level vehicle identity hierarchy (RC-365)

A vehicle is **never** identified only as "2023 F-550." Identity is layered so
the engine can distinguish sameness at each level:

| Level | ID | What it fixes |
|---|---|---|
| 1 | `VehicleFamily_ID` | e.g. `FORD_SUPER_DUTY_CHASSIS_CAB` (placeholder) |
| 2 | `Platform_ID` | model year + engine family, e.g. `FORD_F550_2023_7.3_GAS` (placeholder — donor is 7.3L gas 001A, still to confirm, BQ-27) |
| 3 | `VehicleConfiguration_ID` | wheelbase + drive + axle ratio + GVWR/GAWR |
| 4 | `ConversionPackage_ID` | Elektron powertrain/battery/BMS revision |
| 5 | `IndividualVehicle_ID` | the VIN-specific record |
| 6 | `TestConfiguration_ID` | exact hardware + firmware + calibration + mass + tires (= the `ConfigurationPacket_ID` of RC-325/339) |
| 7 | `FaultRecord_ID` | one specific observed fault event |

Consequences the hierarchy enforces:

- **Same vehicle family ≠ same configuration.**
- **Same model year ≠ same axle / brake / CAN layout.**
- **Same conversion package ≠ same physical vehicle.**
- **Same fault code ≠ same root cause.**

This is the platform-separation doctrine (D-006 — keep the 7.3L gas 001A model
apart from the 6.7L diesel 001B) generalized to every axis, and it is why RC-282
already forbids treating a Ford-side signal as authoritative across platforms.

## 3. Four-layer error library (RC-366)

| Layer | Content | Reusability |
|---|---|---|
| 1 — **Fault definitions** | generic fault *concepts* (APPS channel disagreement · pre-charge timeout · contactor feedback mismatch · inverter heartbeat loss · resolver plausibility · wheel-speed disagreement · brake-assist undervoltage · steering-assist pressure loss · cooling flow below threshold · phase-current overshoot · unexpected torque in Neutral · CAN_1 transmission detected) | **reusable concepts** — but they carry NO vehicle-specific conclusion |
| 2 — **Platform-specific manifestations** | how a definition presents on a given platform (e.g. `BRAKE_ASSIST_LOW_PRESSURE` differs between a 2022 F-450 and a 2023 F-550: mass, axle loading, steering demand, calibration, pressure/current behaviour) | **configuration-bound** — same fault family, different platform evidence |
| 3 — **Individual fault events** | every real occurrence: when · exact configuration · environment · speed · torque · temperature · SOC · mass · software hashes · raw logs · photos/video · repair action · root-cause status · whether it returned | **configuration-bound** immutable event records |
| 4 — **Lessons learned + prevention rules** | fault events → recurring pattern → engineering review → prevention rule → updated gate → updated test → updated technician warning | **engineering-approved** rules only |

**Only layer 1 is reusable across configurations; layers 2–4 are
configuration-bound and never reused by default.** A layer-4 prevention rule
(example, illustrative): "three F-550 builds show phase-current overshoot only
with calibration R04, at cold temperature, during reverse engagement" → block
calibration R04 *for that configuration*, reduce the reverse torque ramp, add a
cold-start validation test, flag existing vehicles for review. That rule does not
apply to any other configuration until independently reviewed.

## 4. Similarity is a routing input to engineering review — NEVER an authorization (RC-367)

When the engine scans a new vehicle it may compute an applicability/similarity
score (example: 2022 F-450 ~72%, 2023 F-550 ~96%, 2024 F-550 ~88% — all
**placeholder** figures) and sort prior records into buckets:

- `REUSABLE_WITHOUT_MODIFICATION`
- `REUSABLE_AFTER_VERIFICATION`
- `CANDIDATE_REFERENCE_ONLY`
- `NOT_APPLICABLE`
- `CONFLICTING_EVIDENCE`

**A similarity score routes a record to engineering review for the specific
configuration; it never self-authorizes reuse.** This is the same rule as the
C3E execution-domain arrows (RC-361 — an arrow is a review path, not automatic
permission): a high score is not proof. The system must **never** automatically
apply a 2022 F-450 torque fault to a 2023 F-550 merely because both are Super
Duty trucks. A similarity algorithm output is itself a candidate value, subject
to the Numeric Threshold Authority Rule (RC-267/293/300) — it acquires no
pass/fail/block authority until sourced and engineering-approved.

## 5. VIN / label scans seed the upper IDs only — the configuration must be measured (RC-368)

VIN and FMVSS certification-label scans are necessary but **not sufficient**:

- **VIN decodes:** make · model year · assembly plant · engine *family* ·
  body/GVWR *class* · restraint type → seeds `VehicleFamily_ID` and most of
  `Platform_ID`.
- **The FMVSS certification label gives:** GVWR + per-axle GAWR · OE tire/rim
  size + cold inflation pressure · date of manufacture → seeds
  `VehicleConfiguration_ID`.
- **Neither reveals:** the as-built calibration hash · VCU/BMS/inverter firmware
  · the actual *measured* mass and axle loading (vs rated GAWR) · current tire
  diameter/pressure/wear · cooling/steering/brake-assist hardware revision · or
  anything about the conversion package.

Therefore **VIN + label populate the upper identity IDs only; the
`ConfigurationPacket_ID` / `TestConfiguration_ID` must be captured independently
and measured, never inferred from the label.** A scan proposes; the Test
Configuration Lock (RC-325) proves.

## Standing constraints

- **Doctrine only** — no fault-library implementation / no production code / no
  M10 during Revision 07 ingestion.
- **No invented values** — every ID string, numeric envelope, and similarity
  score here is an `INITIAL_TARGET_PROFILE` placeholder; real values become ODRs
  / supplier-data items until sourced. The donor being 7.3L gas (001A) is still
  to be confirmed (BQ-27 family).
- **Nothing Confirmed; evidence immutable (Constitution Art. I); platforms stay
  separate (D-006); nothing auto-applies across a configuration boundary.**

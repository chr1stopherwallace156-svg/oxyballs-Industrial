# Owner directive_02 — Fault-record & error-library architecture (side-bar)

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence is
> immutable, never edited). This is an owner architecture directive, delivered
> as a "SIDE BAR QUESTION" (not a numbered "N:75" research batch). The example
> IDs and percentages below are the owner's ILLUSTRATIVE PLACEHOLDERS, not
> confirmed engineering values — none are ingested as fact (see D-009 / RH01
> section 81). Reconciled into `docs/doctrine/FAULT_LIBRARY_ARCHITECTURE.md`,
> Decision Register **D-009**, and RH01 RC-364..368.

---

SIDE BAR QUEDTION

The finished system should never say:

Error: torque too high

It should say:

FaultRecord_ID: ELK-FLT-F550-2023-PT-000184

Vehicle platform:
2023 Ford F-550
7.3L gas chassis cab
wheelbase variant
rear axle ratio
GVWR/GAWR configuration

Conversion configuration:
battery package revision
motor/inverter model
BMS/PDU revision
VCU firmware hash
calibration hash
tire configuration
vehicle test mass

Fault:
Torque tracking overshoot during low-speed reverse transition

Observed:
requested torque
reported torque
phase current
motor speed
wheel speeds
vehicle acceleration
gear state
APPS channels
brake state
12V voltage
timestamped trace

Applicable only to:
this platform/configuration envelope

Not automatically applicable to:
2022 F-450
different inverter
different axle ratio
different tire diameter
different firmware
different vehicle mass

That is the correct architecture.

The library needs multiple identity levels

Do not identify a vehicle only as "2023 F-550."

Use a hierarchy:

VehicleFamily_ID
Platform_ID
VehicleConfiguration_ID
ConversionPackage_ID
IndividualVehicle_ID
TestConfiguration_ID
FaultRecord_ID

Example

VehicleFamily_ID:
FORD_SUPER_DUTY_CHASSIS_CAB

Platform_ID:
FORD_F550_2023_7.3_GAS

VehicleConfiguration_ID:
FORD_F550_2023_7.3_GAS_169WB_4X2_AXLE_X

ConversionPackage_ID:
ELK_PLATFORM001_POWERTRAIN_R03

IndividualVehicle_ID:
VIN-specific record

TestConfiguration_ID:
exact hardware + firmware + calibration + mass + tires

FaultRecord_ID:
one specific observed fault

This lets the system understand:

Same vehicle family ≠ same configuration
Same model year ≠ same axle/brake/CAN layout
Same conversion package ≠ same physical vehicle
Same fault code ≠ same root cause

Your error library should have four layers

1. Known fault definitions

These are generic fault concepts:

APPS channel disagreement
pre-charge timeout
contactor feedback mismatch
inverter heartbeat loss
resolver plausibility fault
wheel-speed disagreement
brake-assist undervoltage
steering-assist pressure loss
cooling flow below threshold
phase-current overshoot
unexpected torque during Neutral
CAN_1 transmission detected

These are reusable concepts, but they do not yet contain vehicle-specific conclusions.

2. Platform-specific manifestations

Example:

FaultDefinition:
BRAKE_ASSIST_LOW_PRESSURE

2022 F-450 manifestation:
specific EHPS candidate
specific hydraulic routing
specific 12V load
specific pressure envelope

2023 F-550 manifestation:
different vehicle mass
different axle loading
different steering demand
different calibration
different pressure/current behavior

Same fault family, different platform evidence.

3. Individual fault events

Every time a real vehicle experiences a fault, store:

when it happened
exact configuration
environment
speed
torque
temperature
battery SOC
vehicle mass
software hashes
raw logs
photos/video
repair action
root-cause status
whether it returned

4. Lessons learned and prevention rules

After enough evidence:

Fault events
→ recurring pattern
→ engineering review
→ prevention rule
→ updated gate
→ updated test
→ updated technician warning

Example

Three F-550 builds show phase-current overshoot
only with calibration R04
at cold temperature
during reverse engagement

Result:
Calibration R04 blocked for that configuration
Reverse torque ramp reduced
New cold-start validation test added
Existing vehicles flagged for review

The system should use similarity, not blind reuse

When you scan another vehicle, it should calculate applicability:

New vehicle:
2023 F-550

Library match:
2022 F-450 — 72% structural similarity
2023 F-550 — 96% platform similarity
2024 F-550 — 88% similarity

Then separated

Reusable without modification
Reusable after verification
Candidate reference only
Not applicable
Conflicting evidence

The system should never automatically apply a 2022 F-450 torque error to a 2023 F-550 merely because both are Super Duty trucks.

What the VIN and label scan can actually provide

VIN and certification-label scans are important, but they do not reveal everything.

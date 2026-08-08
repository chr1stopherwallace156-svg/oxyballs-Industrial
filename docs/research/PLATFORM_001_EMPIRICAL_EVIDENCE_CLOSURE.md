# PLATFORM 001 — EMPIRICAL EVIDENCE CLOSURE BASELINE

| Field | Value |
|---|---|
| Provenance | Owner-supplied baseline, recorded verbatim |
| Recorded | 2026-08-08 |
| Authority | `OWNER_DIRECTED_BASELINE` |
| Decision Register | D-033 |
| Blocker supersession | B-006 (supersedes the `BLOCKED_PENDING_SUPPLIER_DATA` label on B-003 / B-004) |
| Source claims | SC-001 … SC-021 (`SourceClaims.md`) |

**Recording rule.** The body below is the owner-supplied baseline reproduced without
alteration. Nothing in it has been paraphrased, promoted, summarised, or extended. This
document records doctrine and evidence policy; it does not itself close any gate, and it
hard-codes no value into `engine/src/platform/platform001.ts`.

**Preservation.** Historical supplier-outreach artifacts under
`docs/research/outreach/`, the prior candidate values in
`docs/research/candidates/RH01_SECOND_STAGE_FILTER.md`, and every prior blocker and
review record remain unedited. Values this baseline declines to promote are recorded as
`Withdrawn` entries in `SourceClaims.md` with a note — never deleted.

---

<!-- BEGIN OWNER-SUPPLIED BASELINE — VERBATIM -->

Status: OWNER-DIRECTED DOCUMENTARY / EMPIRICAL CLOSURE BASELINE
Platform: PLATFORM-001 — 2019 Ford F-450 Super Duty Chassis Cab, Regular Cab, 4x2, DRW, 60 in CA, 145.3 in wheelbase
Scope: Conversion-engineering evidence closure only. This document does not authorize procurement, fabrication, installation, HV energization, road operation, or vehicle release.

This document exists to stop repeated architecture restarts. The Build Engine, EDTS, Capture evidence path, reference vehicle, and existing Webasto/Dana candidate research remain in force. The remaining work is evidence closure, component selection, calculations, physical metrology, controlled characterization, subsystem integration, and vehicle validation.

## 1. Locked invariants

1. CONTROLLED_BENCH_CHARACTERIZATION is an independent authority class. It is never aliased to MANUFACTURER_VERIFIED or VEHICLE_VERIFIED.
2. engine/src/platform/platform001.ts remains conservative and generic. Engineering closure flows through data/evidence state rather than hard-coded promoted values: Evidence -> EngineeringClaim -> ComponentCandidate -> CompatibilityEvaluation -> BuildPackage.
3. Unknown values remain UNKNOWN / NULL and create evidence obligations. No AI-generated or inferred engineering value may close a gate.
4. Existing architecture is preserved. No new parallel HV architecture, repository framework, or duplicate conversion package is created unless an explicit owner decision supersedes this baseline.

## 2. Evidence authority hierarchy

The authority classes are distinct and must never be collapsed:

1. OFFICIAL_PUBLIC_DOCUMENT
2. VERIFIED_COMPONENT_DOCUMENTATION
3. NONENERGIZED_PHYSICAL_METROLOGY
4. CONTROLLED_BENCH_CHARACTERIZATION
5. SUBSYSTEM_INTEGRATION_TEST
6. VEHICLE_INTEGRATION_TEST
7. VEHICLE_VERIFIED

MANUFACTURER_VERIFIED, when used, means the exact claim is supported by applicable manufacturer documentation for the exact component/revision. It is not interchangeable with a bench or vehicle measurement.

## 3. Evidence-source policy — no manufacturer-contact dependency

The engineering process does not depend on a manufacturer responding to an email. Historical supplier-outreach files remain preserved as research artifacts, but supplier reply is not the only admissible path to evidence closure.

```yaml
previous_state: BLOCKED_PENDING_SUPPLIER_DATA
updated_state: BLOCKED_PENDING_PRIMARY_OR_PHYSICAL_EVIDENCE

acceptable_evidence_classes:
  - OFFICIAL_PUBLIC_DOCUMENT
  - VERIFIED_COMPONENT_DOCUMENTATION
  - NONENERGIZED_PHYSICAL_METROLOGY
  - CONTROLLED_BENCH_CHARACTERIZATION
  - SUBSYSTEM_INTEGRATION_TEST
  - VEHICLE_INTEGRATION_TEST
  - REFERENCE_VEHICLE_MEASUREMENT
```

Evidence suitability remains claim-specific.

## 4. Definitive execution sequence — Phases A through H

Phase A — Documentary Closure

Exhaust applicable public primary sources: manufacturer datasheets, official manuals/application guides, OEM service/body-builder information, and regulatory/homologation material. Record exact source, revision/date, applicability, and unresolved fields.

Phase B — Hardware Identification

Lock exact physical part numbers, revisions, labels, connector families, interface hardware, and firmware/version identifiers where observable.

Phase C — Non-energized Metrology

Record calibrated component mass, dimensions, mounting interfaces, frame geometry, axle weights, connector continuity/pinning, clearance envelopes, and scan/CMM/caliper results with uncertainty.

Phase D — Controlled Characterization

Characterize only unresolved parameters using an appropriate controlled test environment. Begin CAN work passive/read-only. Any active CAN stimulus belongs on an isolated bench/HIL setup before vehicle-side use. Energized HV characterization requires a qualified controlled HV test environment.

Phase E — Engineering Calculations

With evidence-backed inputs, calculate battery/inverter compatibility, precharge, protection coordination, contactor requirements, conductor sizing/voltage drop, thermal sizing, weight/CG/axle loading, driveline requirements, and packaging constraints. Derived calculations retain links to all input claims.

Phase F — Subsystem Bench Integration

Integrate BMS, VCU, inverter, DC/DC, OBC, PDU/contactors/precharge, cooling, and CAN in a controlled subsystem environment. Preserve raw traces and configuration identity.

Phase G — F-450 Integration

Complete battery enclosures/trays, motor/inverter mounting, driveline interface, HV routing, LV harness, coolant routing, service access, and vehicle interface integration against the exact Platform 001 chassis.

Phase H — Commissioning / Vehicle Validation

Perform controlled staged commissioning, fault validation, thermal validation, charging validation, CAN/control validation, and vehicle-level verification. Promotion to VEHICLE_VERIFIED requires defined vehicle-level evidence/sign-off.

# PHASE A — DOCUMENTARY CLOSURE

## 5. Webasto Standard Battery Pro 40 — official public baseline

Authority class: OFFICIAL_PUBLIC_DOCUMENT

Primary sources:

- https://www.webasto.com/en-int/battery/standardized-battery-and-thermo-management/standard-battery-pro-40.html
- https://www.webasto.com/content/dam/global-brand/business-fields/batteries/cv-standard-battery/documents/2024_EB_Datasheet_Standard%20Battery%20Pro%2040.pdf.coredownload.inline.pdf

Manufacturer-published pack data

| Parameter | Published value | Authority |
|---|---:|---|
| Dimensions | 960 x 687 x 302 mm | OFFICIAL_PUBLIC_DOCUMENT |
| Dry weight | 297 kg | OFFICIAL_PUBLIC_DOCUMENT |
| Installed energy | ~40 kWh | OFFICIAL_PUBLIC_DOCUMENT |
| Nominal capacity | 116 Ah | OFFICIAL_PUBLIC_DOCUMENT |
| Normal operating voltage range | 333–407 V | OFFICIAL_PUBLIC_DOCUMENT |
| Continuous charge / discharge power | 45 / 55 kW @ 25 C, SoC dependent | OFFICIAL_PUBLIC_DOCUMENT |
| Peak charge / discharge power | 60 / 112 kW for 10 s @ 25 C, SoC dependent | OFFICIAL_PUBLIC_DOCUMENT |
| Volume flow | 10 L/min | OFFICIAL_PUBLIC_DOCUMENT |
| Pressure loss | <50 mbar | OFFICIAL_PUBLIC_DOCUMENT |
| Cell type | Prismatic NMC | OFFICIAL_PUBLIC_DOCUMENT |
| Operating temperature | -30 C to +55 C | OFFICIAL_PUBLIC_DOCUMENT |
| Environmental protection | IP67 / IP6K9K | OFFICIAL_PUBLIC_DOCUMENT |
| Vehicle communication | CAN bus conforming to ISO 11898 | OFFICIAL_PUBLIC_DOCUMENT |
| Pack safety monitoring | insulation measurement, HVIL, contactor monitoring | OFFICIAL_PUBLIC_DOCUMENT |

The public material supports the existence of pack-level precharge/contactors/fuse functions, but does not publish the precharge resistor value, timing, full control state machine, fuse coordination curve, proprietary CAN map, or a pyrofuse claim.

Webasto publicly describes the system as scalable to 400 V or 800 V with multiple Standard Battery Pro 40 packs. Exact Platform 001 topology/interface selection remains a candidate decision.

Derived current envelope — calculation, not manufacturer current rating

```text
continuous equivalent current:
55,000 W / 407 V = 135.1 A
55,000 W / 333 V = 165.2 A

10-second peak equivalent current:
112,000 W / 407 V = 275.2 A
112,000 W / 333 V = 336.3 A
```

Authority: DERIVED_CALCULATION_FROM_OFFICIAL_PUBLIC_DOCUMENT

Do not rewrite these as Webasto-published fixed 150 A continuous / 300 A peak current limits.

Webasto claims explicitly NOT promoted from prior draft material

- 350 V nominal
- 300–400 V operating range
- 35 kWh gross / ~30.8 kWh usable
- 96S configuration
- 150 A fixed continuous discharge rating
- 300 A fixed 10-second discharge rating
- 100 A continuous charge rating
- J1939 at 250 kbps
- integrated pyrofuse
- 15–20 L/min coolant flow
- 15–25 kPa coolant pressure drop
- 35 C maximum coolant inlet temperature
- 960 x 780 x 310 mm
- 290 kg

These remain unsupported unless a separate applicable source is added.

## 6. Dana TM4 SUMO MD — official public baseline

Authority class: OFFICIAL_PUBLIC_DOCUMENT

Primary sources:

- https://www.dana.com/product/commercial-vehicle/motor-and-inverter-systems-for-commercial-vehicles/
- https://dml.dana.com/assetbank-dana/assetfile/9819.pdf

Family-level manufacturer claims

- Intended for Class 4–7 commercial vehicles, bus platforms, and off-highway applications.
- Designed to interface directly with standard axles without a gearbox.
- Public product page advertises family maxima up to 265 kW peak power, 3320 Nm peak torque, and 3700 RPM.
- Exact compatibility must be tied to a specific current sell-sheet variant row.

SUMO MD is a family. Platform 001 must select an exact motor/inverter variant before exact electrical, mechanical, thermal, or driveline compatibility is closed.

Dana claims explicitly NOT promoted from prior draft material

The reviewed current public material does not establish these as exact component facts:

- 650 uF DC-link capacitance
- 20 L/min coolant flow requirement
- 85 C thermal-trip threshold
- J1939 250/500 kbps configuration
- proprietary torque-request PGN/SPN map
- exact precharge completion threshold/timing
- exact internal DC-link precharge responsibility
- generic 125 kg SUMO MD motor mass
- generic 22 kg inverter mass

Do not blend specifications from multiple SUMO MD variants into one candidate.

## 7. Ford Platform 001 documentary state

The Build Engine already locks:

```text
2019 Ford F-450 Super Duty Chassis Cab
Regular Cab
4x2
DRW
Cab-to-axle: 60 in
Wheelbase: 145.3 in
Bare cab-and-chassis
```

Authority in current repository: OWNER_LOCKED_REFERENCE_CONFIG / candidate nominal geometry, not physical donor metrology.

Do not replace ODR-004 through ODR-007 with broad model-family values. The exact donor still requires:

- actual front axle weight
- actual rear axle weight
- exact GVWR confirmation applicable to the donor
- physical frame geometry / mounting envelope measurement

## 8. Remaining gap / characterization matrix

| Component / interface | Current state | Next evidence task | Target authority |
|---|---|---|---|
| Exact SUMO MD variant | OPEN | Select exact candidate row from current Dana family using Platform 001 duty/pack constraints | ENGINEERING_CANDIDATE, then evidence-backed promotion |
| Webasto system topology / VIB-VIG choice | OPEN | Resolve from applicable public docs + exact physical interface hardware | OFFICIAL_PUBLIC_DOCUMENT + VERIFIED_COMPONENT_DOCUMENTATION |
| Webasto proprietary CAN map | UNKNOWN | Passive capture/analysis after exact hardware identification | CONTROLLED_BENCH_CHARACTERIZATION |
| Dana proprietary CAN/command map | UNKNOWN | Passive capture/analysis on isolated bench/HIL | CONTROLLED_BENCH_CHARACTERIZATION |
| Dana DC-link capacitance | UNKNOWN | Locate applicable public primary document first; if absent, characterize in qualified controlled environment | OFFICIAL_PUBLIC_DOCUMENT or CONTROLLED_BENCH_CHARACTERIZATION |
| Precharge timing/resistance | BLOCKED | Calculate only after exact topology, verified DC-link capacitance, voltage window, contactor behavior, repetition requirement | DERIVED_CALCULATION + SUBSYSTEM_INTEGRATION_TEST |
| Dana mounting interfaces | PARTIAL ENVELOPE ONLY | Non-energized scan/CMM/caliper verification | NONENERGIZED_PHYSICAL_METROLOGY |
| Webasto pack mounting interfaces | PARTIAL ENVELOPE ONLY | Non-energized metrology | NONENERGIZED_PHYSICAL_METROLOGY |
| Dana pressure-drop / flow curve | UNKNOWN | Public document or controlled hydronic bench characterization | OFFICIAL_PUBLIC_DOCUMENT or CONTROLLED_BENCH_CHARACTERIZATION |
| F-450 axle weights | UNKNOWN | Calibrated scale measurement on exact donor | REFERENCE_VEHICLE_MEASUREMENT |
| F-450 frame/mount geometry | NOMINAL/PARTIAL | Calibrated physical metrology / scan | NONENERGIZED_PHYSICAL_METROLOGY |
| Final fuse / contactor / HV cable / PDU | BLOCKED | Phase E selection only after current/topology/fault/routing/thermal inputs are evidence-backed | DERIVED_ENGINEERING_CALCULATION + later validation |
| Thermal pump / radiator / chiller | BLOCKED | Calculate after pack + inverter/motor thermal/flow data are evidenced | DERIVED_ENGINEERING_CALCULATION + later validation |

## 9. Phase E calculation rules — no premature selections

Capacitor energy

```text
E = 0.5 * C * V^2
```

Where:

- E = stored energy [J]
- C = verified DC-link capacitance [F]
- V = applicable bus voltage [V]

Because the current public Dana material in this baseline does not establish C, no final Platform 001 precharge energy/resistor value is closed here.

Precharge time constant

```text
tau = R * C
Vbus(t) = Vbat * (1 - exp(-t / tau))
```

Final R, timing threshold, resistor pulse rating, repetition rate, contactor sequence, and fault/retry behavior remain blocked until exact component interface requirements are evidenced.

Cable and fuse selection

Do not promote prior candidate values such as 50–70 mm^2 cable or 250 A fuse as final design facts. Final selection requires:

- evidence-backed continuous and transient current envelope
- minimum/maximum system voltage
- routing and bundling
- conductor/insulation temperature limits
- ambient environment
- connector/termination ratings
- allowable voltage drop
- prospective fault current / protection coordination
- fuse time-current / I2t behavior
- component short-circuit withstand

Candidate calculations remain DERIVED_CALCULATION, never MANUFACTURER_VERIFIED.

## 10. Repository integration rule

This document does not hard-code promoted component facts into platform001.ts.

```text
Primary / physical evidence
        ↓
EngineeringClaim
        ↓
ComponentCandidate
        ↓
CompatibilityEvaluation
        ↓
BuildPackage
```

Every promoted value should carry exact claim ID, value/unit, applicability, source/evidence ID, source revision/date, authority class, uncertainty where applicable, verification state, and supersession lineage.

## 11. Current critical path

```text
PHASE A — close public primary documentation
        ↓
PHASE B — identify exact physical hardware
        ↓
PHASE C — non-energized component + F-450 metrology
        ↓
PHASE D — controlled characterization of remaining unknowns
        ↓
PHASE E — HV / thermal / weight / driveline calculations
        ↓
PHASE F — subsystem bench integration
        ↓
PHASE G — F-450 mechanical/electrical integration
        ↓
PHASE H — controlled commissioning + vehicle validation
```

No further platform-architecture restart is required by this baseline.

<!-- END OWNER-SUPPLIED BASELINE — VERBATIM -->

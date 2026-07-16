# REQUIREMENTS.md

Functional and non-functional requirements for the Elektron digital twin.

## Mission

Produce a gate-governed, layer-built 3D digital twin that supports Elektron Industrial's gas-to-EV conversion workflow: reference documentation, disassembly planning, EV component packaging, wiring/cooling routing, evidence capture, and customer-facing spatial presentation.

## Stakeholders

| Stakeholder | Need |
|-------------|------|
| Conversion engineers | Accurate envelopes, mounts, and disassembly order |
| Fabrication | Bracket and frame interface dimensions |
| Fleet customers | Visual confidence and configuration clarity |
| Compliance / QA | Traceable sources and versioned reference lock |
| Shop technicians | Interactive disassembly and install sequences |

## Functional requirements

### FR-01 Reference lock

The twin shall declare exactly one canonical reference vehicle (year, cab, drivetrain, wheelbase, bed/upfit, wheels, stock engine) before layer geometry begins.

### FR-02 Layered build

The twin shall be constructed in layers L00–L10. No layer shall start until the prior layer's five gates pass.

### FR-03 Five gates per layer

Each layer shall record pass/fail for: Visual, Dimensional, Structural, Interaction, Documentation.

### FR-04 Disassembly fidelity

From L04 onward, the twin shall support ordered disassembly of OEM powertrain and related systems consistent with shop procedure (not generic exploded views).

### FR-05 EV packaging

From L05–L07, the twin shall accommodate Elektron EV components (battery, inverter/motor, charging, HV wiring, cooling) as replaceable assemblies with defined interfaces.

### FR-06 Evidence linkage

From L08 onward, each significant claim shall link to evidence (OEM source, scan, photo, measurement log).

### FR-07 Presentation modes

L10 shall support at minimum: full vehicle, powertrain removed, EV install preview, and dimension inspection mode.

## Non-functional requirements

### NFR-01 Dimensional traceability

Critical dimensions shall cite source (OEM table, scan, or measured) and date.

### NFR-02 No invented engineering values

Missing data shall be explicitly open or assumed — never silently filled.

### NFR-03 Version control

Reference lock changes require a new decision entry and layer re-validation from the affected layer up.

### NFR-04 Performance target (L10)

Target 60 fps on a mid-range workstation for full-vehicle view with LOD; exact hardware baseline TBD at L10.

### NFR-05 Licensing compliance

No Ford-controlled CAD or redistribution-violating assets in the public repo.

## Out of scope (v1)

- Real-time CAN telemetry binding (L09 prepares hooks only)
- Crash simulation or FEA inside the twin
- Multi-vehicle configurator (single reference lock first)
- Mobile AR deployment

## Acceptance

Project v1 is accepted when L00–L10 all gates pass and STATUS.json reflects `active_layer: "complete"`.

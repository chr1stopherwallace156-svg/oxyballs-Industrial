# IMPLEMENTATION_PLAN.md

Layer-by-layer implementation sequence with deliverables.

## L00 — Reference Lock ✳ in progress

**Deliverables:** This layer doc, STATUS.json reference block, DECISIONS DT-D001..003, owner approval record  
**Exit:** Owner approves reference; gates recorded

## L01 — Exterior

**Prerequisites:** L00 locked  
**Deliverables:**
- Exterior shell mesh (Tier C accuracy)
- Paint/material manifest
- Wheel/tire assembly
- Dimension spot-check table (≥5 dims)

**Sources:** OEM outline, photos, optional photogrammetry

## L02 — Chassis

**Prerequisites:** L01 dimensional gate pass  
**Deliverables:**
- Frame rail geometry (Tier A where scanned)
- Suspension, axles, exhaust routing volume
- Coordinate system confirmation (rear axle ground)

## L03 — OEM Mechanical

**Prerequisites:** L02 pass  
**Deliverables:**
- Engine, transmission, fuel system, cooling (OEM) as separate assemblies
- Component mapping JSON (initial)
- OEM part envelopes for L04 removal

## L04 — Disassembly

**Prerequisites:** L03 pass  
**Deliverables:**
- Ordered disassembly graph
- Animation or step sequence
- Shop procedure cross-reference

## L05 — Battery

**Prerequisites:** L04 pass  
**Deliverables:**
- Battery pack envelope(s) per Elektron package tiers
- Mount interfaces (Tier A)
- CG estimate documented

## L06 — EV Propulsion and Charging

**Prerequisites:** L05 pass  
**Deliverables:**
- Motor/inverter assembly
- Charger location and charge port
- Driveline interface to axle

## L07 — Wiring and Cooling

**Prerequisites:** L06 pass  
**Deliverables:**
- HV harness routing volumes
- Cooling loop geometry
- Service labeling zones

## L08 — Workflow and Evidence

**Prerequisites:** L07 pass  
**Deliverables:**
- Evidence attachment schema
- Conversion state machine (gas / in-progress / EV)
- Photo and measurement link points

## L09 — Diagnostics and Telemetry

**Prerequisites:** L08 pass  
**Deliverables:**
- OBD/diagnostic port location
- Telemetry module mount (fleet package)
- CAN tap points (documentation only until Build Engine confirms)

## L10 — Spatial Presentation

**Prerequisites:** L09 pass  
**Deliverables:**
- Composed scene with LOD0/1/2
- Presentation modes: full, stripped, EV preview, dimensions
- Viewer technology decision
- Performance validation

## Parallel work (allowed during L00)

- BBAS account setup and BBLB download (Build Engine track)
- Reference vehicle sourcing
- Tool evaluation for L10 viewer

## Not allowed before L00 lock

- Exterior mesh authoring
- EV component placement
- Public demo deployment

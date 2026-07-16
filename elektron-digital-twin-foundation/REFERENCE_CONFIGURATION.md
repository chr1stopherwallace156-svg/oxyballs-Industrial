# REFERENCE_CONFIGURATION.md — Proposed Platform Anchor Lock (Candidate C1)

## Status

**PROPOSED / UNDER REVIEW — does NOT constitute owner-approved Layer 0 closure in this repo.**

This document is a proposed absolute physical baseline. Current repo state indicates Layer 0 is blocked on configuration reconciliation.

For current “not locked” status, see:
- `layers/L00/REFERENCE_LOCK.md`
- `layers/L00/CONFIGURATION_RECONCILIATION.md`

## EDTS Platform Anchor Lock (Proposed)

[ VEHICLE CLASS ]  ===> 2019 Ford F-450 Super Duty Chassis Cab (Candidate C1)

> NOTE: Candidate C1 is aligned with work-truck / chassis-cab intent. Wheelbase/CA and some chassis relationships are documented in L00 reconciliation; other fields require verification.

[ CAB CONFIG ]     ===> Regular Cab (2-Door, 3-Passenger) [RESEARCH_REQUIRED: confirm for chosen 4×2 DRW configuration]
[ DRIVETRAIN ]     ===> 4x2 (Rear-Wheel Drive, Mono-Beam Wide-Track Front) [RESEARCH_REQUIRED: verify mono-beam claim vs OEM]
[ REAR WHEELS ]    ===> Dual Rear Wheel (DRW)
[ CA DIMENSION ]   ===> Cab-to-Axle: **60 in** (Candidate C1) [DOCUMENTED in L00 reconciliation; confirm exact document page/table once archived]
[ UPFIT STATE ]    ===> Bare Cab-and-Chassis baseline (no service body)

## Candidate C1 Configuration Fields (with verification status)

| Field | Proposed value | Verification status |
|---|---|---|
| Model year | 2019 | DOCUMENTED (L00) |
| Wheelbase (WB) | 145.3 in | DOCUMENTED (L00) |
| Cab-to-axle (CA) | 60.0 in | DOCUMENTED (L00) |
| Frame extension / rear overhang | 47.2 in | RESEARCH_REQUIRED (potential conflict: L00 reconciliation cites 42.2 in aft-of-axle extension for 60 CA) |
| Engine | 6.7L Power Stroke V8 Turbo Diesel | RESEARCH_REQUIRED (available vs exact tuned configuration) |
| Transmission | TorqShift 6-speed SelectShift automatic | RESEARCH_REQUIRED |
| Rear axle | Dana Spicer S110 (4.88 ratio, limited slip) | RESEARCH_REQUIRED |
| GVWR | 16,500 lbs | DOCUMENTED (L00 reconciliation) |
| Standard FGAWR | 5,250 lbs | RESEARCH_REQUIRED |
| Standard RGAWR | 12,000 lbs | RESEARCH_REQUIRED |
| Wheels | 19.5" x 6.0" polished forged aluminum | RESEARCH_REQUIRED |
| Tires | 225/70R19.5G BSW | RESEARCH_REQUIRED |
| Mirrors | PowerScope trailer tow mirrors | RESEARCH_REQUIRED |
| Fuel tank | 40-gallon aft-of-axle active tank | DOCUMENTED (L00 reconciliation lists standard 40 aft) |

## Source of truth policy

This repo does not treat this doc as binding until owner approval. When conflicts exist, keep both values:
- mark discrepancy as OPEN or CONFLICT
- do not overwrite previously documented L00 evidence


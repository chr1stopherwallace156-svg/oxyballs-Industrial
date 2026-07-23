# CONFIGURATION_APPLICABILITY_MATRIX.md — EDTS Configuration Applicability (Proposed)

## Status

**PROPOSED / ARCHITECTURE MATERIAL — Not a locked evidence set.**

## EDTS Baseline and Nearby Variations (for mapping)

The purpose of this matrix is to prevent cross-configuration reuse of dimensions. Values must be verified against OEM sources and the locked configuration.

| Parameter | EDTS Baseline (Candidate C1) | F-450 Regular Cab Pickup | F-450 Chassis Cab 4x4 | F-350 Chassis Cab 4x2 |
|---|---|---|---|---|
| Model Type | Chassis Cab | Pickup Truck | Chassis Cab | Chassis Cab |
| Cab Style | Regular Cab | Regular Cab | Regular Cab | Regular Cab |
| Wheelbase (WB) | 145.3 in | 176.0 in | 145.3 in (min) | 145.3 in (min) |
| Cab-to-Axle (CA) | 60.0 in | N/A (pickup bed) | 60.0 in | 60.0 in |
| Front Track Width | RESEARCH_REQUIRED (Candidate C1) | RESEARCH_REQUIRED | RESEARCH_REQUIRED | RESEARCH_REQUIRED |
| Front Axle Type | RESEARCH_REQUIRED | RESEARCH_REQUIRED | RESEARCH_REQUIRED | RESEARCH_REQUIRED |
| Fuel Tank Setup | 40-gal aft-of-axle | 48-gal (pickup may differ) | 40-gal aft-of-axle | 40-gal aft-of-axle |

## Applicability rule

If a dimension row is used for L01–L10, it must declare applicability tags matching the locked configuration:
- model_year
- model
- cab
- drive
- rear_wheels


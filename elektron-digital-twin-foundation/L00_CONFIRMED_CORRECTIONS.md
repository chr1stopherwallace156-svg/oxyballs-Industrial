# L00_CONFIRMED_CORRECTIONS.md — Accepted Engineering Corrections

## Status

**ACCEPTED**

This document records corrections where the engineering evidence is definitive and the resolution is finalized.

---

## 1. Engine Power and Torque Output (Calibration Mismatch)

| Field | Value |
|---|---|
| Original claim | 450 hp / 935 lb-ft (Class 3 pickup rating) |
| Corrected state | 330 hp @ 2,600 rpm and 750 lb-ft @ 2,000 rpm |
| Evidence source | 2019 Ford Super Duty Chassis Cab Sales Brochure (Form No. FSD19CCBUS, p. 5, "Power Stroke Diesel Output" table) |
| Claim ID | CHASSIS-001 |

**Data preservation policy:** The original 450 hp / 935 lb-ft record is not deleted. It has been moved to `registries/HISTORICAL_CLAIM_REGISTRY.json` and marked as `CONFIGURATION_INAPPLICABLE`, with metadata mapping its validity exclusively to Class 3 pickup configurations.

---

## 2. Status Demotion of Project Source SRC-005

| Field | Value |
|---|---|
| Original state | Registered as active, verified 2026 metrology scan evidence |
| Corrected state | Status changed to **PLANNED** |
| Resolution | Demoted until physical scanning execution occurs and point-cloud cryptographic hashes are submitted |
| Claim ID | EVID-005 |

See `SOURCE_REGISTRY.md` for current source status.

---

## 3. Separation of Provenance from Intellectual Property Usage

| Field | Value |
|---|---|
| Original state | Claimed "Unrestricted Own IP" for physical captures |
| Corrected state | Replaced with descriptive capture metadata |
| Claim ID | IP-001 |

**Standard field set:**

| Field | Value |
|---|---|
| `capture_creator` | EDTS |
| `capture_method` | physical_scan |
| `underlying_subject` | 2019 Ford F-450 Chassis Cab |
| `research_use` | active |
| `external_redistribution` | not_evaluated |

---

## Related Records

- `L00_CLAIM_ERROR_REGISTER.json` — original error register
- `registries/HISTORICAL_CLAIM_REGISTRY.json` — preserved inapplicable claims
- `DECISIONS.md` — DT-D006, DT-D007

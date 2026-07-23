# L00_PROVISIONAL_CORRECTIONS.md — Provisional Dimensional Claims

## Status

**UNDER REVIEW**

These corrections are accepted on a provisional basis, pending downstream integration validation and final baseline execution.

---

## 1. Primary Wheelbase and Chassis Dimensions

| Parameter | Nominal Value | Canonical (mm) |
|---|---|---|
| Wheelbase (WB) | 145.3 in | 3,690.6 mm |
| Cab-to-Axle (CA) | 60.0 in | 1,524.0 mm |
| Axle-to-Frame (AF) | 47.2 in | 1,198.9 mm |

**Source record:** 2019 Ford Truck Body Builder's Layout Book: Super Duty F-250/550 Cab-Chassis Section (p. 2-4, Dimensional Table).

**Provisional constraint:** These values represent nominal design intent. Actual physical vehicle variations due to manufacturing tolerances and spring deflection must be reconciled against these baseline numbers once physical metrology is performed.

---

## 2. Rear Axle Assembly Identification

| Parameter | Value |
|---|---|
| Assembly | Dana S110 rear axle with 4.88:1 limited-slip differential |

**Source record:** 2019 Ford Super Duty Chassis Cab Order Guide (p. 11, "Transmission/Axle" matrix).

**Provisional constraint:** Subject to physical verification of the axle housing tag (or VIN-spec build sheet extraction) prior to physical disassembly.

---

## Unresolved Items

See `L00_UNRESOLVED_REGISTER.json` for parameters requiring physical asset intake:

- UNRES-001 — Wheel and tire load capacity correlation
- UNRES-002 — Suspension package and spring-code confirmation

---

## Related Profiles

- `schemas/profiles/F450_PLATFORM_PROFILE_PROPOSAL.json` — platform-wide allowed configurations
- `schemas/profiles/EDTS_REFERENCE_VEHICLE_PROFILE_PROPOSAL.json` — locked reference vehicle layout

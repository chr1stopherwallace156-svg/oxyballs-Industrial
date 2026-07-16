# REFERENCE_SOURCES.md — L00 Authoritative Sources

Rules:
- Never invent dimensions.
- Third-party sites are **LEAD_ONLY** until cross-checked against OEM.
- Record Status, Exact source, Document title, Model year, Page/table, Confidence, Applicability, Conflicts.

---

## Source registry

### SRC-OEM-001 — Super Duty Pickups dimension guide

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED |
| **Exact source** | Ford BBAS / marketingassociates hosted PDF |
| **Document title** | `2018 F-250/ F-350/ F-450 Super Duty Pickups` |
| **Document model year** | 2018 (2017–2019 generation; **2019 MY lock not confirmed**) |
| **URL** | https://madocumentupload.marketingassociates.com/api/Document/GetFile?v1=4310018&v2=053118031741&v3=60&v4=441752a32c206ea5b65036e99b97a71370438b14c32da14f759bea6b&v5=False |
| **Page / table** | Configurations; Exterior Dimensions Codes A–E; F-450 DRW Pickup weight ratings |
| **Confidence** | High (pickup platform) |
| **Applicability** | **Pickup only** — F-250/F-350/F-450 Styleside |
| **Conflict** | F-450 row shows **Crew Cab 176.0 only** — no Regular Cab row. Conflicts with SRC-3P-001. |
| **License** | COUNSEL_REVIEW_REQUIRED — BBAS redistribution RESTRICTED |

---

### SRC-OEM-002 — 2019 Super Duty Chassis Cab specs

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED |
| **Exact source** | Ford dealerconnection printable specs |
| **Document title** | `2019 F-350/F-450/F-550 SD Chassis Cabs - Specs` |
| **Document model year** | 2019 |
| **URL** | https://www.b2dauthor.dealerconnection.com/content/ret-ford/en/vehicles/truck/f350/2019/specs.printable.section.html |
| **Page / table** | Dimensions/Weights/Capacities → Regular Cab Chassis Cab; Weight Ratings; Fuel tank |
| **Confidence** | High |
| **Applicability** | **Chassis cab only** — F-350/F-450/F-550 |
| **Conflict** | Wheelbase **145.3 in minimum** for F-450 Regular Cab — conflicts with provisional 141.6 in |
| **License** | COUNSEL_REVIEW_REQUIRED |

---

### SRC-OEM-003 — 2019 Super Duty Chassis Cab brochure

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED |
| **Document title** | `2019 Super Duty® Chassis Cab` |
| **Document model year** | 2019 |
| **URL** | https://pictures.dealer.com/raypricestroudfordfd/da3388c10a0e09a772ab9b79fe44501b.pdf |
| **Page / table** | Dimensions/Weights — Regular Cab wheelbase/CA/length |
| **Confidence** | High |
| **Applicability** | Chassis cab — corroborates SRC-OEM-002 |
| **Conflict** | None with SRC-OEM-002 |
| **License** | DOCUMENTED — Ford marketing PDF; redistribution RESTRICTED |

---

### SRC-OEM-004 — 2019 Ford Body Application Guide

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED |
| **Document title** | `2019 Ford Body Application Guide` |
| **Document model year** | 2019 |
| **URL** | https://xr793.com/wp-content/uploads/2020/03/2019-Ford-Body-Application-Guide.pdf |
| **Page / table** | WB/CA matrix; F-450/F-550 chassis cab upfit compatibility |
| **Confidence** | Medium — **official BBAS mirror preferred** |
| **Applicability** | Upfit/body builder — chassis cab and pickup box delete |
| **Conflict** | None identified in this pass |
| **License** | COUNSEL_REVIEW_REQUIRED |

---

### SRC-3P-001 — KBB 2019 F-450 Regular Cab (LEAD ONLY)

| Field | Value |
|-------|-------|
| **Status** | UNVERIFIED |
| **Exact source** | Kelley Blue Book |
| **Document title** | `2019 Ford F450 Super Duty Regular Cab Specs` |
| **Document model year** | 2019 |
| **URL** | https://www.kbb.com/ford/f450-super-duty-regular-cab/2019/specs/ |
| **Confidence** | Low |
| **Applicability** | Claims F-450 Regular Cab pickup 141.6 in WB |
| **Conflict** | **Conflicts with SRC-OEM-001** F-450 pickup configuration row |
| **License** | N/A — third-party aggregator |

---

## Traceability summary

| Measure | Provisional value | Best OEM value | Platform | Verification |
|---------|------------------:|---------------:|----------|--------------|
| Wheelbase | 141.6 in | 145.3 in (CC) / 176.0 in (F-450 pickup Crew Cab) / 141.6 in (F-350 pickup only) | Depends | **BLOCKED** |
| Overall length | UNVERIFIED | 230.7 in (CC 145.3) / 231.8 in (F-350 pickup 141.6) | Depends | Platform-dependent |
| GVWR | UNVERIFIED | 16,500 lb (CC) / 14,000 lb (pickup) | Depends | DOCUMENTED per platform |
| Body | 8 ft bed | Factory box (pickup) vs upfit TBD (CC) | Depends | **OWNER DECISION** |

---

## Next actions (ordered)

1. Owner selects platform: chassis cab (C1) vs pickup (P1/P2).
2. If pickup P1: obtain **2019 MY Ford pickup ordering guide** to resolve SRC-OEM-001 vs SRC-3P-001 conflict.
3. Archive official BBAS copies per license review — do not commit CAD/PDF without approval.
4. Add dimension rows only for locked configuration.

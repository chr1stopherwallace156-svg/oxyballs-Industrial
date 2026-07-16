# REFERENCE_LOCK.md — EDTS Layer 0

**Status:** `REFERENCE_CONFIGURATION_BLOCKED` — **reference not locked**  
**Reconciliation:** [CONFIGURATION_RECONCILIATION.md](CONFIGURATION_RECONCILIATION.md)  
**Decision:** DT-D001 **BLOCKED** — do not treat as locked

---

## Lock statement

> **The reference vehicle is NOT locked.**  
> Layer 0 cannot be approved until configuration reconciliation is resolved and owner selects a single internally consistent platform.

---

## Provisional specification (under review — do not use for L01)

| Field | Provisional value | Lock status |
|-------|-------------------|-------------|
| Manufacturer | Ford | DOCUMENTED |
| Model | F-450 Super Duty | DOCUMENTED |
| Model year | 2019 | DOCUMENTED |
| Platform type | **Unstated — ambiguous** | **BLOCKED** |
| Cab | Regular Cab | Stated |
| Drive | 4×2 DRW | Stated |
| Wheelbase | 141.6 in | **CONFLICT** — pickup dimension; not chassis cab |
| Body | 8 ft bed | **CONFLICT** — pickup language; not chassis cab upfit |
| Engine | 6.7L Power Stroke diesel | DOCUMENTED available on both platforms |
| VIN | Not assigned | RESEARCH_REQUIRED |

---

## What reconciliation found

1. **141.6 in wheelbase + 8 ft factory bed** = pickup framing (documented for F-250/F-350 Regular Cab).
2. **F-450 chassis cab** Regular Cab minimum wheelbase = **145.3 in** with **60 in CA** — no factory 8 ft bed.
3. **F-450 pickup** in OEM configuration table = **Crew Cab 176.0 in DRW only** — Regular Cab **not listed** (conflicts with KBB).
4. **EDTS commercial work-truck intent** aligns with **chassis cab (Candidate C1)**, not the provisional pickup description.

---

## Candidate configurations (owner must choose one)

See [CONFIGURATION_RECONCILIATION.md](CONFIGURATION_RECONCILIATION.md) §5:

- **C1** — 2019 F-450 Chassis Cab Regular Cab DRW 4×2, 145.3 in WB / 60 in CA *(recommended for work-truck intent)*
- **P1** — 2019 F-450 Pickup Regular Cab DRW 4×2, 141.6 in / 8 ft *(OEM disputed)*
- **P2** — 2019 F-450 Pickup Crew Cab DRW, 176.0 in / 8 ft *(OEM confirmed)*

---

## Layer 1 geometry scope (blocked)

| Option | Status |
|--------|--------|
| OEM cab + chassis only | Pending platform lock (C1 path) |
| Factory pickup | Pending platform lock (P1/P2 path) |
| Completed work-truck upfit | Requires named body — not specified |

**Do not begin exterior modeling.**

---

## Applicability

Applies To:
- 2019 Ford F-450
- Regular Cab
- DRW
- 4×2

Not Applicable To:
- F-350
- Pickup configurations that do not match the above
- Crew Cab configurations
- Other model years unless separately verified

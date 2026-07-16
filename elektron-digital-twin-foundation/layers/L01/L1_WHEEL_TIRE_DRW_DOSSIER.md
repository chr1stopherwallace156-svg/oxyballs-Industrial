# L1 Wheel / Tire / DRW Dossier

**Status:** `DRAFT — RESEARCH NOTES`  
**Configuration:** DRW rear; wide-track front packaging research  
**Evidence posture:** research claims pending Tier 1 / placard / T&RA confirmation

---

## Wheel Profile Contours (conceptual)

```
     Front Axle (Wide-Track)        Rear Axle (Dual Wheels)

          |   |  <- Tire                 |   |     |   | <- Dual Tires
         /     \                        /     \   /     \
        |  |_|  | <- Outward Dish      |  | |  | |  | |  | <- Dual Disconnected
        |  | |  |    Deep-Hub Venting  |  | |  | |  | |  |    Dishes Face Inside
         \_____/                        \_____/   \_____/
```

## 1. Wheel Assembly Technical Specs (research claims)

| Spec | Claimed value | Status |
|---|---|---|
| Wheel size | 19.5 in × 6.0 in | DRAFT — confirm by door placard / OEM |
| Outer wheels | forged polished aluminum (trim-dependent) | `CLM-009` CONFIGURATION_DEPENDENT |
| Inner duals | steel (common) / XL may be all-steel | `CLM-009` CONFIGURATION_DEPENDENT |
| Lug pattern | 10-lug on 225 mm PCD | `CLM-006` DOCUMENT_SUPPORTED + PHYSICAL_VERIFICATION_PENDING |
| Tire family | Continental Hybrid HS3 or equivalent | `CNF-002` — verify sidewall; size generic 225/70R19.5 |
| Tire size | 225/70R19.5(G) | Order-guide size; brand OPEN |
| Nominal OD (D) | 811 mm (31.9 in) | `CLM-007` PHYSICAL_CAPTURE_REQUIRED |
| Section width (W) | 226 mm (8.9 in) | `CLM-008` PHYSICAL_CAPTURE_REQUIRED |

## 2. Stance Metrics (research claims)

| Metric | Claimed value | Status |
|---|---|---|
| Front wheel offset | deep dish outward for brake clearance | qualitative DRAFT |
| Dual spacing (inner–outer centerline) | 270.3 mm (10.64 in) | `CLM-004` CONFIGURATION_DEPENDENT / UNVERIFIED |
| Outer overall dual-wheel width | 2438.4 mm (96.0 in) | `CLM-005` DOCUMENT_SUPPORTED + PHYSICAL_VERIFICATION_PENDING |

## 3. Required Confirmation Sources

1. Door jamb tire placard for exact size / pressure
2. 2019 Ford Truck Body Builder Layout Book dual track / overall width
3. T&RA / tire manufacturer datasheet for OD and section width
4. Photos of front vs rear dish orientation for this configuration

## 4. Modeling Implication (future — not authorized yet)

- Front and rear wheel assemblies must remain separate meshes
- Dual inners/outers must be distinct objects for stance accuracy
- Do not invent chrome/finish variants until photographic evidence exists

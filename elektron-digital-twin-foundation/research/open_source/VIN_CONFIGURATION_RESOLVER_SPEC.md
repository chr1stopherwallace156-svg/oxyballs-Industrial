# VIN_CONFIGURATION_RESOLVER_SPEC.md

**Pack:** EDTS Open-Source Maximum-Leverage Research Mission  
**Canonical lock target:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Decision:** DT-D064  
**Status:** Research integration spec — **superseded for implementation by DT-D067** (`edts-vin-resolver`). This document remains the design source; executable code lives in the package.

Cross-link: existing field protocol [`../../VIN_AND_LABEL_CAPTURE_PROTOCOL.md`](../../VIN_AND_LABEL_CAPTURE_PROTOCOL.md).

---

## Flow

```
[VIN / barcode] ──► NHTSA vPIC DecodeVinValuesBatch
                            │
                            ▼
                 [Field Normalization Filter]
                            │
        ModelYear==2019? Model==F-450 Super Duty?
        BodyClass==Chassis Cab? CabType==Regular?
        DriveType==4x2?  (+ WB/CA when available)
                            │
                            ▼
                 [Configuration Qualification]
         ┌──────────────────┴──────────────────┐
         ▼                                     ▼
  [EXACT MATCH]                         [MISMATCH]
  Lock CFG-2019-F450-…                  Isolate; tag
                                        CROSS_CONFIGURATION_COMPARISON
```

Incoming scans remain **quarantined** until EXACT MATCH (or explicit cross-config research tag).

---

## 1. API integration

**Endpoint:** `POST https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesBatch/`

**Payload form (typical):** `DATA=<VIN>&format=json`

Example shape only (not a live VEH-000001 VIN):

```
DATA=1FD8X4GT1KDAXXXXX&format=json
```

**Honesty:** Do not invent or publish a real VIN for VEH-000001 in this research pack. Use placeholders until physical intake.

Recommend: cache / mirror bulk vPIC downloads for offline workers (public API dependency).

---

## 2. Exact field matching matrix

To qualify an instance (`CMPINST-` / physical unit) to canonical  
`CFG-2019-F450-REG-CAB-4X2-60CA-DRW`, decoded fields must satisfy:

| vPIC attribute | Expected | Required | On mismatch |
|---|---|---|---|
| Make | FORD | MANDATORY | Reject (`NOT_APPLICABLE`) |
| ModelYear | 2019 | MANDATORY | `CROSS_YEAR_COMPARISON` |
| Model | F-450 Super Duty (normalize synonyms) | MANDATORY | `CROSS_MODEL_COMPARISON` |
| BodyClass | Chassis Cab | MANDATORY | Reject Pickup (`NOT_APPLICABLE`) |
| CabType | Regular | MANDATORY | Reject SuperCab / Crew |
| DriveType | 4x2 / RWD family (normalize) | MANDATORY | Reject 4x4 |
| Wheelbase (if present) | Consistent with **145.3 in** | STRONG when present | Quarantine + label CA/WB check |
| Series / trim (XL/XLT/…) | Any documented | Optional | Log only |

**CA 60.0 in** is often **not** reliably present in vPIC — confirm via OEM build sheet / door jamb / physical measure. Do not invent CA from Model string alone.

DRW (dual rear wheel) confirmation: prefer label / photo evidence / option decode when vPIC under-specifies.

---

## 3. Door jamb certification label OCR fallback

When vPIC is incomplete, field app triggers OCR of driver-side safety certification label.

### Illustrative label layout (schema only)

```
MFD. BY FORD MOTOR CO.          DATE: MM/YY
GVWR: … LB / … KG
FRONT GAWR: … LB                REAR GAWR: … LB
VIN: …
TYPE: CHASSIS CAB
```

### Parser extracts (targets)

| Field | Use |
|---|---|
| DATE | Build-date window check (2019 MY intake) |
| GVWR | Class / rating consistency check |
| FGAWR / RGAWR | Package rating — **instance evidence**, not invented |
| VIN | Cross-check vs barcode |
| TYPE | Chassis Cab confirmation |

**Honesty gate (EDTS):**

- Do **not** hard-code example GVWR **16,500 lb** or FGAWR **6,500 / RGAWR 12,000** as locked for VEH-000001.
- Prior honesty trail: Reg Cab 4×2 145.3 **Max Std Front GAWR** extracted as **4800 lb (6.8L) / 5200 lb (6.7L)** from fleet tables; operator 5600 baseline **rejected** (DT-D053).
- Physical label intake remains **required** for instance GAWR assignment (`STATUS.json` already notes VIN/FGAWR unverified).

---

## 4. Qualification outcomes

| Result | Action |
|---|---|
| EXACT MATCH | Allow scan ingest toward target CFG; still `PROVISIONAL` until scan QA |
| CROSS_* | Permit research comparison only; never merge into canonical twin without tag |
| NOT_APPLICABLE | Reject ingest to canonical object paths |

---

## 5. Implementation note (backlog only)

See Sprint 2 in [`90_DAY_IMPLEMENTATION_BACKLOG.md`](90_DAY_IMPLEMENTATION_BACKLOG.md). This document does not ship a Python service.

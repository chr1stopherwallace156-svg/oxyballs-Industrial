# F-450 Door FL Vertical Slice Plan V2

**Kernel:** `1.0.0-rc1`  
**Dataset:** `examples/ford/2019_f450_regularcab_4x2_drw/`  
**Isolation:** [EXACT_VEHICLE_ISOLATION_STANDARD.md](EXACT_VEHICLE_ISOLATION_STANDARD.md) · [HARD_RULE_EXACT_VEHICLE_ISOLATION.md](HARD_RULE_EXACT_VEHICLE_ISOLATION.md)

---

## Steps

1. **Initialize `VEH-000001`** — 2019 Ford F-450 Chassis Cab (exact vehicle silo).
2. **Initialize `CFG-000001`** — canonical fingerprint (`EDTS_CFG_FINGERPRINT_SHA256_V1`).
3. **Instantiate `CMPINST-VEH000001-DOOR-FL`** — vehicle-bound door instance (`DISCOVERED`).
4. **Objective ingestion** (when mesh bytes exist) — polygon/triangle count, bounding box, non-manifold test. Until then `validation_status: NOT_EXECUTED`, metrics `null`.
5. **Link asset** as `PROVISIONAL_VISUAL` pending engineering review (`GEO-VEH000001-DOOR-FL-001`).

---

## Exclusions

Do not include 2017, 2018, 2020, F-350, F-550, pickup, Crew Cab, 4x4, SRW, or other WB/CA values in this silo.

## Evidence

`evidence_link_ids` remain empty until a real in-repo source ID is linked. No invented sources.

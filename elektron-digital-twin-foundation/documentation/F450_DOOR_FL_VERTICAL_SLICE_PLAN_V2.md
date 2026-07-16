# F-450 Door FL Vertical Slice Plan V2

**Examples:** `examples/ford/2019_f450_regularcab_4x2_drw/`  
**Isolation:** [EXACT_VEHICLE_ISOLATION_STANDARD.md](EXACT_VEHICLE_ISOLATION_STANDARD.md) · [HARD_RULE_EXACT_VEHICLE_ISOLATION.md](HARD_RULE_EXACT_VEHICLE_ISOLATION.md)

---

## Exact subject

| ID | Value |
|---|---|
| Vehicle | `VEH-000001` — 2019 Ford F-450 Chassis Cab |
| Configuration | `CFG-000001` — Regular Cab / 4x2 / DRW / 145.3 in WB / 60 in CA |
| Component instance | `CMPINST-VEH000001-DOOR-FL` |
| Geometry | `GEO-VEH000001-DOOR-FL-001` (catalog hint `ASSET-00031`; `file_exists: false`) |

**Excluded from this slice:** 2017, 2018, 2020, F-350, F-550, pickup, Crew Cab, 4x4, other WB/CA, generic “Super Duty door” identity.

---

## Steps

1. **Discovery** — Locate FL door region in catalog asset `ASSET-00031` (if/when bytes exist). Discovery ≠ applicability to other vehicles.
2. **Registration** — Bind `CMPINST-VEH000001-DOOR-FL` to `VEH-000001` + `CFG-000001` only.
3. **Ingestion** — Objective metrics only after `file_exists: true`; until then `validation_status: NOT_EXECUTED`, metrics `null`.
4. **Integration** — Three.js bind when mesh available; pivot remains `NOT_DEFINED` until calibrated.
5. **Interaction** — `VISUAL_PREVIEW_ONLY` / `PROTOTYPE` only; `disassembly_status: NOT_VERIFIED`.
6. **Documentation** — Passport summary; evidence_link_ids empty until a real in-repo source ID is linked.

---

## Evidence policy (V2)

- Do **not** invent source IDs.
- Do **not** attach BBAS/WSM links until those IDs exist in manifests **and** file state is recorded honestly.
- Empty `evidence_link_ids: []` is correct when no valid link exists.

---

## Reusable definition

Optional `RDEF-DOOR-FL-CANDIDATE-001` may exist as `EMPTY_CANDIDATE` / `NOT_EVALUATED` **outside** the component instance link (`reusable_component_definition_id: null`).

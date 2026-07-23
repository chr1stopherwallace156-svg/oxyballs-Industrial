# Kernel Validation — Initial File Audit

**Timestamp:** 2026-07-16T16:45:00Z  
**Scope:** EDTS Exact-Vehicle Kernel v1.0.0-rc1  
**Rule:** Record physical reality before any correction or generation.

## 1. Required schemas (11)

| File | Status | Bytes | Parse |
|---|---|---|---|
| schemas/entity-definition.schema.json | EXISTS | 1032 | OK |
| schemas/vehicle-instance.schema.json | EXISTS | 1279 | OK |
| schemas/exact-configuration.schema.json | EXISTS | 1973 | OK |
| schemas/component-instance.schema.json | EXISTS | 2454 | OK |
| schemas/reusable-component-definition.schema.json | EXISTS | 1426 | OK |
| schemas/evidence-link.schema.json | EXISTS | 1621 | OK |
| schemas/geometry-asset.schema.json | EXISTS | 2148 | OK |
| schemas/assembly-relationship.schema.json | EXISTS | 1198 | OK |
| schemas/interaction-definition.schema.json | EXISTS | 2338 | OK |
| schemas/component-passport.schema.json | EXISTS | 2837 | OK |
| schemas/cross-vehicle-comparison.schema.json | EXISTS | 1594 | OK |

**Missing required schemas:** none

## 2. Required examples under `examples/2019_f450/` (7)

| File | Status |
|---|---|
| vehicle-instance.example.json | EXISTS |
| exact-configuration.example.json | EXISTS |
| door-fl-component-instance.example.json | EXISTS |
| door-fl-geometry-asset.example.json | EXISTS |
| door-fl-assembly-relationship.example.json | EXISTS |
| door-fl-interaction.example.json | EXISTS |
| door-fl-component-passport.example.json | EXISTS |

**Missing required examples:** none  
**Abbreviated hashes (`sha256:d84f86f3...`):** not present in `examples/2019_f450/`  
**Current fingerprints:** full 64-hex digests present (pre-revision algorithm; must be reset to `null` / `NOT_COMPUTED` then recomputed under revised standard)

## 3. Duplicates / extras

| Item | Finding |
|---|---|
| `examples/ford/2019_f450_regularcab_4x2_drw/*.json` | **DUPLICATE silo** (8 JSON files including reusable definition). Not the required path; superseded/historical. |
| Extra schemas in `schemas/` | Non-kernel schemas also present (`component-identity`, `evidence-graph`, `component-passport-os-v1`, etc.) — not counted in 11/11 kernel set. |

## 4. Referential gaps observed (pre-correction)

| Gap | Detail |
|---|---|
| Parent assembly record | `ASMINST-VEH000001-CAB` referenced by door instance / relationship; **no assembly instance file** in `examples/2019_f450/` |
| Geometry link asymmetry | Geometry asset + passport reference `GEO-VEH000001-DOOR-FL-001`, but component `geometry_asset_ids` is `[]` |
| Validator dependency | `jsonschema` **not installed** in environment at audit time |
| Runtime results | `verification/results/` lacked executed kernel validation outputs |

## 5. Audit conclusion

- Required 11 schemas: **present**
- Required 7 examples: **present**
- Blockers for VALIDATED claim before work: fingerprint standard revision pending; referential gaps; no executed validation results; jsonschema missing

**Next:** revise fingerprint standard → reset fingerprints to `NOT_COMPUTED` → implement generator/tests/validators → execute and write results.

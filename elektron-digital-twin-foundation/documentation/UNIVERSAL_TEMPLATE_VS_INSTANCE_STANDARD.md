# Universal Template vs Instance Standard

**Status:** `ACTIVE`  
**Version:** `1.0.0`

---

## Rule

Universal schemas are **templates**. They must contain **no** manufacturer, model, model-year, platform-family, or configuration assumptions.

Populated facts live only in **examples/** (or future instance stores), never inside `*.schema.json` beyond illustrative descriptions that do not constrain enums to one OEM.

---

## File architecture

| Path | Contents |
|---|---|
| `schemas/*.schema.json` | JSON Schema Draft **2020-12** only — universal, OEM-agnostic |
| `examples/<manufacturer>/<exact_configuration>/` | Isolated vehicle datasets |
| `documentation/` | Constitutional law + standards |
| `verification/isolation/` | Negative tests proving no cross-vehicle leakage |

**Forbidden:** Embedding OEM catalogs inside schema files. **The kernel never changes; only datasets change.**

---

## Six-layer mapping

```text
entity-definition          → universal type identity (optional)
vehicle-instance           → VEH-000001
exact-configuration        → CFG-000001
component-instance         → CMPINST-VEH000001-DOOR-FL
reusable-component-def     → EMPTY_CANDIDATE / NOT_EVALUATED (optional, unlinked)
cross-vehicle-comparison   → outside exact vehicle; reuse NOT_EVALUATED
```

Supporting records (evidence, geometry, assembly, interaction, passport) attach to the **component instance**, not to a platform family.

---

## Unknown values

Schemas must allow:

- JSON `null`, and/or
- explicit string states `UNKNOWN` / `NOT_EVALUATED`

Do not invent precision to avoid nulls.

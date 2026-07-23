# Kernel Open Questions

**Scope:** EDTS Kernel vertical slice (`CMP-FORD-SD-DOOR-FL-001`)

---

## KQ-001 — Visually reusable vs dimensionally inaccurate

**Question:** How do we handle assets that are visually reusable but dimensionally inaccurate?

**Working rule (candidate):**
1. Tag geometry `asset_role = PROVISIONAL_VISUAL`.
2. Keep Evidence Link `verification_status = CANDIDATE` (or `CONFIGURATION_MATCHED` for architecture-only visual sources).
3. Never promote passport `geometry` beyond `PROVISIONAL` until dimensional claims have NORMALIZED Tier A/B edges **or** MAC-class metrology.
4. Record dimensional deltas as open PAR-* nodes / gap register — do not silently reshape the mesh to match brochure numbers.

**Status:** `OPEN` — harden during ASSET-00031 separation.

---

## KQ-002 — PROVISIONAL_VISUAL → ENGINEERING_VERIFIED threshold

**Question:** What is the threshold for moving a component from `PROVISIONAL_VISUAL` to `ENGINEERING_VERIFIED`?

**Working rule (candidate):**
All of the following:
1. Geometry asset `validation_status` executed (watertight/collision checks as applicable).
2. At least one Evidence Link with `relationship` supporting dimensions at `NORMALIZED` or higher from Tier A or Tier B.
3. Applicability `verification_status` ≥ `CONFIGURATION_MATCHED` for the target config.
4. Interaction pivot calibrated (`pivot_status` ≠ `NOT_DEFINED`) if removable.
5. Acceptance T01–T05 `PASS_RUNTIME` (or owner-waived with decision ID).
6. Passport `status_summary.geometry = ENGINEERING_VERIFIED` only after 1–5.

**Status:** `OPEN` — do not promote the door under this slice until criteria met.

---

## KQ-003 — Identity grammar coexistence

**Question:** Kernel IDs (`CMP-FORD-SD-DOOR-FL-001`) vs earlier short IDs (`CMP-SD-044-L`)?

**Working rule:** Kernel form is canonical for the vertical slice; short IDs remain aliases in `COMPONENT_IDENTITY_REGISTRY.json`.

**Status:** `RESOLVED_FOR_SLICE` (DT-D021).

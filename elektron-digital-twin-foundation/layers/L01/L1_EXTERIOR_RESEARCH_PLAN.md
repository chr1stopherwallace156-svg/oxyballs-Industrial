# L1_EXTERIOR_RESEARCH_PLAN.md — Visual Reference Research Plan

## Status

**ACTIVE — L1_EXTERIOR_RESEARCH_FOUNDATION_READY**

## Locked Configuration Scope

| Field | Value |
|---|---|
| Make / Model | 2019 Ford F-450 Chassis Cab |
| Cab | Regular Cab |
| Drivetrain | 4x2 |
| Rear wheels | Dual Rear Wheel (DRW) |
| Wheelbase | 145.3 in (3690.6 mm nominal) |
| Cab-to-axle | 60.0 in (1524.0 mm nominal) |
| Body state | Bare cab-and-chassis (unmodified high-strength steel C-channel frame rails behind cab) |

Geometry production remains blocked until visual intake evidence and L00 physical gaps close. This plan authorizes **research documentation only**.

---

## 1. Objectives

Guide visual reconstruction and landmark positioning for the locked configuration. Document structural surfaces, materials, and spatial markers before rendering or pose estimation.

---

## 2. Research Steps

### Pass 1: Discovery (OEM Data Collection)

Identify OEM sources, body builder layout books, and tire dimension standards:

- 2019 Ford Truck Body Builder Layout Book (SVE Bulletin): chassis-cab layout schematics, frame dimensions, electrical connector locations
- Ford Fleet Dimension Guides: clearances, wheel tracks, cab dimensions
- Tire and Rim Association (T&RA) Standards: dual-rear-wheel track spacing and nominal tire sizes

### Pass 2: Extraction (Isolating Dimensions)

Extract geometry metrics for the 145.3 in WB / 60 in CA layout:

- Front track width
- Rear frame width (standard 34-inch flat-surface C-channel — **PROVISIONAL**, source archive required)
- Outer rear dual-wheel width
- Front fender flare depth (F-450/550 wide-track front axle, including 4x2)

### Pass 3: Reconciliation (Resolving Variations)

- **F-350 vs F-450 frame:** F-450 uses straight 34-inch-wide frame rails with flat top flange (provisional; confirm vs BBAS)
- **Wide-track front axle:** Confirm cab front fender flares match heavy-duty wider front axle design

### Pass 4: Integration Proposal

Generate registries and structural files under `layers/L01/` as draft source-of-truth for the asset pipeline. All claims remain **DRAFT** until Tier 1 sources are archived and hashed.

---

## Deliverables in this package

| File | Purpose |
|---|---|
| `L1_EXTERIOR_OBJECT_HIERARCHY.md` | Parent-child assembly tree |
| `L1_EXTERIOR_OBJECT_REGISTRY_PROPOSAL.json` | Object metadata registry |
| `L1_EXTERIOR_LANDMARK_REGISTRY_PROPOSAL.json` | Pose / scan landmarks |
| `L1_REFERENCE_VIEW_MATRIX.md` | Spherical capture views |
| `L1_PHOTO_AND_SCAN_COVERAGE_PLAN.md` | Three-ring capture plan |
| `L1_BODY_SURFACE_AND_PANEL_FORM_DOSSIER.md` | Cab / flare form research |
| `L1_WHEEL_TIRE_DRW_DOSSIER.md` | Wheel/tire stance research |
| `L1_GLASS_TRIM_LIGHTING_DOSSIER.md` | Glass and lighting |
| `L1_MATERIAL_AND_MANUFACTURING_DOSSIER.md` | PBR material classes |
| `L1_GEOMETRY_VS_NORMAL_MAP_VS_TEXTURE_MATRIX.md` | Detail allocation |
| `L1_VISUAL_ACCEPTANCE_STANDARD.md` | Visual gate criteria |
| `L1_OPEN_QUESTIONS.md` | Unresolved items |
| `L1_GAP_ANALYSIS.md` | Evidence gaps |

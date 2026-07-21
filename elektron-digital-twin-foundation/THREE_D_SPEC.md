# THREE_D_SPEC.md

3D asset specification for the Elektron digital twin.

## Demonstrator GLB acquisition (VPR-2)

For purchasing or authoring the interactive WebGL vehicle GLB, follow **[`specs/EDTS-SPEC-3D-001_GLB_ACQUISITION.md`](specs/EDTS-SPEC-3D-001_GLB_ACQUISITION.md)** (DT-D063). That gate specializes this document for `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`: front-axle origin CRS, `GEO_*` node separation, budgets, and `mesh_mapping_manifest.json` verification. This file remains the layer-wide twin ruleset.

## Scope

Applies from L01 onward. L00 defines reference metadata only — no meshes.

## File formats

| Use | Format | Notes |
|-----|--------|-------|
| Delivery / runtime | glTF 2.0 (.glb) | Primary interchange |
| DCC authoring | .blend or .fbx | Local only if needed; export to glTF |
| Point clouds | .las / .ply | Raw scan archive — not in public repo |
| OEM CAD | Native (CATIA, etc.) | **Never commit** — BBAS license |

## Mesh rules

### Naming

`{layer}_{subsystem}_{part}` — e.g. `L01_exterior_door_fl`

### Hierarchy

- One root node per layer assembly: `L01_ROOT`, `L02_ROOT`, …
- Final scene composes under `VEHICLE_ROOT` at L10
- Pivot at logical joint or mount centroid for removable parts (L04+)

### Topology

- Quads preferred in authoring; triangles in delivery glTF
- No n-gons in delivery assets
- Manifold meshes for printable/export subsets

### LOD (L10)

| LOD | Triangle budget (full vehicle) | Use |
|-----|-------------------------------|-----|
| 0 | ≤ 500k | Inspection / engineering |
| 1 | ≤ 150k | Default presentation |
| 2 | ≤ 40k | Remote / mobile preview |

Budgets are initial targets — revise at L10 gate.

## Materials

- PBR metallic-roughness workflow
- OEM paint: approximate from Ford fleet color codes when known; mark `unverified_color` in manifest
- Orange HV cabling per shop standard (L07) — not generic safety orange without spec reference

## Textures

- Power-of-two dimensions
- 2K max per material at LOD0; 512 at LOD2
- No photo textures of license plates or VIN on reference unit without redaction

## Accuracy tiers (from DT-D002)

| Tier | Tolerance | Application |
|------|-----------|-------------|
| A | ±2 mm | Mounting holes, rail interfaces, motor mounts |
| B | ±5 mm | Powertrain envelope, battery box clearance |
| C | ±10 mm | Body panels, cosmetic trim |

Meshes shall declare `accuracy_tier` in asset manifest.

## Scanning specification (L00 lock → executed L01–L03)

### Tier 1 — OEM envelope

Ford Super Duty dimension tables and vehicle-specific BBLB when obtained. Sufficient for L01–L02 blocking volumes.

### Tier 2 — Targeted scan zones

| Zone | Method | Tier |
|------|--------|------|
| Engine bay | Tripod LiDAR + supplementary photos | A/B |
| Frame rails (visible) | LiDAR | A |
| Cab floor / tunnel | LiDAR | A |
| Underbody | Lift + LiDAR | B |
| Full exterior | Optional photogrammetry | C |

### Tier 3 — Derived simplification

Decimate to LOD budgets only after Tier A/B features are preserved.

## Asset manifest (per deliverable)

```json
{
  "asset_id": "L02_frame_rail_lh",
  "reference_vehicle_id": "ref-f450-2019-rc-8ft-4x2",
  "source_ids": ["src.ford.bblas.sd_bblb", "src.scan.2026-07-engine_bay"],
  "accuracy_tier": "A",
  "units": "mm",
  "coordinate_system": "rear_axle_ground",
  "gltf": "assets/L02/frame_rail_lh.glb",
  "checksum": "sha256:..."
}
```

## Prohibited

- Publishing Ford BBAS CAD or unmodified OEM meshes externally
- Single global scale fudge without documenting source mismatch
- Merging OEM and EV geometry without layer tags

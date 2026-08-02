# GLB Acceptance Checklist — EDTS-SPEC-3D-001

**Configuration:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Manifest:** `src/data/mesh_mapping_manifest.json`  
**Verifier:** `src/data/verifyMeshMapping.ts`  
**Decision:** DT-D063

Fill this form before admitting any file to `public/assets/glb/` (Tier-2).  
Acquisition does **not** authorize geometry freeze, ASSERTION_VERIFIED mesh, or invented mass.

---

## Asset identity

| Field | Value |
|---|---|
| Filename | |
| Source (Option A / B + vendor/SKU) | |
| License / redistribution | |
| SHA-256 | |
| File size (MB) | |
| Triangle count (LOD0) | |
| Unique materials | |
| Reviewer / date | |

---

## Automated / measured gates

- [ ] **Scale audit** — Axle-to-axle (or measured frame length proxy) ≈ **3.69 m ± 0.05 m**
- [ ] **Origin** — Front axle midline at world **(0, 0, 0)**; +Y up; +X forward; +Z right (LHD)
- [ ] **Node parser** — `verifyMeshMapping(discoveredNames)` → `pass: true` (100% primary nodes; no unexplained `GEO_*` orphans)
- [ ] **Unique comps** — ≥ 5 distinct `comp_id`s mapped from primary nodes
- [ ] **Raycast** — Per-component pointer hits; no inverted normals / ray-penetration
- [ ] **Performance** — ≥ 60 FPS LOD0 on standard integrated GPU
- [ ] **Budget** — Size &lt; 25 MB; tris ≤ 150k; materials/draw calls ≤ 30
- [ ] **Materials** — PBR metallic-roughness; no baked directional lighting in albedo; glass transparent ≈ 0.3

## Honesty gates

- [ ] Powertrain nodes use `*_PROXY_*` **or** are aliased as `OPTION_DEPENDENT` (no 6.7L/6R140 as verified for VEH-000001)
- [ ] Cab shell node does **not** assert aluminum without material evidence
- [ ] Bare cab-and-chassis (no upfitter body)
- [ ] Geometry claim remains `PLACEHOLDER_GEOMETRY` or `SIMPLIFIED_SURFACE` until metrology
- [ ] `mesh_ref` / object-store path recorded; COMP/GEO rows updated without inventing mass/SIM values

## Sign-off

| Role | Name | Pass/Fail | Date |
|---|---|---|---|
| Asset author | | | |
| EDTS reviewer | | | |

**Admit to Tier-2 only if all gates Pass.**

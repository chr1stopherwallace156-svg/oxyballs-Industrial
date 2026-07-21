# EDTS VPR-2 Architecture and Interaction Prototype

**Audit date:** 2026-07-21  
**Release identifier:** `EDTS VPR-2 Architecture and Interaction Prototype`

## System status audit

| Item | Status |
|---|---|
| Domain separation strategy (6 domains) | ✔ PROTOTYPED |
| Relational DB persistence | ❌ NOT IMPLEMENTED (in-memory JSON reference data) |
| EGS graph traversal engine | ❌ NOT IMPLEMENTED (storyboard array + edge list) |
| Real-time axle calculations | ❌ DISABLED (incomplete vehicle mass basis) |
| Procedure generation | ❌ DISABLED (needs graph + OEM docs) |
| React Three Fiber viewport | ✔ IMPLEMENTED (Canvas + meshes + raycasting) |
| Camera bounding-box traversal | ✔ IMPLEMENTED (Box3 + OrbitControls tween) |
| WebGL material confidence overlay | ✔ IMPLEMENTED (meshStandardMaterial color swap) |

## Storage (3 tiers — not 6 microservices)

1. **Relational** — normalized tables (SQL draft); JSON prototype today  
2. **Object store** — GLB / STEP / scans / PDFs (empty until acquired)  
3. **Client view state** — selection, hover, mode, storyboard step, camera  

## Property maturity matrix (orthogonal)

Identity · Geometry · Placement · Mass · Interface — never one badge for all.

## Mass safety

SIM records remain `mass_kg: null`. Handoff sample kg values quarantined in  
`stores/ASSUMPTION_DEMO_MASS_SUBSET.json` (`DISABLED_BY_DEFAULT`, not loaded as truth).

## Acceptance (current)

User can orbit a truck-shaped R3F scene, hover/select/isolate/search/inspect ≥5 meshes.

## GLB acquisition (DT-D063)

Gate accepted: `EDTS-SPEC-3D-001`. Manifest + `verifyMeshMapping` + QA checklist ready.  
**GLB binary:** not acquired. Tier-2 path `public/assets/glb/` remains empty.

## Next milestone

Acquire/author GLB per SPEC-3D-001 → map ≥5 `comp_id`s — still no invented mass/VERIFIED geometry.

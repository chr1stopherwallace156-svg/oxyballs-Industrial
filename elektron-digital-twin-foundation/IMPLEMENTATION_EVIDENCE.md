# IMPLEMENTATION_EVIDENCE.md

**Purpose:** Every green check must have **proof** — code path, test, demo, acceptance.  
**Decision:** DT-D066  
**Rule:** Documentation alone is not evidence. Manual “it worked once” without a recorded test is **not** 🧪 Tested.  
**Hard rule (permanent):** **No false OEM STEP / measured claims.** Placeholders stay labeled `PLACEHOLDER_GEOMETRY`. Visualization ≠ metrology.

---

## Three-axis maturity (mandatory)

| Axis | Symbol | Meaning |
|---|---|---|
| **Implemented** | ✅ / ✖ | Code exists, builds, and is wired into a runtime path or CLI |
| **Tested** | 🧪 / ✖ | Automated or recorded acceptance test exists in repo and has been run |
| **Verified** | 📐 / ✖ | Meets **engineering acceptance criteria** for that feature (e.g. SPEC-3D-001 gates, FPS, RMS) |

A feature may be:

| Pattern | Meaning |
|---|---|
| ✅ ✖ ✖ | Code exists; untested; not engineering-verified |
| ✅ 🧪 ✖ | Code + automated smoke/unit; not yet proven against engineering AC |
| ✅ 🧪 📐 | Full maturity for that feature |
| ✖ ✖ ✖ | Missing |

**Do not collapse these into one emoji.** Viewer framework ≠ vehicle asset ≠ metrology.

---

## Category progress (numeric)

Estimates from DT-D065 audit + this evidence pass. **Not** marketing maturity of the twin — **implementation coverage** of each category’s stated scope.

| Category | Progress | Basis |
|---|---:|---|
| Viewer (framework + interaction) | **90%** | R3F, orbit, hover/select/isolate/explode/search/Box3/passport wired; no automated UI tests; no real GLB stress |
| Vehicle assets (SPEC-3D-001 GLB) | **10%** | Gate docs + empty Tier-2 path; no binary |
| Runtime mapping (GEO_ → CFGCOMP) | **25%** | Manifest + offline verifier + procedural `registerMesh`; no GLB ingest |
| VIN pipeline (vPIC + label) | **0%** | Specs only |
| Mobile capture (ARKit / `.edts-scan`) | **0%** | Specs only |
| Registration (Open3D / ICP / QA) | **0%** | Specs only |
| Digital twin evidence (passport / ledger / maturity) | **35%** | UI + JSON evidence stores; no measured geometry promotion path |
| Persistence (PostgreSQL Tier-1) | **5%** | SQL draft only |
| Automated test harness (VPR-2) | **15%** | Mesh smoke + production build only |

**Weighted observation:** Viewer is mature; **vehicle assets and mapping are the gap.** Do not polish the 90% area while the 10% blocks downstream proof.

---

## Evidence records

### EVD-FEAT-001 — R3F Canvas + OrbitControls

| Field | Value |
|---|---|
| Feature | React Three Fiber Canvas + OrbitControls |
| Implemented | ✅ |
| Tested | ✖ (no unit/E2E; build compiles canvas module) |
| Verified | ✖ (no FPS / WebGL acceptance recorded) |
| Evidence (code) | `edts-visible-progress/src/App.tsx`, `src/components/Scene.tsx` |
| Demo | Manual: `npm run dev` — orbit scene |
| Test | none |
| Acceptance | Viewer mounts WebGL context |
| Reviewer / decision | DT-D062 audit · DT-D066 evidence |

---

### EVD-FEAT-002 — Procedural placeholder truck

| Field | Value |
|---|---|
| Feature | Procedural truck-shaped meshes (not GLB) |
| Implemented | ✅ |
| Tested | ✖ |
| Verified | ✖ — **not** OEM geometry; `PLACEHOLDER_GEOMETRY` |
| Evidence | `Scene.tsx` (`ROLE_MAP`, part components) |
| Honesty | **No false OEM STEP / measured claims** |
| Reviewer | DT-D061 / DT-D066 |

---

### EVD-FEAT-003 — Hover / selection / isolation / explode

| Field | Value |
|---|---|
| Feature | Raycast hover, select, dim, isolate, explode |
| Implemented | ✅ |
| Tested | ✖ |
| Verified | ✖ (not proven on real segmented GLB) |
| Evidence | `Scene.tsx` `Selectable`; `DemoContext.tsx`; `SidePanel.tsx`; `Toolbar.tsx` |
| Demo | Manual interaction in VPR-2 |
| Test | none |
| Acceptance (future 📐) | Per-component hits on SPEC-3D-001 GLB; no inverted normals |
| Reviewer | DT-D060 · DT-D066 |

---

### EVD-FEAT-004 — Box3 camera framing

| Field | Value |
|---|---|
| Feature | Box3 fit + OrbitControls target lerp |
| Implemented | ✅ |
| Tested | ✖ |
| Verified | ✖ — may fail on large/complex GLBs; not measured |
| Evidence | `Scene.tsx` `FocusCamera`; `DemoContext.tsx` `focusComponent` |
| Demo | Search bar / scene-tree focus |
| Test | none |
| Acceptance (future 📐) | Frame ≥5 GLB components without clip-through / wrong pivot |
| Reviewer | DT-D062 · DT-D066 |

---

### EVD-FEAT-005 — Maturity passport / evidence sidebar

| Field | Value |
|---|---|
| Feature | Component passport + 5-axis maturity + evidence ledger |
| Implemented | ✅ |
| Tested | ✖ |
| Verified | ✖ (UI displays JSON; evidence is not field-measured) |
| Evidence | `SidePanel.tsx`, `joinCatalog.ts`, `stores/EVD.json` |
| Demo | Select component → passport panel |
| Reviewer | DT-D061 · DT-D066 |

---

### EVD-FEAT-006 — JSON domain stores + join

| Field | Value |
|---|---|
| Feature | COMP/GEO/EVD/EGS/SIM/UI in-memory join |
| Implemented | ✅ |
| Tested | ✖ (no FK integrity unit tests) |
| Verified | ✖ (not relational Tier-1) |
| Evidence | `src/data/stores/*.json`, `joinCatalog.ts` |
| Reviewer | DT-D060 · DT-D066 |

---

### EVD-FEAT-007 — Mesh mapping manifest

| Field | Value |
|---|---|
| Feature | Primary `GEO_*` → `comp_id` map |
| Implemented | ✅ |
| Tested | 🧪 via smoke (structure + required count) |
| Verified | ✖ (no real GLB nodes to match) |
| Evidence | `src/data/mesh_mapping_manifest.json` |
| Test | `npm run verify:mesh` |
| Reviewer | DT-D063 · DT-D066 |

---

### EVD-FEAT-008 — Offline `verifyMeshMapping`

| Field | Value |
|---|---|
| Feature | Node-name admit parser |
| Implemented | ✅ |
| Tested | 🧪 |
| Verified | ✖ — **not** SPEC-3D-001 full gate (scale/origin/tris/materials/FPS) |
| Evidence | `src/data/verifyMeshMapping.ts`, `scripts/smoke-verify-mesh.mjs` |
| Test | `npm run verify:mesh` — PASS (15 nodes; `glb_status: NOT_ACQUIRED`) |
| Acceptance (📐 requires) | Run against discovered names from admitted GLB + checklist |
| Reviewer | DT-D063 · DT-D066 |

---

### EVD-FEAT-009 — Production build

| Field | Value |
|---|---|
| Feature | `tsc -b && vite build` |
| Implemented | ✅ |
| Tested | 🧪 |
| Verified | ✖ (compile success ≠ engineering AC) |
| Evidence | `edts-visible-progress/package.json` |
| Test | `npm run build` — PASS on DT-D065/D066 audit dates |
| Reviewer | DT-D066 |

---

### EVD-FEAT-010 — Runtime mesh registry (procedural)

| Field | Value |
|---|---|
| Feature | `registerMesh(comp_id, geometry_role)` |
| Implemented | ✅ (partial scope) |
| Tested | ✖ |
| Verified | ✖ |
| Evidence | `src/data/meshRegistry.ts`, call site `Scene.tsx` |
| Gap | Manifest ingest / GLB traverse **not** wired |
| Reviewer | DT-D062 · DT-D066 |

---

### EVD-FEAT-011 — Mass engine (blocked)

| Field | Value |
|---|---|
| Feature | Null-safe mass aggregation |
| Implemented | ✅ |
| Tested | ✖ |
| Verified | ✖ — correctly **blocks**; not a verified mass result |
| Evidence | `massEngine.ts`, `SIM.json` (`mass_kg: null`) |
| Honesty | Assumption kg quarantined — not SIM truth |
| Reviewer | DT-D060 · DT-D062 |

---

## Explicit non-evidence (must stay red)

| Feature | Implemented | Tested | Verified | Note |
|---|---|---|---|---|
| Real SPEC-3D-001 GLB | ✖ | ✖ | ✖ | Highest-value unlock |
| `useGLTF` runtime load | ✖ | ✖ | ✖ | |
| GEO_ → CFGCOMP ingest from GLB | ✖ | ✖ | ✖ | |
| NHTSA vPIC resolver | ✖ | ✖ | ✖ | |
| Mobile ARKit / AprilTag | ✖ | ✖ | ✖ | |
| Open3D ICP / RMS QA | ✖ | ✖ | ✖ | |
| PostgreSQL Tier-1 | ✖ | ✖ | ✖ | SQL draft ≠ implemented |
| Viewer UI automated tests | ✖ | ✖ | ✖ | |
| Quantum pipeline | ✖ | ✖ | ✖ | REFERENCE_ONLY by DT-D064 |

---

## Demo / media register

| Demo ID | Path | Status |
|---|---|---|
| DEMO-VPR2-ORBIT | *(not in repo)* | Record when available → `research/media/` or object store |
| DEMO-MESH-REGISTRY | *(not in repo)* | Require after P0 GLB ingest |

Until a demo file is committed or linked, **Demo** fields above remain “manual / not archived.”

---

## How to promote a check to 📐 Verified

1. Written acceptance criteria (spec section or checklist item).  
2. Automated test **or** signed checklist with measured result + date.  
3. Evidence paths updated in this file in the **same PR**.  
4. Traceability matrix row updated (`IMPLEMENTATION_TRACEABILITY_MATRIX.md`).  
5. Never mark geometry 📐 Verified without metrology / SPEC-3D-001 QA — **no false OEM STEP**.

---

## Related

- [`IMPLEMENTATION_AUDIT.md`](IMPLEMENTATION_AUDIT.md)  
- [`MISSING_FEATURES.md`](MISSING_FEATURES.md)  
- [`NEXT_IMPLEMENTATION_PRIORITY.md`](NEXT_IMPLEMENTATION_PRIORITY.md)  
- [`IMPLEMENTATION_TRACEABILITY_MATRIX.md`](IMPLEMENTATION_TRACEABILITY_MATRIX.md)

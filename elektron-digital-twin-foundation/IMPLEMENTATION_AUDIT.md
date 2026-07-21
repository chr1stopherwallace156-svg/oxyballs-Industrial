# EDTS Implementation Audit

**Audit date:** 2026-07-21  
**Method:** Repository inspection — specifications compared to files, imports, runtime wiring, builds, and automated checks. **Documentation alone does not count as implementation.**  
**Canonical config:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Auditor basis:** `git` tree at branch `cursor/reference-lock-l00-d881`; commands run: `npm run verify:mesh`, `npm run build` (VPR-2).

## Status legend

| Symbol | Status | Meaning |
|---|---|---|
| 🔵 | **VERIFIED** | Implemented **and** covered by automated acceptance test in repo |
| ✅ | **IMPLEMENTED** | Code exists, builds, wired in app or CLI — manual/smoke only |
| 🟡 | **PARTIAL** | Some code or schema exists; incomplete or not wired |
| 🔴 | **MISSING** | Required by accepted spec/decision; no implementation found |
| ⚪ | **NOT STARTED** | Planned in research/backlog only; explicitly not executed |

---

## 1. VPR-2 viewer & interaction (`edts-visible-progress/`)

| Feature | Expected | Status | Evidence | Notes |
|---|---|---|---|---|
| R3F Canvas | React Three Fiber WebGL scene | ✅ | `src/App.tsx`, `src/components/Scene.tsx` | Builds; dev server runs |
| Procedural truck meshes | Placeholder geometry until GLB | ✅ | `Scene.tsx` (`ROLE_MAP`, 19 `*Part` components) | Not OEM/GLB |
| GLB loading | `useGLTF` / GLTFLoader | 🔴 | **No import** in `src/` | Spec gate exists; no loader |
| Real GLB asset | SPEC-3D-001 `.glb` in Tier-2 | 🔴 | `public/assets/glb/` — README only | `glb_status: NOT_ACQUIRED` |
| Mesh mapping manifest | 15 `GEO_*` → `comp_id` | ✅ | `src/data/mesh_mapping_manifest.json` | Static JSON |
| `verifyMeshMapping()` | Node parser for GLB admit | 🔵 | `src/data/verifyMeshMapping.ts`, `scripts/smoke-verify-mesh.mjs` | `npm run verify:mesh` passes; **not** called from app |
| Runtime manifest ingest | GLB nodes → registry | 🔴 | `ingestManifestIntoRegistry()` **uncalled** | Scene uses `registerMesh()` per procedural part |
| Mesh registry | `comp_id` ↔ `geometry_role` | 🟡 | `src/data/meshRegistry.ts`, `Scene.tsx` `registerMesh` | Re-exports dead; no GLB binding |
| Hover | Pointer over + label | ✅ | `Scene.tsx` `Selectable` | R3F pointer events |
| Selection | Click select + miss clear | ✅ | `Scene.tsx`, `App.tsx` `onPointerMissed` | |
| Dim unrelated | Opacity on non-selected | ✅ | `DemoContext.tsx`, `Scene.tsx` | |
| Isolation | Filter visible components | ✅ | `DemoContext.tsx`, `SidePanel.tsx` | |
| Explode | Slider × `explode_vector` | ✅ | `Toolbar.tsx`, `GEO.json`, `Scene.tsx` | |
| Hide / remove | Storyboard + toolbar | ✅ | `DemoContext.tsx`, `timeline.json` | |
| Camera framing | Box3 fit + lerp | ✅ | `Scene.tsx` `FocusCamera` | Search + scene tree + timeline focus |
| Search | Filter + focus camera | ✅ | `ModePanels.tsx` `SearchBar` | |
| Evidence heatmap | Material color by `data_status` | ✅ | `Scene.tsx`, `ModePanels.tsx` | **Not** custom GLSL; not 5-axis maturity colors |
| Storyboard timeline | Step slider + remove/focus | ✅ | `ModePanels.tsx`, `stores/timeline.json` | `STORYBOARD_ONLY` — not WSM procedures |
| Simulation panel | Mass display | 🟡 | `ModePanels.tsx`, `massEngine.ts` | Always `BLOCKED_UNTIL_MASS_EVIDENCE` |
| Maturity passport | Sidebar 5-axis matrix | ✅ | `SidePanel.tsx`, `joinCatalog.ts`, `EVD.json` | |
| Evidence ledger UI | Citations in sidebar | ✅ | `SidePanel.tsx` | From JSON |
| Vehicle states | Factory / Decon / EV | ✅ | `DemoContext.tsx`, `manifest.json` | |
| Unit / E2E tests (viewer) | Vitest/Playwright | 🔴 | **No** `*.test.ts` in VPR-2 | Only mesh smoke script |
| Typecheck + production build | `tsc -b && vite build` | 🔵 | `package.json` `build` | Passes on audit date |

---

## 2. Data & persistence

| Feature | Expected | Status | Evidence | Notes |
|---|---|---|---|---|
| COMP / GEO / EVD / EGS / SIM / UI stores | Normalized JSON FKs | ✅ | `src/data/stores/*.json`, `joinCatalog.ts` | 18 active GEO records |
| PostgreSQL / SQLite runtime | Tier-1 relational | 🔴 | `schema/vpr2_normalized.sql` | **Draft DDL only** — not executed |
| Object store (scans) | `/scans/raw`, `/scans/processed` | 🔴 | — | Backlog only |
| Object store (GLB) | `public/assets/glb/` | 🟡 | README + `.gitkeep` | Empty |
| Assumption masses quarantine | Not loaded as SIM truth | ✅ | `ASSUMPTION_DEMO_MASS_SUBSET.json` | Not imported |
| Mass engine | Null-safe blocked totals | ✅ | `massEngine.ts` | SIM `mass_kg` all null |
| EGS graph traversal engine | Query / procedure path | 🔴 | `EGS.json` edge list only | No traversal runtime |
| Legacy superseded JSON | Removed or archived | 🟡 | `stores/components.json`, etc. | On disk; **not imported** (`stores/README.md`) |
| Root `componentCatalog.json` | — | ⚪ obsolete | `src/data/componentCatalog.json` | **Dead** — zero imports |

---

## 3. Per-specification audits

### EDTS-SPEC-3D-001 (`specs/EDTS-SPEC-3D-001_GLB_ACQUISITION.md`, DT-D063)

| Requirement | Status | Evidence |
|---|---|---|
| Acquisition spec document | ✅ | `specs/EDTS-SPEC-3D-001_GLB_ACQUISITION.md` |
| `mesh_mapping_manifest.json` | ✅ | 15 primary nodes, 7 unique `comp_id`s |
| Pre-admit node verifier | 🔵 | `verifyMeshMapping.ts` + smoke script |
| QA checklist form | ⚪ doc only | `qa/GLB_ACCEPTANCE_CHECKLIST.md` — no filled instance |
| Real GLB binary | 🔴 | No `.glb` under `public/assets/glb/` |
| GEO_ node hierarchy in runtime | 🔴 | Procedural names ≠ `GEO_*` |
| Triangle / material budget validation | 🔴 | No GLB to measure |
| Front-axle origin CRS in scene | 🟡 | Procedural scene uses display origin; spec CRS documented only |
| PBR ORM materials on delivery asset | 🔴 | Procedural `meshStandardMaterial` only |
| `useMeshRegistryIngestion` hook | 🔴 | Named in backlog; **not in codebase** |
| Runtime GLB load in R3F | 🔴 | No `useGLTF` |

**Spec summary:** **PARTIAL (gate tooling only)** — admit pipeline defined; **no acquired asset**.

---

### Open-source pack (DT-D064, `research/open_source/`)

| Document / capability | Status | Evidence |
|---|---|---|
| Ecosystem index | ⚪ | `OPEN_SOURCE_ECOSYSTEM_INDEX.md` — catalog only |
| Mobile scan pipeline (`.edts-scan`) | ⚪ NOT STARTED | No Swift, no packager, no sample archives |
| Vehicle capture SOP | ⚪ | `VEHICLE_SCAN_CAPTURE_PROTOCOL.md` — field doc only |
| Open3D / ICP / FPFH pipeline | ⚪ PLANNED | Zero Python Open3D/COLMAP in repo |
| vPIC VIN resolver service | 🔴 MISSING | No `DecodeVin`, no HTTP client |
| AprilTag scale detection | 🔴 MISSING | No OpenCV / apriltags code |
| WLS / RANSAC / symmetry code | 🔴 MISSING | Math doc only |
| Quantum QUBO pipeline | ⚪ REFERENCE_ONLY | By design — rejected for production |
| 90-day backlog tasks | ⚪ NOT STARTED | All checkboxes open in `90_DAY_IMPLEMENTATION_BACKLOG.md` |

**Pack summary:** **NOT IMPLEMENTED** (research + backlog only; DT-D064 explicitly zero code mutation).

---

### Mobile scan spec (`MOBILE_SCAN_PIPELINE.md`)

| Check | Status |
|---|---|
| iOS app | 🔴 |
| ARKit capture code | 🔴 |
| RGB + 16-bit depth export | 🔴 |
| Pose JSON export | 🔴 |
| `.edts-scan` archive format | 🔴 (schema documented only) |
| AprilTag detection | 🔴 |
| Upload client | 🔴 |

**Status:** **NOT IMPLEMENTED**

---

### Scan registration & QA (`SCAN_REGISTRATION_AND_QA_SPEC.md`)

| Check | Status |
|---|---|
| Python Open3D module | 🔴 |
| Voxel downsampling | 🔴 |
| SOR filter | 🔴 |
| FPFH + RANSAC registration | 🔴 |
| Point-to-plane ICP | 🔴 |
| Cloud-to-CAD deviation map | 🔴 |
| RMS QA gate automation | 🔴 |

**Status:** **PLANNED / NOT STARTED**

---

### VIN resolver (`VIN_CONFIGURATION_RESOLVER_SPEC.md`, `VIN_AND_LABEL_CAPTURE_PROTOCOL.md`)

| Check | Status |
|---|---|
| NHTSA vPIC batch client | 🔴 |
| Config match matrix code | 🔴 |
| Door-jamb OCR fallback | 🔴 |
| Mismatch rejection tests | 🔴 |
| Physical intake execution | 🔴 |
| Config fingerprint tool (adjacent) | ✅ | `verification/fingerprint/generate_configuration_fingerprint.py` — **not** vPIC |

**Status:** **NOT IMPLEMENTED** (schemas + protocols only)

---

### THREE_D_SPEC.md (layer-wide)

| Check | Status |
|---|---|
| glTF delivery rules documented | ✅ doc |
| Demonstrator GLB path (SPEC-3D-001) | 🟡 gate only |
| LiDAR scan execution (L01–L03) | 🔴 |
| OEM CAD in repo | 🔴 correctly absent |
| Accuracy tier in asset manifest | 🔴 for VPR-2 GLB |

---

## 4. Kernel / foundation (separate from VPR-2)

| Area | Status | Evidence |
|---|---|---|
| EAE ingestion (Python) | 🔵 | `tests/eae/`, `tools/evidence_acquisition/` |
| EGS-v1 proposal tests | 🔵 | `tests/egs_v1/` |
| Kernel isolation / fingerprint | 🔵 | `verification/isolation/`, `verification/fingerprint/` |
| EAE test GLB fixtures | ✅ | `tests/eae/fixtures/` — **not** demonstrator asset |

These serve **kernel / evidence acquisition** — not wired to VPR-2 viewer or DT-D063 GLB path.

---

## 5. Build verification (audit run)

```bash
cd edts-visible-progress && npm run verify:mesh   # PASS (15 nodes, glb_status NOT_ACQUIRED)
cd edts-visible-progress && npm run build         # PASS (tsc + vite)
```

No `npm test` script exists in VPR-2.

---

## 6. Document vs code drift (high risk)

| Document claims | Repository reality |
|---|---|
| “Next: GLB mapping” (DT-D062/063) | Manifest + verifier yes; **GLB + loader no** |
| Open-source “REUSE_DIRECTLY” tools | **Zero** COLMAP/Open3D/vPIC/RTAB-Map integration code |
| 90-day Sprint 5 “R3F viewer” | **Already partial** — procedural R3F exists; GLB path missing |
| `PROTOTYPE_STATUS.md` relational tier | SQL draft only — accurate if read literally |
| Decision `audit.r3f_viewport: IMPLEMENTED` | **Accurate** for procedural scene |
| `ingestManifestIntoRegistry` in spec narrative | Function exists but **never called** |

---

## 7. Obsolete / cleanup candidates (do not delete without decision)

| Path | Issue |
|---|---|
| `edts-visible-progress/src/data/componentCatalog.json` | Superseded; no imports |
| `edts-visible-progress/src/data/stores/components.json` (+ legacy set) | Superseded by COMP/GEO/… |
| `edts-visible-progress/src/data/egsExport.ts` | Unused export helper |

---

## Related artifacts

- [`MISSING_FEATURES.md`](MISSING_FEATURES.md) — consolidated gap list  
- [`NEXT_IMPLEMENTATION_PRIORITY.md`](NEXT_IMPLEMENTATION_PRIORITY.md) — recommended build order  
- [`IMPLEMENTATION_TRACEABILITY_MATRIX.md`](IMPLEMENTATION_TRACEABILITY_MATRIX.md) — requirement → code → test  
- VPR-2 self-audit: [`edts-visible-progress/PROTOTYPE_STATUS.md`](../edts-visible-progress/PROTOTYPE_STATUS.md)

**Rule going forward:** New specs must cite this audit or update it in the same PR that adds implementation.

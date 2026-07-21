# EDTS Implementation Traceability Matrix

**Audit date:** 2026-07-21  
**Rule:** Each row links a **requirement** → **code artifact** → **test** → **status**. Empty code/test cells mean **MISSING** or **NOT STARTED**.

Status: 🔵 VERIFIED · ✅ IMPLEMENTED · 🟡 PARTIAL · 🔴 MISSING · ⚪ NOT STARTED

---

## DT-D060 — R2 normalized architecture

| Req ID | Requirement | Code | Test | Status |
|---|---|---|---|---|
| D060-01 | COMP store + FK | `edts-visible-progress/src/data/stores/COMP.json` | none | ✅ |
| D060-02 | GEO store + FK | `stores/GEO.json` | none | ✅ |
| D060-03 | EVD store + FK | `stores/EVD.json` | none | ✅ |
| D060-04 | EGS edge list | `stores/EGS.json` | none | ✅ |
| D060-05 | SIM store (null masses) | `stores/SIM.json`, `massEngine.ts` | none | ✅ |
| D060-06 | UI store | `stores/UI.json` | none | ✅ |
| D060-07 | Join view `joinCatalog()` | `joinCatalog.ts` | none | ✅ |
| D060-08 | Hover-first viewport | `Scene.tsx` | none | ✅ |
| D060-09 | Selection dim unrelated | `DemoContext.tsx`, `Scene.tsx` | none | ✅ |
| D060-10 | Storyboard timeline | `timeline.json`, `ModePanels.tsx` | none | ✅ |
| D060-11 | Search + camera focus | `ModePanels.tsx`, `FocusCamera` in `Scene.tsx` | none | ✅ |
| D060-12 | Evidence heatmap (material) | `Scene.tsx`, `ModePanels.tsx` | none | ✅ |
| D060-13 | Mass engine null-safe block | `massEngine.ts` | none | ✅ |
| D060-14 | Reject invented SIM kg | quarantine `ASSUMPTION_DEMO_MASS_SUBSET.json` | none | ✅ |
| D060-15 | Photoreal / STEP LOD | — | — | ⚪ deferred |
| D060-16 | Live axle loads | — (disabled) | — | 🔴 by design |

---

## DT-D061 — VPR-2 claim corrections

| Req ID | Requirement | Code | Test | Status |
|---|---|---|---|---|
| D061-01 | Prototype status audit doc | `edts-visible-progress/PROTOTYPE_STATUS.md` | none | ✅ |
| D061-02 | SQL schema draft (not deployed) | `schema/vpr2_normalized.sql` | none | 🟡 |
| D061-03 | Architecture honesty doc | `src/data/ARCHITECTURE.md` | none | ✅ |
| D061-04 | Multi-axis maturity in UI | `SidePanel.tsx`, `EVD.json` | none | ✅ |
| D061-05 | R3F not CSS cards | `App.tsx`, `Scene.tsx` | `npm run build` | ✅ |
| D061-06 | Timeline = storyboard label | `timeline.json` `kind` | none | ✅ |
| D061-07 | Heatmap ≠ custom GLSL | `Scene.tsx` standard material | none | ✅ |
| D061-08 | Next milestone GLB mapping | manifest + verifier only | smoke script | 🟡 |

---

## DT-D062 — VPR-2 baseline accepted

| Req ID | Requirement | Code | Test | Status |
|---|---|---|---|---|
| D062-01 | 6 domains / 3 tiers documented | `ARCHITECTURE.md`, `PROTOTYPE_STATUS.md` | none | ✅ |
| D062-02 | Relational persistence | `vpr2_normalized.sql` only | none | 🔴 |
| D062-03 | Object store tier | `public/assets/glb/` placeholder | none | 🟡 |
| D062-04 | Client view state | `DemoContext.tsx` | none | ✅ |
| D062-05 | R3F viewport | `App.tsx`, `Scene.tsx` | build | ✅ |
| D062-06 | Box3 camera | `Scene.tsx` `FocusCamera` | none | ✅ |
| D062-07 | Material confidence overlay | `Scene.tsx` | none | ✅ |
| D062-08 | EGS traversal engine | — | — | 🔴 |
| D062-09 | Axle calculations | `massEngine.ts` BLOCKED | none | 🟡 disabled |
| D062-10 | Procedure generation | — | — | 🔴 |
| D062-11 | Mesh registry | `meshRegistry.ts`, `Scene.tsx` | none | 🟡 |
| D062-12 | Assumption masses quarantined | `ASSUMPTION_DEMO_MASS_SUBSET.json` | none | ✅ |

---

## DT-D063 — EDTS-SPEC-3D-001 GLB gate

| Req ID | Requirement | Code | Test | Status |
|---|---|---|---|---|
| D063-01 | Acquisition spec | `specs/EDTS-SPEC-3D-001_GLB_ACQUISITION.md` | none | ✅ doc |
| D063-02 | mesh_mapping_manifest | `mesh_mapping_manifest.json` | smoke-verify-mesh | 🔵 |
| D063-03 | verifyMeshMapping() | `verifyMeshMapping.ts` | `scripts/smoke-verify-mesh.mjs` | 🔵 |
| D063-04 | QA checklist template | `qa/GLB_ACCEPTANCE_CHECKLIST.md` | none | ⚪ doc |
| D063-05 | Tier-2 GLB path | `public/assets/glb/` | none | 🟡 empty |
| D063-06 | GLB binary acquired | — | — | 🔴 |
| D063-07 | Runtime GLB load R3F | — | — | 🔴 |
| D063-08 | GEO_ node separation in asset | — | — | 🔴 |
| D063-09 | Front-axle origin CRS in runtime | — | — | 🔴 |
| D063-10 | PBR ORM on delivery asset | — | — | 🔴 |
| D063-11 | ingestManifestIntoRegistry wired | `verifyMeshMapping.ts` (uncalled) | none | 🟡 dead |
| D063-12 | ≤150k tris / ≤30 materials | — | — | 🔴 no asset |

---

## DT-D064 — Open-source research pack

| Req ID | Requirement | Code | Test | Status |
|---|---|---|---|---|
| D064-01 | Ecosystem index | `research/open_source/OPEN_SOURCE_ECOSYSTEM_INDEX.md` | none | ⚪ |
| D064-02 | Mobile scan schema | `MOBILE_SCAN_PIPELINE.md` | none | ⚪ |
| D064-03 | Capture SOP | `VEHICLE_SCAN_CAPTURE_PROTOCOL.md` | none | ⚪ |
| D064-04 | ICP/QA spec | `SCAN_REGISTRATION_AND_QA_SPEC.md` | none | ⚪ |
| D064-05 | vPIC resolver spec | `VIN_CONFIGURATION_RESOLVER_SPEC.md` | none | ⚪ |
| D064-06 | Math methods | `MATHEMATICAL_METHODS_REGISTRY.md` | none | ⚪ |
| D064-07 | Quantum REFERENCE_ONLY | `QUANTUM_APPLICABILITY_ASSESSMENT.md` | none | ⚪ |
| D064-08 | 90-day backlog | `90_DAY_IMPLEMENTATION_BACKLOG.md` | none | ⚪ |
| D064-09 | COLMAP integration | — | — | 🔴 |
| D064-10 | Open3D ICP pipeline | — | — | 🔴 |
| D064-11 | RTAB-Map / ARKit capture | — | — | 🔴 |
| D064-12 | vPIC client | — | — | 🔴 |
| D064-13 | AprilTag pipeline | — | — | 🔴 |
| D064-14 | Zero prod code this pass | (no app changes) | — | ✅ honored |

---

## SPEC-3D-001 checklist → traceability

| Checklist item | Code | Test | Status |
|---|---|---|---|
| Scale audit 3.69 m ± 0.05 m | — | — | 🔴 |
| Origin front axle (0,0,0) | — | — | 🔴 |
| Node parser 100% primary | `verifyMeshMapping.ts` | smoke script | 🔵 offline |
| Raycast per component | `Scene.tsx` (procedural) | none | 🟡 procedural only |
| Performance ≥60 FPS LOD0 | — | — | 🔴 no GLB |
| File <25 MB | — | — | 🔴 |
| PBR / glass opacity | — | — | 🔴 |

---

## Open-source backlog Sprint → traceability

| Sprint | Theme | Code | Test | Status |
|---|---|---|---|---|
| 1 | Schema + object store | SQL draft; empty glb dir | none | 🟡 |
| 2 | vPIC resolver | — | — | 🔴 |
| 3 | Mobile capture | — | — | 🔴 |
| 4 | Open3D ICP | — | — | 🔴 |
| 5 | R3F + GLB registry | R3F ✅; GLB 🔴 | smoke partial | 🟡 |
| 6 | E2E VIN→scan→viewer | — | — | 🔴 |

---

## Kernel / EAE (out of VPR-2 scope but in repo)

| Req ID | Requirement | Code | Test | Status |
|---|---|---|---|---|
| K-01 | EAE glTF parse | `tools/evidence_acquisition/eae_core/parse_gltf.py` | `tests/eae/` | 🔵 |
| K-02 | Config fingerprint | `verification/fingerprint/generate_configuration_fingerprint.py` | `test_configuration_fingerprint.py` | 🔵 |
| K-03 | Kernel isolation tests | `verification/isolation/` | run scripts | 🔵 |
| K-04 | EGS-v1 proposal | `tests/egs_v1/` | pytest | 🔵 |

**Note:** Kernel EAE GLB fixtures are **not** DT-D063 demonstrator assets.

---

## Coverage summary

| Source | Total reqs traced | 🔵 | ✅ | 🟡 | 🔴 | ⚪ |
|---|---:|---:|---:|---:|---:|---:|
| DT-D060 | 16 | 0 | 14 | 0 | 1 | 1 |
| DT-D061 | 8 | 0 | 6 | 2 | 0 | 0 |
| DT-D062 | 12 | 0 | 7 | 3 | 2 | 0 |
| DT-D063 | 12 | 2 | 1 | 2 | 7 | 0 |
| DT-D064 | 14 | 0 | 1 | 0 | 5 | 8 |
| **Approx.** | **62** | **2** | **29** | **7** | **15** | **9** |

**Interpretation:** ~47% requirements are ✅/🔵 in the VPR-2 interaction + JSON domain slice. **0%** of scan/metrology/vPIC backlog is implemented. GLB path is **gate-only**.

---

## Maintenance

When implementing a requirement:

1. Add or update the **Code** column path.  
2. Add an automated **Test** or mark manual with issue link.  
3. Bump status to 🔵 only with a failing-if-regressed test.  
4. Update [`IMPLEMENTATION_AUDIT.md`](IMPLEMENTATION_AUDIT.md) in the same PR.

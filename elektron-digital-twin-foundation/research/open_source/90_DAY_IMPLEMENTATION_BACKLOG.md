# 90_DAY_IMPLEMENTATION_BACKLOG.md

**Pack:** EDTS Open-Source Maximum-Leverage Research Mission  
**Decision:** DT-D064  
**Nature:** Proposed 6-sprint roadmap — **checklist items are NOT done** by this research pass.  
**Continuity:** VPR-2 already has R3F Canvas, raycast select/isolate, Box3 framing, mesh registry, SPEC-3D-001 gate — Sprint 5 is **integration continuity**, not greenfield.

```
Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4 → Sprint 5 → Sprint 6
(Schema)   (vPIC)     (Mobile)   (Open3D)   (R3F/GLB)  (E2E)
```

---

## Sprint 1 (Days 1–15) — Schema foundations & repository setup

- [ ] Task 1.1: Deploy PostgreSQL migrations for components / configuration_components / claims / evidence_sources / relationships (align with EGS proposal + VPR-2 SQL draft)
- [ ] Task 1.2: JSON-Schema validation for incoming candidate edge assertions
- [ ] Task 1.3: Tier-2 object store layout: `/scans/raw/`, `/scans/processed/`, `/assets/glb/`
- [ ] Task 1.4: Synthetic CFGCOMP fixtures for chassis, cab, powertrain (extend existing stores honestly)

**Gate:** Schema validates; empty object paths exist; no fabricated mass/geometry claims.

---

## Sprint 2 (Days 16–30) — Vehicle identification & vPIC

- [ ] Task 2.1: `NHTSAVpicResolver` batch VIN client
- [ ] Task 2.2: Field-normalization filter for `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`
- [ ] Task 2.3: Door-jamb OCR fallback (OpenCV + Tesseract) — **no invented GAWR defaults**
- [ ] Task 2.4: Unit tests — reject 4×4 / Crew Cab / Pickup mismatches

**Gate:** EXACT MATCH vs CROSS_* vs NOT_APPLICABLE outcomes covered by tests.

---

## Sprint 3 (Days 31–45) — Mobile capture & scale lock

- [ ] Task 3.1: iOS ARKit wrapper → RGB + 16-bit depth + 4×4 poses
- [ ] Task 3.2: AprilTag 36h11 scale pipeline
- [ ] Task 3.3: `.edts-scan` packager + secure upload
- [ ] Task 3.4: Field validation on physical reference section; scale within ±1.0 mm of tape/caliper

**Gate:** Failed tracking/scale sessions rejected per capture protocol.

---

## Sprint 4 (Days 46–60) — Point cloud & ICP

- [ ] Task 4.1: Open3D voxel 5 mm + SOR
- [ ] Task 4.2: FPFH RANSAC coarse registration
- [ ] Task 4.3: Generalized / point-to-plane ICP → SE(3)
- [ ] Task 4.4: Cloud-to-reference deviation map + RMS gates (rail ≤1.0 mm target)

**Gate:** QA report artifact; placeholder-vs-OEM reference clearly labeled.

---

## Sprint 5 (Days 61–75) — WebGL viewer & mesh registry

- [ ] Task 5.1: Load SPEC-3D-001-compliant GLB into R3F (after DT-D063 QA admit)
- [ ] Task 5.2: `useMeshRegistryIngestion` — GLB nodes → CFGCOMP via `mesh_mapping_manifest.json`
- [ ] Task 5.3: Raycast hover/select/isolate (dim non-selected) — **extend existing VPR-2**
- [ ] Task 5.4: Camera framing lerp (Bounds / Box3) — **extend existing VPR-2**

**Gate:** ≥5 `comp_id`s mapped from real GLB; still no invented VERIFIED geometry/mass.

---

## Sprint 6 (Days 76–90) — End-to-end verification

- [ ] Task 6.1: Side panel ← Tier-1 DB maturity matrices + citations
- [ ] Task 6.2: Maturity heatmap toggles (material overlay evolution)
- [ ] Task 6.3: Storyboard timeline ↔ selection reconciliation
- [ ] Task 6.4: E2E: VIN → scan → ICP → inspect twin in WebGL

**Gate:** Full path demo on locked config; quantum stack remains unused; axle/mass still blocked without evidence.

---

## Explicit non-goals (90-day window)

| Item | Status |
|---|---|
| Quantum / QAOA in pipeline | REJECTED (`REFERENCE_ONLY`) |
| NeRF/splat as metric authority | FORBIDDEN (`VISUALIZATION_ONLY`) |
| Procedure generation from incomplete graph | NOT AUTHORIZED |
| Geometry freeze without metrology | NOT AUTHORIZED |
| Production code mutation in DT-D064 pass | **None** (this document is planning only) |

---

## Dependency on prior decisions

| Decision | Relevance |
|---|---|
| DT-D062 | VPR-2 prototype baseline |
| DT-D063 | GLB acquisition gate before Sprint 5.1 |
| DT-D064 | This research pack + backlog acceptance as **plan**, not completion |

# EDTS Next Implementation Priority

**Based on:** [`IMPLEMENTATION_AUDIT.md`](IMPLEMENTATION_AUDIT.md) · [`IMPLEMENTATION_EVIDENCE.md`](IMPLEMENTATION_EVIDENCE.md) · [`MISSING_FEATURES.md`](MISSING_FEATURES.md)  
**Date:** 2026-07-21 (DT-D066)  
**Principle:** Close spec↔code drift before adding new surface area. Prefer one vertical slice to **📐 Verified** over many untested ✅ stubs.  
**Lock:** Do **P0 GLB** before PostgreSQL, Open3D, ARKit, AprilTags, or quantum research — those systems are easier to evaluate once the viewer runs on a real segmented vehicle.

---

## Priority tiers

### P0 — Prove the demonstrator loop (GLB vertical slice)

**Goal:** ≥5 `comp_id`s selectable from a **real** GLB in R3F with automated admit check.

| Order | Task | Closes | Effort shape |
|---|---|---|---|
| P0.1 | Acquire or commission SPEC-3D-001 GLB (external) | MF-001 | Vendor / Blender — not repo code |
| P0.2 | Add GLB loader + front-axle origin transform | MF-002 | `Scene.tsx` or dedicated `GlbVehicle.tsx` |
| P0.3 | Implement `useMeshRegistryIngestion` — traverse scene, map `GEO_*` → `userData.compId` via manifest | MF-003 | New hook; call `verifyMeshMapping` on load |
| P0.4 | Fail build or CI if manifest nodes missing when GLB path set | MF-004 | Extend `verify:mesh` or add `verify:glb` |
| P0.5 | Fill `GLB_ACCEPTANCE_CHECKLIST.md` for first asset | Audit gap | Human + script metrics (tris, materials) |

**Acceptance (📐 for P0 slice):** Load GLB → hover/select/isolate/search on **≥5** manifest-mapped components → `verifyMeshMapping` pass → checklist signed → evidence records updated for EVD-FEAT-003/004/008/010.

**Do not:** Invent mass, assert OEM STEP / measured geometry, or skip QA gates.

---

### P1 — Test harness & honesty lock

**Goal:** Move interaction features from ✅ to 🔵 where claims matter.

| Order | Task | Closes |
|---|---|---|
| P1.1 | Add Vitest + minimal tests: `verifyMeshMapping`, `joinCatalog` FK integrity | MF-046 |
| P1.2 | Optional Playwright smoke: canvas mount + select one mesh | MF-046 |
| P1.3 | CI workflow: `verify:mesh`, `build`, vitest | MF-050 |
| P1.4 | Delete or archive dead JSON (`componentCatalog.json`, legacy stores) after decision | Drift |

---

### P2 — Configuration lock (before scan ingest)

**Goal:** Quarantine pipeline enforced in code, not prose.

| Order | Task | Closes | Status |
|---|---|---|---|
| P2.1 | Python/TS `NHTSAVpicResolver` + match matrix | MF-010, MF-011 | ✅ DT-D067 (`edts-vin-resolver`) |
| P2.2 | Unit tests — reject 4×4 / Crew / manufacturer mismatch | MF-013 | ✅ |
| P2.3 | Door-jamb OCR fallback (optional parallel) | MF-012 | 🔴 open |
| P2.4 | Wire intake schema to instance record | MF-014 | 🟡 candidate `VEH-{VIN}.json` only |

**Acceptance:** Sample VIN fixtures → EXACT_CANDIDATE / NO_MATCH / REJECTED_REFERENCE_MATCH with tests — **met for vPIC path**. Physical label OCR still open.

---

### P3 — Persistence tier (Sprint 1 reality)

**Goal:** Replace in-memory JSON join with real Tier-1 store for VPR-2 read path.

| Order | Task | Closes |
|---|---|---|
| P3.1 | Choose SQLite (local) or Postgres (shared) — migrate `vpr2_normalized.sql` | MF-005 |
| P3.2 | Seed from current COMP/GEO/EVD/EGS/SIM/UI JSON | MF-005 |
| P3.3 | Side panel reads DB API instead of static import | MF-005 |
| P3.4 | Object store layout `/scans/raw`, `/assets/glb` | MF-006 |

---

### P4 — Field capture (after P0 + P2)

**Goal:** First `.edts-scan` with scale lock — not before config resolver exists.

| Order | Task | Closes |
|---|---|---|
| P4.1 | iOS capture prototype OR RTAB-Map export adapter | MF-020 |
| P4.2 | `.edts-scan` packager per schema | MF-021 |
| P4.3 | AprilTag scale pipeline (OpenCV) | MF-022 |
| P4.4 | Upload + quarantine until vPIC match | MF-023, MF-024 |

---

### P5 — Metrology backend (after first scan)

**Goal:** Open3D registration with honest PROVISIONAL vs METRIC labels.

| Order | Task | Closes |
|---|---|---|
| P5.1 | Open3D worker: voxel + SOR | MF-030 |
| P5.2 | FPFH + ICP pipeline | MF-032, MF-033 |
| P5.3 | Deviation JSON + RMS gate evaluator | MF-034 |
| P5.4 | COLMAP path (optional parallel for photogrammetry) | MF-031 |

---

### Deferred / reject

| Item | Disposition |
|---|---|
| Quantum QAOA integration | **Reject** — REFERENCE_ONLY (DT-D064) |
| NeRF/splat as metric source | **Reject** — visualization track only |
| Procedure generation | **Not authorized** until graph + OEM evidence |
| Full 90-day Sprint 6 E2E | After P0–P5 slices proven |

---

## Recommended immediate choice (fork)

```
                    ┌─────────────────┐
                    │  Start here?    │
                    └────────┬────────┘
              ┌──────────────┴──────────────┐
              ▼                             ▼
     [A] P0 GLB vertical slice      [B] P2 vPIC resolver
     Visual proof on R3F            Data governance first
              │                             │
              └──────────────┬──────────────┘
                             ▼
                    Both required before P4 scans
```

**Recommendation:** **P0 first** if a GLB vendor/path exists; **P2 first** if physical vehicle intake is imminent. Run **P1** in parallel either way (cheap honesty win).

---

## Success metrics (next audit)

| Metric | Current | Target |
|---|---|---|
| GLB in Tier-2 | 0 | 1 admitted |
| Runtime manifest mapping | 0% | 100% primary nodes |
| Automated viewer tests | 0 | ≥10 |
| vPIC resolver coverage | 0 tests | Match matrix covered |
| Open3D pipeline | None | Worker stub + 1 fixture |

Update [`IMPLEMENTATION_AUDIT.md`](IMPLEMENTATION_AUDIT.md) when any tier completes.

# EDTS Missing Features

**Derived from:** [`IMPLEMENTATION_AUDIT.md`](IMPLEMENTATION_AUDIT.md) (2026-07-21)  
**Purpose:** Single list of what is **not** in the repository yet — no assumption that specs imply code.

Status key: 🔴 **MISSING** · ⚪ **NOT STARTED** (planned/docs only)

---

## Critical path (blocks “real twin” demonstrator)

| ID | Feature | Status | Spec / decision | Why it matters |
|---|---|---|---|---|
| MF-001 | Acquired SPEC-3D-001 GLB binary | 🔴 | EDTS-SPEC-3D-001, DT-D063 | No real vehicle mesh |
| MF-002 | R3F GLB loader (`useGLTF` or equivalent) | 🔴 | EDTS-SPEC-3D-001, backlog Sprint 5 | Manifest never applied at runtime |
| MF-003 | `useMeshRegistryIngestion` (GLB traverse → `comp_id`) | 🔴 | SPEC-3D-001 §6, backlog | Procedural `registerMesh` ≠ GEO_ nodes |
| MF-004 | Wire `verifyMeshMapping()` on GLB admit | 🟡→🔴 | DT-D063 | Verifier offline only |
| MF-005 | Tier-1 PostgreSQL (or SQLite) persistence | 🔴 | DT-D061, Sprint 1 | JSON-only prototype |
| MF-006 | Tier-2 scan object store paths | 🔴 | Sprint 1 Task 1.3 | No `/scans/raw/` |

---

## Vehicle identification

| ID | Feature | Status | Spec |
|---|---|---|---|
| MF-010 | NHTSA vPIC batch client | ✅ | `edts-vin-resolver` — DecodeVinValuesExtended |
| MF-011 | CFG match normalization filter | ✅ | `resolveConfiguration.ts` |
| MF-012 | Door-jamb OCR fallback | 🔴 | still missing |
| MF-013 | vPIC mismatch unit tests | ✅ | `tests/vin/mismatch.test.ts` |
| MF-014 | Physical asset intake workflow | 🔴 | vehicle record candidate only |

---

## Capture & metrology

| ID | Feature | Status | Spec |
|---|---|---|---|
| MF-020 | iOS ARKit / LiDAR capture app | 🔴 | `MOBILE_SCAN_PIPELINE.md` |
| MF-021 | `.edts-scan` packager + manifest writer | 🔴 | same |
| MF-022 | AprilTag 36h11 scale lock | 🔴 | mobile + capture protocol |
| MF-023 | Secure scan upload client | 🔴 | backlog Sprint 3.3 |
| MF-024 | Field capture QA (tracking / scale gates) | 🔴 | `VEHICLE_SCAN_CAPTURE_PROTOCOL.md` |

---

## Point cloud & registration

| ID | Feature | Status | Spec |
|---|---|---|---|
| MF-030 | Python Open3D processing module | 🔴 | `SCAN_REGISTRATION_AND_QA_SPEC.md` |
| MF-031 | COLMAP / PyCOLMAP worker (optional path) | 🔴 | ecosystem index |
| MF-032 | FPFH + RANSAC global registration | 🔴 | scan registration spec |
| MF-033 | Generalized point-to-plane ICP | 🔴 | same |
| MF-034 | Cloud-to-CAD deviation + RMS reports | 🔴 | same |
| MF-035 | PyRANSAC-3D primitive extraction | 🔴 | math methods registry |

---

## Viewer & UX gaps (partial baseline exists)

| ID | Feature | Status | Notes |
|---|---|---|---|
| MF-040 | GLB-based raycast on real meshes | 🔴 | Procedural raycast ✅ |
| MF-041 | Maturity heatmap on 5-axis matrix | 🟡 | Colors use `data_status` only |
| MF-042 | Custom shader maturity overlay | 🔴 | Explicitly deferred per DT-D061 |
| MF-043 | EGS graph traversal in UI | 🔴 | Edge list only |
| MF-044 | Procedure generation from graph | 🔴 | NOT AUTHORIZED + not built |
| MF-045 | Live axle / CG simulation | 🔴 | `massEngine` blocked by design |
| MF-046 | VPR-2 automated UI tests | 🔴 | No Vitest/Playwright |

---

## Infrastructure & quality

| ID | Feature | Status | Notes |
|---|---|---|---|
| MF-050 | CI running `verify:mesh` + `build` | 🔴 | Scripts exist locally |
| MF-051 | PostgreSQL migration runner | 🔴 | SQL draft only |
| MF-052 | Offline vPIC mirror | 🔴 | Recommended in resolver spec |
| MF-053 | Containerized COLMAP/Open3D workers | 🔴 | Ecosystem index recommendation |

---

## Explicitly NOT missing (by design)

| Item | Reason |
|---|---|
| Quantum / QAOA pipeline | DT-D064: REFERENCE_ONLY — reject |
| NeRF/splat metric authority | VISUALIZATION_ONLY — must not gate geometry |
| Invented SIM masses | Quarantined / rejected |
| Kernel schema mutation | Frozen — separate verification track |

---

## Count summary

| Category | 🔴 MISSING | ⚪ NOT STARTED (docs/backlog) |
|---|---|---|
| GLB / viewer integration | 4 | 0 |
| vPIC / intake | 5 | 0 |
| Mobile / scan | 5 | 0 |
| Open3D / ICP | 6 | 0 |
| Viewer polish / engine | 4 | 2 |
| Infra / QA | 4 | 0 |

See [`NEXT_IMPLEMENTATION_PRIORITY.md`](NEXT_IMPLEMENTATION_PRIORITY.md) for recommended order.

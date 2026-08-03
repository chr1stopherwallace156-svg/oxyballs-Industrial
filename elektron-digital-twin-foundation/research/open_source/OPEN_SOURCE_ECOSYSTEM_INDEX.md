# OPEN_SOURCE_ECOSYSTEM_INDEX.md

**Pack:** EDTS Open-Source Maximum-Leverage Research Mission  
**Config lock:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Decision:** DT-D064  
**Authority:** Research catalog — not an authorization to mutate production code or freeze geometry.

---

## Toolchain topology

```
[MOBILE CAPTURE]            [PHOTOGRAMMETRY]          [POINT CLOUD / MESH]
• RTAB-Map                  • COLMAP                  • Open3D
• Record3D Bridge           • AliceVision / Meshroom  • CloudCompare / PCL
      │                            │                           │
      └────────────────────────────┼───────────────────────────┘
                                   ▼
                   [MATHEMATICAL RECONCILIATION]
                   • PyRANSAC-3D / SciPy (WLS)
                   • Open3D Registration Module
                                   │
      ┌────────────────────────────┴───────────────────────────┐
      ▼                                                        ▼
[3D WEB PRESENTATION]                                [VEHICLE RESOLVER]
• R3F / Three.js / gltfpack                          • NHTSA vPIC Batch API
```

---

## Catalog records

### Record 1.1 — `colmap/colmap`

| Field | Value |
|---|---|
| Repository | https://github.com/colmap/colmap |
| Maintenance | Active (CUDA / GUI / PyCOLMAP lineage) |
| License | BSD-3-Clause |
| Language | C++17 / CUDA / Python (PyCOLMAP) |
| Platforms | Linux / Windows / macOS (NVIDIA GPU for SiftGPU + dense acceleration) |
| Reusable modules | `feature_extractor`; `exhaustive_matcher` / `vocab_tree_matcher`; `mapper` (BA); `patch_match_stereo`; `stereo_fusion` |
| I/O | In: uncalibrated RGB (+ optional EXIF/intrinsics). Out: sparse PLY/NVM; dense PLY; `images.bin` / `cameras.bin` / `points3D.bin` |
| Integration complexity | Moderate (CLI or PyCOLMAP) |
| Dimensional accuracy potential | High (±0.5 mm to ±2.0 mm **when scale-anchored**) — **capability envelope, not VEH-000001 measured** |
| Config usefulness | Primary dense visual reconstruction of exterior chassis, rails, cab panels |
| Limitations | High VRAM; uncalibrated scale is arbitrary without markers |
| Evidence class | `INSPECTION_GEOMETRY` (requires scale anchoring) |
| Security / deps | Heavy CUDA/Boost — prefer containerized workers |
| Action | **REUSE_DIRECTLY** (PyCOLMAP wrapper for backend dense reconstruction) |

### Record 1.2 — `isl-org/Open3D`

| Field | Value |
|---|---|
| Repository | https://github.com/isl-org/Open3D |
| Maintenance | Active (0.18+ lineage) |
| License | MIT |
| Language | C++ / Python |
| Platforms | Cross-platform |
| Reusable modules | `geometry.PointCloud`; FPFH RANSAC global registration; Point-to-Plane / Generalized ICP; Poisson meshing |
| I/O | In: PLY/PCD/PTS/XYZ. Out: aligned PLY; OBJ/STL; SE(3) 4×4 |
| Integration complexity | Low |
| Dimensional accuracy potential | Extremely high (±0.1 mm **relative to input density**) — capability envelope |
| Config usefulness | Core alignment / measurement engine vs CFGCOMP bounding references |
| Limitations | Unconstrained Poisson can “skin” open C-channel voids |
| Evidence class | `INSPECTION_GEOMETRY` / `METRIC_VERIFICATION` |
| Security / deps | Low (PyPI wheels) |
| Action | **REUSE_DIRECTLY** |

### Record 1.3 — `nerfstudio-project/nerfstudio`

| Field | Value |
|---|---|
| Repository | https://github.com/nerfstudio-project/nerfstudio |
| Maintenance | Active |
| License | Apache 2.0 |
| Language | Python / PyTorch / CUDA |
| Platforms | Linux / Windows + NVIDIA GPU (typically ≥12 GB VRAM) |
| Reusable modules | `ns-process-data`; `splatfacto`; exporters (splat / mesh) |
| I/O | In: video / frames / COLMAP transforms. Out: `.splat` / PLY / textured mesh |
| Integration complexity | Moderate |
| Dimensional accuracy potential | Low–moderate (±5 mm class for extracted meshes; splats are non-metric) |
| Config usefulness | Photoreal web visual assets; engine-bay / interior **visual** inspection |
| Limitations | No reliable structural depth; reflective Al/glass → noisy mesh extract |
| Evidence class | **`VISUALIZATION_ONLY`** |
| Security / deps | PyTorch/CUDA ecosystem weight |
| Action | **ADAPT** — visuals only; metrics stay on Open3D/COLMAP |

### Record 1.4 — `introlab/rtabmap`

| Field | Value |
|---|---|
| Repository | https://github.com/introlab/rtabmap |
| Maintenance | Active (Université de Sherbrooke) |
| License | BSD-3-Clause |
| Language | C++ / Qt / iOS scanner lineage |
| Platforms | Linux, Windows, iOS (LiDAR iPhone/iPad Pro) |
| Reusable modules | Loop closure (FAB-MAP / DBoW2); g2o / GTSAM graph; dense cloud / mesh export |
| I/O | In: ARKit depth + RGB + IMU. Out: `.db`, PLY, OBJ, PCD |
| Integration complexity | Low (field app) / Moderate (server C++) |
| Dimensional accuracy potential | Moderate (±2–10 mm over ~3.69 m WB depending on drift/loop closure) |
| Config usefulness | Technician mobile capture of rails / cab apertures |
| Limitations | Drift on long linear rails without loop closure / scale bars |
| Evidence class | `PROVISIONAL_ESTIMATE` (requires scale reconciliation) |
| Action | **REUSE_DIRECTLY** (standardized field acquisition tool) |

### Record 1.5 — `pmndrs/react-three-fiber` & `pmndrs/drei`

| Field | Value |
|---|---|
| Repository | https://github.com/pmndrs/react-three-fiber |
| Maintenance | Active |
| License | MIT |
| Language | JS / TS |
| Platforms | Modern browsers (WebGL 2 / WebGPU) |
| Reusable modules | `<Canvas/>`, `useFrame`, `OrbitControls`, `useGLTF`, `<Html/>`, `<Bounds/>` |
| I/O | In: GLB + metadata. Out: real-time canvas |
| Integration complexity | Low |
| Dimensional accuracy | N/A (presentation) |
| Config usefulness | EDTS WebGL viewer — select / isolate / camera / maturity overlay |
| Limitations | Client GPU memory on unoptimized >200k poly meshes |
| Evidence class | `PRESENTATION_LAYER` |
| Action | **REUSE_DIRECTLY** (already in VPR-2 prototype) |

### Record 1.6 — `pmneila/PyRANSAC-3D`

| Field | Value |
|---|---|
| Repository | https://github.com/pmneila/PyRANSAC-3D |
| Maintenance | Active / stable |
| License | Apache 2.0 |
| Language | Python / NumPy |
| Platforms | Platform-independent |
| Reusable modules | `Plane()`, `Cylinder()`, `Cuboid()` |
| I/O | In: `(N,3)` arrays. Out: primitive params + inlier indices |
| Integration complexity | Low |
| Dimensional accuracy potential | High (±0.2 mm class on dense clouds) — capability envelope |
| Config usefulness | Rail web planes, pin cylinders, axle tube primitives |
| Limitations | Pure Python — voxel downsample first for >1M points |
| Evidence class | `METRIC_VERIFICATION` |
| Action | **ADAPT** (Cython/C++ wrap if real-time CPU required) |

### Record 1.7 — NHTSA vPIC API

| Field | Value |
|---|---|
| Service | https://vpic.nhtsa.dot.gov/api/ |
| Maintenance | Active (US federal public service) |
| License | Public domain (US government data) |
| Interface | REST / JSON / XML / bulk CSV |
| Reusable endpoint | `/vehicles/DecodeVinValuesBatch/` |
| I/O | In: 17-char VIN. Out: Make, Model, ModelYear, CabType, DriveType, GVWR, BodyClass, WheelBase, … |
| Integration complexity | Low |
| Config usefulness | Primary VIN → config qualification toward `CFG-2019-F450-REG-CAB-4X2-60CA-DRW` |
| Limitations | Broad option ranges on chassis-cab packages; door-jamb label still required |
| Evidence class | `CONFIGURATION_VERIFICATION` |
| Security | Public API — plan offline mirror for workers |
| Action | **REUSE_DIRECTLY** |

### Supporting (index only)

| Tool | Role | Action |
|---|---|---|
| AliceVision / Meshroom | Alternate photogrammetry GUI/pipeline | EVALUATE |
| CloudCompare / PCL | Interactive / classic cloud ops | ADAPT / REFERENCE |
| Record3D | iOS depth capture bridge | EVALUATE |
| gltfpack / glTF-Transform | GLB budget compliance (SPEC-3D-001) | REUSE_DIRECTLY |
| OpenCV aruco / pupil_apriltags | AprilTag scale lock | REUSE_DIRECTLY |
| SciPy / NumPy | WLS scale calibration | REUSE_DIRECTLY |
| COIN-OR CBC / SciPy MILP | Classical sensor-placement ILP | REUSE_DIRECTLY |
| Qiskit Optimization | QUBO research only | **REFERENCE_ONLY** |

---

## Disposition summary

| Action | Projects |
|---|---|
| REUSE_DIRECTLY | COLMAP, Open3D, RTAB-Map, R3F/drei, vPIC, AprilTag/OpenCV, SciPy, CBC/MILP, gltfpack |
| ADAPT | Nerfstudio (viz only), PyRANSAC-3D |
| REFERENCE_ONLY | Quantum / Qiskit QAOA |
| REJECT for metric authority | Unscaled NeRF/splat meshes as “verified geometry” |

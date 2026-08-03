# SCAN_REGISTRATION_AND_QA_SPEC.md

**Pack:** EDTS Open-Source Maximum-Leverage Research Mission  
**Config lock:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Decision:** DT-D064  
**Status:** Research processing / QA spec — pipeline not implemented this pass.

---

## Pipeline overview

```
P_raw ──► Voxel Downsample (5 mm) ──► SOR (k=20, std=1.0)
                                              │
                                              ▼
CAD / proxy target ◄── Gen. Point-to-Plane ICP ◄── FPFH Global Align
                              │
                              ▼
                 [Cloud-to-CAD Deviation Map]
```

**Honesty:** “CAD bounding target” may be SPEC-3D-001 GLB / placeholder envelope until measured OEM STEP exists. Deviation maps against placeholders are **not** ASSERTION_VERIFIED OEM conformance.

---

## 1. Preprocessing

### A. Voxel downsampling

Apply leaf size **5 mm** to normalize density before FPFH/ICP (Open3D `voxel_down_sample`).

### B. Statistical outlier removal (SOR)

For each point, mean distance \(d_i\) to **k = 20** neighbors; reject if outside **std_ratio = 1.0** band (Open3D `remove_statistical_outlier`).

---

## 2. Two-stage registration

### Stage 1 — FPFH + RANSAC global

Extract Fast Point Feature Histograms; RANSAC feature matching for coarse SE(3) without manual seed.

Open3D: `registration_ransac_based_on_feature_matching` (or Fast Global Registration variant).

### Stage 2 — Generalized / point-to-plane ICP

Minimize point-to-plane residuals between source points \(\mathbf{p}_i\) and target planes \((\mathbf{q}_i, \mathbf{n}_i)\):

\[
\min_{\mathbf{R},\mathbf{t}} \sum_i \big( (\mathbf{R}\mathbf{p}_i + \mathbf{t} - \mathbf{q}_i)^\top \mathbf{n}_i \big)^2
\]

with \(\mathbf{R} \in \mathrm{SO}(3)\), \(\mathbf{t} \in \mathbb{R}^3\).

Output: rigid \(\mathbf{T} \in \mathrm{SE}(3)\) (4×4) stored with evidence metadata.

---

## 3. Deviation map scale (visualization)

```
[-2.0 mm] blue (negative) ── [0.0] green (in-spec) ── [+2.0 mm] red
```

For each aligned \(\mathbf{p}_i\), signed / absolute distance to reference mesh \(\mathcal{M}_{\mathrm{ref}}\).

Heatmap coloring is **presentation**; promotion uses RMS / outlier tables below.

---

## 4. QA gates for component promotion

| Region / feature | Max RMS | Max outlier rate (>3.0 mm) | On failure |
|---|---|---|---|
| Cab shell outer | ≤ 1.5 mm | < 2.0% | Re-run ICP with B-pillar plane constraints |
| Chassis frame rail web | ≤ 1.0 mm | < 1.0% | Flag `PROVISIONAL_GEOMETRY`; open KG-FRAME-01 class gap |
| Cab mounting hole centers | ≤ 0.5 mm | 0.0% | **Hard gate** — block automated procedure generation |
| Door latch striker interface | ≤ 0.5 mm | 0.0% | **Hard gate** — interface remains `UNVERIFIED` |

These thresholds are **acceptance targets for future measured campaigns**, not results already achieved on VEH-000001.

---

## 5. Primitive extraction (optional post-align)

After alignment, PyRANSAC-3D / Open3D RANSAC may extract:

- Rail web planes  
- Leaf-spring pin cylinders  
- Axle housing tube axes  

See [`MATHEMATICAL_METHODS_REGISTRY.md`](MATHEMATICAL_METHODS_REGISTRY.md) Method 6.2.

---

## 6. Evidence classification after QA

| Outcome | Class |
|---|---|
| Gates pass vs measured reference | `METRIC_VERIFICATION` candidate |
| Gates pass vs placeholder GLB only | `INSPECTION_GEOMETRY` (not OEM-verified) |
| Gates fail | Retain raw; do not promote maturity |
| Splat/NeRF overlay | Always `VISUALIZATION_ONLY` |

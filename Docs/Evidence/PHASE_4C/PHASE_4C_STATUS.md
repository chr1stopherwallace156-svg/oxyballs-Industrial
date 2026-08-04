# PHASE_4C_STATUS

| Field | Value |
|---|---|
| Parent delivery ZIP | `DOWNLOAD-elektron-reconstruction-phase-4b-feature-pose.zip` |
| Parent delivery ZIP SHA-256 | `1120996684980a61f00410ca2bf2752c9d20956b63853a679c5bad559356937f` |
| Delivery ZIP | `DOWNLOAD-elektron-reconstruction-phase-4c-dense-fusion.zip` |
| Delivery ZIP SHA-256 | `5961191834a09101f2867d7ebdf83d9963b74ac6a525398f2f1a5b4514f8be60` |
| Baseline tip (4B) | `f54b63e3b920c9ce4ed94d4fa77602017d4545c3` |
| Decision | D-030 |

## Math / policy highlights
- Voxel size fixture default: **0.005 m**
- Weight: `w_i = c_depth * c_pose * max(0, cos(θ))^γ` with γ=1.5
- Normals: covariance PCA (Jacobi eigen-decomposition)
- Outliers: voxel-index backed k-NN (no all-pairs runtime path)
- Numeric: abs ε=1e-7, rel ε=1e-5 via existing CanonicalJSON law
- Truth: `fixture_truth.json` (committed offsets, no platform PRNG)

## Classification

| Plane | Value |
|---|---|
| IMPLEMENTATION_STATE | SOURCE_IMPLEMENTED |
| VALIDATION_STATE | LINUX_FIXTURE_VALIDATED |
| RECONSTRUCTION_STATE | DENSE_FUSION_AND_FILTERED_POINT_FOUNDATION_IMPLEMENTED |
| PHYSICAL_RECONSTRUCTION_STATE | PENDING_SPKG_DEVICE_000001 |
| PHASE_4D_READINESS | READY_FOR_SYNTHETIC_SURFACE_CANDIDATE |
| PRODUCTION_DENSE_FUSION_CLAIM | FORBIDDEN |
| SURFACE_MESH_CLAIM | FORBIDDEN |
| ENGINEERING_METROLOGY_CLAIM | FORBIDDEN |
| COMPLETE_DIGITAL_TWIN_CLAIM | FORBIDDEN |

## Fixture results
See `phase4c_emit_report.json`.

| Check | Result |
|---|---|
| Full suite | 682 executed / 7 skipped / 0 failed |
| Phase 4C filter | 26 / 0 |
| `clean_restore_result` | PASS (after packaging) |
| `sidecar_result` | PASS |
| `deterministic_zip_result` | PASS |
| `output_closure_result` | PASS |

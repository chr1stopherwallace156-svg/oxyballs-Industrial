# PHASE_4D_STATUS

| Field | Value |
|---|---|
| Parent delivery ZIP | `DOWNLOAD-elektron-reconstruction-phase-4c-dense-fusion.zip` |
| Parent delivery ZIP SHA-256 | `5961191834a09101f2867d7ebdf83d9963b74ac6a525398f2f1a5b4514f8be60` |
| Delivery ZIP | `DOWNLOAD-elektron-reconstruction-phase-4d-surface-foundation.zip` |
| Delivery ZIP SHA-256 | `bb54c481da50c9c42e444b523eb8a1b7a810d257fc30d59d842af591734f5be4` |
| Baseline tip (main) | `028aa88be1af4aff67af225b6299de2d750673cf` |
| Decision | D-031 |

## Precision / algorithm laws
- Internal math: Double
- Triangulation: 2.5D projected-XY Bowyer–Watson Delaunay
- Winding: CCW vs mean vertex normal; ambiguous → QUARANTINED_AMBIGUOUS_TOPOLOGY / REJECTED_NORMAL_CONFLICT
- LOD: spatial voxel-centroid cluster collapse; targets ~50% / ~25% triangles with preservation priority
- GLB: Float32 LE + 0x20/0x00 padding; soft-fail GLB_EXPORT_SKIPPED

## Classification

| Plane | Value |
|---|---|
| IMPLEMENTATION_STATE | SOURCE_IMPLEMENTED |
| VALIDATION_STATE | LINUX_FIXTURE_VALIDATED |
| RECONSTRUCTION_STATE | SYNTHETIC_SURFACE_RECONSTRUCTION_FOUNDATION_IMPLEMENTED |
| PHYSICAL_RECONSTRUCTION_STATE | PENDING_SPKG_DEVICE_000001 |
| PHASE_4E_READINESS | READY_WITH_UNRESOLVED_BOUNDARIES |
| PRODUCTION_VEHICLE_MESH_CLAIM | FORBIDDEN |
| ENGINEERING_METROLOGY_CLAIM | FORBIDDEN |
| MANUFACTURING_GEOMETRY_CLAIM | FORBIDDEN |
| COMPLETE_DIGITAL_TWIN_CLAIM | FORBIDDEN |

## Fixture results

| Field | Value |
|---|---|
| vertices / triangles / rejected | 47 / 63 / 6 |
| components / boundaries / holes | 1 / 2 / 1 |
| Full suite | 715 executed / 7 skipped / 0 failed |
| Phase4D filter | 33 / 0 |
| clean_restore / sidecar / deterministic_zip / closure | PASS |
| GLB | IMPLEMENTED (`7707348846555014297b0248e76d86d34d11f363d24f6ba4757f8698e4dd38f3`) |

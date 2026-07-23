# MESH_VISUAL_RUBRIC (v1.1.0-draft)

**Status:** `DRAFT` — not activated against live candidates.

## Geometry role classification (required first)

| Role | Watertight required? |
|---|---|
| `CLOSED_SOLID` | Yes (role-appropriate) |
| `OPEN_SURFACE` | No |
| `SCAN_REFERENCE` | No |
| `VISUAL_SHELL` | Usually no |
| `COLLISION_MESH` | Depends on collision design |

A door skin, trim panel, or scan patch may intentionally be an open surface.
Do not fail open geometry solely for lacking watertightness when role permits.

## Why manifold-face ratio alone is insufficient

A high `Manifold_Faces / Total_Faces` can still hide:

- disconnected islands
- flipped normals
- duplicate vertices
- degenerate / zero-area faces
- self-intersections
- non-manifold edges
- open boundaries (sometimes valid)
- invalid UVs

## Metric family (role-appropriate)

See `MESH_VISUAL_RUBRIC.json` for machine-readable metrics:

- `MVR-000-ROLE` — classify geometry role
- `MVR-001-TOPOLOGY` — manifold / topology (role-gated)
- `MVR-002-DEGENERATE` — degenerate / zero-area faces
- `MVR-003-BOUNDARY` — open boundaries (role-aware)
- `MVR-004-NORMALS` — flipped normals
- `MVR-005-ISLANDS` — disconnected islands

## Missing data

```json
{ "score": null, "evaluation_status": "NOT_EXECUTED" }
```

Never invent `0.0` as a fake score for missing parse output.

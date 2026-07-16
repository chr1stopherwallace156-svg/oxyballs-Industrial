# GEOMETRY_OPTIONS.md — Production-Quality Geometry Acquisition (L00)

Comparison of viable sources and workflows. EDTS forbids placeholder geometry; this is a planning document for L01–L03.

Option matrix:

| Option | Advantages | Disadvantages | Expected accuracy | Expected cost | License | Suitability |
|---|---|---|---|---|---|---|
| OEM CAD (Ford BBAS) | True interfaces; authoritative | Access controlled; redistribution restricted; format conversion overhead | Tier A (±2 mm) at interfaces | Internal time + BBAS access | Internal‑use only | HIGH (internal checks only) |
| OEM dimension tables (BBLB) | Authoritative dims; light weight | Lacks full surfaces; interpretation required | Tier B/C for envelopes | Low | Cite only | HIGH (envelopes) |
| Licensed professional models | Fast start; surface continuity | May be non‑engineering accurate; license limits | Variable (often Tier C) | Medium | Varies; review EULA | MEDIUM (visuals) |
| Photogrammetry | Low cost; good exterior visuals | Weak on shiny/black surfaces; scale drift; occlusions | Tier C (±10 mm) | Low | Derived work; ownable | MEDIUM (L01 visuals) |
| LiDAR (tripod) | Strong for structure and bay; absolute scale | Requires access to unit; reflections; line‑of‑sight gaps | Tier A/B in scan zones | Medium | Ownable | HIGH (L02–L03) |
| Structured‑light scan | High fidelity on parts | Limited volume; time‑intensive | Tier A on small parts | Medium/High | Ownable | MEDIUM (select parts) |
| Hard‑surface modeling | Controlled topology; optimized LOD | Requires reference; risk of drift | Tier C unless constrained | Medium | Ownable | MEDIUM (presentation) |
| Hybrid (OEM + LiDAR + modeling) | Balances truth and visuals | Pipeline complexity | Tier A/B where needed; C elsewhere | Medium | Mixed | HIGH (recommended) |

Recommendation (DT‑D002 aligned):
- Tiered hybrid workflow: OEM tables/BBLB for envelopes → targeted LiDAR for engine bay, frame rails, mounts → professional modeling for presentation surfaces → structured‑light for small removable parts if needed.
- OEM CAD never committed to repo; used only for internal checks.


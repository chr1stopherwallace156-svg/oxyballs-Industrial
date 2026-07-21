# Five-/six-domain architecture (corrected)

**Six domain tables** in **one** persistence target (SQLite → Postgres).  
**Not** six independent database services.

| Domain | Store file | Responsibility |
|---|---|---|
| COMP | `COMP.json` | Component identity |
| GEO | `GEO.json` | Geometry metadata / future mesh refs |
| EVD | `EVD.json` | Evidence + multi-dimension maturity |
| EGS | `EGS.json` | Relationship edges |
| SIM | `SIM.json` | Mass/CG — null until measured |
| UI | `UI.json` | Client view-context defaults |

SQL draft: [`schema/vpr2_normalized.sql`](schema/vpr2_normalized.sql).

Binary assets (GLB/STEP/PDF/scans) → object storage / filesystem — not in the relational rows.

Client view-state (hover/select/mode/timeline/camera) stays in the React app — not a seventh DB.

# EDTS R2 — Normalized database architecture

Six decoupled stores linked by foreign keys. Each scales independently toward 50k+ parts.

```
COMP (comp_id)
  ├── GEO  (geo_id  → comp_id)   mesh / LOD / STEP / transforms
  ├── EVD  (evd_id  → comp_id)   evidence ledger / KG / MEPQ
  ├── SIM  (sim_id  → comp_id)   mass / CG / axle shares (null until measured)
  └── EGS  (edge_id)             BOLTED_TO / MUST_DISCONNECT_BEFORE / …
UI   view context, search aliases, chrome policy
```

| Store | File | Primary key |
|---|---|---|
| COMP | `COMP.json` | `comp_id` |
| GEO | `GEO.json` | `geo_id` |
| EVD | `EVD.json` | `evd_id` |
| EGS | `EGS.json` | `edge_id` |
| SIM | `SIM.json` | `sim_id` |
| UI | `UI.json` | view context |

`joinCatalog.ts` builds a transient view for the React/Three viewer.
`massEngine.ts` only computes totals when every active SIM record has measured/verified mass — invented sample kg values are rejected (DT-D060).

Legacy `components.json` / `geometry.json` / … are superseded.

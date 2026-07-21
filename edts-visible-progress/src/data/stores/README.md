# EDTS R2 Normalized Databases

| Store | File | PK |
|---|---|---|
| COMP | COMP.json | comp_id |
| GEO | GEO.json | geo_id → comp_id |
| EVD | EVD.json | evd_id → comp_id |
| EGS | EGS.json | edge_id |
| SIM | SIM.json | sim_id → comp_id |
| UI | UI.json | view context |

Legacy `components.json` / `geometry.json` / etc. superseded by these files.
SIM masses are intentionally null — sample invented kg values rejected (DT-D060).

# VPR-2 architecture — 6 domains, 3 storage tiers

```
TIER 1 RELATIONAL DB          TIER 2 OBJECT STORE           TIER 3 CLIENT STATE
(components, claims,          (GLB, STEP, scans,            (selected, hovered,
 relationships, mass_props,    PDFs, textures,               mode, heatmap,
 procedures)                   measurements)                 storyboard, camera)
```

Six **logical domains** (COMP / GEO / EVD / EGS / SIM / UI+ops) map into three **physical** tiers.

At 50k components, bottlenecks are draw calls, LOD streaming, raycasting, and client memory — not row lookups on indexed tables.

SQL draft: [`schema/vpr2_normalized.sql`](schema/vpr2_normalized.sql)  
In-memory prototype stores: `stores/COMP.json` … `SIM.json` + `UI.json`

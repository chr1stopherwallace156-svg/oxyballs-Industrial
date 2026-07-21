# Five-store architecture (scale path)

Monolithic component blobs do not scale to tens of thousands of objects.

EDTS Visible Progress joins five stores at runtime:

| Store | File | Owns |
|---|---|---|
| **COMPONENT_INDEX** | `stores/components.json` | Identity, family, category, visibility, removaibility |
| **GEOMETRY** | `stores/geometry.json` | Role, explode vector, geometry type / mesh handle |
| **EVIDENCE** | `stores/evidence.json` | Data-status, ledger, KG gaps, MEPQ, mass/CG (null until measured) |
| **RELATIONSHIPS** | `stores/relationships.json` | Interfaces, dependency highlights |
| **UI** | `stores/ui.json` | Scene tree, search aliases, chrome policy, badge colors |

Plus companion docs (not joined into every node):

| Store | File | Owns |
|---|---|---|
| **TIMELINE** | `stores/timeline.json` | Surgery sequence steps |
| **SIMULATION** | `stores/simulation.json` | Axle/CG scaffold — blocked until mass evidence |

`joinCatalog.ts` builds a transient `TwinComponent` view for the R1 viewer. Future backends can replace JSON files with indexed DB / graph shards without rewriting the React scene.

Legacy `componentCatalog.json` remains as a frozen snapshot for audit; **authoritative edits go in `stores/`**.

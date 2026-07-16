# Component Passport v1.1 — Design (Proposal Only)

**Status:** `PROPOSAL — NOT ACTIVE`  
**Does not modify:** `schemas/component-passport.schema.json` (frozen with `edts-kernel-v1.0.0-rc1`)  
**Machine draft:** `proposals/component-passport-v1.1.schema.json`  
**Decision:** DT-D030

## Why this is not in the tagged kernel

Kernel v1.0.0-rc1 is under `SCHEMA_FREEZE_FOR_VERTICAL_SLICE` / `DO_NOT_CHANGE_KERNEL`.  
The door vertical slice has not exposed a blocking passport-schema defect.  
Any v1.1 design stays under `proposals/` until an explicit reopen decision.

## Architectural intent (keep)

- Exact-instance passport bound to `CMPINST` + `VEH` + `CFG` + fingerprint
- Passport as **index + status summary** (traceable view)
- Multiple geometry *roles* may exist later (visual / engineering / collision / …) as **separate registry records**, not Geometry A/B labels
- Candidate assets ≠ geometry assets
- Procedure dependencies are distinct from structural/electrical attachment

## Rejected shapes from the prior draft

| Rejected | Reason |
|---|---|
| Editing active `component-passport.schema.json` now | Violates schema freeze |
| Invalid `registry: { geometry_assets: … }` without `type`/`properties` | Not valid JSON Schema; keywords would not validate instance fields |
| Embedding full geometry/evidence objects via `$ref` | Duplicate authoritative copies; conflicting hashes/statuses |
| “Every piece of evidence lives in the passport” | Passport aggregates **links**; evidence/geometry/procedures stay in their systems |
| `requires_removal_of` / `is_required_by` as the whole dependency model | Procedure sequencing ≠ structural/electrical/access graph |
| Initializing door→harness/mirror/hinge removal edges | Unverified procedure must not become operational logic |
| Registering Visual/Engineering/Collision geometry before bytes | Candidates only until ACQUIRED→HASHED→PARSED→INVENTORIED→ROLE_EVALUATED |
| Numeric score `0.1` without rubric | Manufactured precision; use `null` + `NOT_EVALUATED` |
| Family “Super Duty FL door” passport as the silo truth | Passport belongs to one exact component instance |

## Correct rule (wording)

Every component passport provides a **traceable view** of the evidence, geometry, relationships, validation, and status associated with that exact component instance.

Evidence belongs in the evidence system. Geometry belongs in the geometry-asset registry. Procedures and dependencies belong in dedicated records. The passport **aggregates IDs** to them.

## ID-only link surface (v1.1 proposal)

```json
{
  "candidate_asset_ids": ["CAND-00031-CGT", "CAND-771-GRAB"],
  "geometry_asset_ids": [],
  "evidence_link_ids": [],
  "assembly_relationship_ids": ["REL-VEH000001-0001"],
  "connection_relationship_ids": [],
  "procedure_dependency_ids": []
}
```

Promotion path for a candidate → geometry asset:

`DISCOVERED → ACQUIRED → HASHED → PARSED → COMPONENT_INVENTORIED → ROLE_EVALUATED`

Do **not** create a collision (or other) role merely because the architecture allows it.

## Relationship separation (future records — not initialized as verified)

| Record type | Examples |
|---|---|
| Assembly relationship | `STRUCTURALLY_CONTAINS`, `ATTACHED_TO`, `IS_PART_OF` |
| Connection relationship | `ELECTRICALLY_CONNECTED_TO`, `MOVES_WITH` |
| Procedure dependency | `MUST_DISCONNECT_BEFORE_REMOVAL`, `MUST_REMOVE_BEFORE`, `REQUIRES_TOOL`, `REQUIRES_VERIFICATION` |

Unresearched procedure edges: `NOT_EVALUATED`. Never seed operational remove-door graphs without a verified procedure.

## Scoring (future)

```json
{
  "score": null,
  "scoring_status": "NOT_EVALUATED",
  "rubric_version": null,
  "score_inputs": null
}
```

## Truthful door state (now)

- Exact component instance exists: `CMPINST-VEH000001-DOOR-FL` under `VEH-000001` / `CFG-000001`
- Two candidates discovered (catalog): `CAND-00031-CGT`, `CAND-771-GRAB` — **not acquired**
- No usable geometry asset admitted to the passport
- No verified procedure / dependency entered
- Active rc1 passport example reflects this within the **frozen** schema (`notes` + empty geometry/interaction link arrays)

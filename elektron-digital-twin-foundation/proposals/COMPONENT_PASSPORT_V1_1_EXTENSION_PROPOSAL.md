# COMPONENT_PASSPORT_V1_1_EXTENSION_PROPOSAL

**Status:** `OPTIONAL_FUTURE_PROPOSAL` · `NOT_ACTIVATED` · `EMPIRICAL_TRIGGER_REQUIRED`  
**Does not modify:** `schemas/component-passport.schema.json`  
**Machine draft:** `proposals/component-passport-v1.1.schema.json`  
**Illustrative instances:** `proposals/examples/` (`authority_status: ILLUSTRATIVE_ONLY`, `runtime_eligible: false`)  
**Parent decisions:** `decisions/DT-D030_*.json`, `decisions/DT-D031_*.json`

## Objective

Support advanced evidence/geometry features **later**, without mutating the rc1 baseline, and only when real parsed assets prove the need.

## Composition warning (critical)

This pattern is **unsafe** against the current rc1 root:

```json
{
  "allOf": [{ "$ref": "component-passport.schema.json" }],
  "properties": { "geometry_roles": {} }
}
```

rc1 sets `"additionalProperties": false`. Under Draft 2020-12, the base schema can reject unknown properties during `allOf` evaluation; the sibling `properties` clause does **not** behave like class inheritance.

Future activation must use one of:

1. Explicit extension point designed into a future base (not available in frozen rc1 without reopen)
2. A **complete** v1.1 root schema that restates all properties (current proposal draft approach)
3. Shared `$defs` composition with versioned roots
4. Carefully tested `unevaluatedProperties` behavior with the pinned validator

Do not assume `allOf` + new properties works without executing the validator.

## Proposed future additions (parked)

### Role-based geometry mapping

Only after real geometry exists. Items must be at least:

```json
{
  "geometry_asset_id": "GEO-…",
  "role": "VISUAL_EXTERIOR",
  "role_status": "NOT_EVALUATED",
  "validation_result_ids": []
}
```

Do not create COLLISION/LOD roles because the architecture allows them.

### Granular procedure / connection / assembly separation

See `COMPONENT_RELATIONSHIP_SEPARATION_STANDARD_PROPOSAL.md`.  
Passport remains an ID index; relationship bodies live in dedicated records.

### Scoring

`score: null`, `scoring_status: NOT_EVALUATED`, rubric required before any number.

## Activation rule

v1.1 becomes relevant only when an acquired asset **cannot** be represented under rc1 without a blocking defect. Until then: parked.

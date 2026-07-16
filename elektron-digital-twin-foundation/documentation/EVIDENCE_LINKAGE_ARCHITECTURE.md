# Evidence Linkage Architecture

**Status:** `ACTIVE`  
**Law:** HR-EVI

---

## Principle

Every parameter and every engineering claim remains attached to evidence.  
Evidence is evaluated **independently for every vehicle**.

A verified value for Vehicle A does **not** verify Vehicle B.

---

## Link object

Schema: `schemas/evidence-link.schema.json`

| Field | Rule |
|---|---|
| `subject_id` | Vehicle-bound ID (instance, config, geometry, etc.) |
| `source_id` | Must already exist in a registry/manifest in-repo |
| `verification_status` | Earned by this dataset only |
| `source_file_exists` | Honest boolean/null — never invent files |

---

## Empty links are correct

If no valid source exists:

```json
"evidence_link_ids": []
```

or status `REQUIRES_EVIDENCE` / `UNKNOWN` / `ABSENT` on the passport summary.

Do not copy another vehicle’s evidence links.

---

## Cross-vehicle evidence

If the same OEM document is later used for two vehicles:

1. Each vehicle gets its **own** evidence-link record.
2. Each link earns its own verification status.
3. Optional: a `cross-vehicle-comparison` notes that both cite the same catalog source — still not inheritance.

---

## Forbidden

- Linking to source IDs that do not exist
- Promoting `NORMALIZED` without local file audit for that dataset
- Treating another vehicle’s `ENGINEERING_VERIFIED` claim as proof

# COMPONENT_PASSPORT_EXISTING_SCHEMA_AUDIT

**Audit status:** `PASS`  
**Final decision status:** `COMPONENT_PASSPORT_RC1_SUFFICIENT`  
**Execution evidence:** `verification/results/component-passport-rc1-validation.json`

## Executed validation (frozen rc1)

| Field | Value |
|---|---|
| schema path | `schemas/component-passport.schema.json` |
| schema SHA-256 | `sha256:0fbf42e74552f1b3dce905030c0f6b32b26fe66fa2438ae9e5365b35fa7332ce` |
| example path | `examples/2019_f450/door-fl-component-passport.example.json` |
| validator | `jsonschema==4.26.0` (Draft 2020-12) |
| execution timestamp | `2026-07-16T17:34:29.839014+00:00` |
| pass/fail | **PASS** |
| validation errors | none |

`$schema` / `$id` are stripped before validation (same as kernel example validator) because rc1 sets `additionalProperties: false` and does not declare those keys.

## Fingerprint check

| Field | Value |
|---|---|
| Authoritative CFG-000001 fingerprint | `sha256:dde6a6251b97900dc192587903ce30a236de18f311996231a3f488ef0429d943` |
| Passport fingerprint | identical |
| Abbreviated `sha256:d84f86f3...` | **REJECTED** (fails pattern; never admit) |
| Silo fingerprint mismatches | none |

## What rc1 actually defines

Top-level properties: `passport_id`, `component_instance_id`, `vehicle_instance_id`, `configuration_id`, `configuration_fingerprint`, `status_summary`, `links`, `schema_version`, `notes`.

`links` may contain: `evidence_link_ids`, `geometry_asset_ids`, `relationship_ids`, `interaction_ids`.

`additionalProperties`: **false**.

## Rejected draft “initial” example

`examples/2019_f450/door-fl-component-passport.initial.example.json` was **not created**.

A hypothetical payload with `status`, `candidate_asset_ids`, top-level `geometry_asset_ids`, `engineering_state`, `scoring`, abbreviated fingerprint, and `PAS-…` id was validated against frozen rc1 and **FAILED**, including:

* additional properties not allowed (`status`, `candidate_asset_ids`, `scoring`, …)
* abbreviated fingerprint invalid under fingerprint pattern
* passport id must match `^PP-[A-Z0-9-]+$`

## How blocked / candidate state is represented without schema mutation

| Concern | Authoritative home under freeze |
|---|---|
| Door vertical slice blocked | `STATUS.json` / door slice report — not a passport `status` field |
| Candidate assets | `layers/L01/L1_LANE_A_ASSET_CATALOG.json` (`CAND-00031-CGT`, `CAND-771-GRAB`) |
| No usable geometry | passport `links.geometry_asset_ids: []` + `status_summary.geometry: ABSENT` |
| No evidence links | `links.evidence_link_ids: []` |
| No procedure dependencies | no procedure IDs in passport; none invented |
| Aggregate note | `notes` (rc1-supported) may mention candidate IDs by reference |

## Verdict on schema capability

Passport-as-index via ID lists under `links` is already the rc1 design.  
No schema modification is required to acknowledge `BLOCKED_BY_MISSING_ASSET`.  
v1.1 remains `OPTIONAL_FUTURE_PROPOSAL` / `EMPIRICAL_TRIGGER_REQUIRED` — not “required.”

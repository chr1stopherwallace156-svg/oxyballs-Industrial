# Passport Append-Only Event Model (OPTIONAL PROPOSAL — PARKED)

**Status:** `OPTIONAL_PROPOSAL` · `NOT_ACTIVATED`  
**Activation gate:** EAE CORE INGESTION proven; do not activate for scoring or GEO promotion yet  
**Frozen rc1 passport schema:** unchanged  
**Machine drafts:** `passport-event.schema.json`, `passport-current-state-projection.schema.json`

## Problem with “append to validation_history on the passport”

Appending fields onto a live passport object still mutates that object. Do not claim the passport is unmodified when history grows in-place.

## Parked event shape (stronger than UUID-only)

```json
{
  "event_id": "PASEVT-000001",
  "event_schema_version": "1.0.0",
  "passport_id": "PP-VEH000001-DOOR-FL-001",
  "sequence_number": 1,
  "event_type": "ASSET_ACQUIRED",
  "payload": {},
  "payload_schema_id": "urn:edts:proposal:passport-event-payload:asset-acquired:v1",
  "previous_event_hash": null,
  "event_hash": "sha256:…",
  "hash_algorithm": "SHA-256",
  "canonicalization": "JCS_RFC8785_OR_EDTS_SORTED_JSON",
  "recorded_at": "2026-07-16T00:00:00Z",
  "recorded_by": "EAE",
  "process_id": "eae-core-ingestion",
  "supersedes_event_id": null
}
```

## Required controls (before activation)

| Control | Why |
|---|---|
| `sequence_number` | UUID alone does not order events |
| `previous_event_hash` + `event_hash` | Tamper-evident chain |
| `hash_algorithm` + deterministic serialization | Reproducible digests |
| Payload schema **by event_type** | Typed validation |
| `SUPERSEDE` / correction types | No deletion of history |
| Reject two children with same `previous_event_hash` (fork) | Linear log unless explicitly branched |

## Current-state projection

Replay events from genesis (`previous_event_hash: null`) to the latest accepted tip. Projection is derived, not authoritative over rc1 until explicitly activated.

## Forbidden now

- Activating this model in runtime
- Writing GEO roles for `NOT_ACQUIRED` candidates
- Replacing `schemas/component-passport.schema.json`

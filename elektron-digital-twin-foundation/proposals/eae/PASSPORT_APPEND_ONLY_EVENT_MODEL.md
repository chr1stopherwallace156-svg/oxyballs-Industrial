# Passport Append-Only Event Model (Proposal)

**Status:** `PROPOSAL_NOT_ACTIVATED`  
**Frozen rc1 passport schema:** unchanged  
**Machine drafts:** `passport-event.schema.json`, `passport-current-state-projection.schema.json`

## Problem with “append to validation_history”

Appending fields onto a live passport object is still a mutation of that object’s bytes and identity over time. Audit language must not claim the passport is unmodified when history grows in-place.

## Design

1. **Immutable passport events** live in an event log (separate files/records), each with:
   - `event_id`, `sequence`, `event_type`, `timestamp`
   - `previous_event_hash`
   - `event_hash` over canonical payload
2. **Supersession/correction** uses `SUPERSEDE` events pointing at prior `event_id` — no deletion.
3. **Current-state projection** is a deterministic fold over the event log (`eae_core.events.project_current_state`).
4. Active rc1 passport remains an **index snapshot** that may optionally point at a projection id later — only after validation and explicit reopen/activation.

## Forbidden until activation

- Writing `GEO-*` / geometry roles for unacquired candidates
- Claiming validation_history mutation is “non-modifying”
- Activating these schemas as replacements for `schemas/component-passport.schema.json`

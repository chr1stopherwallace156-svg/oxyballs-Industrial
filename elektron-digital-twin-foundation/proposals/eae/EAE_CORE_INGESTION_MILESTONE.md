# EAE CORE INGESTION — First implementation milestone

**Status:** `PARTIAL_FIXTURE_VALIDATED` (library primitives) · full product still pending  
**Parent readiness:** `EDTS_EAE_SPECIFICATION_READY_IMPLEMENTATION_PENDING`

## Scope (in)

```text
local fixture
→ quarantine
→ file-type detection
→ SHA-256
→ safe archive extraction
→ manifest generation
→ repeat-ingestion / idempotency test
```

## Scope (out — do not build yet)

- Marketplace / HTTP acquisition
- FBX / STEP engineering parsers
- Activated rubric scoring of real candidates
- Passport event-stream activation / GEO promotion
- Full seven-stage “evidence intelligence” product

## Exit criteria

1. Fixture suites green (security, idempotency, null-rubric behavior).
2. Manifest generation for local fixtures is deterministic for identical bytes.
3. No scoring or GEO creation for `NOT_ACQUIRED` Lane A candidates.
4. Frozen rc1 passport unchanged.

# EAE CORE INGESTION — First implementation milestone

**Status:** **`VALIDATED`** — see `verification/results/EAE_CORE_INGESTION_IMPLEMENTATION_REPORT.md`  
**Decision:** `DT-D035`  
**Package:** `eae/` (stdlib) · tests: `tests/eae/`

## Scope (done in v0)

```text
local fixture
→ quarantine decisions (type mismatch / ZIP security)
→ file-type detection
→ SHA-256 (streaming, full digest)
→ atomic manifest
→ content-addressed registry
→ repeat-ingestion → ALREADY_INGESTED (no duplicate authoritative entry)
```

## Scope (still out)

- Marketplace / HTTP acquisition
- FBX / STEP engineering parsers
- Activated rubric scoring of real candidates
- Passport event-stream activation / GEO promotion
- Full seven-stage “evidence intelligence” product

## Exit criteria (met)

1. Fixture suites green (27/27).
2. Manifest generation deterministic for identical bytes.
3. No scoring or GEO creation for `NOT_ACQUIRED` Lane A candidates.
4. Frozen rc1 passport unchanged.

## Next increment

Archive-safe acquisition and richer metadata inspection — **not** scoring.

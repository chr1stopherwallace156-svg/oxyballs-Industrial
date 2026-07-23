# EAE CORE INGESTION (v0)

**Status:** executable local-file pipeline (not full evidence intelligence)  
**Policy version:** `1.0.0`  
**Scope:** local single file → detect → hash → quarantine decisions → atomic manifest → content-addressed registry

## Not included

Remote download, marketplace access, FBX/STEP, geometry scoring, component extraction, passport mutation, event streams.

## Run tests

```bash
python3 -m pytest tests/eae -q
# or
python3 verification/eae_core/run_eae_core_ingestion_suite.py
```

## Ingest a local fixture

```python
from pathlib import Path
from eae.core import ingest_local_file

result = ingest_local_file(Path("tests/eae/fixtures/cube.obj"), Path("/tmp/eae_store"))
print(result["result"], result.get("asset_id"))
```

**Identity:** physical content identity = complete SHA-256 of source bytes.  
`ingestion_policy_version` is evaluation metadata only and never creates a second physical asset.

**Idempotency:** same bytes → same `asset_id`, `ALREADY_INGESTED`, `state_mutation: false` (execution/evaluation logs may append).

**Integrity:** equivalent existing manifest → `ALREADY_INGESTED`; conflicting manifest at same identity → `REGISTRY_INTEGRITY_CONFLICT` (no silent overwrite).

## Capture package importer (XREPO-CAP-EDTS-0001 / 0002)

Canonical compatibility + secure `.edts-pkg` quarantine live under `eae/importers/xrepo_cap_edts/`.
Contracts are vendored from `elektron-capture-ios` 0.1.4 under `eae/contracts/capture_ios_0_1_4/` (load by digest — do not recreate status ownership mappings).

```bash
python3 -m pytest tests/eae/test_xrepo_cap_edts_0001.py tests/eae/test_xrepo_cap_edts_0002.py -q
python3 verification/xrepo_cap_edts/run_suite.py
```

Commit rule: **XREPO-0001 PASS ∧ XREPO-0002 PASS** only. XREPO-0001 alone returns `secure_ingestion: NOT_RUN` and never commits.

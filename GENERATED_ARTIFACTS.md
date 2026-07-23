# GENERATED ARTIFACTS

Files that are **produced or rewritten at runtime** and are therefore **excluded**
from `IMMUTABLE_PAYLOAD_CHECKSUMS.sha256`. The immutable manifest covers only the
things that must never change (source, migrations, tests, scripts, docs, vendor,
site). Verifying immutable checksums before any run therefore stays valid even
after Install/Verify/Generate have written the files below.

## Excluded (generated / mutable)

| Path pattern | Written by |
|---|---|
| `engine/output/**` (build-package.json/md) | `platform001:generate` (deterministic; package hash is stable) |
| `engine/data/**` (engine.db) | `migrate` / generation |
| `.local/**` (venv, logs, cache, backups, data) | install + runtime |
| `**/dist/**`, `**/node_modules/**` | build / install |
| `**/__pycache__/**`, `**/*.pyc` | Python bytecode |
| `**/*.log` | script logs |
| `elektron-digital-twin-foundation/STATUS.json` | kernel validation |
| `elektron-digital-twin-foundation/verification/results/**` | kernel/EAE validation runs |
| `IMMUTABLE_PAYLOAD_CHECKSUMS.sha256`, `CHECKSUMS.sha256` | packaging (self-referential) |

## Determinism: canonical package hash vs. rendered file checksum (precise wording)

Two different things are being measured, and only one is expected to be constant:

- **Canonical engineering identity is identical across repeated generations** —
  `input_hash`, `package_hash`, and `build_package_id` are pure functions of the
  locked inputs and do **not** change between runs.
- **The rendered output FILE's SHA-256 does change**, because each generation writes
  a fresh `generated_at` timestamp into `build-package.json`/`.md`. `generated_at`
  is **intentionally excluded** from the canonical `package_hash`.

So the accurate statement is: *"Repeated-generation hashes are identical" refers to
the engine's canonical `package_hash` (and `input_hash`/`build_package_id`), NOT to
the byte-for-byte checksum of the complete output file, which varies because
generation timestamps are deliberately excluded from the canonical hash.*

Expected canonical value on this build:
```
package_hash = 76ddce5254507eed09ee23a502038974e7c5fc2af8117513aa85dd30e4bb9034
```
Confirm the canonical hash (do NOT byte-checksum the file):
```
grep package_hash engine/output/platform-001/build-package.json
```
This distinction is covered by an engine regression test (canonical hashes equal
across two runs while the stored `generated_at` differs).

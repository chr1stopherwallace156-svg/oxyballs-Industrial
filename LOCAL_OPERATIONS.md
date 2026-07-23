# LOCAL OPERATIONS

Every launcher is a double-clickable `.command` at the top of the folder; each runs
a script in `scripts/` using paths relative to itself, so the folder can live
anywhere.

| Double-click | Runs | Does |
|---|---|---|
| Install Elektron.command | setup-macos.sh | One-time install + full verification (offline, hash-locked) |
| Start Elektron.command | start-local.sh | Opens `index.html`, prints the local menu |
| Verify Elektron.command | verify-all.sh | Verifies integrity + all tests + twin validation |
| Generate Platform 001.command | generate-platform001.sh | Regenerates the build package (non-destructive) |
| Backup Elektron.command | backup.sh | Sealed, timestamped backup |
| Restore Elektron.command | restore.sh | Guarded restore from a backup |
| *(diagnostics)* | doctor.sh | Read-only health check |

## Outcomes are explicit

Install and Verify end with one of **FULL_PASS · PASS_WITH_WARNINGS ·
BUILD_ENGINE_ONLY · FAIL**. "All passed" language appears **only** for FULL_PASS.
A digital-twin validation failure or an integrity/checksum failure will **never**
be reported as a pass.

## `clean` never touches the database; reset is separate and explicit

- **`npm run clean`** removes only compiled build output (`dist/`). It **never**
  deletes `engine/data/engine.db`. (Regression-tested.)
- **`npm run reset:database`** is the ONLY command that deletes the database, and
  only deliberately: it prints the exact path, creates and **verifies a backup
  first** (aborting if the backup fails), requires you to type `RESET`, and then
  removes the database. Run `npm run migrate` afterwards to recreate the schema.

## Safety regression harness

`bash scripts/self-test.sh` proves the safety-critical behaviors: `clean` preserves
the database; a failed pre-restore backup aborts restore; a corrupt restored
database aborts leaving the active database byte-for-byte unchanged (temp-file +
atomic rename); and a failed post-restore verification yields `OUTCOME: FAIL`.

## Non-destructive database handling

No launcher deletes `engine/data/engine.db`. Regenerating Platform 001 runs an
additive `migrate` (which never drops data) and then the engine's
`platform001:generate`, which clears **only** the prior Platform-001 build-package
rows in foreign-key-safe order inside one transaction. Unrelated records
(EvidenceLedger, IndividualVehicle, VehicleBuild, TestResult, signoffs,
authorizations, telemetry) are preserved. This is covered by an engine regression
test that runs against a **persistent file database**.

## Equivalent terminal commands

```
bash scripts/setup-macos.sh      # install + verify
bash scripts/verify-all.sh       # verify (truthful outcome)
bash scripts/doctor.sh           # read-only health check
cd engine
npm run migrate                  # additive; never deletes data
npm test                         # full suite
npm run platform001:generate     # regenerate (FK-safe re-seed)
cd ../elektron-digital-twin-foundation
../.local/venv/bin/python verification/run_kernel_validation.py
```

## Locations

Database `engine/data/engine.db` · package `engine/output/platform-001/` · logs
`.local/logs/` · backups `.local/backups/` · venv `.local/venv/` · offline deps
`vendor/`. Everything under `.local/` is safe to delete and is rebuilt by Install.

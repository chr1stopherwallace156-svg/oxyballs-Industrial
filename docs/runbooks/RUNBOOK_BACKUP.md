# RUNBOOK_BACKUP.md

There are **two different operations**. Do not confuse them.

## Local Runtime backup (operational recovery)

```bash
npm run backup
# or
./scripts/backup.sh
# or double-click: Backup Elektron.command
```

Creates a **checksum-sealed** archive under `.local/backups/` containing installed
runtime state (`engine.db`, `.local` data/outputs). Restore with
`Restore Elektron.command` / `scripts/restore.sh`.

See also: `BACKUP_AND_RECOVERY.md`, `LOCAL_OPERATIONS.md`.

## EDE development snapshot (not a recovery archive)

```bash
npm run ede:snapshot
# or
./scripts/dev/ede/snapshot.sh
```

Writes a timestamped directory under `artifacts/ede-snapshots/` (gitignored) containing:

- copies of `docs/cto`, `docs/runbooks`, `ENVIRONMENT.md`, `PROJECT_MANIFEST.json`
- optional scaffold DB if present
- selected config files

This is a **development convenience snapshot**, not a sealed runtime recovery archive.

Configure export location:

```bash
export ELEKTRON_EDE_SNAPSHOT_DIR="/path/to/export"
npm run ede:snapshot
```

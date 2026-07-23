# RUNBOOK_BACKUP.md

```bash
npm run backup
# or
./scripts/backup.sh
```

Creates a timestamped directory under `BACKUPS_DIR` (default `./backups/`, gitignored) containing:

- copies of `docs/cto`, `docs/runbooks`, `ENVIRONMENT.md`, `PROJECT_MANIFEST.json`
- optional scaffold DB if present
- selected config files

Configure:

```bash
export ELEKTRON_BACKUP_DIR="/path/to/export"
npm run backup
```

# RUNBOOK_DATABASE.md

## Scope (EDE 0.1)

SQLite CLI availability + optional local scaffold DB under `logs/ede-scaffold.sqlite` for doctor checks.

Application databases (if any) remain owned by their packages — EDE does not relocate them.

## Commands

```bash
npm run db:health
./scripts/database/health.sh
```

## Rules

- Never commit production dumps.  
- Backups go under the configured backup directory (see `npm run backup`).  
- Schema changes belong to the owning application package with migrations.

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
- EDE scaffold snapshots go under `artifacts/ede-snapshots/` (see `npm run ede:snapshot`).  
- Runtime DB recovery archives go under `.local/backups/` (see `npm run backup`).  
- Schema changes belong to the owning application package with migrations.

# Docs index

This tree holds **Build Engine governance** (constitution, specs, research, status — see root `README.md`) and **EDE** workstation docs (`cto/`, `runbooks/`, `architecture/`, `contracts/`, `history/`). They coexist by subdirectory; EDE does not relocate Build Engine documents.

# Elektron Developer Environment (EDE)

This repository includes a **version-controlled workstation bootstrap**.

## One-command setup

```bash
./scripts/setup.sh
# or
npm run setup
```

## Daily commands (EDE)

```bash
npm run ede:doctor     # workstation health check
npm run dashboard      # terminal summary
npm run ede:snapshot   # development snapshot (CTO docs/config/scaffold)
npm run verify         # EDE doctor + shared repo checks
```

**Do not use** `npm run doctor` / `npm run backup` for EDE — those are **Local Runtime**
operator tools (`scripts/doctor.sh`, `scripts/backup.sh` → `.local/backups/`).

After setup, shell aliases (when you `source config/shell/elektron-aliases.sh`):

| Alias | Action |
|---|---|
| `elektron-start` | Print dashboard + next steps |
| `elektron-test` | Run available tests |
| `elektron-build` | Run EDE verify |
| `elektron-db` | Database health |
| `elektron-ede-doctor` | `npm run ede:doctor` |
| `elektron-ede-snapshot` | `npm run ede:snapshot` |
| `elektron-runtime-doctor` | `npm run doctor` (local runtime) |
| `elektron-runtime-backup` | `npm run backup` (local runtime) |

## Layout (additive)

See `PROJECT_MANIFEST.json`. Application trees such as `elektron-digital-twin-foundation/` are **not** moved or renamed by EDE.

## Docs

- CTO: `docs/cto/`
- Runbooks: `docs/runbooks/`
- Environment: `ENVIRONMENT.md`
- Milestone history: `history/`

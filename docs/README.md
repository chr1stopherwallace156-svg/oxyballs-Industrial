# Elektron Developer Environment (EDE)

This repository includes a **version-controlled workstation bootstrap**.

## One-command setup

```bash
./scripts/setup.sh
# or
npm run setup
```

## Daily commands

```bash
npm run doctor      # health check
npm run dashboard   # terminal summary
npm run backup      # timestamped backup
npm run verify      # pre-push verification
```

After setup, shell aliases (when you `source config/shell/elektron-aliases.sh`):

| Alias | Action |
|---|---|
| `elektron-start` | Print dashboard + next steps |
| `elektron-test` | Run available tests |
| `elektron-build` | Run available builds |
| `elektron-db` | Database health |
| `elektron-doctor` | `npm run doctor` |
| `elektron-backup` | `npm run backup` |

## Layout (additive)

See `PROJECT_MANIFEST.json`. Application trees such as `elektron-digital-twin-foundation/` are **not** moved or renamed by EDE.

## Docs

- CTO: `docs/cto/`
- Runbooks: `docs/runbooks/`
- Environment: `ENVIRONMENT.md`
- Milestone history: `history/`

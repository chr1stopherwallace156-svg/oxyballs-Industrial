# ENVIRONMENT.md

Elektron Developer Environment (EDE) — required and optional tools for a reproducible workstation.

| Field | Value |
|---|---|
| EDE version | 0.1.0 |
| Last updated | 2026-07-23 |
| Setup entry | `./scripts/setup.sh` or `npm run setup` |

## Required tools

| Tool | Minimum version | Notes |
|---|---|---|
| Git | 2.40+ | HTTPS or SSH to GitHub |
| Node.js | 20 LTS (22 supported) | Includes npm |
| Python | 3.11+ | Foundation / EAE tests |
| `python3-venv` / ensurepip | matching Python | Required to create `.venv/` (Debian: `python3-venv`) |
| SQLite | 3.40+ | CLI `sqlite3` |
| bash | 4+ | Setup scripts |

## Optional tools

| Tool | Purpose |
|---|---|
| TypeScript (`tsc`) | Via `npm` / package-local |
| VS Code or Cursor | Editor; extensions from `.vscode/extensions.json` |
| Docker | Optional future services — not required for EDE 0.1 |
| Xcode / macOS | Required only for `elektron-capture-ios` device builds |
| `gh` CLI | PR inspection |

## Recommended hardware

| Profile | Spec |
|---|---|
| Minimum | 8 GB RAM, 4 CPU, 40 GB free disk |
| Recommended | 16 GB RAM, 8 CPU, SSD |
| Capture device work | Separate Mac + physical iPhone (not required for EDE bootstrap) |

## Python virtual environment

Created at `.venv/` by `./scripts/setup.sh` (gitignored). Activate:

```bash
source .venv/bin/activate
```

## Node workspace

Root `package.json` exposes:

| Command | Product | Purpose |
|---|---|---|
| `npm run doctor` / `npm run backup` | Local Runtime | Operator runtime health + sealed `.local/backups/` |
| `npm run ede:doctor` / `npm run ede:snapshot` | EDE | Workstation checks + `artifacts/ede-snapshots/` |
| `npm run setup` / `npm run verify` | EDE | Clone bootstrap + pre-push checks |

Application packages keep their own `package.json` files and must not be relocated by EDE.

## Verification (EDE workstation)

```bash
npm run ede:doctor
```

## Verification (Local Runtime)

```bash
npm run doctor
```
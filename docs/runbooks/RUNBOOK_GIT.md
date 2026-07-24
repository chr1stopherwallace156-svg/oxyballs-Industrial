# RUNBOOK_GIT.md

## Branch naming

Prefer:

```text
cursor/<short-kebab-description>-d881
```

or team-agreed `feature/<name>`, `fix/<name>`.

## Commits

Use the commit template:

```bash
git config commit.template config/git/commit-template.txt
```

(Or rely on `./scripts/setup.sh`, which configures this locally without forcing global identity.)

## Pre-commit

`./scripts/git/pre-commit` runs `dev/checks/*` (repo health, format markers, secrets, CRITICAL TODOs, available builds/tests).

Install:

```bash
./scripts/git/install-hooks.sh
```

## Never

- Force-push shared `main` without explicit approval.  
- Rewrite approved capture-ios baseline tags.  
- Commit `.venv/`, `node_modules/`, or `logs/*.log`.

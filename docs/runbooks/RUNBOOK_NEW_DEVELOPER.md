# RUNBOOK_NEW_DEVELOPER.md

1. Read `ENVIRONMENT.md` and `docs/cto/CTO_MASTER_ROADMAP.md`.  
2. Run `./scripts/setup.sh`.  
3. Run `npm run ede:doctor` until all checks pass or documented skips.  
4. Run `npm run dashboard` and note current milestone / blockers.  
5. Never commit secrets; pre-commit hooks block CRITICAL TODOs and secret-like patterns.  
6. Branch naming: see `docs/runbooks/RUNBOOK_GIT.md`.  
7. Ask before relocating application directories — EDE forbids silent moves.

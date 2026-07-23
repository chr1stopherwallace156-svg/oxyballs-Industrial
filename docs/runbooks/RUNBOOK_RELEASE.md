# RUNBOOK_RELEASE.md

1. `npm run doctor` and `npm run verify` green.  
2. Ensure changelog / milestone history updated (`history/M00N.md`).  
3. Tag only after merge to the agreed base branch.  
4. EDE version bumps: update `PROJECT_MANIFEST.json` `ede_version` + `ENVIRONMENT.md`.  
5. Application releases follow package-local `RELEASE` / SemVer docs — EDE does not replace them.

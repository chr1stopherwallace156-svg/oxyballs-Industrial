# TECHNICAL_DEBT.md

| ID | Item | Severity | Owner | Notes |
|---|---|---|---|---|
| TD-001 | Root repo lacks unified CI for EDE doctor | MEDIUM | Platform | Add CI job calling `npm run ede:doctor` |
| TD-002 | Capture-ios lives outside this monorepo | MEDIUM | Capture / CTO | Intentional independence; document remote URL when published |
| TD-003 | Untracked sibling checkouts (`edts-*`) may confuse clones | LOW | Platform | Keep application packages committed or document as optional |
| TD-004 | No root TypeScript project yet | LOW | Platform | EDE uses Node scripts; app TS stays package-local |
| TD-005 | SQLite “database” check is scaffold-level | LOW | Platform | Expand when canonical app DB lands |

Debt entries must include an exit criterion before closure.

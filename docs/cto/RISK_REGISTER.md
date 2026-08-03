# RISK_REGISTER.md

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-001 | Undocumented laptop setup drift | HIGH | HIGH | EDE `setup.sh` + `doctor` |
| R-002 | Accidental secrets in git | MEDIUM | HIGH | `dev/checks/no-secrets.sh` pre-commit |
| R-003 | Capture/EDTS contract drift | MEDIUM | HIGH | Vendored digests + XREPO gates |
| R-004 | Prototype demos mistaken for production truth | MEDIUM | MEDIUM | `PROTOTYPE_STATUS.md` honesty |
| R-005 | EDE scripts break on Windows shells | MEDIUM | LOW | Document bash/macOS/Linux; no PowerShell-only path in v0.1 |

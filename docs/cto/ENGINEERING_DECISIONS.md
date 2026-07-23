# ENGINEERING_DECISIONS.md

Short index of EDE-era decisions. Detailed ADRs remain in application trees (e.g. foundation `decisions/`).

| ID | Decision | Date | Status |
|---|---|---|---|
| EDE-D001 | Workstation bootstrap lives in-repo under `scripts/` + `docs/` | 2026-07-23 | ACCEPTED |
| EDE-D002 | Do not move/rename existing application folders for EDE | 2026-07-23 | ACCEPTED |
| EDE-D003 | Capture-ios remains independently versioned | 2026-07-23 | ACCEPTED |
| EDE-D004 | Root npm exposes Local Runtime (`doctor`/`backup`) and namespaced EDE (`ede:*`) | 2026-07-23 | ACCEPTED |
| EDE-D005 | Pre-commit checks fail closed on CRITICAL TODO and secrets patterns | 2026-07-23 | ACCEPTED |
| EDE-D006 | Local Runtime owns `scripts/doctor.sh` + `scripts/backup.sh`; EDE uses `scripts/dev/ede/{doctor,snapshot}.sh` and `artifacts/ede-snapshots/` | 2026-07-23 | ACCEPTED |

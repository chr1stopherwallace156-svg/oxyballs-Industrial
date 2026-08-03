# RUNBOOK_DISASTER_RECOVERY.md

## Workstation loss (source development machine)

1. New machine → `RUNBOOK_NEW_MAC.md` / `RUNBOOK_NEW_DEVELOPER.md`.  
2. Clone repository (source of truth).  
3. `./scripts/setup.sh && npm run ede:doctor`.  
4. If unpushed CTO/docs existed, restore the latest **EDE development snapshot** from
   `artifacts/ede-snapshots/` or `ELEKTRON_EDE_SNAPSHOT_DIR` (not a runtime archive).  
5. Re-auth GitHub / package registries as required.

## Installed Local Runtime loss (operator machine)

1. Follow `BACKUP_AND_RECOVERY.md` / `LOCAL_OPERATIONS.md`.  
2. Restore a sealed archive from `.local/backups/` via `Restore Elektron.command` /
   `scripts/restore.sh`.  
3. Re-run `npm run doctor` (Local Runtime) — not `npm run ede:doctor`.

## Repository corruption

1. Re-clone from `origin`.  
2. Do not “fix” by copying random folders over application trees.  
3. Re-run the appropriate doctor (`ede:doctor` for source workstation, `doctor` for runtime);
   open an incident note under `history/` if production data was at risk.

## Capture / EDTS contracts

Recovery of approved capture tags is from the capture repository remotes/tags — not from EDE snapshots alone.

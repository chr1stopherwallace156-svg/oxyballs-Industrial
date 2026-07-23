# RUNBOOK_DISASTER_RECOVERY.md

## Workstation loss

1. New machine → `RUNBOOK_NEW_MAC.md` / `RUNBOOK_NEW_DEVELOPER.md`.  
2. Clone repository (source of truth).  
3. `./scripts/setup.sh && npm run doctor`.  
4. Restore last backup from `ELEKTRON_BACKUP_DIR` if local unpushed docs existed.  
5. Re-auth GitHub / package registries as required.

## Repository corruption

1. Re-clone from `origin`.  
2. Do not “fix” by copying random folders over application trees.  
3. Re-run doctor; open an incident note under `history/` if production data was at risk.

## Capture / EDTS contracts

Recovery of approved capture tags is from the capture repository remotes/tags — not from EDE backups alone.
